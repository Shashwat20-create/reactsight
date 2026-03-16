import React from 'react';
import { TrackerProvider } from './context/TrackerContext';
import { Dashboard } from './components/Dashboard/Dashboard';
import './index.css';

function App() {
  return (
    <TrackerProvider>
      <Dashboard />
    </TrackerProvider>
  );
}

export default App;
