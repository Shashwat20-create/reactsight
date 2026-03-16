import React, { useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';

export function StatsBar() {
  const { components, settings } = useTracker();

  const stats = useMemo(() => {
    const list = Object.values(components);
    if (!list.length) return null;

    const totalRenders = list.reduce((s, c) => s + c.renderCount, 0);
    const slowest = list.reduce((a, b) => a.avgRenderTime > b.avgRenderTime ? a : b, list[0]);
    const mostRendered = list.reduce((a, b) => a.renderCount > b.renderCount ? a : b, list[0]);
    const warningCount = list.filter(c => c.renderCount > settings.warningThreshold).length;

    return {
      total: list.length,
      totalRenders,
      slowest,
      mostRendered,
      warningCount,
    };
  }, [components, settings]);

  if (!stats) {
    return (
      <div className="stats-bar stats-bar-empty">
        <span className="stats-bar-empty-text">⚡ No components tracked yet — run the Demo App below</span>
      </div>
    );
  }

  return (
    <div className="stats-bar">
      <div className="stat-pill">
        <span className="stat-pill-icon">🧩</span>
        <div>
          <div className="stat-pill-value">{stats.total}</div>
          <div className="stat-pill-label">Components</div>
        </div>
      </div>
      <div className="stat-pill-divider" />
      <div className="stat-pill">
        <span className="stat-pill-icon">🔁</span>
        <div>
          <div className="stat-pill-value">{stats.totalRenders}</div>
          <div className="stat-pill-label">Total Renders</div>
        </div>
      </div>
      <div className="stat-pill-divider" />
      <div className="stat-pill">
        <span className="stat-pill-icon">🐢</span>
        <div>
          <div className="stat-pill-value stat-pill-name">{stats.slowest.name}</div>
          <div className="stat-pill-label">{stats.slowest.avgRenderTime}ms avg</div>
        </div>
      </div>
      <div className="stat-pill-divider" />
      <div className="stat-pill">
        <span className="stat-pill-icon">🏆</span>
        <div>
          <div className="stat-pill-value stat-pill-name">{stats.mostRendered.name}</div>
          <div className="stat-pill-label">{stats.mostRendered.renderCount} renders</div>
        </div>
      </div>
      <div className="stat-pill-divider" />
      <div className={`stat-pill ${stats.warningCount > 0 ? 'stat-pill-warn' : ''}`}>
        <span className="stat-pill-icon">⚠️</span>
        <div>
          <div className="stat-pill-value">{stats.warningCount}</div>
          <div className="stat-pill-label">Warnings</div>
        </div>
      </div>
    </div>
  );
}
