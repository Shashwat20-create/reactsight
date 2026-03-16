import React from 'react';
import { useTracker } from '../../context/TrackerContext';

export function Settings({ onClose }) {
  const { settings, updateSettings, resetComponents } = useTracker();

  const handleChange = (key, value) => {
    updateSettings({ [key]: value });
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <div className="settings-title">⚙ Settings</div>
        {onClose && (
          <button className="settings-close" onClick={onClose}>✕</button>
        )}
      </div>

      <div className="settings-body">
        <div className="settings-group">
          <label className="settings-label">
            Warning Threshold (renders)
            <span className="settings-hint">Components exceeding this count show a warning</span>
          </label>
          <div className="settings-input-row">
            <input
              type="range"
              min="1" max="50"
              value={settings.warningThreshold}
              onChange={e => handleChange('warningThreshold', parseInt(e.target.value))}
              className="settings-range"
            />
            <span className="settings-range-val">{settings.warningThreshold}</span>
          </div>
        </div>

        <div className="settings-group">
          <label className="settings-label">
            Slow Render Threshold (ms)
            <span className="settings-hint">Renders above this are flagged as slow</span>
          </label>
          <div className="settings-input-row">
            <input
              type="range"
              min="1" max="100"
              value={settings.slowRenderThreshold}
              onChange={e => handleChange('slowRenderThreshold', parseInt(e.target.value))}
              className="settings-range"
            />
            <span className="settings-range-val">{settings.slowRenderThreshold}ms</span>
          </div>
        </div>

        <div className="settings-group">
          <label className="settings-label">
            Max Log Entries
            <span className="settings-hint">Older entries are removed when limit is reached</span>
          </label>
          <div className="settings-input-row">
            <input
              type="range"
              min="10" max="200" step="10"
              value={settings.maxLogEntries}
              onChange={e => handleChange('maxLogEntries', parseInt(e.target.value))}
              className="settings-range"
            />
            <span className="settings-range-val">{settings.maxLogEntries}</span>
          </div>
        </div>

        <div className="settings-group">
          <label className="settings-label">
            Auto-clear on Refresh
            <span className="settings-hint">Clears all data when the page reloads</span>
          </label>
          <div className="settings-toggle-row">
            <button
              className={`settings-toggle ${settings.autoClearOnRefresh ? 'toggle-on' : 'toggle-off'}`}
              onClick={() => handleChange('autoClearOnRefresh', !settings.autoClearOnRefresh)}
            >
              <span className="toggle-knob" />
            </button>
            <span className="toggle-label">
              {settings.autoClearOnRefresh ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        <div className="settings-danger">
          <div className="settings-danger-title">Danger Zone</div>
          <button className="settings-reset-btn" onClick={resetComponents}>
            🗑 Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
}
