import apiClient from './client'

export const taskApi = {
  /**
   * Получить все задачи на сегодня
   */
  getTodayTasks: () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    return apiClient.get('/tasks/today', {
      headers: {
        'X-Timezone': timezone,
      },
    })
  },

  /**
   * Обновить статус задачи (выполнена / не выполнена)
   */
  updateTaskStatus: (taskId, status) => {
    return apiClient.patch(`/tasks/${taskId}/status`, { status })
  },
}
