/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from "workbox-core";
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";

self.skipWaiting();
clientsClaim();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== "ssr" || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  );
}

self.addEventListener("push", async function (event) {
  const data = event.data.json();

  // Send message to main app
  const allClients = await clients.matchAll({
    includeUncontrolled: true,
    type: "window",
  });

  if (allClients.length > 0) {
    // App is open, don't send push notification
    allClients.forEach((client) => {
      client.postMessage({
        type: "PUSH_RECEIVED",
        payload: data,
      });
    });
  } else {
    // App is not open, send push notification
    const options = {
      body: data.body,
      icon: "icons/icon-128x128.png",
      badge: "icons/icon-128x128.png",
    };
    
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  // TODO: React to specific notification
  event.notification.close();
  event.waitUntil(clients.openWindow("https://todo-3.app.michoest.com"));
});
