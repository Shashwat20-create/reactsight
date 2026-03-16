import React, { useEffect, useRef } from 'react';
import { useTracker } from '../../context/TrackerContext';
import { exportToJSON } from '../../utils/localStorage';

const REASON_COLORS = {
  'Props changed': '#fb923c',
  'State changed': '#a78bfa',
  'Parent re-rendered': '#38bdf8',
  'Initial render': '#34d399',
};

export function RenderLog() {
  const { renderLog, clearLog } = useTracker();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [renderLog.length]);

  const handleExport = () => {
    exportToJSON(renderLog, `reactsight-log-${Date.now()}.json`);
  };

  return (
    <div className="render-log">
      <div className="render-log-header">
        <div className="render-log-title">
          <span className="log-live-dot" />
          Render Log
          <span className="log-count">{renderLog.length}</span>
        </div>
        <div className="render-log-actions">
          <button className="log-btn log-btn-export" onClick={handleExport} disabled={!renderLog.length}>
            ↓ Export JSON
          </button>
          <button className="log-btn log-btn-clear" onClick={clearLog} disabled={!renderLog.length}>
            ✕ Clear
          </button>
        </div>
      </div>

      <div className="render-log-list">
        {renderLog.length === 0 && (
          <div className="log-empty">
            <span>No renders recorded yet.</span>
          </div>
        )}
        {renderLog.map((entry, i) => {
          const time = new Date(entry.timestamp).toLocaleTimeString('en', {
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
            fractionalSecondDigits: 2
          });
          const reasonColor = REASON_COLORS[entry.renderReason] || '#8899aa';

          return (
            <div key={entry.id} className="log-entry">
              <span className="log-entry-index">#{i + 1}</span>
              <span className="log-entry-time">{time}</span>
              <span className="log-entry-name">{entry.componentName}</span>
              <span className="log-entry-duration">{entry.renderTime}ms</span>
              <span className="log-entry-reason" style={{ color: reasonColor }}>
                {entry.renderReason}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
