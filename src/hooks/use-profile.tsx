import { create } from 'zustand'

import { Profile } from '@/api/get-profile'

type ProfileStore = {
  user: Profile | null
  setUser: (user: Profile) => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
