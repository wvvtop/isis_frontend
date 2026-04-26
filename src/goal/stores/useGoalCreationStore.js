import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { useTaskManager } from '../composables/useTaskManager'
import { useDateValidation } from '../composables/useDateValidation'
import { goalApi } from '@/api/goal'
import router from '@/router'

export const useGoalCreationStore = defineStore('goalCreation', () => {
  const goal = ref({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    milestones: [],
  })

  const { addTask, updateTask, removeTask } = useTaskManager(goal)
  const { wouldLoseTasksWithDates, cleanEmptyDays } = useDateValidation(goal)

  const isFormValid = computed(() => {
    if (!goal.value.title?.trim()) return false
    if (!goal.value.startDate || !goal.value.endDate) return false
    if (goal.value.milestones.length === 0) return false

    return goal.value.milestones.every((milestone) => {
      if (!milestone.title?.trim() || !milestone.startDate || !milestone.endDate) return false

      const hasTasks = Object.values(milestone.tasks || {}).some(
        (day) => (day.main && day.main.length > 0) || (day.side && day.side.length > 0),
      )
      return hasTasks
    })
  })

  const addMilestone = () => {
    const last = goal.value.milestones[goal.value.milestones.length - 1]
    goal.value.milestones.push({
      title: '',
      startDate: last?.endDate || goal.value.startDate || '',
      endDate: '',
      tasks: {},
    })
  }

  const removeMilestone = (index) => {
    if (confirm(`Вы действительно хотите удалить этап №${index + 1}?`)) {
      goal.value.milestones.splice(index, 1)
    }
  }

  const updateMilestone = (index, updatedMilestone) => {
    goal.value.milestones[index] = { ...updatedMilestone }
  }

  const transformForApi = () => {
    return {
      ...goal.value,
      milestones: goal.value.milestones.map((milestone) => ({
        ...milestone,
        tasks: transformTasks(milestone.tasks),
      })),
    }
  }

  const transformTasks = (tasks) => {
    const result = {}
    for (const date in tasks) {
      if (tasks[date]) {
        result[date] = {
          main: (tasks[date].main || []).map((t) => t.text || t).filter(Boolean),
          side: (tasks[date].side || []).map((t) => t.text || t).filter(Boolean),
        }
      }
    }
    return result
  }

  const resetForm = () => {
    goal.value = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      milestones: [],
    }
  }

  const handleSubmit = async () => {
    if (!isFormValid.value) {
      alert('Пожалуйста, заполните все обязательные поля!')
      return
    }

    try {
      const payload = transformForApi()
      // const response = await goalApi.createGoal(payload);
      console.log('Цель успешно создана! Payload:', payload)
      alert('Цель успешно создана!')
      resetForm()
      goalApi.createGoal(payload)
      router.push('/')
    } catch (error) {
      console.error('Ошибка при создании цели:', error)
      alert('Ошибка при создании цели')
    }
  }

  return {
    goal,
    isFormValid,
    addMilestone,
    removeMilestone,
    updateMilestone,
    addTask,
    updateTask,
    removeTask,
    wouldLoseTasksWithDates,
    cleanEmptyDays,
    handleSubmit,
    resetForm,
  }
})
