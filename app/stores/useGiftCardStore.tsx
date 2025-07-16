// stores/useGiftCardStore.ts
import { create } from 'zustand';

interface GiftCardState {
  cardType: string;
  amount: number;
  setGiftCard: (type: string, amount: number) => void;
}

export const useGiftCardStore = create<GiftCardState>((set) => ({
  cardType: '',
  amount: 0,
  setGiftCard: (type, amount) => set({ cardType: type, amount }),
}));
