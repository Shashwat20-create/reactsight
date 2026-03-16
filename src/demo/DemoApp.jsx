import React, { useState, useCallback } from "react";
import { withTracker } from "../hoc/withTracker";
import {
  Header,
  UserProfile,
  NewsFeed,
  Sidebar,
  MetricsWidget,
} from "./DemoComponents";

const TrackedHeader = withTracker(Header, "Header");
const TrackedUserProfile = withTracker(UserProfile, "UserProfile");
const TrackedNewsFeed = withTracker(NewsFeed, "NewsFeed");
const TrackedSidebar = withTracker(Sidebar, "Sidebar");
const TrackedMetrics = withTracker(MetricsWidget, "MetricsWidget");

export function DemoApp() {
  const [headerUser, setHeaderUser] = useState("Shashwat Sahay");
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedCount, setFeedCount] = useState(4);
  const [sidebarActive, setSidebarActive] = useState("Dashboard");
  const [metricsData, setMetricsData] = useState({ value: 87, change: 12 });
  const [profileStats, setProfileStats] = useState({ commits: 142, prs: 38 });
  const [globalTick, setGlobalTick] = useState(0);

  const triggerHeaderRender = useCallback(() => {
    setHeaderUser((prev) =>
      prev === "Shashwat Sahay" ? "Hey, This is Me" : "Shashwat Sahay",
    );
  }, []);

  const triggerFeedStorm = useCallback(() => {
    setFeedLoading(true);
    let count = 0;
    const interval = setInterval(() => {
      setFeedCount((c) => c + 1);
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setFeedLoading(false);
      }
    }, 80);
  }, []);

  const triggerMetricsUpdate = useCallback(() => {
    const val = Math.floor(Math.random() * 100);
    const change = Math.round(Math.random() * 40 - 10);
    setMetricsData({ value: val, change });
  }, []);

  const triggerProfileUpdate = useCallback(() => {
    setProfileStats((prev) => ({
      commits: prev.commits + Math.floor(Math.random() * 5),
      prs: prev.prs + (Math.random() > 0.7 ? 1 : 0),
    }));
  }, []);

  const triggerSidebarChange = useCallback(() => {
    const items = ["Dashboard", "Analytics", "Settings", "Logs", "Help"];
    const next = items[Math.floor(Math.random() * items.length)];
    setSidebarActive(next);
  }, []);

  const triggerGlobalRerender = useCallback(() => {
    setGlobalTick((t) => t + 1);
  }, []);

  const triggerMassStress = useCallback(() => {
    let i = 0;
    const interval = setInterval(() => {
      setGlobalTick((t) => t + 1);
      setFeedCount((c) => c + 1);
      setMetricsData({
        value: Math.floor(Math.random() * 100),
        change: Math.round(Math.random() * 20 - 5),
      });
      i++;
      if (i >= 15) clearInterval(interval);
    }, 60);
  }, []);

  const feedItems = Array.from({ length: Math.min(feedCount, 12) }, (_, i) => ({
    id: i,
    title: [
      "Re-render detected in NewsFeed",
      "Props changed in UserProfile",
      "State update triggered",
      "Parent re-render cascade",
      "Performance budget exceeded",
      "Memoization cache miss",
    ][i % 6],
    time: `${i * 2 + 1}s ago`,
    type: ["info", "warn", "error", "info"][i % 4],
  }));

  return (
    <div className="demo-app">
      <div className="demo-app-header-row">
        <TrackedHeader
          title="ReactSight Demo"
          user={headerUser}
          key={`header-${globalTick}`}
        />
      </div>

      <div className="demo-app-body">
        <div className="demo-app-sidebar-col">
          <TrackedSidebar activeItem={sidebarActive} />
          <TrackedUserProfile
            name={headerUser}
            role="Senior Engineer"
            stats={profileStats}
          />
        </div>

        <div className="demo-app-main">
          <div className="demo-metrics-row">
            <TrackedMetrics data={metricsData} label="Perf Score" />
            <TrackedMetrics
              data={{ value: feedCount * 3, change: feedCount - 4 }}
              label="Renders/s"
            />
            <TrackedMetrics
              data={{ value: Math.round(metricsData.value * 0.7), change: -3 }}
              label="Cache Hits"
            />
          </div>
          <TrackedNewsFeed items={feedItems} loading={feedLoading} />
        </div>
      </div>

      <div className="demo-controls">
        <div className="demo-controls-title">🎛 Trigger Re-renders</div>
        <div className="demo-controls-grid">
          <button
            className="demo-btn demo-btn-blue"
            onClick={triggerHeaderRender}
          >
            <span>Header</span>
            <small>Toggle user name</small>
          </button>
          <button
            className="demo-btn demo-btn-orange"
            onClick={triggerFeedStorm}
          >
            <span>Feed Storm</span>
            <small>+8 items rapidly</small>
          </button>
          <button
            className="demo-btn demo-btn-purple"
            onClick={triggerMetricsUpdate}
          >
            <span>Metrics</span>
            <small>Random values</small>
          </button>
          <button
            className="demo-btn demo-btn-teal"
            onClick={triggerProfileUpdate}
          >
            <span>Profile</span>
            <small>Update stats</small>
          </button>
          <button
            className="demo-btn demo-btn-indigo"
            onClick={triggerSidebarChange}
          >
            <span>Sidebar</span>
            <small>Change active nav</small>
          </button>
          <button
            className="demo-btn demo-btn-green"
            onClick={triggerGlobalRerender}
          >
            <span>Global</span>
            <small>All components</small>
          </button>
          <button className="demo-btn demo-btn-red" onClick={triggerMassStress}>
            <span>🔥 Stress Test</span>
            <small>15x rapid renders</small>
          </button>
        </div>
      </div>
    </div>
  );
}
