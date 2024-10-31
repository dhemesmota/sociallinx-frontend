import { api } from '@/lib/axios'

export interface Profile {
  id: string
  name: string
  email: string
  role?: 'curator' | 'admin'
}

interface GetProfileResponse extends Profile {}

export async function getProfile() {
  const { data } = await api.get<GetProfileResponse>('/account')

  return data
}
