import { api } from '@/lib/axios'

interface UpdateProfileBody {
  name: string
  email: string
  password?: string
}

export async function updateProfile({
  name,
  email,
  password,
}: UpdateProfileBody) {
  await api.put('/account', { name, email, password })
}
