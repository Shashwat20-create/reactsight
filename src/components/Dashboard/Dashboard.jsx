import React, { useState } from 'react';
import { StatsBar } from './StatsBar';
import { ComponentCard, ComponentDetail } from '../ComponentCard/ComponentCard';
import { RenderBarChart } from '../Charts/RenderBarChart';
import { RenderLineChart } from '../Charts/RenderLineChart';
import { RenderLog } from '../RenderLog/RenderLog';
import { SearchFilter } from '../Filters/SearchFilter';
import { Settings } from '../Settings/Settings';
import { DemoApp } from '../../demo/DemoApp';
import { useTracker } from '../../context/TrackerContext';
import { useFilteredComponents } from '../../hooks/useFilteredComponents';

const TABS = ['Dashboard', 'Charts', 'Log', 'Demo', 'Settings'];

export function Dashboard() {
  const { components, settings } = useTracker();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const filterState = useFilteredComponents();

  const selectedData = selectedComponent ? components[selectedComponent] : null;

  return (
    <div className="app-root">
      {/* Header */}
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">React<span className="logo-accent">Sight</span></span>
          </div>
          <div className="app-tagline">Performance Analyzer</div>
        </div>
        <nav className="app-nav">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`nav-tab ${activeTab === tab ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Dashboard' && '⬡ '}
              {tab === 'Charts' && '📊 '}
              {tab === 'Log' && '📋 '}
              {tab === 'Demo' && '🎮 '}
              {tab === 'Settings' && '⚙ '}
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <StatsBar />

      <main className="app-main">
        {activeTab === 'Dashboard' && (
          <div className="dashboard-layout">
            {/* Left Panel */}
            <div className="panel panel-left">
              <div className="panel-header">
                <span className="panel-title">Components</span>
                <span className="panel-count">{filterState.filtered.length}</span>
              </div>
              <SearchFilter {...filterState} />
              <div className="component-list">
                {filterState.filtered.length === 0 && (
                  <div className="list-empty">
                    {Object.keys(components).length === 0
                      ? 'No components tracked yet. Go to Demo tab!'
                      : 'No components match filters'}
                  </div>
                )}
                {filterState.filtered.map(comp => (
                  <ComponentCard
                    key={comp.name}
                    component={comp}
                    isSelected={selectedComponent === comp.name}
                    onClick={() => setSelectedComponent(comp.name === selectedComponent ? null : comp.name)}
                    settings={settings}
                  />
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="panel panel-right">
              <ComponentDetail component={selectedData} />
            </div>
          </div>
        )}

        {activeTab === 'Charts' && (
          <div className="charts-layout">
            <RenderBarChart components={components} warningThreshold={settings.warningThreshold} />
            <RenderLineChart components={components} />
          </div>
        )}

        {activeTab === 'Log' && (
          <RenderLog />
        )}

        {activeTab === 'Demo' && (
          <DemoApp />
        )}

        {activeTab === 'Settings' && (
          <Settings />
        )}
      </main>
    </div>
  );
}
