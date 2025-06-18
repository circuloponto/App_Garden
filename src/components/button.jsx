import React, { useState, useEffect } from 'react';

const Button = ({ title, stateOptions = [], setViewMode, icon: Icon, activeState }) => {
  // Initialize internal state from props, but only on first render
  const [activeIndex, setActiveIndex] = useState(activeState !== undefined ? activeState : 0);

  // Update internal state when prop changes
  useEffect(() => {
    if (activeState !== undefined) {
      setActiveIndex(activeState);
    }
  }, [activeState]);

  const toggleState = () => {
    // When toggling, always call the parent's callback function
    // This ensures the parent component updates its state
    if (setViewMode) {
      setViewMode();
    }
    
    // Only update local state if not controlled by parent
    if (activeState === undefined) {
      const newIndex = activeIndex === 0 ? 1 : 0;
      setActiveIndex(newIndex);
    }
    // Otherwise, the useEffect above will update our local state
    // when the parent updates the activeState prop
  };

  const currentState = stateOptions[activeIndex] || '';

  return (
    <div className="button-container">
      <div className="button" onClick={toggleState}>
        {Icon && <Icon className="button-icon" />}
      </div>
      <div className="button-text">
        {title}
        {currentState !== '' ? (
          <>
            : <span className={currentState.toLowerCase()}>{currentState}</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Button;