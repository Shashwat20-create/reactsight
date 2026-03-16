import React from 'react';

export function SearchFilter({
  searchQuery, setSearchQuery,
  filter, setFilter,
  sortBy, setSortBy,
}) {
  return (
    <div className="search-filter">
      <div className="search-input-wrap">
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
        )}
      </div>

      <div className="filter-group">
        <span className="filter-label">Filter:</span>
        {[
          { value: 'all', label: 'All' },
          { value: 'warnings', label: '⚠ Warnings' },
          { value: 'slow', label: '🐢 Slow' },
        ].map(opt => (
          <button
            key={opt.value}
            className={`filter-btn ${filter === opt.value ? 'filter-btn-active' : ''}`}
            onClick={() => setFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="sort-group">
        <span className="filter-label">Sort:</span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="renders">Most renders</option>
          <option value="slowest">Slowest avg</option>
          <option value="recent">Most recent</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  );
}
