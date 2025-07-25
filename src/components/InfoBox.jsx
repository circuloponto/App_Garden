import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { FaPlay, FaPause, FaExchangeAlt, FaPalette, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import FretboardDisplayer from './FretboardDisplayer'
import "./FretboardDisplayer.module.css"
import { flatNotes, getNoteIndex, calculateChordNotes, calculateTwoChords } from '../utils/noteCalculator2'
// Import some functions we still need from the original calculator
import { getFullChordName, findChordTypeByClassName, getOffsetRoot } from '../utils/noteCalculator'
import FretboardNavButton from './FretboardNavButton'
import SvgComponent from './SvgComponent'
import styles from './InfoBox.module.css'

// Import trichord mappings
import { trichordMappings } from '../data/connections.js'

// Import all unified trichord SVGs directly (same as in TrichordsDisplay)
// Eight trichords
import trichord_eight_eight from '../assets/SVGs/trichordsUnity/trichord_eight_eight.svg'
import trichord_eight_seventeen from '../assets/SVGs/trichordsUnity/trichord_eight_seventeen.svg'
import trichord_eight_ten from '../assets/SVGs/trichordsUnity/trichord_eight_ten.svg'
import trichord_three_eight from '../assets/SVGs/trichordsUnity/trichord_three_eight.svg'
import trichord_one_three from '../assets/SVGs/trichordsUnity/trichord_one_three.svg'
import trichord_sixteen_three from '../assets/SVGs/trichordsUnity/trichord_sixteen_three.svg'
import trichord_sixteen_five from '../assets/SVGs/trichordsUnity/trichord_sixteen_five.svg'
import trichord_sixteen_sixteen from '../assets/SVGs/trichordsUnity/trichord_sixteen_sixteen.svg'
import trichord_sixteen_eighteen from '../assets/SVGs/trichordsUnity/trichord_sixteen_eighteen.svg'
import trichord_sixteen_seventeen from '../assets/SVGs/trichordsUnity/trichord_sixteen_seventeen.svg'
import trichord_seventeen_seventeen from '../assets/SVGs/trichordsUnity/trichord_seventeen_seventeen.svg'
import trichord_seventeen_eighteen from '../assets/SVGs/trichordsUnity/trichord_seventeen_eighteen.svg'
import trichord_three_five1 from '../assets/SVGs/trichordsUnity/trichord_three_five1.svg'
import trichord_three_five2 from '../assets/SVGs/trichordsUnity/trichord_three_five2.svg'
import trichord_three_three from '../assets/SVGs/trichordsUnity/trichord_three_three.svg'
import trichord_ten_ten from '../assets/SVGs/trichordsUnity/trichord_ten_ten.svg'
import trichord_ten_twelve from '../assets/SVGs/trichordsUnity/trichord_ten_twelve.svg'
import trichord_ten_nineteen1 from '../assets/SVGs/trichordsUnity/trichord_ten_nineteen1.svg'

// Eighteen trichords
import trichord_eighteen_eight from '../assets/SVGs/trichordsUnity/trichord_eighteen_eight.svg'
import trichord_eighteen_eighteen from '../assets/SVGs/trichordsUnity/trichord_eighteen_eighteen.svg'
import trichord_eighteen_five from '../assets/SVGs/trichordsUnity/trichord_eighteen_five.svg'
import trichord_eighteen_nineteen from '../assets/SVGs/trichordsUnity/trichord_eighteen_nineteen.svg'
import trichord_eighteen_three from '../assets/SVGs/trichordsUnity/trichord_eighteen_three.svg'

// Fifteen trichords
import trichord_fifteen_eight from '../assets/SVGs/trichordsUnity/trichord_fifteen_eight.svg'
import trichord_fifteen_fifteen from '../assets/SVGs/trichordsUnity/trichord_fifteen_fifteen.svg'
import trichord_fifteen_nineteen1 from '../assets/SVGs/trichordsUnity/trichord_fifteen_nineteen1.svg'
import trichord_fifteen_nineteen2 from '../assets/SVGs/trichordsUnity/trichord_fifteen_nineteen2.svg'
import trichord_fifteen_nineteen3 from '../assets/SVGs/trichordsUnity/trichord_fifteen_nineteen3.svg'
import trichord_fifteen_five from '../assets/SVGs/trichordsUnity/trichord_fifteen_five.svg'
import trichord_fifteen_sixteen from '../assets/SVGs/trichordsUnity/trichord_fifteen_sixteen.svg'
import trichord_fifteen_ten1 from '../assets/SVGs/trichordsUnity/trichord_fifteen_ten1.svg'
import trichord_fifteen_three1 from '../assets/SVGs/trichordsUnity/trichord_fifteen_three1.svg'
import trichord_fifteen_three2 from '../assets/SVGs/trichordsUnity/trichord_fifteen_three2.svg'

// Five trichords
import trichord_five_five from '../assets/SVGs/trichordsUnity/trichord_five_five.svg'

// Nineteen trichords
import trichord_nineteen_eight from '../assets/SVGs/trichordsUnity/trichord_nineteen_eight.svg'
import trichord_nineteen_five from '../assets/SVGs/trichordsUnity/trichord_nineteen_five.svg'
import trichord_nineteen_nineteen from '../assets/SVGs/trichordsUnity/trichord_nineteen_nineteen.svg'
import trichord_nineteen_three1 from '../assets/SVGs/trichordsUnity/trichord_nineteen_three1.svg'
import trichord_nineteen_three2 from '../assets/SVGs/trichordsUnity/trichord_nineteen_three2.svg'
import trichord_nineteen_twentyOne from '../assets/SVGs/trichordsUnity/trichord_nineteen_twentyOne.svg'

// Other trichords
import trichord_thirteen_fifteen from '../assets/SVGs/trichordsUnity/trichord_thirteen_fifteen.svg'
import trichord_one_one from '../assets/SVGs/trichordsUnity/trichord_one_one.svg'
import trichord_twelve_twelve from '../assets/SVGs/trichordsUnity/trichord_twelve_twelve.svg'
import trichord_thirteen_thirteen from '../assets/SVGs/trichordsUnity/trichord_thirteen_thirteen.svg'
import trichord_diminishedTrichord from '../assets/SVGs/trichordsUnity/trichord_diminishedTrichord.svg'
import trichord_twentyOne_twentyOne from '../assets/SVGs/trichordsUnity/trichord_twentyOne_twentyOne.svg'

// Function to format chord names by replacing 'min'/'Min' with '-' and 'dim' with '°'
const formatChordName = (chordName) => {
  return chordName
    .replace(/[Mm]in/g, '-')  // Match both 'min' and 'Min'
    .replace(/dim/g, '°');
};

// Function to format chord names by replacing 'min'/'Min' with '-' and 'dim' with '°'

const InfoBox = ({ selectedRoot, selectedChords, chordTypes, chordRootOffsets, onRootChange, onSwapChords, onDisplayOrderSwap, displayOrderSwapped = false, fretboardOrientation = 'vertical', firstChordColor = '#f08c00', secondChordColor = '#00e1ff', electronColor = '#ffffff' }) => {
  // Effect to update CSS variables when electronColor changes
  // Using useLayoutEffect for synchronous DOM updates before browser paint
  useLayoutEffect(() => {
    // Set the electron color CSS variable on the document root
    document.documentElement.style.setProperty('--electron-color', electronColor);
    
    // Convert hex to RGB for rgba() functions
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        null;
    };
    
    // Set RGB values
    document.documentElement.style.setProperty('--electron-color-rgb', hexToRgb(electronColor));
  }, [electronColor, selectedChords]);
  // Use the prop for display order swap state instead of local state
  // This allows the parent component to control and share this state with other components
  
  // Function to handle swapping the order of selected chords
  const handleSwapChords = (e) => {
    // Stop event propagation to prevent dismissing the InfoBox
    e.stopPropagation();
    
    // Call the prop function passed from the parent component
    if (onSwapChords) {
      onSwapChords();
    }
  };
  
  // Function to handle swapping just the display order without changing chord order
  const handleSwapDisplayColors = (e) => {
    // Stop event propagation to prevent dismissing the InfoBox
    e.stopPropagation();
    
    console.log('Swap display colors clicked');
    console.log('calculatedChords:', calculatedChords);
    console.log('selectedChords:', selectedChords);
    
    // Only proceed if we have exactly two chords calculated
    if (calculatedChords.length === 2 && onDisplayOrderSwap) {
      // When we swap the display order, also update the display root to the new first chord's root
      if (!displayOrderSwapped) {
        setDisplayRoot(calculatedChords[1].root);
      } else {
        setDisplayRoot(calculatedChords[0].root);
      }
      onDisplayOrderSwap();
    }
  };
  // Internal display root for ordering notes, without affecting the app's selectedRoot
  const [displayRoot, setDisplayRoot] = useState(selectedRoot);
  const [isPlaying, setIsPlaying] = useState(false);
  const [calculatedChords, setCalculatedChords] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [electronNotes, setElectronNotes] = useState([]);
  const [availableOffsets, setAvailableOffsets] = useState([]);
  const [selectedOffsetIndex, setSelectedOffsetIndex] = useState(-1);
  const [scaleNotes, setScaleNotes] = useState([]);
  const [scaleType, setScaleType] = useState('chromatic'); // Default to chromatic scale
  const [isFretboardVisible, setIsFretboardVisible] = useState(false); // State to track fretboard visibility - collapsed by default
  const notesContainerRef = useRef(null);

  useEffect(() => {
    if (selectedRoot && selectedChords.length > 0 && chordTypes) {
      // Get available offsets for this chord pair
      let offsets = [];
      
      if (selectedChords.length > 1) {
        // Check if the same chord is selected twice (creating a semitone scale)
        if (selectedChords[0] === selectedChords[1]) {
          // When the same chord is selected twice, look up the offset from chordRootOffsets
          const chord = selectedChords[0];
          const key = `${chord}_${chord}`;
          const offsetValue = chordRootOffsets[key];
          
          // Check if offset is an array or a single value
          if (Array.isArray(offsetValue)) {
            offsets = offsetValue;
          } else if (offsetValue !== undefined) {
            offsets = [offsetValue];
          } else {
            // Fallback to semitone if no specific offset is defined
            offsets = [1];
          }
        } else {
          // Normal case: two different chords selected
          // Try to find offsets for the exact order of chord selection
          const key = `${selectedChords[0]}_${selectedChords[1]}`;
          const offsetValue = chordRootOffsets[key];
          
          // If we don't find offsets for this order, we'll need to check the reverse order
          // and invert the offsets
          if (offsetValue === undefined) {
            const reverseKey = `${selectedChords[1]}_${selectedChords[0]}`;
            const reverseOffsetValue = chordRootOffsets[reverseKey];
            
            if (reverseOffsetValue !== undefined) {
              console.log(`Found offsets for reverse order: ${reverseKey}`);
              // Invert the offsets to maintain the correct musical relationship
              if (Array.isArray(reverseOffsetValue)) {
                offsets = reverseOffsetValue.map(val => -val);
              } else {
                offsets = [-reverseOffsetValue];
              }
            }
          } else {
            // We found offsets for the direct order
            console.log(`Found offsets for direct order: ${key}`);
            // Check if offset is an array or a single value
            if (Array.isArray(offsetValue)) {
              offsets = offsetValue;
            } else if (offsetValue !== undefined) {
              offsets = [offsetValue];
            }
          }
        }
      }
      
      setAvailableOffsets(offsets);
      
      // Reset selected offset index when chord pair changes
      if (offsets.length > 0) {
        setSelectedOffsetIndex(0);
      } else {
        setSelectedOffsetIndex(-1);
      }
      
      // Calculate chords based on the selected offset
      // Make sure to use the first available offset or 0 if none available
      const offsetToUse = (selectedOffsetIndex >= 0 && offsets.length > 0) ? offsets[0] : 0;
      calculateChordsWithOffset(offsetToUse);
    } else {
      setCalculatedChords([]);
      setAllNotes([]);
      setAvailableOffsets([]);
      setSelectedOffsetIndex(-1);
    }
  }, [selectedRoot, selectedChords, chordTypes, chordRootOffsets]);
  
  // Update when selected offset changes
  useEffect(() => {
    if (availableOffsets.length > 0 && selectedOffsetIndex >= 0 && selectedOffsetIndex < availableOffsets.length) {
      // Get the current offset value from the available offsets
      const currentOffset = availableOffsets[selectedOffsetIndex];
      console.log(`Selected offset index changed to ${selectedOffsetIndex}, using offset: ${currentOffset}`);
      
      // Always pass the current single offset value
      calculateChordsWithOffset(currentOffset);
    }
  }, [selectedOffsetIndex, availableOffsets]);
  
  // Reset displayRoot to selectedRoot when any of these change:
  // - selectedRoot: When user selects a new root note
  // - selectedChords: When user selects different chords
  // - selectedOffsetIndex: When user selects a different scale offset
  useEffect(() => {
    // This ensures the scale always starts from the proper root
    // whenever any of the key inputs change
    setDisplayRoot(selectedRoot);
  }, [selectedRoot, selectedChords, selectedOffsetIndex]);
  
  // We don't need the separate scale calculation useEffect anymore
  // as the scale is now calculated in calculateChordsWithOffset
  // and stored directly in setScaleNotes
  
  // Function to calculate chords with a specific offset
  const calculateChordsWithOffset = (offset) => {
    if (!selectedRoot || selectedChords.length === 0 || !chordTypes) return;
    
    console.log('calculateChordsWithOffset called with offset:', offset);
    
    const chordData = [];
    
    // Process first chord
    if (selectedChords.length > 0) {
      const firstChordId = selectedChords[0];
      const firstChordType = findChordTypeByClassName(chordTypes, firstChordId);
      
      // If we only have one chord, calculate it using the original method
      if (firstChordType && selectedChords.length === 1) {
        const firstRoot = selectedRoot;
        const firstFullName = getFullChordName(firstRoot, firstChordType.name);
        const firstNotes = calculateChordNotes(firstRoot, firstChordType);
        
        chordData.push({
          id: firstChordId,
          fullName: firstFullName,
          notes: firstNotes,
          chordType: firstChordType,
          root: firstRoot
        });
      }
      // If we have two chords, use the new calculateTwoChords function
      else if (firstChordType && selectedChords.length > 1) {
        const secondChordId = selectedChords[1];
        const secondChordType = findChordTypeByClassName(chordTypes, secondChordId);
        
        if (secondChordType) {
          console.log('Using calculateTwoChords with:', {
            root: selectedRoot,
            firstChord: firstChordType,
            secondChord: secondChordType,
            offset: offset
          });
          
          // Use our new function to calculate both chords and the scale
          // Always pass a single offset value
          console.log(`Using offset: ${offset}`);
          const result = calculateTwoChords(selectedRoot, firstChordType, secondChordType, offset);
          console.log('calculateTwoChords result:', result);
          
          // Always respect the original chord selection order for display
          // First selected chord
          chordData.push({
            id: selectedChords[0],
            fullName: getFullChordName(
              selectedChords[0] === firstChordId ? result.firstChord.root : result.secondChord.root,
              selectedChords[0] === firstChordId ? result.firstChord.type : result.secondChord.type
            ),
            notes: selectedChords[0] === firstChordId ? result.firstChord.notes : result.secondChord.notes,
            chordType: selectedChords[0] === firstChordId ? firstChordType : secondChordType,
            root: selectedChords[0] === firstChordId ? result.firstChord.root : result.secondChord.root
          });
          
          // Second selected chord
          chordData.push({
            id: selectedChords[1],
            fullName: getFullChordName(
              selectedChords[1] === secondChordId ? result.secondChord.root : result.firstChord.root,
              selectedChords[1] === secondChordId ? result.secondChord.type : result.firstChord.type
            ),
            notes: selectedChords[1] === secondChordId ? result.secondChord.notes : result.firstChord.notes,
            chordType: selectedChords[1] === secondChordId ? secondChordType : firstChordType,
            root: selectedChords[1] === secondChordId ? result.secondChord.root : result.firstChord.root
          });
          
          // Store the scale for later use
          // Always use the scale directly since we're passing a single offset
          if (result.scale) {
            console.log(`Using scale:`, result.scale);
            setScaleNotes(result.scale);
          } else {
            console.warn('No scale found in result');
          }
        }
      }
    }
    
    setCalculatedChords(chordData);
    
    // Get all unique notes from both chords and track which chord(s) each note belongs to
    if (chordData.length > 0) {
      // Create a map to track which chord(s) each note belongs to
      const notesMap = new Map();
      
      // Process notes from first chord
      if (chordData[0] && chordData[0].notes && Array.isArray(chordData[0].notes)) {
        chordData[0].notes.forEach(note => {
          notesMap.set(note, { note, inFirstChord: true, inSecondChord: false });
        });
      }
      
      // Process notes from second chord
      if (chordData[1] && chordData[1].notes && Array.isArray(chordData[1].notes)) {
        chordData[1].notes.forEach(note => {
          if (notesMap.has(note)) {
            // Update existing entry if note is in both chords
            const noteData = notesMap.get(note);
            noteData.inSecondChord = true;
          } else {
            // Add new entry if note is only in second chord
            notesMap.set(note, { note, inFirstChord: false, inSecondChord: true });
          }
        });
      }
      
      // Convert map to array and sort by chromatic order
      const notesArray = Array.from(notesMap.values());
      notesArray.sort((a, b) => getNoteIndex(a.note) - getNoteIndex(b.note));
      
      setAllNotes(notesArray);
      
      // Calculate electron notes (notes from the chromatic scale that don't appear in the current scale)
      const scaleNotes = new Set(notesArray.map(noteData => noteData.note));
      const electrons = flatNotes.filter(note => !scaleNotes.has(note));
      
      // Sort electron notes chromatically
      electrons.sort((a, b) => getNoteIndex(a) - getNoteIndex(b));
      
      setElectronNotes(electrons);
    } else {
      setAllNotes([]);
      setElectronNotes([]);
    }
  };

  const handlePlayClick = () => {
    // Toggle play state
    setIsPlaying(!isPlaying);
  };

  // Direct mapping from chord numbers to imported SVG files
  const chordNumberToTrichordSvg = {
    'one': trichord_one_three,
    'three': trichord_three_five1,
    'five': trichord_fifteen_five, // Using fifteen_five as a representative for five
    'eight': trichord_eight_eight,
    'ten': trichord_ten_ten,
    'twelve': trichord_ten_twelve,
    'thirteen': trichord_thirteen_fifteen,
    'fifteen': trichord_fifteen_fifteen,
    'sixteen': trichord_sixteen_sixteen,
    'seventeen': trichord_seventeen_seventeen,
    'eighteen': trichord_eighteen_eighteen,
    'nineteen': trichord_fifteen_nineteen1, // Using fifteen_nineteen1 as a representative
    'twentyOne': trichord_diminishedTrichord
  };
  
  // Function to get the correct trichord SVG for a chord class
  const getTrichordSvgForChord = (chordClassName) => {
    // Extract the chord number from the chord class name
    const chordType = findChordTypeByClassName(chordTypes, chordClassName);
    if (!chordType) {
      console.warn(`Could not find chord type for class name: ${chordClassName}`);
      return trichord_one_three; // Default fallback
    }
    
    const chordNumber = chordType.id;
    console.log(`Chord ${chordClassName} has number: ${chordNumber}`);
    
    // Get the trichord SVG for this chord number
    const svgFile = chordNumberToTrichordSvg[chordNumber] || trichord_one_three;
    console.log(`Using trichord SVG for chord ${chordClassName}`);
    
    return svgFile;
  };

  // Function to handle tab click
  const handleTabClick = (e, index) => {
    e.stopPropagation();
    setSelectedOffsetIndex(index);
    
    // Update the offset based on the selected tab
    if (index >= 0 && index < availableOffsets.length) {
      setOffset(availableOffsets[index]);
    }
  };
  
  // Define the chromatic scale for reference
  const chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  
  // Get ordered notes starting with the display root note
  const getOrderedChordNotes = () => {
    if (!selectedRoot || calculatedChords.length === 0) return [];
    
    // Get all unique notes from both chords
    const uniqueNotes = new Set();
    
    // Add all notes from both chords
    calculatedChords.forEach(chord => {
      chord.notes.forEach(note => uniqueNotes.add(note));
    });
    
    // Convert to array and sort starting from the display root note
    const rootIndex = flatNotes.indexOf(displayRoot || selectedRoot);
    if (rootIndex === -1) return Array.from(uniqueNotes);
    
    // Create an array of all notes in chromatic order starting from the display root
    const orderedNotes = [];
    for (let i = 0; i < flatNotes.length; i++) {
      const noteIndex = (rootIndex + i) % flatNotes.length;
      const note = flatNotes[noteIndex];
      if (uniqueNotes.has(note)) {
        orderedNotes.push(note);
      }
    }
    
    return orderedNotes;
  };

  // Enhanced arrow click handler that navigates through notes in the current scale
  const handleArrowClick = (e, direction) => {
    // Get the available notes in the current chord/scale
    const availableNotes = getOrderedChordNotes();
    
    if (!displayRoot || availableNotes.length === 0) return;
    
    // Find the current note's position in the available notes
    const currentNoteIndex = availableNotes.indexOf(displayRoot);
    
    // If the current note isn't in the available notes, default to the first note
    if (currentNoteIndex === -1) {
      setDisplayRoot(availableNotes[0]);
      console.log('Note not in scale, defaulting to:', availableNotes[0]);
      return;
    }
    
    // Left arrow: Place first note at the end of the array
    // Right arrow: Place last note at the beginning of the array
    if (direction === 'left') {
      // Take the first note and move it to the end
      // This is equivalent to rotating the array left, so we move to the next note
      const nextIndex = (currentNoteIndex + 1) % availableNotes.length;
      setDisplayRoot(availableNotes[nextIndex]);
      console.log('Left arrow clicked, new root:', availableNotes[nextIndex]);
    } else {
      // Take the last note and move it to the beginning
      // This is equivalent to rotating the array right, so we move to the previous note
      const prevIndex = (currentNoteIndex - 1 + availableNotes.length) % availableNotes.length;
      setDisplayRoot(availableNotes[prevIndex]);
      console.log('Right arrow clicked, new root:', availableNotes[prevIndex]);
    }
  };

  return (
    <div className={`infoBox ${selectedChords.length === 2 ? '' : 'hidden'}`}>
        {/* Scale tabs - now at the very top */}
        {availableOffsets.length > 1 && (
          <div className={styles.scaleTabs}>
            {console.log('Available offsets:', availableOffsets)}
            {console.log('Selected chords:', selectedChords)}
            {availableOffsets.map((offset, index) => {
              // Get the chord class name for this tab
              const chordClassName = selectedChords[index % selectedChords.length];
              console.log(`Tab ${index}: Using chord class ${chordClassName}`);
              
              // Get the trichord SVG for this chord
              const svgUrl = getTrichordSvgForChord(chordClassName);
              console.log(`Tab ${index}: Using trichord SVG: ${svgUrl}`);
              
              return (
                <div 
                  key={index} 
                  className={`${styles.scaleTab} ${selectedOffsetIndex === index ? styles.active : ''}`}
                  onClick={(e) => handleTabClick(e, index)}
                >
                  {svgUrl ? (
                    <div 
                      className={styles.trichordSvgContainer} 
                      style={{ filter: 'none !important', boxShadow: 'none !important' }}
                    >
                        <SvgComponent 
                          src={svgUrl} 
                          className={`${styles.trichordSvg} trichord`}
                          trichordColor={index === 0 ? firstChordColor : secondChordColor}
                          electronColor={electronColor}
                          alt={`Trichord for ${chordClassName}`}
                          style={{ filter: 'none !important', boxShadow: 'none !important' }}
                        />
                    </div>
                  ) : (
                    <span>Scale {index + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {/* Header section */}
        <div className="infoTitle">
            {/* First row: Tabby Pair title */}
            <div className="titleRow">
              <div className="tabbytitle" style={{ width: '100%', textAlign: 'center' }}>Tabby Pair</div>
            </div>
            
            {/* Second row: Chord names and controls */}
            <div className="titleRow" style={{ marginTop: '10px', justifyContent: 'space-between' }}>
              {/* Chord names on the left */}
              <div className="chordName">
                {calculatedChords.length > 0 ? (
                  <>
                    {/* Show the chords in swapped order but keep the color classes the same */}
                    <span className="firstChord">
                      {formatChordName(calculatedChords[displayOrderSwapped ? 1 : 0].fullName)}
                    </span>
                    {calculatedChords.length > 1 && (
                      <>
                        <span className='plus'>&</span>
                        <span className="secondChord">
                          {formatChordName(calculatedChords[displayOrderSwapped ? 0 : 1].fullName)}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span>No chords selected</span>
                )}
              </div>
              
              {/* Controls on the right */}
              <div className="infobox-controls" style={{ display: 'flex', alignItems: 'center' }}>
                {/* Only show swap button if we have two different chords selected */}
                {selectedChords.length === 2 && selectedChords[0] !== selectedChords[1] && (
                  <span className="swap-button" onClick={handleSwapChords} title="Swap chord order">
                    <FaExchangeAlt className="swap-icon" />
                  </span>
                )}
                
                {/* Color swap button styled to match other buttons - only show when exactly 2 chords are selected */}
                {selectedChords.length === 2 && (
                  <span 
                    className="color-swap-button" 
                    onClick={handleSwapDisplayColors}
                    title="Swap display colors"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(142, 68, 173, 0.8)',
                      marginLeft: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <FaPalette style={{ color: 'white' }} />
                  </span>
                )}
                
                <span className="play-button" onClick={handlePlayClick} style={{ marginLeft: '10px' }}>
                  {isPlaying ? <FaPause className="play-icon" /> : <FaPlay className="play-icon" />}
                </span>
              </div>
            </div>
        </div>
        
        {/* Notes section without navigation arrows */}
        <div className="infoSection">
            <h3>Scale</h3>
            
            <div className="sectionContent notesContainer" ref={notesContainerRef}>
                {/* Left arrow - using button for better accessibility and click handling */}
                <button className="arrow-left" onClick={(e) => handleArrowClick(e, 'left')} aria-label="Previous note"></button>
                
                {/* Notes container without drag functionality */}
                <div 
                    className="notes-wrapper"
                    style={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '5px',
                        padding: '10px'
                    }}
                >
                    {/* Display notes that appear in the selected chords, starting with root note */}
                    {getOrderedChordNotes().map((note, index) => {
                        // Check if the note is in any of the chords, respecting the display order
                        const firstChordIndex = displayOrderSwapped ? 1 : 0;
                        const secondChordIndex = displayOrderSwapped ? 0 : 1;
                        
                        const inFirstChord = calculatedChords.length > 0 && 
                            calculatedChords[firstChordIndex].notes.includes(note);
                        const inSecondChord = calculatedChords.length > 1 && 
                            calculatedChords[secondChordIndex].notes.includes(note);
                        
                        // Skip notes that don't appear in any chord
                        if (!inFirstChord && !inSecondChord) {
                            return null;
                        }
                        
                        let className = '';
                        if (inFirstChord && inSecondChord) {
                            className = 'bothChords';
                        } else if (inFirstChord) {
                            // First chord is always orange
                            className = 'firstChord';
                        } else if (inSecondChord) {
                            // Second chord is always blue
                            className = 'secondChord';
                        }
                        
                        // Highlight the root note based on the display order
                        if (displayOrderSwapped) {
                            // When colors are swapped, highlight the root of the second chord (now displayed as first)
                            if (calculatedChords.length > 1 && note === calculatedChords[1].root) {
                                className += ' rootNote';
                            }
                        } else {
                            // Normal order - highlight the first chord's root
                            if (calculatedChords.length > 0 && note === calculatedChords[0].root) {
                                className += ' rootNote';
                            }
                        }
                        
                        return (
                            <span 
                                key={index} 
                                className={`${className}${index === 0 ? ' currentRoot' : ''}`}
                            >
                                {note}
                            </span>
                        );
                    })}
                </div>
                
                {/* Right arrow - using button for better accessibility and click handling */}
                <button className="arrow-right" onClick={(e) => handleArrowClick(e, 'right')} aria-label="Next note"></button>
            </div>
        </div>
        {allNotes.length === 0 && <span>No notes to display</span>}
        
        {/* Electrons section */}
        <div className="infoSection">
            <div className="sectionTitle">Electrons:</div>
            <div className="sectionContent">
                {electronNotes.map((note, index) => {
                    // Determine the color to use
                    const color = electronColor !== '#ffffff' ? electronColor : '#be4bdb';
                    // Convert hex to rgba for shadow
                    const r = parseInt(color.slice(1, 3), 16);
                    const g = parseInt(color.slice(3, 5), 16);
                    const b = parseInt(color.slice(5, 7), 16);
                    const shadowColor = `rgba(${r}, ${g}, ${b}, 1)`;
                    
                    return (
                        <span 
                            key={index} 
                            id="electron" 
                            className='infoElectrons'
                            style={{
                                color: color,
                                textShadow: `0 0 8px ${shadowColor}`,
                                borderColor: color
                            }}
                        >
                            {note}
                        </span>
                    );
                })}
                {electronNotes.length === 0 && <span>No electron notes to display</span>}
            </div>
        </div>
        {/* Fretboard section with collapsible functionality */}
        {calculatedChords.length === 2 && (
          <div className="fretboard-section">
            {/* Fretboard header with toggle button */}
            <div 
              className="fretboard-header" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from propagating to parent elements
                setIsFretboardVisible(!isFretboardVisible);
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <h3 style={{ margin: 0 }}>Fretboard</h3>
              {isFretboardVisible ? 
                <FaChevronUp style={{ color: 'white' }} /> : 
                <FaChevronDown style={{ color: 'white' }} />
              }
            </div>
            
            {/* Collapsible fretboard content */}
            <div 
              className={`fretboard-content ${isFretboardVisible ? '' : 'collapsed'}`}
              onClick={(e) => e.stopPropagation()} // Prevent event from propagating to parent elements
            >
              <FretboardDisplayer 
                firstChord={{
                  name: calculatedChords[displayOrderSwapped ? 1 : 0].fullName,
                  spelling: calculatedChords[displayOrderSwapped ? 1 : 0].notes,
                  root: calculatedChords[displayOrderSwapped ? 1 : 0].root,
                  fretStart: 8,
                  positions: [
                    { string: 6, fret: 8 },
                    { string: 5, fret: 8 },
                    { string: 4, fret: 8 },
                    { string: 3, fret: 9 }
                  ]
                }}
                secondChord={{
                  name: calculatedChords[displayOrderSwapped ? 0 : 1].fullName,
                  spelling: calculatedChords[displayOrderSwapped ? 0 : 1].notes,
                  root: calculatedChords[displayOrderSwapped ? 0 : 1].root,
                  fretStart: 8,
                  positions: [
                    { string: 6, fret: 8 },
                    { string: 5, fret: 9 },
                    { string: 4, fret: 8 },
                    { string: 3, fret: 8 }
                  ]
                }}
                orientation={fretboardOrientation}
                firstChordColor={firstChordColor}
                secondChordColor={secondChordColor}
              />
            </div>
            
            {/* Add FretboardNavButton that only appears when scale data is available */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <FretboardNavButton 
                scaleData={{
                  firstScale: calculatedChords.length > 0 ? {
                    name: calculatedChords[displayOrderSwapped ? 1 : 0].fullName,
                    root: calculatedChords[displayOrderSwapped ? 1 : 0].root,
                    spelling: calculatedChords[displayOrderSwapped ? 1 : 0].notes,
                    positions: [
                      { string: 6, fret: 3 },
                      { string: 5, fret: 2 },
                      { string: 4, fret: 0 },
                      { string: 3, fret: 0 },
                      { string: 2, fret: 0 },
                      { string: 1, fret: 3 }
                    ]
                  } : null,
                  secondScale: calculatedChords.length > 1 ? {
                    name: calculatedChords[displayOrderSwapped ? 0 : 1].fullName,
                    root: calculatedChords[displayOrderSwapped ? 0 : 1].root,
                    spelling: calculatedChords[displayOrderSwapped ? 0 : 1].notes,
                    positions: [
                      { string: 5, fret: 3 },
                      { string: 4, fret: 2 },
                      { string: 3, fret: 0 },
                      { string: 2, fret: 1 },
                      { string: 1, fret: 0 }
                    ]
                  } : null
                }}
                selectedChords={selectedChords}
              />
            </div>
          </div>
        )}
    </div>
  )
}

export default InfoBox