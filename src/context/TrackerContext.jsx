import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/localStorage';

const TrackerContext = createContext(null);

const DEFAULT_SETTINGS = {
  warningThreshold: 10,
  slowRenderThreshold: 16,
  maxLogEntries: 50,
  autoClearOnRefresh: false,
};

export function TrackerProvider({ children }) {
  const [components, setComponents] = useState({});
  const [renderLog, setRenderLog] = useState(() => {
    const saved = loadFromStorage('reactsight_log');
    return saved || [];
  });
  const [settings, setSettings] = useState(() => {
    const saved = loadFromStorage('reactsight_settings');
    return saved ? { ...DEFAULT_SETTINGS, ...saved } : DEFAULT_SETTINGS;
  });

  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    saveToStorage('reactsight_settings', settings);
  }, [settings]);

  useEffect(() => {
    saveToStorage('reactsight_log', renderLog.slice(-settingsRef.current.maxLogEntries));
  }, [renderLog]);

  useEffect(() => {
    if (settings.autoClearOnRefresh) {
      clearLog();
      setComponents({});
    }
  }, []);

  const trackRender = useCallback((componentName, renderTime, renderReason) => {
    const now = Date.now();
    const timestamp = new Date(now).toISOString();

    setComponents(prev => {
      const existing = prev[componentName];
      const renderCount = (existing?.renderCount || 0) + 1;
      const totalTime = (existing?.totalTime || 0) + renderTime;
      const avgTime = totalTime / renderCount;

      return {
        ...prev,
        [componentName]: {
          name: componentName,
          renderCount,
          totalTime,
          avgRenderTime: parseFloat(avgTime.toFixed(3)),
          lastRenderTime: parseFloat(renderTime.toFixed(3)),
          lastRenderedAt: timestamp,
          renderReason,
          isWarning: renderCount > settingsRef.current.warningThreshold,
          isSlow: renderTime > settingsRef.current.slowRenderThreshold,
          renderHistory: [
            ...(existing?.renderHistory || []).slice(-49),
            { time: renderTime, timestamp }
          ]
        }
      };
    });

    setRenderLog(prev => {
      const entry = {
        id: `${componentName}-${now}-${Math.random()}`,
        timestamp,
        componentName,
        renderTime: parseFloat(renderTime.toFixed(3)),
        renderReason,
      };
      const updated = [...prev, entry];
      return updated.slice(-settingsRef.current.maxLogEntries);
    });
  }, []);

  const clearLog = useCallback(() => {
    setRenderLog([]);
    saveToStorage('reactsight_log', []);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const resetComponents = useCallback(() => {
    setComponents({});
    clearLog();
  }, [clearLog]);

  const value = {
    components,
    renderLog,
    settings,
    trackRender,
    clearLog,
    updateSettings,
    resetComponents,
  };

  return (
    <TrackerContext.Provider value={value}>
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error('useTracker must be used within TrackerProvider');
  return ctx;
}
