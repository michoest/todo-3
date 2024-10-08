const routes = [
  {
    path: "/",
    component: () => import("layouts/app.layout.vue"),
    children: [
      { path: "", redirect: "/tasks" },
      {
        path: "tasks",
        component: () => import("pages/tasks.page.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "projects",
        component: () => import("pages/projects.page.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "settings",
        component: () => import("pages/settings.page.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "view-options",
        component: () => import("pages/viewOptions.page.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/account",
        component: () => import("pages/account.page.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/login.page.vue"),
  },
  {
    path: "/accounts",
    component: () => import("pages/accounts.page.vue"),
  },
  // Always leave this as last one, but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
