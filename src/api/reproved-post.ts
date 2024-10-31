import { api } from '@/lib/axios'

export interface ReprovedPostParams {
  postId: string
}

export async function reprovedPost({ postId }: ReprovedPostParams) {
  await api.patch(`/posts/${postId}/reprove`)
}
