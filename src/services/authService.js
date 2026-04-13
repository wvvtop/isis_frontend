// src/services/authService.js

import { registerRequest } from '../api/auth'

export const registerUser = async (email, password) => {
  try {
    const res = await registerRequest({
      email,
      password,
    })

    return res.data
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data
    }

    throw 'Ошибка сети'
  }
}
