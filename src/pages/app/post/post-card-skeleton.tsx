export function PostCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-md border p-4 shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          {/* Título esqueleto */}
          <div className="h-4 w-3/4 rounded bg-muted"></div>
          {/* Data esqueleto */}
          <div className="h-3 w-1/4 rounded bg-muted"></div>
        </div>
        {/* Badge esqueleto */}
        <div className="h-4 w-12 rounded-full bg-muted"></div>
      </div>

      {/* Conteúdo esqueleto */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-muted"></div>
        <div className="h-3 w-5/6 rounded bg-muted"></div>
        <div className="h-3 w-2/3 rounded bg-muted"></div>
      </div>

      {/* Botões esqueleto */}
      <div className="flex gap-2">
        <div className="h-8 w-20 rounded bg-muted"></div>
        <div className="h-8 w-20 rounded bg-muted"></div>
      </div>
    </div>
  )
}
