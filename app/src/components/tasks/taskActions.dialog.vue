<template>
  <q-dialog v-model="show" no-backdrop-dismiss position="bottom">
    <q-card style="width: 350px">
      <q-card-section>
        <q-list>
          <q-item clickable v-ripple @click="onClickDeleteTask">
            <q-item-section avatar>
              <q-icon name="delete" />
            </q-item-section>
            <q-item-section>Delete task</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple @click="onClickCancel">
            <q-item-section class="text-negative text-center">Cancel</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineOptions({ name: 'TaskActionsDialog' });

import { useStore } from 'src/stores/store';
const $store = useStore();

const show = defineModel();
const props = defineProps({
  task: Object
});

const emit = defineEmits(['delete', 'cancel']);


const onClickDeleteTask = () => {
  show.value = false;
  emit('delete', props.task);
};

const onClickCancel = () => {
  show.value = false;
  emit('cancel');
}
</script>
