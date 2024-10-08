<template>
  <header-component title="Tasks" />
  <q-page>
    <div class="q-pa-md flex justify-between q-gutter-xs">
      <span>
        <q-chip v-for="f in filters" :key="f.value"
          :class="{ 'bg-primary': f.value == filter, 'text-white': f.value == filter }" :outline="f.value != filter" clickable
          @click="filter = f.value">
          {{ f.label }}
        </q-chip>
      </span>
      <span>
        <q-btn flat round dense icon="filter_list" color="primary" />
      </span>
    </div>
    <q-list class="q-py-md">
      <q-item v-for="task in filteredTasks" :key="task.id" class="q-my-md">
        <q-item-section side>
          <q-btn v-if="['not_started', 'in_progress', 'waiting'].includes(task.status)" flat round dense
            icon="radio_button_unchecked" @click="onClickCompleteTask(task)"></q-btn>
          <q-btn v-else flat round dense icon="check" @click="onClickOpenTask(task)"></q-btn>
        </q-item-section>
        <q-item-section>
          <q-item-label><q-badge v-for="tag in task.tags" :key="tag" class="q-mr-xs">{{ tag }}</q-badge></q-item-label>
          <q-item-label><span class="text-body1">{{ task.title }}</span>
            <q-icon v-if="task.status == 'not_started'" name="start" color="primary" class="q-ml-sm" />
            <q-icon v-else-if="task.status == 'in_progress'" name="pending" color="info" class="q-ml-sm" />
            <q-icon v-else-if="task.status == 'waiting'" name="hourglass_top" color="warning" class="q-ml-sm" />
            <q-icon v-else-if="task.status == 'completed'" name="check" color="positive" class="q-ml-sm" />
          </q-item-label>
          <q-item-label caption>
            <span class="q-mr-md" style="white-space: nowrap;"><q-icon name="person" /> {{ task.owner.description
              }}</span>
            <span class="q-mr-md" style="white-space: nowrap;"><q-icon name="alarm_on" /> {{
              dayjs(task.dueDate).fromNow() }}</span>
            <span class="q-mr-md" style="white-space: nowrap;"><q-icon name="group" /> {{ task.accessAccounts.length }}
              people</span>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round dense icon="more_horiz" @click="onClickTaskActions(task)"></q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom" :offset="[28, -28]" style="z-index: 6000;">
      <q-btn fab icon="add" color="accent" @click="onClickAddTask" />
    </q-page-sticky>

    <add-task-dialog v-model="addTaskDialog.show" @add="addTask" />
    <task-actions-dialog v-model="taskActionsDialog.show" :task="taskActionsDialog.task" @delete="deleteTask" />
  </q-page>
</template>

<script setup>
defineOptions({ name: 'TasksPage' });

import { ref, computed, inject } from 'vue';
import { useStore } from 'src/stores/store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import HeaderComponent from 'src/components/header.component.vue';
import AddTaskDialog from 'src/components/tasks/addTask.dialog.vue';
import TaskActionsDialog from 'src/components/tasks/taskActions.dialog.vue';

const $store = useStore();
const $notify = inject('notify');

const awaitTimeout = delay => new Promise(resolve => setTimeout(resolve, delay));

const filters = ref([{ value: 'all', label: 'All' }, { value: 'owned', label: 'Owned' }, { value: 'open', label: 'Open' }, { value: 'due', label: 'Due' }]);
const filter = ref('all');

const tasks = computed(() => {
  return $store.tasks || [];
});

const filteredTasks = computed(() => {
  switch (filter.value) {
    case 'all':
      return tasks.value;
      case 'owned':
        return tasks.value.filter(task => task.owner.id == $store.account.id);
      case 'owned':
        return [];
      case 'owned':
        return [];
      default:
        return [];
  }
});

const addTaskDialog = ref({ show: false });
const taskActionsDialog = ref({ show: false, task: null });

const onClickAddTask = () => {
  addTaskDialog.value.show = true;
};

const addTask = async (task) => {
  if (await $store.addTask(task)) {
    $notify(`${task.title} added!`, { actions: [{ label: 'Undo', color: 'white', handler: () => { $store.removeTask(task.id); } }] });
  }
};

const onClickCompleteTask = async (task) => {
  const oldStatus = task.status;
  task.status = 'almost-completed';

  await awaitTimeout(500);
  if (await $store.updateTask(task.id, { status: 'completed' })) {
    $notify(`${task.title} completed!`, { actions: [{ label: 'Undo', color: 'white', handler: () => { $store.updateTask(task.id, { status: oldStatus }); } }] });
  }
  else {
    task.status = oldStatus;
  }
};

const onClickOpenTask = async (task) => {
  if (await $store.updateTask(task.id, { status: 'not_started' })) {
    $notify(`${task.title} re-opened!`, { actions: [{ label: 'Undo', color: 'white', handler: () => { $store.updateTask(task.id, { status: 'completed' }); } }] });
  }
};

const onClickTaskActions = (task) => {
  taskActionsDialog.value.task = task;
  taskActionsDialog.value.show = true;
};

const deleteTask = async (task) => {
  if (await $store.deleteTask(task.id)) {
    $notify(`${task.title} deleted!`, { actions: [{ label: 'Undo', color: 'white', handler: () => { $store.addTask(task); } }] });
  }
};
</script>
