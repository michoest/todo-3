<template>
  <q-dialog v-model="show" no-backdrop-dismiss position="bottom">
    <q-card style="width: 350px">
      <q-card-section>
        <q-list>
          <q-item v-if="props.user.id == $store.user.id" clickable v-ripple @click="onClickLeave" >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>Leave account</q-item-section>
          </q-item>
          <q-item v-if="props.user.id != $store.user.id" clickable v-ripple @click="onClickRemove">
            <q-item-section avatar>
              <q-icon name="person_remove" />
            </q-item-section>
            <q-item-section>Remove user from account</q-item-section>
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
defineOptions({ name: 'UserActionsDialog' });

import { useStore } from 'src/stores/store';
const $store = useStore();

const show = defineModel();
const props = defineProps({
  user: Object
});

const emit = defineEmits(['leave', 'remove', 'cancel']);

const onClickLeave = (set) => {
  show.value = false;
  emit('leave');
};

const onClickRemove = () => {
  show.value = false;
  emit('remove', props.user.id);
};

const onClickCancel = () => {
  show.value = false;
  emit('cancel');
}
</script>
