<template>
  <q-header bordered class="q-pa-xs bg-white text-black">
    <q-toolbar class="header-toolbar">
      <div class="absolute-center header-title">
        {{ title }}
      </div>
      <q-space />
      <q-btn flat round dense icon="add" color="primary" @click="$emit('add')" class="absolute-right" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
defineOptions({ name: 'HeaderComponent' });
defineProps({ title: String });
defineEmits(['add']);
</script>

<style scoped>
.header-toolbar {
  min-height: 50px;
  padding: 0 10px;
  position: relative;
}

.header-title {
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.absolute-right {
  position: absolute;
  right: 10px;
}
</style>
