import React from 'react';

// This component will wrap the existing app content
const HomePage = ({ children }) => {
  return (
    <div className="home-page">
      {/* Render the existing app content */}
      {children}
    </div>
  );
};

export default HomePage;
