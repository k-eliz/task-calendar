<template>
  <div v-if="tasks.length === 0" class="text-center">
    <p class="text-gray-500">Нет задач</p>
  </div>
  <div v-else>
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @select="onSelect"
      @delete="onDelete"
    />
    <div v-if="taskStore.totalPages > 1" class="flex justify-center mt-4">
      <v-pagination
        v-model="taskStore.currentPage"
        :length="taskStore.totalPages"
        total-visible="5"
        color="primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskCard from "./TaskCard.vue";
import { toast } from 'vue3-toastify'
import { useTaskStore } from "~/composables/useTaskStore";
import { VPagination } from 'vuetify/components'

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.paginatedTasks);

const onSelect = (id: string) => taskStore.selectTask(id);
const onDelete = (id: string) => {
  taskStore.deleteTask(id);
  toast("Задача удалена", {
    type: "success",
    position: "top-right",
  });
}
</script>
