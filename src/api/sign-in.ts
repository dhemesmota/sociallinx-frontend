import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export interface SignInResponse {
  access_token: string
}

export async function signIn({ email, password }: SignInBody) {
  return await api.post<SignInResponse>('/sessions', { email, password })
}
