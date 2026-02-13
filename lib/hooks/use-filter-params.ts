'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useFilterStore } from '@/lib/stores/filter-store';

export function useFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const store = useFilterStore();
  const isInitialized = useRef(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Track when component has mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Sync URL to store on mount (only once)
  useEffect(() => {
    if (!hasMounted || isInitialized.current) return;
    isInitialized.current = true;

    try {
      const search = searchParams?.get('search') ?? '';
      const tech = searchParams?.get('tech')?.split(',').filter(Boolean) ?? [];
      const categories = searchParams?.get('category')?.split(',').filter(Boolean) ?? [];

      if (search) store.setSearchQuery(search);
      tech.forEach((t) => {
        if (!store.selectedTechnologies.includes(t)) {
          store.toggleTechnology(t);
        }
      });
      categories.forEach((c) => {
        if (!store.selectedCategories.includes(c)) {
          store.toggleCategory(c);
        }
      });
    } catch (error) {
      console.error('[useFilterParams] Error parsing URL params:', error);
    }
  }, [hasMounted, searchParams, store]); // Only on mount with searchParams

  // Sync store to URL on changes (debounced)
  useEffect(() => {
    if (!hasMounted || !isInitialized.current) return;

    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (store.searchQuery) {
        params.set('search', store.searchQuery);
      }

      if (store.selectedTechnologies.length > 0) {
        params.set('tech', store.selectedTechnologies.join(','));
      }

      if (store.selectedCategories.length > 0) {
        params.set('category', store.selectedCategories.join(','));
      }

      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;

      router.replace(newUrl, { scroll: false });
    }, 300); // Debounce to avoid too many URL updates

    return () => clearTimeout(timeout);
  }, [
    hasMounted,
    store.searchQuery,
    store.selectedTechnologies,
    store.selectedCategories,
    router,
    pathname,
  ]);
}
