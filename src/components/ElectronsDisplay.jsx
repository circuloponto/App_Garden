import React, { useState, useEffect } from 'react';
import SvgComponent from './SvgComponent';
import styles from './ElectronsDisplay.module.css';
// Import SVG files directly
import electronOneToThree from '../assets/SVGs/list/electron_oneToThree.svg';
import electronThreeToFive1 from '../assets/SVGs/list/electron_threeToFive1.svg';
import electronThreeToFive2 from '../assets/SVGs/list/electron_threeToFive2.svg';
import electronThreeToNineteen1 from '../assets/SVGs/list/electron_threeToNineteen1.svg';
import electronThreeToNineteen2 from '../assets/SVGs/list/electron_threeToNineteen2.svg';
import electronDittoThree from '../assets/SVGs/list/electron_dittoThree.svg';
import electronThreeToFifteen1 from '../assets/SVGs/list/electron_threeToFifteen1.svg';
import electronThreeToFifteen2 from '../assets/SVGs/list/electron_threeToFifteen2.svg';
import electronThreeToEighteen from '../assets/SVGs/list/electron_threeToEighteen.svg';
import electronThreeToSixteen from '../assets/SVGs/list/electron_threeToSixteen.svg';
import electronFiveToNineteen from '../assets/SVGs/list/electron_fiveToNineteen.svg';
import electronFiveToEighteen from '../assets/SVGs/list/electron_fiveToEighteen.svg';
import electronFiveToSixteen1 from '../assets/SVGs/list/electron_fiveToSixteen1.svg';
import electronFiveToFifteen from '../assets/SVGs/list/electron_fiveToFifteen.svg';
import electronEightToSixteen from '../assets/SVGs/list/electron_eightToSixteen.svg';
import electronEightToEighteen from '../assets/SVGs/list/electron_eightToEighteen.svg';
import electronEightToThree from '../assets/SVGs/list/electron_eightToThree.svg';
import electronOneToThirteen from '../assets/SVGs/list/electron_oneToThirteen.svg';
import electronOneToTwentyOne from '../assets/SVGs/list/electron_oneToThirteen.svg';
import electronTwelveToTwentyOne from '../assets/SVGs/list/electron_oneToThirteen.svg';
import electronTwelveToThirteen from '../assets/SVGs/list/electron_oneToThirteen.svg';
import electronSeventeenToEight from '../assets/SVGs/list/electron_seventeenToEight.svg';
import electronFifteenToNineteen1 from '../assets/SVGs/list/electron_fifteenToNineteen1.svg';
import electronFifteenToNineteen2 from '../assets/SVGs/list/electron_fifteenToNineteen2.svg';
import electronFifteenToNineteen3 from '../assets/SVGs/list/electron_fifteenToNineteen3.svg';
import electronEightToFifteen from '../assets/SVGs/list/electron_eightToFifteen.svg';
import electronEightToNineteen from '../assets/SVGs/list/electron_eightToNineteen.svg';
import electronTenToFifteen from '../assets/SVGs/list/electron_tenToFifteen.svg';
import electronTenToNineteen from '../assets/SVGs/list/electron_tenToNineteen.svg';
import electronEightToTen from '../assets/SVGs/list/electron_eightToTen.svg';
import electronTenToTwelve from '../assets/SVGs/list/electron_tenToTwelve.svg';
import electronThirteenToFifteen from '../assets/SVGs/list/electron_thirteenToFifteen.svg';
import electronFifteenToSixteen from '../assets/SVGs/list/electron_fifteenToSixteen.svg';
import electronSixteenToSeventeen from '../assets/SVGs/list/electron_sixteenToSeventeen.svg';
import electronSeventeenToEighteen from '../assets/SVGs/list/electron_seventeenToEighteen.svg';
import electronSixteenToEighteen from '../assets/SVGs/list/electron_sixteenToEighteen.svg';
import electronEighteenToNineteen from '../assets/SVGs/list/electron_eighteenToNineteen.svg';
import electronNineteenToTwentyOne from '../assets/SVGs/list/electron_nineteenToTwentyOne.svg';
import electronDittoFive from '../assets/SVGs/list/electron_dittoFive.svg';
import electronDittoEight from '../assets/SVGs/list/electron_dittoEight.svg';
import electronDittoTen from '../assets/SVGs/list/electron_dittoTen.svg';
// Using a direct SVG component instead of an import to bypass caching

