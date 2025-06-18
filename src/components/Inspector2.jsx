import React, { useEffect, useState } from 'react';
import { findChordTypeByClassName } from '../utils/noteCalculator';
import { flatNotes } from '../utils/noteCalculator2';
import { calculateChordNotes, calculateTwoChords } from '../utils/noteCalculator2';

const Inspector = ({ hoveredChord, selectedChords, selectedRoot, chordTypes, chordRootOffsets, hoveredElectron }) => {
  // State for electron notes
  const [electronNotes, setElectronNotes] = useState([]);
  
  // Always render the component, but with empty or placeholder content when nothing is hovered
  let content = <div className="inspector-placeholder">Hover over a chord or electron</div>;
  
  // Calculate electron notes when hovering over an electron with a chord selected
  useEffect(() => {
    // Reset electron notes when no electron is hovered
    if (!hoveredElectron || selectedChords.length === 0) {
      setElectronNotes([]);
      return;
    }
    
    // Process electron hover
    if (typeof hoveredElectron === 'object' && hoveredElectron.type) {
      // New object format
      processObjectElectron(hoveredElectron);
    } else {
      // Legacy string format
      processLegacyElectron(hoveredElectron);
    }
  }, [hoveredElectron, selectedChords, selectedRoot, chordTypes, chordRootOffsets]);
  
  // Process object-format electron
  const processObjectElectron = (electron) => {
    if (electron.type === 'connection') {
      const sourceChord = electron.sourceChord;
      const targetChord = electron.targetChord;
      
      // Find chord types for the connection
      const sourceChordType = findChordTypeByClassName(chordTypes, sourceChord);
      const targetChordType = findChordTypeByClassName(chordTypes, targetChord);
      
      if (!sourceChordType || !targetChordType) return;
      
      // Determine which chord is selected and which is from the electron
      let selectedChordType, electronChordType, fromChord, toChord;
      
      // Check if source chord is in the selected chords array
      if (selectedChords.includes(sourceChordType.className)) {
        selectedChordType = sourceChordType;
        electronChordType = targetChordType;
        fromChord = sourceChord;
        toChord = targetChord;
      } else {
        // Target chord must be selected
        selectedChordType = targetChordType;
        electronChordType = sourceChordType;
        fromChord = targetChord;
        toChord = sourceChord;
      }
      
      // Get the offset between the chords
      const offsetValue = getOffsetValue(fromChord, toChord, electron.electronClass);
      
      // Calculate notes with the correct chord types
      calculateElectronNotes(selectedChordType, electronChordType, offsetValue);
    }
  };
  
  // Process legacy string-format electron
  const processLegacyElectron = (electronClass) => {
    const connectionMatch = electronClass.match(/electron_([a-zA-Z]+)To([a-zA-Z0-9]+)/);
    
    if (!connectionMatch) return;
    
    // Handle regular connections
    const sourceChord = connectionMatch[1].toLowerCase();
    // Extract the base chord name without any numbers
    const targetChordWithIndex = connectionMatch[2];
    const targetChord = targetChordWithIndex.replace(/[0-9]/g, '').toLowerCase();
    
    // Find chord types for the connection
    const sourceChordType = findChordTypeByClassName(chordTypes, sourceChord);
    const targetChordType = findChordTypeByClassName(chordTypes, targetChord);
    
    if (!sourceChordType || !targetChordType) return;
    
    // Determine which chord is selected and which is from the electron
    let selectedChordType, electronChordType, fromChord, toChord;
    
    // Check if source chord is in the selected chords array
    if (selectedChords.includes(sourceChordType.className)) {
      selectedChordType = sourceChordType;
      electronChordType = targetChordType;
      fromChord = sourceChord;
      toChord = targetChord;
    } else {
      // Target chord must be selected
      selectedChordType = targetChordType;
      electronChordType = sourceChordType;
      fromChord = targetChord;
      toChord = sourceChord;
    }
    
    // Get the offset between the chords
    const offsetValue = getOffsetValue(fromChord, toChord, electronClass);
    
    // Calculate notes with the correct chord types
    calculateElectronNotes(selectedChordType, electronChordType, offsetValue);
  };
  
  // Helper function to get offset value
  const getOffsetValue = (fromChord, toChord, electronClass) => {
    // Get the offset between the chords
    const key = `${fromChord}_${toChord}`;
    let offset = chordRootOffsets[key];
    
    // If direct offset not found, try reverse direction and negate
    if (offset === undefined) {
      const reverseKey = `${toChord}_${fromChord}`;
      const reverseOffset = chordRootOffsets[reverseKey];
      
      if (reverseOffset !== undefined) {
        // Negate the offset for reverse direction
        if (Array.isArray(reverseOffset)) {
          offset = reverseOffset.map(val => -val);
        } else {
          offset = -reverseOffset;
        }
      }
    }
    
    // Extract electron index from the electron class name
    let electronIndex = 0;
    
    if (electronClass) {
      // Look for patterns like "threeToFive1", "threeToFive2", "fifteenToNineteen3"
      const indexMatch = electronClass.match(/([a-zA-Z]+)To([a-zA-Z]+)(\d+)$/);
      if (indexMatch && indexMatch[3]) {
        // Convert the index to zero-based (1 -> 0, 2 -> 1, etc.)
        electronIndex = parseInt(indexMatch[3], 10) - 1;
        if (electronIndex < 0) electronIndex = 0;
      }
    }
    
    // Use the appropriate offset based on electron index if it's an array
    return offset !== undefined ? 
      (Array.isArray(offset) ? 
        (electronIndex < offset.length ? offset[electronIndex] : offset[0]) : 
        offset) : 
      0;
  };
  
  // Calculate electron notes by subtracting chord notes from chromatic scale
  const calculateElectronNotes = (fromChordType, toChordType, offsetValue) => {
    console.log('Calculating electron notes with:');
    console.log('- Selected root:', selectedRoot);
    console.log('- From chord type:', fromChordType.name, fromChordType);
    console.log('- To chord type:', toChordType.name, toChordType);
    console.log('- Offset value:', offsetValue);
    
    // Calculate the first chord notes directly using the correct chord type
    const firstChordNotes = calculateChordNotes(selectedRoot, fromChordType);
    
    // Calculate the second chord root based on offset
    const rootIndex = flatNotes.indexOf(selectedRoot);
    const secondRootIndex = (rootIndex + offsetValue + 12) % 12; // Add 12 to handle negative offsets
    const secondRoot = flatNotes[secondRootIndex];
    
    // Calculate the second chord notes with the correct chord type
    const secondChordNotes = calculateChordNotes(secondRoot, toChordType);
    
    console.log('First chord details:', {
      root: selectedRoot,
      type: fromChordType.name,
      className: fromChordType.className,
      notes: firstChordNotes
    });
    
    console.log('Second chord details:', {
      root: secondRoot,
      type: toChordType.name,
      className: toChordType.className,
      notes: secondChordNotes
    });
    
    // Create a result object similar to calculateTwoChords for compatibility
    const result = {
      firstChord: {
        root: selectedRoot,
        type: fromChordType.name,
        className: fromChordType.className,
        notes: firstChordNotes
      },
      secondChord: {
        root: secondRoot,
        type: toChordType.name,
        className: toChordType.className,
        notes: secondChordNotes
      },
      scale: Array.from({ length: 12 }, (_, i) => {
        const noteIndex = (rootIndex + i) % 12;
        return flatNotes[noteIndex];
      })
    };
    
    // Get all 12 notes of the chromatic scale
    const chromaticScale = Array.from({ length: 12 }, (_, i) => flatNotes[i]);
    
    // Get the unique notes from both chords
    const allChordNotes = [...new Set([...result.firstChord.notes, ...result.secondChord.notes])];
    
    // Subtract chord notes from chromatic scale to get electron notes
    const calculatedElectronNotes = chromaticScale
      .filter(note => !allChordNotes.includes(note))
      .map(note => note.toString().replace(/;/g, ''));
    
    console.log('Chromatic scale:', chromaticScale);
    console.log('All chord notes:', allChordNotes);
    console.log('Electron notes:', calculatedElectronNotes);
    
    // Update state with the new electron notes
    setElectronNotes(calculatedElectronNotes);
  };
  
  // Display electron notes if an electron is hovered and we have notes
  if (hoveredElectron && electronNotes.length > 0) {
    content = (
      <div className="inspector-notes">
        <div><strong>Electron Notes:</strong> {electronNotes.join(', ')}</div>
      </div>
    );
  }
  // Display chord information if a chord is hovered and no electron is hovered
  else if (hoveredChord) {
    // Find the chord type for the hovered chord
    const hoveredChordType = findChordTypeByClassName(chordTypes, hoveredChord);
    
    if (hoveredChordType) {
      // Just show the chord name
      content = (
        <div className="inspector-chord-name">{hoveredChordType.name}</div>
      );
    }
  }
  
  return (
    <div className="inspector">
      <div className="inspector-content" style={{ textAlign: 'center' }}>
        {content}
      </div>
    </div>
  );
};

export default Inspector;
