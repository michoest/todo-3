<template>
  <q-page>
    <div class="text-h6 q-pa-md text-center">View options</div>
    <q-list class="q-pa-sm q-pt-md">
      <q-item-label header>Task preview</q-item-label>
      <q-item dense>
        <q-item-section>
          Show tags
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="show.tags"></q-toggle>
        </q-item-section>
      </q-item>
      <q-item dense>
        <q-item-section>
          Show owner
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="show.owner"></q-toggle>
        </q-item-section>
      </q-item>
      <q-item dense>
        <q-item-section>
          Show due date
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="show.due"></q-toggle>
        </q-item-section>
      </q-item>

      <q-item-label header>Actions</q-item-label>
      <q-item dense>
        <q-item-section>
          <q-select :options="['Complete', 'Delete']" label="Standard action" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
defineOptions({ name: 'ViewOptionsPage' });

import { onMounted, ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/stores/store';

const $router = useRouter();
const $store = useStore();
const $notify = inject('notify');

const show = ref({
  tags: true,
  owner: false,
  due: true
})
</script>
