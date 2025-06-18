import React from 'react'
import { connections2 } from '../data/connections';

// Chord component: renders a chord with optional selection and possible-chord animation
const Chord = ({ svg, className, handleChordSelect, selectedChords, possibleChords = [], onChordHover, displayOrderSwapped = false }) => {
  const isSelected = selectedChords.includes(className);
  
  // Determine if this chord is the first or second selected based on displayOrderSwapped
  const isFirstSelected = selectedChords.length > 0 && 
    (displayOrderSwapped ? 
      (selectedChords.length > 1 && selectedChords[1] === className) : 
      (selectedChords[0] === className));
  
  const isSecondSelected = selectedChords.length > 1 && 
    (displayOrderSwapped ? 
      (selectedChords[0] === className) : 
      (selectedChords[1] === className));
  
  const isDittoScale = selectedChords.length === 2 && selectedChords[0] === className && selectedChords[1] === className;
  console.log(`Chord ${className} - isDittoScale:`, isDittoScale, 'selectedChords:', selectedChords);
  const isPossible = possibleChords.includes(className);
  
  // Determine if this chord is connected to the first selected chord
  const isConnectedToFirstSelected = selectedChords.length === 1 && !isFirstSelected && 
    connections2.some(conn => conn.chords.includes(selectedChords[0]) && conn.chords.includes(className));
  
console.log("svg",svg, className)
  const handleClick = (e) => {
    // Prevent the default behavior
    e.preventDefault();
    
    // Log which chord was clicked
    console.log(`Clicked on chord: ${className}`);
    
    // Call the handler with the className
    handleChordSelect(className);
  };
  
  // Handle mouse enter event to show chord info in the Inspector
  const handleMouseEnter = () => {
    if (onChordHover) {
      onChordHover(className);
    }
  };

  // Handle mouse leave event to hide chord info in the Inspector
  const handleMouseLeave = () => {
    if (onChordHover) {
      onChordHover(null);
    }
  };

  return (
    <div
      className={`element ${className}${isSelected ? ' selected-chord' : ''}${isFirstSelected ? ' first-selected-chord' : ''}${isSecondSelected ? ' second-selected-chord' : ''}${isDittoScale ? ' dittoScale' : ''}${isConnectedToFirstSelected ? ' connected-chord' : ''}${isPossible ? ' possible-chord' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className="svg" src={svg} alt="" />
    </div>
  );
}

export default Chord