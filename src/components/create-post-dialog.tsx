/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createPost } from '@/api/create-post'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const createPostSchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreatePostSchema = z.infer<typeof createPostSchema>

interface Props {
  onClose: () => void
}

export function CreatePostDialog({ onClose }: Props) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    values: {
      title: '',
      content: '',
    },
  })

  const { mutateAsync: createPostFn } = useMutation({
    mutationFn: createPost,
  })

  async function handleCreatePost(data: CreatePostSchema) {
    try {
      await createPostFn({
        title: data.title,
        content: data.content,
      })

      toast.success('Post criado com sucesso.')
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'posts',
      })
      onClose()
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Erro ao criar post.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo post</DialogTitle>
        <DialogDescription>Preencha os campos abaixo.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreatePost)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input
              id="title"
              type="text"
              className="col-span-3"
              {...register('title')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="content"
              className="col-span-3"
              {...register('content')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="mr-2"
              variant="ghost"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Criar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
