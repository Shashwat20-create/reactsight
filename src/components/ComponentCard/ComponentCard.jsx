import React from 'react';

export function ComponentCard({ component, isSelected, onClick, settings }) {
  const { name, renderCount, avgRenderTime, lastRenderTime, lastRenderedAt, renderReason, isWarning, isSlow } = component;

  const formattedTime = lastRenderedAt
    ? new Date(lastRenderedAt).toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '—';

  const renderPercent = Math.min((renderCount / (settings?.warningThreshold * 2 || 20)) * 100, 100);

  return (
    <div
      className={`comp-card ${isSelected ? 'comp-card-selected' : ''} ${isWarning ? 'comp-card-warn' : ''}`}
      onClick={onClick}
    >
      <div className="comp-card-top">
        <div className="comp-card-name">
          {isWarning && <span className="comp-card-warn-icon">⚠</span>}
          {isSlow && !isWarning && <span className="comp-card-slow-icon">🐢</span>}
          <span>{name}</span>
        </div>
        <div className={`comp-card-badge ${isWarning ? 'badge-warn' : 'badge-normal'}`}>
          {renderCount}
        </div>
      </div>

      <div className="comp-card-progress">
        <div
          className={`comp-card-progress-fill ${isWarning ? 'fill-warn' : 'fill-normal'}`}
          style={{ width: `${renderPercent}%` }}
        />
      </div>

      <div className="comp-card-meta">
        <div className="comp-card-meta-item">
          <span className="meta-label">Avg</span>
          <span className={`meta-value ${isSlow ? 'meta-slow' : ''}`}>{avgRenderTime}ms</span>
        </div>
        <div className="comp-card-meta-item">
          <span className="meta-label">Last</span>
          <span className="meta-value">{lastRenderTime}ms</span>
        </div>
        <div className="comp-card-meta-item">
          <span className="meta-label">Reason</span>
          <span className="meta-value meta-reason">{renderReason}</span>
        </div>
      </div>

      <div className="comp-card-time">
        <span className="meta-label">⏱</span>
        <span className="meta-value">{formattedTime}</span>
      </div>
    </div>
  );
}

export function ComponentDetail({ component }) {
  if (!component) return (
    <div className="comp-detail-empty">
      <div className="comp-detail-empty-icon">👆</div>
      <div>Select a component to inspect</div>
    </div>
  );

  const { name, renderCount, avgRenderTime, lastRenderTime, lastRenderedAt, renderReason, isWarning, isSlow, totalTime } = component;

  return (
    <div className="comp-detail">
      <div className="comp-detail-header">
        <div className="comp-detail-name">{name}</div>
        <div className="comp-detail-badges">
          {isWarning && <span className="detail-badge detail-badge-warn">⚠ High renders</span>}
          {isSlow && <span className="detail-badge detail-badge-slow">🐢 Slow</span>}
        </div>
      </div>

      <div className="comp-detail-grid">
        <div className="detail-stat-box">
          <div className="detail-stat-value">{renderCount}</div>
          <div className="detail-stat-label">Total Renders</div>
        </div>
        <div className="detail-stat-box">
          <div className="detail-stat-value">{avgRenderTime}ms</div>
          <div className="detail-stat-label">Avg Time</div>
        </div>
        <div className="detail-stat-box">
          <div className="detail-stat-value">{lastRenderTime}ms</div>
          <div className="detail-stat-label">Last Time</div>
        </div>
        <div className="detail-stat-box">
          <div className="detail-stat-value">{parseFloat((totalTime || 0).toFixed(1))}ms</div>
          <div className="detail-stat-label">Total Time</div>
        </div>
      </div>

      <div className="comp-detail-reason">
        <span className="meta-label">Last Render Reason:</span>
        <span className="detail-reason-val">{renderReason}</span>
      </div>

      <div className="comp-detail-reason">
        <span className="meta-label">Last Rendered:</span>
        <span className="detail-reason-val">
          {lastRenderedAt ? new Date(lastRenderedAt).toLocaleTimeString() : '—'}
        </span>
      </div>
    </div>
  );
}
