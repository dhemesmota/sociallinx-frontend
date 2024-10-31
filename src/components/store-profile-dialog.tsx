import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getProfile, Profile } from '@/api/get-profile'
import { updateProfile } from '@/api/update-profile'

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
import { Separator } from './ui/separator'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string(),
  password: z.string().max(10).optional(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: profile?.name || '',
      email: profile?.email || '',
      role: profile?.role === 'curator' ? 'Curador' : 'Administrador',
      password: '',
    },
  })

  function updateManagedRestaurantCache({ name, email }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<Profile>(['profile'])
    if (cached) {
      queryClient.setQueryData<Profile>(['profile'], {
        ...cached,
        name,
        email,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ email, name }) => {
      const { cached } = updateManagedRestaurantCache({
        email,
        name,
        role: profile?.role || '',
      })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache({
          email: context.previousProfile.email,
          name: context.previousProfile.name,
          role: profile?.role || '',
        })
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        email: data.email,
        password: data.password || undefined,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar perfil, tente novamente.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil do usuário</DialogTitle>
        <DialogDescription>
          Atualize as informações do perfil.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              {...register('name')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              {...register('email')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Função
            </Label>
            <Input
              id="role"
              type="text"
              className="col-span-3"
              readOnly
              {...register('role')}
              disabled
            />
          </div>
          <Separator />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              {...register('password')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="mr-2" variant="ghost" type="button">
              Fechar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
