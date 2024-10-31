import axios from 'axios'

import { env } from '@/env'

const token = localStorage.getItem('token')

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )
    return config
  })
}
