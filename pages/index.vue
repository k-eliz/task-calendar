<template>
  <v-container>
    <div class="flex items-center mb-4 gap-4">
      <h3 class="font-bold" v-if="!selectedTask">Выберите дату</h3>
      <input
        type="date"
        v-model="date"
        class="border rounded px-3 py-2 text-sm"
        @input="onDateChange"
        v-if="!selectedTask"
      />
    </div>
    <div class="flex pb-2 items-center justify-between">
      <h1 class="text-2xl font-bold mb-4">
        {{ selectedTask ? "Выбранная задача" : "Список задач" }}
      </h1>
      <v-btn
        icon="mdi-plus"
        v-if="!selectedTask"
        @click="isDialogOpen = true"
        class="ml-auto"
        color="primary"
      />
      <v-btn
        v-if="taskStore.selectedTaskId"
        icon="mdi-arrow-left"
        @click="goBack"
        color="primary"
        variant="text"
      />
    </div>
    <div class="relative">
      <div v-if="selectedTask">
        <div class="p-4 flex flex-col gap-4">
          <h2 class="text-xl font-bold">{{ selectedTask.title }}</h2>
          <p class="text-gray-500 mb-2">{{ selectedTask.date }}</p>
          <p>{{ selectedTask.description || "Без описания" }}</p>
          <v-btn @click="deleteSelectedTask">Удалить</v-btn>
        </div>
      </div>

      <TaskList v-else />
    </div>
    <TaskForm v-if="isDialogOpen" @close-form="isDialogOpen = false" />
  </v-container>
</template>

<script setup lang="ts">
import { useTaskStore } from "~/composables/useTaskStore";
import { VBtn } from "vuetify/components";
import { VContainer } from "vuetify/components";
import { VCard } from "vuetify/components";
import { toast } from 'vue3-toastify'
import TaskList from "~/components/TaskList.vue";
import TaskForm from "~/components/TaskForm.vue";

const taskStore = useTaskStore();
const date = ref("");
const isDialogOpen = ref(false);

const selectedTask = computed(() => taskStore.selectedTask);

const deleteSelectedTask = () => {
  taskStore.deleteTask(taskStore.selectedTaskId);
  taskStore.resetSelection();
  toast("Задача удалена", {
    type: "success",
    position: "top-right",
  });
};

const onDateChange = () => {
  taskStore.setDate(date.value);
  taskStore.resetSelection();
  if (!date.value) taskStore.setDate("");
};

const goBack = () => {
  taskStore.resetSelection();
};

onMounted(() => {
  taskStore.loadTasks();
});
</script>
