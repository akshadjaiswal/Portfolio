import { create } from 'zustand';
import type { Project } from '@/lib/types';

interface FilterStore {
  searchQuery: string;
  selectedTechnologies: string[];
  selectedCategories: string[];

  setSearchQuery: (query: string) => void;
  toggleTechnology: (tech: string) => void;
  toggleCategory: (category: string) => void;
  clearFilters: () => void;

  // Derived state
  filterProjects: (projects: Project[]) => Project[];
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  searchQuery: '',
  selectedTechnologies: [],
  selectedCategories: [],

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleTechnology: (tech) => {
    console.log('[FilterStore] Toggle technology:', tech);
    set((state) => {
      const newTechnologies = state.selectedTechnologies.includes(tech)
        ? state.selectedTechnologies.filter((t) => t !== tech)
        : [...state.selectedTechnologies, tech];
      console.log('[FilterStore] New technologies:', newTechnologies);
      return { selectedTechnologies: newTechnologies };
    });
  },

  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  clearFilters: () =>
    set({
      searchQuery: '',
      selectedTechnologies: [],
      selectedCategories: [],
    }),

  filterProjects: (projects) => {
    const { searchQuery, selectedTechnologies, selectedCategories } = get();

    return projects.filter((project) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Technology filter (AND logic - project must have ALL selected technologies)
      const matchesTech =
        selectedTechnologies.length === 0 ||
        selectedTechnologies.every((tech) => project.technologies.includes(tech));

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(project.category);

      return matchesSearch && matchesTech && matchesCategory;
    });
  },
}));
