import React, { useState, useRef, useEffect } from 'react';

const RootSelector = ({ options = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'], onRootChange, selectedRoot, onToggleMatrix, matrixExpanded }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const selectorRef = useRef(null);
  
  // Function to change the note
  const changeNote = (direction) => {
    if (isChanging) return; // Prevent changes during transition
    
    setIsChanging(true);
    
    // Change the note
    setSelectedIndex(prevIndex => {
      const newIndex = (prevIndex + direction + options.length) % options.length;
      // Notify parent component about the root change
      if (onRootChange) {
        onRootChange(options[newIndex]);
      }
      return newIndex;
    });
    
    // Reset after transition completes
    setTimeout(() => {
      setIsChanging(false);
    }, 600);
  };
  
  // Handle click on the selector to toggle matrix
  const handleSelectorClick = (e) => {
    // Stop event propagation to prevent deselecting chords
    e.stopPropagation();
    
    if (!isChanging && onToggleMatrix) {
      onToggleMatrix();
    }
  };
  
  // Handle click on left arrow
  const handleLeftArrowClick = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the selector
    changeNote(-1);
  };
  
  // Handle click on right arrow
  const handleRightArrowClick = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the selector
    changeNote(1);
  };
  
  // Initialize root note on component mount
  useEffect(() => {
    if (onRootChange) {
      onRootChange(options[selectedIndex]);
    }
  }, []);
  
  // Update selectedIndex when selectedRoot prop changes externally
  useEffect(() => {
    if (selectedRoot) {
      const newIndex = options.indexOf(selectedRoot);
      if (newIndex !== -1 && newIndex !== selectedIndex) {
        setSelectedIndex(newIndex);
      }
    }
  }, [selectedRoot, options]);
  
  return (
    <div className="root-selector-container">
      <div className="root-selector-arrow left-arrow" onClick={handleLeftArrowClick}>
        &#9664;
      </div>
      <div 
        className={`root-selector ${isChanging ? 'changing' : ''} ${matrixExpanded ? 'matrix-active' : ''}`} 
        ref={selectorRef}
        onClick={(e) => handleSelectorClick(e)}
      >
        <div className="root-selector-value">
          {options[selectedIndex]}
        </div>
      </div>
      <div className="root-selector-arrow right-arrow" onClick={handleRightArrowClick}>
        &#9654;
      </div>
      {/* Tooltip removed */}
    </div>
  );
};

export default RootSelector;
