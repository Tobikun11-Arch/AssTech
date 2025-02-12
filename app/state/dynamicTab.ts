import { create } from 'zustand'

interface DynamicTabState {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const useDynamicTab = create<DynamicTabState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),
}))