import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * GrammarHubLayout - Main layout component for the Grammar Hub section
 */
const GrammarHubLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Area - Outlet renders all child pages here */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default GrammarHubLayout;
