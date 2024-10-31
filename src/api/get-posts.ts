import { PostStatusType } from '@/components/post-status'
import { api } from '@/lib/axios'

export interface Post {
  id: string
  title: string
  content: string
  status: PostStatusType
  authorId: string
  createdAt: string
}

export interface GetPostsQuery {
  pageIndex?: number
  curatorId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface GetPostsResponse {
  posts: Post[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getPosts({
  pageIndex,
  curatorId,
  customerName,
  status,
}: GetPostsQuery) {
  const response = await api.get<GetPostsResponse>('/posts', {
    params: {
      pageIndex,
      curatorId,
      customerName,
      status,
    },
  })

  return response.data
}
