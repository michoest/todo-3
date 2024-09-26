// stores/store.js
import { defineStore } from "pinia";
import { api as $api, session } from "boot/axios";
import { notify } from "boot/notify";
import _ from "lodash";

export const useStore = defineStore("store", {
  state: () => ({
    global: {
      status: "loading",
      // sse: null,
      notificationSubscription: null
    },
    persistent: {
      api: "http://localhost:3004",
      token: null,
    },
    user: null,
    account: null,
    tasks: [],
    notifications: [],
  }),
  getters: {},
  actions: {
    async fetch() {
      try {
        if (this.persistent.token) {
          this.global.status = "loading";

          const response = await $api.get("/auth/data");
          ({
            tasks: this.tasks,
            user: this.user,
            account: this.account,
          } = response.data);

          await this.subscribe();
        }

        this.global.status = "ok";

        return true;
      } catch (err) {
        const message = err.response?.data?.notification?.message;

        if (message) {
          switch (message) {
            case "jwt malformed":
            case "Not authenticated!":
            case "jwt expired":
              notify("Redirecting to login...");
              this.logout();
              this.global.status = "ok";

              return false;
          }
        } else {
          console.error(err);
          this.global.status = "error";
          notify(`Error: ${err}`, { type: "negative" });
        }
      }
      this.global.status = "ok";
    },
    async login({ email, password }) {
      try {
        const response = await $api.post(`/auth/login`, { email, password });

        if (response.data.token) {
          ({
            user: this.user,
            account: this.account,
            tasks: this.tasks,
            token: this.persistent.token,
          } = response.data);

          $api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.persistent.token}`;

          // await this.initSSE();

          notify(
            `Logged in as ${this.user.name.first} ${this.user.name.last}!`
          );

          // Redirect from login page
          return true;
        }
      } catch (err) {
        console.log(err);
        const message = err.response?.data?.notification?.message;

        if (message) {
          switch (message) {
            case "Invalid credentials":
              notify(
                "Your e-mail and password do not seem to match. Please try again!",
                { type: "negative" }
              );
          }
        } else {
          console.error(err);
          notify(`Error: ${err}`, { type: "negative" });
        }
      }
    },
    async loginToAccount(accountId, setAsDefaultAccount = false) {
      // console.log("loginToAccount");
      this.global.status = "loading";

      try {
        const response = await $api.post(`/auth/login/account`, {
          accountId,
          setAsDefaultAccount,
        });

        if (response.data.token) {
          ({
            user: this.user,
            account: this.account,
            tasks: this.tasks,
            token: this.persistent.token,
          } = response.data);

          $api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.persistent.token}`;

          // await this.closeSSE();
          // await this.initSSE();

          notify(`Logged in to ${this.account.description}!`);
          this.global.status = "ok";

          // Redirect to default tab
          return true;
        }
      } catch (err) {
        console.log(err);
        const message = err.response?.data?.notification?.message;
        console.log(message);

        if (message) {
          switch (message) {
            case "Invalid credentials":
              notify(
                "Your e-mail and password do not seem to match. Please try again!",
                { type: "negative" }
              );
          }
        } else {
          notify(`Error: ${err}`, { type: "negative" });
        }
      }
    },
    async logout() {
      this.global.status = "loading";
      this.user = null;
      this.persistent.token = null;

      this.closeSSE();

      $api.defaults.headers.common["Authorization"] = null;

      notify("Logged out!");

      return true;
    },
    async setDefaultAccount(id) {
      try {
        const response = $api.post("/auth/default", { id });

        this.user.defaultAccount = id;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async updateTask(id, properties) {
      try {
        const response = await $api.put(`/tasks/${id}`, properties);

        const { task } = response.data;
        this.tasks.splice(_.findIndex(this.tasks, { id: task.id }), 1, task);
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async checkAPI(url) {
      try {
        await $api.get(`${url}/ping`, { baseURL: "" });

        return true;
      } catch (err) {
        return false;
      }
    },
    setAPI(url) {
      this.persistent.api = url;
      $api.defaults.baseURL = url;
    },
    async handlePush(payload) {
      console.log('handlePush', payload);
    },
    async subscribe() {
      if (!this.global.push) {
        console.log('Cannot subscribe to push notifications!');
      } else {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          try {
            console.log('Starting subscription...');
            const registration = await navigator.serviceWorker.ready;
            const vapidPublicKey = (await $api.get('/vapid')).data;
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: vapidPublicKey
            });
            await $api.post('/subscribe', subscription);
            console.log('Push notification subscription successful');
          } catch (error) {
            console.error('Error subscribing to push notifications:', error);
          }
        } else {
          console.log('Push notifications are not supported');
        }
      }
    }
  },
  persist: {
    storage: sessionStorage,
    pick: ["persistent"],
    afterHydrate: (ctx) => {
      $api.defaults.baseURL = ctx.store.persistent.api;

      if (ctx.store.persistent.token != null) {
        $api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ctx.store.persistent.token}`;
      }
    },
  },
  inject: {
    '$push': {
      from: 'push'
    }
  }
});
