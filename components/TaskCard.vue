<template>
  <div
    class="mb-4 hover:shadow-lg !flex justify-between border rounded-lg cursor-pointer !p-4 items-center"
    @click="$emit('select', task.id)"
  >
    <div>
      <h3 class="text-lg font-bold">{{ task.title }}</h3>
      <p class="text-sm text-gray-500">{{ task.date }}</p>
    </div>

    <v-icon
      icon="mdi-minus"
      class="p-2"
      @click.stop="$emit('delete', task.id)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types/task";
import { VIcon } from "vuetify/components";

defineProps<{
  task: Task;
}>();

defineEmits(["select", "delete"]);
</script>

