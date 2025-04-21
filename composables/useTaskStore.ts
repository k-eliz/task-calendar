// composables/useTaskStore.ts
import { defineStore } from 'pinia'
import type { Task } from '../types/task'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    selectedDate: '' as string,
    selectedTaskId: '' as string | null,
    currentPage: 1 as number,
    itemsPerPage: 10 as number,
  }),
  getters: {
    filteredTasks(state): Task[] {
      return state.selectedDate
        ? state.tasks.filter(task => task.date === state.selectedDate)
        : state.tasks
    },
    selectedTask(state): Task | null {
      return state.tasks.find(task => task.id === state.selectedTaskId) || null
    },
    paginatedTasks(state): Task[] {
      const start = (state.currentPage - 1) * state.itemsPerPage
      return this.filteredTasks.slice(start, start + state.itemsPerPage)
    },
    totalPages(state): number {
      return Math.ceil(this.filteredTasks.length / state.itemsPerPage)
    }
  },
  actions: {
    addTask(task: Task) {
      this.tasks.push(task)
      this.persist()
    },
    deleteTask(id: string) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.selectedTaskId = null
      this.persist()
    },
    setDate(date: string) {
      this.selectedDate = date
      this.currentPage = 1
    },
    selectTask(id: string) {
      this.selectedTaskId = id
    },
    resetSelection() {
      this.selectedTaskId = null
    },
    loadTasks() {
      const saved = localStorage.getItem('tasks')
      if (saved) this.tasks = JSON.parse(saved)
    },
    persist() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
})