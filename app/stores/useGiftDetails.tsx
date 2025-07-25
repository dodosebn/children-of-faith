// app/stores/useGiftDetails.ts
import { create } from 'zustand'
import { allGifts } from '@/app/utils/allCatMaps'

type Gift = (typeof allGifts)[0]

interface GiftStore {
  selectedGift: Gift | null
  setSelectedGift: (gift: Gift) => void
  getGiftById: (id: number) => Gift | undefined
}

export const useGiftDetails = create<GiftStore>((set) => ({
  selectedGift: null,
  setSelectedGift: (gift) => set({ selectedGift: gift }),
  getGiftById: (id) => allGifts.find((gift) => gift.id === id),
}))
