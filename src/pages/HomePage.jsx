import React from 'react';
import { Link } from 'react-router-dom';

// This component will wrap the existing app content
const HomePage = ({ children }) => {
  return (
    <div className="home-page">
      {/* Navigation link to the fretboard page */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px', 
        zIndex: 1000 
      }}>
        <Link to="/fretboard" style={{ 
          color: 'white', 
          textDecoration: 'none',
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '8px 15px',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}>
          Go to Fretboard
        </Link>
      </div>
      
      {/* Render the existing app content */}
      {children}
    </div>
  );
};

export default HomePage;
