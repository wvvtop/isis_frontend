import apiClient from './client'

export const goalApi = {
  createGoal: (data) => apiClient.post('/goals/create', data),

  getAllGoals: () => {
    return apiClient.get('/goals')
  },
}
