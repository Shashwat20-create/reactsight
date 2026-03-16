import { useMemo, useState, useCallback, useRef } from 'react';
import { useTracker } from '../context/TrackerContext';

export function useFilteredComponents() {
  const { components, settings } = useTracker();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('renders');
  const debounceRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const handleSearch = useCallback((val) => {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(val);
    }, 300);
  }, []);

  const filtered = useMemo(() => {
    let list = Object.values(components);

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q));
    }

    if (filter === 'warnings') {
      list = list.filter(c => c.renderCount > settings.warningThreshold);
    } else if (filter === 'slow') {
      list = list.filter(c => c.lastRenderTime > settings.slowRenderThreshold);
    }

    switch (sortBy) {
      case 'renders':
        list = [...list].sort((a, b) => b.renderCount - a.renderCount);
        break;
      case 'slowest':
        list = [...list].sort((a, b) => b.avgRenderTime - a.avgRenderTime);
        break;
      case 'recent':
        list = [...list].sort((a, b) => new Date(b.lastRenderedAt) - new Date(a.lastRenderedAt));
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [components, debouncedSearch, filter, sortBy, settings]);

  return {
    filtered,
    searchQuery,
    setSearchQuery: handleSearch,
    filter,
    setFilter,
    sortBy,
    setSortBy,
  };
}
