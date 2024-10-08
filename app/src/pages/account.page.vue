<template>
  <q-page>
    <q-list class="q-py-md">
      <q-item-label header>Description</q-item-label>
      <q-item>
        <q-item-section>
          <q-input v-model="account.description"></q-input>
        </q-item-section>
      </q-item>
      <q-item-label header class="flex justify-between items-center">
        <span>Users<q-badge rounded class="q-ml-sm">{{
          users.length }}</q-badge></span>
        <q-btn flat round dense icon="add" text-color="primary" @click="onClickAddUser" />
      </q-item-label>
      <q-item v-for="user in users" :key="user.id" class="q-my-md"  :class="{ 'bg-grey-2': $store.user.id == user.id }">
        <q-item-section side>
          <q-avatar>{{ user.name.first[0].charAt(0).toUpperCase() }}</q-avatar>
        </q-item-section>
        <q-item-section :class="{ 'text-bold': user.id == $store.user.id }">
          <q-item-label>{{ user.name.first }} {{ user.name.last }}</q-item-label>
          <q-item-label caption>
            {{ user.email }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round dense icon="more_horiz" @click="onClickUserActions(user)"></q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- <q-page-sticky position="bottom" :offset="[28, -28]" style="z-index: 6000;">
      <q-btn fab icon="add" color="accent" @click="onClickAddTask" />
    </q-page-sticky> -->

    <!-- <add-user-dialog v-model="addUserDialog.show" @add="addUser" /> -->
    <user-actions-dialog v-model="userActionsDialog.show" :user="userActionsDialog.user" @remove="removeUser" @leave="leaveAccount" />
  </q-page>
</template>

<script setup>
defineOptions({ name: 'AccountPage' });

import { ref, computed, inject, onBeforeMount } from 'vue';
import { useStore } from 'src/stores/store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// import AddTaskDialog from 'src/components/tasks/addTask.dialog.vue';
import UserActionsDialog from 'src/components/account/userActions.dialog.vue';

const $store = useStore();
const $notify = inject('notify');

const awaitTimeout = delay => new Promise(resolve => setTimeout(resolve, delay));

const users = ref([]);

const userActionsDialog = ref({ show: false, user: null });

onBeforeMount(async () => {
  users.value = await $store.getUsers(account.value.id);
});

const account = computed(() => {
  return $store.account;
});

const onClickAddUser = async () => {

};

const onClickUserActions = (user) => {
  userActionsDialog.value.user = user;
  userActionsDialog.value.show = true;
};

const removeUser = async () => {

};

const leaveAccount = async () => {

};
</script>
