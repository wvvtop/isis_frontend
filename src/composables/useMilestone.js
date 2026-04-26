// composables/useMilestone.js

import { computed } from 'vue'

export function useMilestone(milestone, goal, prevMilestone) {
  /**
   * Минимальная дата начала этапа
   * - либо конец предыдущего этапа
   * - либо старт цели
   */
  const minStartDate = computed(() => {
    if (prevMilestone.value?.endDate) return prevMilestone.value.endDate
    return goal.value?.startDate || ''
  })

  /**
   * Генерация списка дат между startDate и endDate
   */
  const getDates = () => {
    if (!milestone.value.startDate || !milestone.value.endDate) return []

    const dates = []
    let current = new Date(milestone.value.startDate)
    const end = new Date(milestone.value.endDate)

    while (current <= end) {
      dates.push(new Date(current).toISOString().split('T')[0])
      current.setDate(current.getDate() + 1)
    }

    return dates
  }

  /**
   * Проверка и корректировка startDate
   */
  const validateStartDate = () => {
    const start = milestone.value.startDate

    if (prevMilestone.value?.endDate && start < prevMilestone.value.endDate) {
      milestone.value.startDate = prevMilestone.value.endDate
    }

    if (goal.value?.startDate && start < goal.value.startDate) {
      milestone.value.startDate = goal.value.startDate
    }

    if (milestone.value.endDate && milestone.value.endDate < milestone.value.startDate) {
      milestone.value.endDate = milestone.value.startDate
    }
  }

  /**
   * Проверка и корректировка endDate
   */
  const validateEndDate = () => {
    if (!milestone.value.endDate) return

    if (goal.value?.endDate && milestone.value.endDate > goal.value.endDate) {
      milestone.value.endDate = goal.value.endDate
    }

    if (milestone.value.endDate < milestone.value.startDate) {
      milestone.value.endDate = milestone.value.startDate
    }
  }

  /**
   * Добавление задачи
   */
  const addTask = (date, type) => {
    if (!milestone.value.tasks[date]) {
      milestone.value.tasks[date] = { main: [], side: [] }
    }

    if (type === 'main' && milestone.value.tasks[date].main.length < 3) {
      milestone.value.tasks[date].main.push('')
    }

    if (type === 'side' && milestone.value.tasks[date].side.length < 10) {
      milestone.value.tasks[date].side.push('')
    }
  }

  /**
   * Удаление задачи
   */
  const removeTask = (date, type, index) => {
    milestone.value.tasks[date][type].splice(index, 1)

    const day = milestone.value.tasks[date]

    // удаляем день, если он пустой
    if (day.main.length === 0 && day.side.length === 0) {
      delete milestone.value.tasks[date]
    }
  }

  /**
   * Обновление задачи
   */
  const updateTask = (date, type, index, value) => {
    milestone.value.tasks[date][type][index] = value
  }

  return {
    minStartDate,
    getDates,
    validateStartDate,
    validateEndDate,
    addTask,
    removeTask,
    updateTask,
  }
}
