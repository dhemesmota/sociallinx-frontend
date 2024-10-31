import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getPosts } from '@/api/get-posts'
import { CreatePostDialog } from '@/components/create-post-dialog'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'

import { PostCard } from './post-card'
import { PostCardSkeleton } from './post-card-skeleton'

export function Posts() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [openCreateDialog, setOpenCreateDialog] = useState(false)

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const {
    data: result,
    isLoading: isLoadingPost,
    isRefetching,
  } = useQuery({
    queryKey: ['posts', pageIndex],
    queryFn: () =>
      getPosts({
        pageIndex,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())
      return state
    })
  }

  function handleStatusChange(id: string, status: string) {
    // lógica para atualizar status
  }

  function handlePublish(id: string) {
    // lógica para publicar o post
  }

  return (
    <>
      <Helmet title="Feed" />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Posts
            {isRefetching && <span className="animate-pulse">...</span>}
          </h1>
          <Dialog open={openCreateDialog}>
            <DialogTrigger asChild onClick={() => setOpenCreateDialog(true)}>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2"
              >
                <Plus className="h-4 w-4" />
                Novo post
              </Button>
            </DialogTrigger>
            <CreatePostDialog onClose={() => setOpenCreateDialog(false)} />
          </Dialog>
        </div>

        <div className="space-y-2.5">
          <div className="space-y-4">
            {isLoadingPost ? (
              <>
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </>
            ) : (
              result?.posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onStatusChange={handleStatusChange}
                  onPublish={handlePublish}
                />
              ))
            )}
          </div>

          {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
