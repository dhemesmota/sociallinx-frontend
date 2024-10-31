import { api } from '@/lib/axios'

interface CreatePostBody {
  title: string
  content: string
}

export async function createPost({ title, content }: CreatePostBody) {
  await api.post('/posts', { title, content })
}
