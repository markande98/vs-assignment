import { create } from "zustand";

export const useModal = create((set) => ({
  isOpen: false,
  data: null,
  onOpen: (nodes, edges, isDag) =>
    set({ isOpen: true, data: { nodes, edges, isDag } }),
  onClose: () => set({ isOpen: false, data: null }),
}));
