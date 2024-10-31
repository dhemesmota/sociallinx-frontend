import { format } from 'date-fns'

import { Post } from '@/api/get-posts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type PostStatusType = 'draft' | 'published'

interface PostCardProps {
  post: Post
  onStatusChange: (id: string, status: PostStatusType) => void
  onPublish: (id: string) => void
}

export function PostCard({ post, onStatusChange, onPublish }: PostCardProps) {
  return (
    <div className="space-y-4 rounded-md border p-4 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-muted-foreground">
            {format(new Date(post.createdAt), 'dd/MM/yyyy')}
          </p>
        </div>
        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
          {post.status === 'published' ? 'Publicado' : 'Rascunho'}
        </Badge>
      </div>

      <p className="line-clamp-3 text-muted-foreground">{post.content}</p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onStatusChange(
              post.id,
              post.status === 'published' ? 'draft' : 'published',
            )
          }
        >
          {post.status === 'published' ? 'Retornar ao Rascunho' : 'Publicar'}
        </Button>

        <Button variant="default" size="sm" onClick={() => onPublish(post.id)}>
          Publicar
        </Button>
      </div>
    </div>
  )
}