import electronDittoFifteen from '../assets/SVGs/list/electron_dittoFifteen.svg';
import electronDittoSixteen from '../assets/SVGs/list/electron_dittoSixteen.svg';
import electronDittoSeventeen from '../assets/SVGs/list/electron_dittoSeventeen.svg';
import electronDittoEighteen from '../assets/SVGs/list/electron_dittoEighteen.svg';
import electronDittoNineteen from '../assets/SVGs/list/electron_dittoNineteen.svg';




// Create a mapping of electron names to their SVG imports
const electronSvgMap = {
  'oneToThree': electronOneToThree,
  'threeToFive1': electronThreeToFive1,
  'threeToFive2': electronThreeToFive2,
  'threeToNineteen1': electronThreeToNineteen1,
  'threeToNineteen2': electronThreeToNineteen2,
  'dittoThree': electronDittoThree,
  'threeToFifteen1': electronThreeToFifteen1,
  'threeToFifteen2': electronThreeToFifteen2,
  'threeToEighteen': electronThreeToEighteen,
  'threeToSixteen': electronThreeToSixteen,
  'fiveToNineteen': electronFiveToNineteen,
  'fiveToEighteen': electronFiveToEighteen,
  'fiveToSixteen1': electronFiveToSixteen1,
  'fiveToFifteen': electronFiveToFifteen,
  'eightToSixteen': electronEightToSixteen,
  'eightToEighteen': electronEightToEighteen,
  'eightToThree': electronEightToThree,
  'oneToThirteen': electronOneToThirteen,
  'oneToTwentyOne': electronOneToTwentyOne,
  'twelveToTwentyOne': electronTwelveToTwentyOne,
  'twelveToThirteen': electronTwelveToThirteen,
  'seventeenToEight': electronSeventeenToEight,
  'fifteenToNineteen1': electronFifteenToNineteen1,
  'fifteenToNineteen2': electronFifteenToNineteen2,
  'fifteenToNineteen3': electronFifteenToNineteen3,
  'eightToFifteen': electronEightToFifteen,
  'eightToNineteen': electronEightToNineteen,
  'tenToFifteen': electronTenToFifteen,
  'tenToNineteen': electronTenToNineteen,
  'eightToTen': electronEightToTen,
  'tenToTwelve': electronTenToTwelve,
  'thirteenToFifteen': electronThirteenToFifteen,
  'fifteenToSixteen': electronFifteenToSixteen,
  'sixteenToSeventeen': electronSixteenToSeventeen,
  'seventeenToEighteen': electronSeventeenToEighteen,
  'sixteenToEighteen': electronSixteenToEighteen,
  'eighteenToNineteen': electronEighteenToNineteen,
  'nineteenToTwentyOne': electronNineteenToTwentyOne,
  'dittoFive': electronDittoFive,
  'dittoEight': electronDittoEight,
  'dittoTen': electronDittoTen,
  'dittoFifteen': electronDittoFifteen,
  'dittoSixteen': electronDittoSixteen,
  'dittoSeventeen': electronDittoSeventeen,
  'dittoEighteen': electronDittoEighteen,
  'dittoNineteen': electronDittoNineteen,
};

// Create an array of electron objects for easier filtering and mapping
const allElectrons = Object.keys(electronSvgMap).map(name => ({
  id: name,
  src: electronSvgMap[name],
  className: `electron_${name}`
}));

