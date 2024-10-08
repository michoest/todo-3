<template>
  <q-dialog v-model="show" full-height no-backdrop-dismiss position="bottom" maximized @hide="clearInputs">
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-h6">Add task</div>
      </q-card-section>
      <q-card-section>
        <div class="q-px-md">
          <div class="q-gutter-y-xs column">
            <q-input class="text-body1" borderless v-model="task.title" dense placeholder="Title" autofocus
              @keyup.enter="onClickAdd" />
            <q-select v-model="task.tags" dense borderless use-input use-chips multiple input-debounce="0" label="Tags"
              :options="tagOptions" @new-value="createTag" @filter="filterTags">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon size="xs" name="category" class="q-mr-sm" />
              </template>
            </q-select>
            <q-select borderless v-model="task.owner" dense :options="accounts" label="Owner" @keyup.enter="onClickAdd" emit-value map-options option-value="id" option-label="description">
              <template v-slot:prepend>
                <q-icon size="xs" name="person" class="q-mr-sm" />
              </template>
            </q-select>
            <q-input borderless v-model="task.due" dense placeholder="Due" @keyup.enter="onClickAdd">
              <template v-slot:prepend>
                <q-icon size="xs" name="alarm_on" class="q-mr-sm">
                  <q-popup-proxy v-model="showDate" cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="task.due" minimal mask="YYYY-MM-DD" @update:model-value="showDate = false" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-select dense borderless v-model="task.accessAccounts" :options="accounts" label="Members"
              multiple emit-value map-options option-value="id" option-label="description" option-disable="myself">
              <template v-slot:prepend>
                <q-icon size="xs" name="people" class="q-mr-sm" />
              </template>
              <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                <q-item v-bind="itemProps">
                  <q-item-section>
                    <q-item-label>{{ opt.description }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select dense borderless v-model="task.predecessors" :options="otherTasks" label="Predecessor tasks"
              multiple emit-value map-options option-value="id" option-label="title">
              <template v-slot:prepend>
                <q-icon size="xs" name="keyboard_arrow_left" class="q-mr-sm" />
              </template>
              <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                <q-item v-bind="itemProps">
                  <q-item-section>
                    <q-item-label>{{ opt.title }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select dense borderless v-model="task.successors" :options="otherTasks" label="Successor tasks"
              multiple emit-value map-options option-value="id" option-label="title">
              <template v-slot:prepend>
                <q-icon size="xs" name="keyboard_arrow_right" class="q-mr-sm" />
              </template>
              <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                <q-item v-bind="itemProps">
                  <q-item-section>
                    <q-item-label>{{ opt.title }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </q-card-section>



      <q-card-actions class="q-px-md">
        <q-space />
        <q-btn color="negative" flat @click="onClickCancel">Cancel</q-btn>
        <q-btn color="primary" :disable="!task.title || !task.owner" flat @click="onClickAdd">Add</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineOptions({ name: 'AddTaskDialog' });
const show = defineModel();
const emit = defineEmits(['add', 'cancel']);

import { ref, watch, computed } from 'vue';
import _ from 'lodash';
import { v4 as uuid } from "uuid";
import { useStore } from 'src/stores/store';

const $store = useStore();

const task = ref({
  id: uuid(),
  title: '',
  tags: [],
  owner: $store.account.id,
  due: null,
  accessAccounts: [$store.account.id],
  status: 'not_started'
});

const tagOptions = ref(['Work', 'Personal', 'Urgent', 'Low Priority']);
const accounts = computed(() => {
  return $store.accounts?.map(account => ({ ...account, myself: account.id == $store.account.id })) || [];
});
const showDate = ref(false);

const otherTasks = computed(() => {
  return $store.tasks;
});

const createTag = (val, done) => {
  if (val.length > 0) {
    if (!tagOptions.value.includes(val)) {
      tagOptions.value.push(val)
    }
    done(val, 'add-unique')
  }
}

const filterTags = (val, update) => {
  if (val === '') {
    update(() => {
      tagOptions.value = ['Work', 'Personal', 'Urgent', 'Low Priority']
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    tagOptions.value = tagOptions.value.filter(
      v => v.toLowerCase().indexOf(needle) > -1
    )
  })
}

const onClickAdd = () => {
  show.value = false;

  emit('add', _.cloneDeep(task.value));
};

const onClickCancel = () => {
  show.value = false;
  clearInputs();
  emit('cancel');
};

const clearInputs = () => {
  task.value = {
    title: '',
    due: null
  };
};
</script>
