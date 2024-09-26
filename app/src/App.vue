<template>
  <router-view />
</template>

<script setup>
defineOptions({
  name: 'App'
});

import { onMounted, onUnmounted } from 'vue';
import { useStore } from './stores/store';

const $store = useStore();

const handlePush = (event) => {
  if (event.data && event.data.type === 'PUSH_RECEIVED') {
    $store.handlePush(event.data.payload);
  }
}

onMounted(() => {
  navigator.serviceWorker.addEventListener('message', handlePush);
});

onUnmounted(() => {
  navigator.serviceWorker.removeEventListener('message', handlePush);
});
</script>
