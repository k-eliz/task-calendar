<template>
  <div class="fixed inset-0 w-full h-full backdrop-blur-md bg-black/50 flex justify-center items-center z-[1000]">
    <div class="w-full max-w-[500px] p-4">
      <v-card>
        <v-card-title>Создать задачу</v-card-title>
        <v-card-text>
          <v-form ref="formRef">
            <v-text-field
              v-model="title"
              label="Название *"
              autofocus
              :rules="[rules.required]"
              required
            />
            <v-text-field
              v-model="date"
              label="Дата *"
              type="date"
              :rules="[rules.required]"
              required
            />
            <v-textarea v-model="description" label="Описание" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="emit('closeForm')">Отмена</v-btn>
          <v-btn color="primary" @click="handleSubmit">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "~/composables/useTaskStore";
import {
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VTextField,
  VTextarea,
  VBtn,
  VSpacer,
} from "vuetify/components";
import { VForm } from "vuetify/components";
import { toast } from 'vue3-toastify'

const title = ref("");
const date = ref("");
const description = ref("");

const formRef = ref();
const taskStore = useTaskStore();

const emit = defineEmits(["closeForm"]);

const rules = {
  required: (value: string) => !!value || "Это поле обязательно для заполнения",
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  const valid = await formRef.value.validate();
  if (!valid.valid) return;

  taskStore.addTask({
    id: crypto.randomUUID(),
    title: title.value,
    date: date.value,
    description: description.value,
  });

  title.value = "";
  date.value = "";
  description.value = "";
  toast('Задача успешно создана', {
    type: 'success',
    autoClose: 2000,
  });
  emit("closeForm");
};
</script>