const ElectronsDisplay = ({ isVisible, selectedChords = [], hoveredChord = null, onElectronHover, selectedRoot, chordTypes, chordRootOffsets, electronColor = '#ffffff' }) => {
  const [hoveredElectron, setHoveredElectron] = useState(null);
  
  // Helper function to get visible electrons based on selected chords
  const getVisibleElectrons = () => {
    if (!isVisible) {
      return [];
    }
    
    // If no chords are selected, show all electrons
    if (selectedChords.length === 0) {
      console.log('No chords selected, showing all electrons');
      return allElectrons;
    }
    
    // Check if the same chord is selected twice (ditto scale mode)
    const isDittoMode = selectedChords.length === 2 && selectedChords[0] === selectedChords[1];
    const selectedChord = selectedChords[0];
    
    console.log('Is ditto mode?', isDittoMode);
    
    // In ditto mode, only show the ditto electron for the selected chord
    if (isDittoMode) {
      console.log('Ditto mode: Only showing ditto electron for', selectedChord);
      return allElectrons.filter(electron => {
        if (electron.id.startsWith('ditto')) {
          // Extract chord name and normalize
          let chordName = electron.id.substring(5);
          chordName = chordName.charAt(0).toLowerCase() + chordName.slice(1);
          
          const isMatch = chordName === selectedChord;
          console.log(`Ditto electron ${electron.id} -> ${isMatch ? 'SHOW' : 'HIDE'} in ditto mode`);
          return isMatch;
        }
        return false; // Hide all non-ditto electrons in ditto mode
      });
    }
    
    // When two different chords are selected, only show electrons connecting those two chords
    if (selectedChords.length === 2) {
      const firstChord = selectedChords[0];
      const secondChord = selectedChords[1];
      console.log(`Two chords selected: ${firstChord} and ${secondChord}. Only showing connecting electrons.`);
      
      return allElectrons.filter(electron => {
        // Skip ditto electrons when two different chords are selected
        if (electron.id.startsWith('ditto')) {
          return false;
        }
        
        // Check if this electron connects the two selected chords
        const match = electron.id.match(/([a-zA-Z]+)To([a-zA-Z0-9]+)/);
        if (!match) return false;
        
        const source = match[1].toLowerCase();
        const target = match[2].replace(/[0-9]/g, '').toLowerCase(); // Remove any numbers
        
        // Show only if this electron connects the two selected chords (in either direction)
        const connectsSelectedChords = 
          (source === firstChord && target === secondChord) || 
          (source === secondChord && target === firstChord);
        
        console.log(`Electron ${electron.id} -> ${connectsSelectedChords ? 'SHOW' : 'HIDE'} (connects ${firstChord} and ${secondChord}: ${connectsSelectedChords})`);
        return connectsSelectedChords;
      });
    }
    
    // Regular mode - show connections
    // Map of chord class names to their connection points
    const connectionMap = {
      'one': ['three', 'thirteen', 'twentyOne'],
      'three': ['one', 'five', 'fifteen', 'sixteen', 'eighteen', 'nineteen', 'eight'],
      'five': ['three', 'fifteen', 'sixteen', 'eighteen', 'nineteen'],
      'eight': ['three', 'ten', 'fifteen', 'sixteen', 'eighteen', 'nineteen', 'seventeen'],
      'ten': ['eight', 'twelve', 'fifteen', 'nineteen'],
      'twelve': ['ten', 'thirteen', 'twentyOne'],
      'thirteen': ['one', 'twelve', 'fifteen'],
      'fifteen': ['three', 'five', 'eight', 'ten', 'thirteen', 'sixteen', 'nineteen'],
      'sixteen': ['three', 'five', 'eight', 'fifteen', 'seventeen', 'eighteen'],
      'seventeen': ['eight', 'sixteen', 'eighteen'],
      'eighteen': ['three', 'five', 'eight', 'sixteen', 'seventeen', 'nineteen'],
      'nineteen': ['three', 'five', 'eight', 'ten', 'fifteen', 'eighteen', 'twentyOne'],
      'twentyOne': ['one', 'twelve', 'nineteen']
    };
    
    // Log specific connection we're debugging
    if (selectedChord === 'sixteen') {
      console.log('Chord 16 selected, connections should include 18:', connectionMap['sixteen']);
    }
    
    // Add debug logging
    console.log('Selected chord:', selectedChord);
    console.log('All electrons:', allElectrons.map(e => e.id));
    
    // Get the connected chords for the selected chord
    const connectedChords = connectionMap[selectedChord] || [];
    console.log('Connected chords:', connectedChords);
    
    // Special debug for dittoTen
    const dittoTenElectron = allElectrons.find(e => e.id === 'dittoTen');
    if (dittoTenElectron) {
      console.log('Found dittoTen electron:', dittoTenElectron);
      if (selectedChord === 'nineteen') {
        console.log('Selected chord is nineteen, checking if ten is in connected chords');
        console.log('ten in connectedChords?', connectedChords.includes('ten'));
      }
    } else {
      console.log('dittoTen electron not found in allElectrons!');
    }
    
    // Filter electrons that connect to or from the selected chord
    const filtered = allElectrons.filter(electron => {
      // Handle ditto electrons (self-connections)
      if (electron.id.startsWith('ditto')) {
        // Extract the chord name and normalize it
        // First, get everything after 'ditto'
        let chordName = electron.id.substring(5);
        // Then convert first letter to lowercase (e.g., 'Three' -> 'three')
        chordName = chordName.charAt(0).toLowerCase() + chordName.slice(1);
        
        console.log(`Processing ditto electron: ${electron.id}, extracted chord: ${chordName}`);
        
        // MODIFIED: Only show ditto electron for the selected chord, filter out all others
        const isDittoForSelectedChord = chordName === selectedChord;
        
        // No longer show ditto electrons for connected chords
        const isDittoForConnectedChord = false;
        
        const result = isDittoForSelectedChord;
        console.log(`Ditto electron ${electron.id} -> ${result ? 'SHOW' : 'HIDE'} (${chordName} is selected or connected)`); 
        return result;
      }
      
      // Handle regular connections
      const match = electron.id.match(/([a-zA-Z]+)To([a-zA-Z0-9]+)/);
      if (!match) {
        console.log(`Electron ${electron.id} -> HIDE (no match found)`);
        return false;
      }
      
      const source = match[1].toLowerCase();
      const target = match[2].replace(/[0-9]/g, '').toLowerCase(); // Remove any numbers
      
      // Special debug for sixteenToEighteen
      if (electron.id === 'sixteenToEighteen') {
        console.log(`SPECIAL DEBUG - sixteenToEighteen: source=${source}, target=${target}, selectedChord=${selectedChord}`);
        console.log(`Connection check: source === selectedChord: ${source === selectedChord}, target === selectedChord: ${target === selectedChord}`);
        
        // If chord 16 is selected, explicitly show the connection to chord 18
        if (selectedChord === 'sixteen') {
          console.log('Chord 16 selected, forcing sixteenToEighteen to show');
          return true;
        }
      }
      
      // Show this electron if it connects to or from the selected chord
      const result = source === selectedChord || target === selectedChord;
      console.log(`Electron ${electron.id} -> ${result ? 'SHOW' : 'HIDE'} (${source} or ${target} === ${selectedChord})`);
      return result;
    });
    
    console.log('Filtered electrons:', filtered.map(e => e.id));
    return filtered;
  };
  
  // We no longer need the isElectronVisible function as we're using the getVisibleElectrons function instead
  
  // Handler for electron hover
  const handleElectronHover = (electronClass) => {
    // Handle special case for 'ditto' electrons (self-connections)
    const dittoMatch = electronClass.match(/electron_ditto([A-Z][a-z]+)/);
    if (dittoMatch) {
      const targetChord = dittoMatch[1].toLowerCase(); // Convert first letter to lowercase
      setHoveredElectron(electronClass);
      
      // Call the parent's onElectronHover handler if provided
      if (onElectronHover) {
        // Pass the electron class name and extracted chord information
        onElectronHover({
          electronClass,
          type: 'ditto',
          sourceChord: targetChord,
          targetChord: targetChord
        });
      }
      return;
    }
    
    // Extract the connection points from the electron class name
    const match = electronClass.match(/electron_([a-zA-Z]+)To([a-zA-Z0-9]+)/);
    if (!match) return;
    
    const source = match[1];
    // Remove any numbers from the target chord name
    const target = match[2].replace(/[0-9]/g, '').toLowerCase();
    
    setHoveredElectron(electronClass);
    
    // Call the parent's onElectronHover handler if provided
    if (onElectronHover) {
      // Pass detailed electron information to the parent
      onElectronHover({
        electronClass,
        type: 'connection',
        sourceChord: source.toLowerCase(),
        targetChord: target
      });
    }
  };
  
  // Handler for mouse leave
  const handleElectronLeave = () => {
    setHoveredElectron(null);
    
    // Call the parent's onElectronHover handler with null to clear
    if (onElectronHover) {
      onElectronHover(null);
    }
  };
  
  // Component is conditionally rendered by parent now, so isVisible should always be true
  // but we'll keep the check for safety
  if (!isVisible) {
    return null;
  }

  // Get the filtered electrons based on selected chord
  const visibleElectrons = getVisibleElectrons();
  
  // Special debug for sixteenToEighteen electron
  const sixteenToEighteenElectron = allElectrons.find(e => e.id === 'sixteenToEighteen');
  if (sixteenToEighteenElectron) {
    console.log('sixteenToEighteen electron exists:', sixteenToEighteenElectron);
    console.log('Is sixteenToEighteen in visible electrons?', 
      visibleElectrons.some(e => e.id === 'sixteenToEighteen'));
  } else {
    console.log('sixteenToEighteen electron NOT found in allElectrons!');
  }
// Effect to update SVG colors when electronColor changes
  useEffect(() => {
    // Function to update all SVG colors
    const updateElectronColors = () => {
      // Only update the color attributes, not any other attributes
      // This preserves the original SVG shapes
      
      // Update stroke on path elements
      const pathElements = document.querySelectorAll('.electron-path');
      
      pathElements.forEach(path => {
        // Only change the stroke color, not any other attributes
        if (electronColor !== '#ffffff') {
          path.setAttribute('stroke', electronColor);
        } else {
          path.setAttribute('stroke', '#be4bdb');
        }
      });
      
      // Update fill on elements with the electron-fill class
      const fillElements = document.querySelectorAll('.electron-fill');
      
      fillElements.forEach(element => {
        // Only change the fill color, not any other attributes
        if (electronColor !== '#ffffff') {
          element.setAttribute('fill', electronColor);
        } else {
          element.setAttribute('fill', '#be4bdb');
        }
      });
      
      // Update the drop-shadow filter color for all SVG elements
      // First, get all SVG elements
      const svgElements = document.querySelectorAll('svg');
      
      svgElements.forEach(svg => {
        // Add a class to identify them for styling
        svg.classList.add('electron-svg');
        
        // Update the filter attribute directly on the SVG
        if (electronColor !== '#ffffff') {
          // Convert hex color to rgba for the drop-shadow
          const r = parseInt(electronColor.slice(1, 3), 16);
          const g = parseInt(electronColor.slice(3, 5), 16);
          const b = parseInt(electronColor.slice(5, 7), 16);
          
          // Apply the new drop-shadow filter with the selected color
          svg.setAttribute('filter', `drop-shadow(0 0 8px rgba(${r}, ${g}, ${b}, 1))`);
        } else {
          // Reset to default purple color
          svg.setAttribute('filter', 'drop-shadow(0 0 8px rgba(218, 119, 242, 1))');
        }
      });
    };
    
    // Small delay to ensure SVGs are rendered first
    setTimeout(updateElectronColors, 100);
  }, [electronColor]);


  // Helper function to render an electron with its SVG
  const renderElectron = (electronClassName, electronId) => {
    // Get the SVG source from the electronSvgMap using the electronId
    const svgSrc = electronSvgMap[electronId];
    
    if (!svgSrc) {
      console.error(`SVG not found for electron ID: ${electronId}`);
      return null;
    }
    
    return (
      <div
        className={styles[electronClassName]}
        onMouseEnter={() => handleElectronHover(electronClassName)}
        onMouseLeave={handleElectronLeave}
      >
        <SvgComponent 
          src={svgSrc} 
          alt={`Electron ${electronId}`} 
          className={styles.visible}
        />
      </div>
    );
  };

  return (
    <div className={styles['electrons-display']}>
      {visibleElectrons.map((electron) => renderElectron(electron.className, electron.id))}
      
      {/* Force render sixteenToEighteen electron when chord 16 is selected */}
      {selectedChords.length > 0 && selectedChords[0] === 'sixteen' && sixteenToEighteenElectron && 
        renderElectron(sixteenToEighteenElectron.className, 'sixteenToEighteen')
      }
    </div>
  );
};

export default ElectronsDisplay;
