import { nextTick } from 'vue'

export function useDateValidation(goal) {
  const wouldLoseTasksWithDates = (milestoneIndex, newStart, newEnd) => {
    const milestone = goal.value.milestones[milestoneIndex]
    if (!milestone?.tasks) return false

    const start = newStart ?? milestone.startDate
    const end = newEnd ?? milestone.endDate

    if (!start || !end) return false

    return Object.entries(milestone.tasks).some(([date, day]) => {
      const hasRealTasks = (day.main && day.main.length > 0) || (day.side && day.side.length > 0)

      // Если на этой дате есть задачи и она выходит за новый диапазон
      return hasRealTasks && (date < start || date > end)
    })
  }
  const cleanEmptyDays = (tasks) => {
    const cleaned = { ...tasks }
    Object.keys(cleaned).forEach((date) => {
      const day = cleaned[date]
      if (!day || (day.main?.length === 0 && day.side?.length === 0)) {
        delete cleaned[date]
      }
    })
    return cleaned
  }

  return {
    wouldLoseTasksWithDates,
    cleanEmptyDays,
  }
}
