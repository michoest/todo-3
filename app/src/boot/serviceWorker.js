// src/boot/serviceWorker.js
import { Notify } from "quasar";
import { useStore } from "src/stores/store";

async function registerAndUpdateServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log(
        "ServiceWorker registration successful with scope: ",
        registration.scope
      );

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            showUpdateNotification();
          }
        });
      });

      // Check for an update immediately after registration
      await checkForUpdate(registration);

      return true;
    } catch (error) {
      // console.error("ServiceWorker registration failed: ", error);

      return false;
    }
  }
}

async function checkForUpdate(registration) {
  try {
    await registration.update();
    if (registration.waiting) {
      showUpdateNotification();
    }
  } catch (error) {
    console.error("Error checking for service worker update:", error);
  }
}

function showUpdateNotification() {
  // You can use Quasar's Notify plugin here
  Notify.create({
    message: "A new version is available. Please refresh to update.",
    color: "primary",
    actions: [
      {
        label: "Refresh",
        handler: () => {
          window.location.reload();
        },
      },
    ],
  });
}

export default async ({ app, store }) => {
  // This is called when your app boots
  const push = await registerAndUpdateServiceWorker();

  // Store the result in the Pinia store
  const $store = useStore(store);
  $store.global.push = push;
};

// Optionally, check for updates periodically
setInterval(() => {
  navigator.serviceWorker.getRegistration().then(checkForUpdate);
}, 60 * 60 * 1000); // Check every hour
