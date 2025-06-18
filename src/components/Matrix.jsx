import React, { useState, useEffect } from 'react';
import styles from './Matrix.module.css';
import { matrix } from '../data/connections';

const Matrix = ({ isVisible, onRootChange, selectedRoot, isExpanded, setIsExpanded }) => {
  
  // Toggle expanded/collapsed state
  const toggleExpanded = (event) => {
    // Stop event propagation to prevent deselecting chords
    if (event) event.stopPropagation();
    setIsExpanded(prev => !prev);
  };
  // Matrix layout will be 4 rows x 3 columns
  // We'll reshape the flat array into a 2D array for easier rendering
  const matrixRows = [
    matrix.slice(0, 3),   // First row: 3 notes
    matrix.slice(3, 6),   // Second row: 3 notes
    matrix.slice(6, 9),   // Third row: 3 notes
    matrix.slice(9, 12)   // Fourth row: 3 notes
  ];

  // Handle note click
  const handleNoteClick = (event, note) => {
    // Stop event propagation to prevent triggering background click handler
    event.stopPropagation();
    
    if (onRootChange) {
      // Update the root note without affecting other components
      onRootChange(note);
      // No longer collapse after selecting a note - matrix stays open
    }
  };
  
  // Handle click on collapsed matrix
  const handleCollapsedClick = (event) => {
    event.stopPropagation();
    setIsExpanded(true);
  };
  
  // Ensure the component is properly synced with the RootSelector
  useEffect(() => {
    // This effect ensures that when the Matrix component appears,
    // it's already in sync with the current root note
    // No action needed as we're just using the selectedRoot prop
  }, [selectedRoot]);

  // If matrix is not expanded, don't render anything
  // The RootSelector will now handle the collapsed state
  if (!isExpanded) {
    return null;
  }

  // Render expanded version
  return (
    <div className={styles['matrix-container']}>
      <div className={styles['matrix-header']}>
        <span>Select Root</span>
        <button 
          className={styles['matrix-collapse-btn']} 
          onClick={(event) => toggleExpanded(event)}
          title="Collapse matrix"
        >
          −
        </button>
      </div>
      <div className={styles['matrix-grid']} onClick={(e) => e.stopPropagation()}>
        {matrixRows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles['matrix-row']}>
            {row.map((note, colIndex) => (
              <div 
                key={`note-${rowIndex}-${colIndex}`} 
                className={`${styles['matrix-cell']} ${note === selectedRoot ? styles.selected : ''}`}
                onClick={(event) => handleNoteClick(event, note)}
              >
                {note}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matrix;
