import { create } from 'zustand';

export interface IFilter {
  name: string;
  title: string;
}

interface FiltersState {
  filterList: IFilter[];
  activeFilter?: string;
  setActiveFilter: (filter?: string) => void;
  clearFilter: () => void;
  toggleFilter: (filter: string) => void;
}

const filterList: IFilter[] = [
  { title: 'business', name: 'business' },
  { title: 'entertainment', name: 'entertainment' },
  { title: 'general', name: 'general' },
  { title: 'health', name: 'health' },
  { title: 'science', name: 'science' },
  { title: 'sports', name: 'sports' },
  { title: 'technology', name: 'technology' },
];

export const useFiltersStore = create<FiltersState>((set, get) => ({
  filterList,
  activeFilter: undefined,
  setActiveFilter: filter => set({ activeFilter: filter }),
  clearFilter: () => set({ activeFilter: undefined }),
  toggleFilter: filter => {
    const { activeFilter } = get();
    if (activeFilter === filter) {
      set({ activeFilter: undefined });
    } else {
      set({ activeFilter: filter });
    }
  },
}));
