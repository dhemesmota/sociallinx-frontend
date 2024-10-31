import { api } from '@/lib/axios'

export interface PublishedPostParams {
  postId: string
}

export async function publishedPost({ postId }: PublishedPostParams) {
  await api.patch(`/posts/${postId}/published`)
}
