import React, { useState } from 'react';

export function Header({ title, user }) {
  return (
    <div className="demo-header">
      <div className="demo-header-brand">
        <span className="demo-logo">⬡</span>
        <span>{title || 'ReactSight Demo'}</span>
      </div>
      <div className="demo-header-user">
        <span className="demo-avatar">{user?.[0] || 'U'}</span>
        <span>{user || 'Developer'}</span>
      </div>
    </div>
  );
}

export function UserProfile({ name, role, avatar, stats }) {
  return (
    <div className="demo-profile">
      <div className="demo-profile-avatar">{avatar || name?.[0] || 'U'}</div>
      <div className="demo-profile-info">
        <div className="demo-profile-name">{name || 'John Dev'}</div>
        <div className="demo-profile-role">{role || 'Senior Engineer'}</div>
      </div>
      <div className="demo-profile-stats">
        <div className="demo-stat">
          <span className="demo-stat-val">{stats?.commits || 142}</span>
          <span className="demo-stat-label">Commits</span>
        </div>
        <div className="demo-stat">
          <span className="demo-stat-val">{stats?.prs || 38}</span>
          <span className="demo-stat-label">PRs</span>
        </div>
      </div>
    </div>
  );
}

export function NewsFeed({ items, loading }) {
  const feedItems = items || [
    { id: 1, title: 'Component re-render detected', time: '2s ago', type: 'warn' },
    { id: 2, title: 'Performance budget exceeded', time: '5s ago', type: 'error' },
    { id: 3, title: 'New component mounted', time: '12s ago', type: 'info' },
    { id: 4, title: 'State update triggered', time: '20s ago', type: 'info' },
  ];

  return (
    <div className="demo-feed">
      <div className="demo-feed-header">
        <span>Activity Feed</span>
        {loading && <span className="demo-loading-dot" />}
      </div>
      <div className="demo-feed-list">
        {feedItems.map(item => (
          <div key={item.id} className={`demo-feed-item demo-feed-${item.type}`}>
            <span className="demo-feed-dot" />
            <div>
              <div className="demo-feed-title">{item.title}</div>
              <div className="demo-feed-time">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sidebar({ activeItem, items }) {
  const navItems = items || ['Dashboard', 'Analytics', 'Settings', 'Logs', 'Help'];
  return (
    <div className="demo-sidebar">
      <div className="demo-sidebar-label">Navigation</div>
      {navItems.map(item => (
        <div key={item} className={`demo-sidebar-item ${activeItem === item ? 'active' : ''}`}>
          <span className="demo-sidebar-dot" />
          {item}
        </div>
      ))}
    </div>
  );
}

export function MetricsWidget({ data, label }) {
  const value = data?.value ?? Math.floor(Math.random() * 100);
  const change = data?.change ?? 12;
  return (
    <div className="demo-metric">
      <div className="demo-metric-label">{label || 'Performance Score'}</div>
      <div className="demo-metric-value">{value}</div>
      <div className={`demo-metric-change ${change >= 0 ? 'pos' : 'neg'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
      </div>
    </div>
  );
}
