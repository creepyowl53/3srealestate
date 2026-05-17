import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CompareItem {
  id: string
  title: string
  slug: string
  coverImage: string
  price: number
  city: string
}

interface AppStore {
  // Comparison
  compareList: CompareItem[]
  addToCompare: (property: CompareItem) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void

  // Recently viewed (stored locally)
  recentlyViewed: string[]
  addRecentlyViewed: (slug: string) => void

  // UI state
  isSearchOpen: boolean
  setSearchOpen: (open: boolean) => void

  // Wishlist (for unauthenticated users, synced on login)
  wishlist: string[]
  toggleWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      compareList: [],
      addToCompare: (property) => {
        const list = get().compareList
        if (list.length >= 3) return // max 3
        if (list.find((p) => p.id === property.id)) return
        set({ compareList: [...list, property] })
      },
      removeFromCompare: (id) =>
        set({ compareList: get().compareList.filter((p) => p.id !== id) }),
      clearCompare: () => set({ compareList: [] }),

      recentlyViewed: [],
      addRecentlyViewed: (slug) => {
        const current = get().recentlyViewed.filter((s) => s !== slug)
        set({ recentlyViewed: [slug, ...current].slice(0, 10) })
      },

      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      wishlist: [],
      toggleWishlist: (id) => {
        const list = get().wishlist
        set({
          wishlist: list.includes(id) ? list.filter((i) => i !== id) : [...list, id],
        })
      },
      isInWishlist: (id) => get().wishlist.includes(id),
    }),
    {
      name: '3s-real-estate-store',
      partialize: (state) => ({
        compareList: state.compareList,
        recentlyViewed: state.recentlyViewed,
        wishlist: state.wishlist,
      }),
    }
  )
)
