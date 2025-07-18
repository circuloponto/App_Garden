import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";

import Diagram from './components/Diagram'
import Connections from './components/Connections'
import HomePage from './pages/HomePage'
import FretboardPage from './pages/FretboardPage'
import InfoBox from './components/InfoBox'
import Fretboard from './components/Fretboard'
import Sidebar from './components/Sidebar'
import SlidePresentation from './components/SlidePresentation'
import Matrix from './components/Matrix'
import Inspector2 from './components/Inspector2'
import ElectronsDisplay from './components/ElectronsDisplay'
import Settings from './components/Settings'
import TrichordsDisplay from './components/TrichordsDisplay';

import { connections, chordTypes, chordRootOffsets, trichordMappings, trichordPriorities } from './data/connections';

import Logo from './components/Logo'

import './App.css'
import './tutorial.css' 

function App() {
  const location = useLocation();
  const { state } = location;
  
  // Dynamic view mode based on selection count
  const [viewMode, setViewMode] = useState('connections');
  // Initialize selectedChords with preserved state if available
  const [selectedChords, setSelectedChords] = useState(() => {
    if (state && state.preserveSelections === true && Array.isArray(state.selectedChords)) {
      console.log('Restoring chord selections from navigation state:', state.selectedChords);
      return state.selectedChords;
    }
    return [];
  }); // e.g. ['four', 'five']
  
  // Effect to handle chord selection preservation when navigating back from fretboard
  useEffect(() => {
    if (state && state.preserveSelections === true && Array.isArray(state.selectedChords)) {
      console.log('Updating chord selections from navigation state:', state.selectedChords);
      setSelectedChords(state.selectedChords);
    }
  }, [state]);
  const [tutorialStep, setTutorialStep] = useState(0); // 0 = not showing, 1 = chords, 2 = connections
  const [selectedRoot, setSelectedRoot] = useState('C'); // Default root note
  const [showSlides, setShowSlides] = useState(false); // Control slide presentation visibility
  const [matrixExpanded, setMatrixExpanded] = useState(false); // Control matrix expansion
  const [hoveredChord, setHoveredChord] = useState(null); // Track which chord is being hovered
  // Control electrons display visibility with explicit true/false values
  const [showElectrons, setShowElectrons] = useState(false);
  const [hoveredElectron, setHoveredElectron] = useState(null);
  // Control trichords display visibility - only visible when electrons are also visible
  const [showTrichords, setShowTrichords] = useState(false);
  // Track if the display order is swapped (for visual purposes only)
  const [displayOrderSwapped, setDisplayOrderSwapped] = useState(false);
  
  // Settings state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fretboardOrientation, setFretboardOrientation] = useState('vertical'); // 'vertical' or 'horizontal'
  const [firstChordColor, setFirstChordColor] = useState('#f08c00'); // Orange
  const [secondChordColor, setSecondChordColor] = useState('#00e1ff'); // Blue
  const [electronColor, setElectronColor] = useState('#9c36b5'); // Purple (default)
  
  // Update CSS variables when colors change
  // Using useLayoutEffect for synchronous DOM updates before browser paint
  useLayoutEffect(() => {
    // Set the main color variables
    document.documentElement.style.setProperty('--first-chord-color', firstChordColor);
    document.documentElement.style.setProperty('--second-chord-color', secondChordColor);
    document.documentElement.style.setProperty('--electron-color', electronColor);
    
    // Convert hex to RGB for rgba() functions
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        null;
    };
    
    // Set RGB values
    document.documentElement.style.setProperty('--first-chord-color-rgb', hexToRgb(firstChordColor));
    document.documentElement.style.setProperty('--second-chord-color-rgb', hexToRgb(secondChordColor));
    document.documentElement.style.setProperty('--electron-color-rgb', hexToRgb(electronColor));
  }, [firstChordColor, secondChordColor, electronColor]);
  
  // Function to handle swapping the order of selected chords
  const handleSwapChords = () => {
    // Only swap if we have exactly two different chords
    if (selectedChords.length === 2 && selectedChords[0] !== selectedChords[1]) {
      // Create a new array with the chords in reversed order
      const swappedChords = [selectedChords[1], selectedChords[0]];
      console.log('Swapping chord order:', selectedChords, '->', swappedChords);
      setSelectedChords(swappedChords);
      // Reset display order swap when actual chord order is swapped
      setDisplayOrderSwapped(false);
    }
  };
  
  // Function to handle swapping just the display order without changing chord selection
  const handleDisplayOrderSwap = () => {
    // Only toggle if we have exactly two different chords
    if (selectedChords.length === 2 && selectedChords[0] !== selectedChords[1]) {
      setDisplayOrderSwapped(prev => !prev);
      console.log('Toggling display order swap');
    }
  };
  
  // Debug effect to monitor showElectrons state changes
  useEffect(() => {
    console.log('showElectrons state changed to:', showElectrons);
  }, [showElectrons]);
  
  // Set default root note to C on app load
  useEffect(() => {
    setSelectedRoot('C');
  }, []);
  
  // Start tutorial automatically when app loads
  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window !== 'undefined') {
      // Show first step after a short delay
      const timer = setTimeout(() => {
        setTutorialStep(1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Apply data attribute to body for CSS targeting
  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window !== 'undefined' && document && document.body) {
      if (tutorialStep > 0) {
        document.body.setAttribute('data-tutorial-step', tutorialStep);
      } else {
        document.body.removeAttribute('data-tutorial-step');
      }
    }
  }, [tutorialStep]);
  
  // Handle tutorial navigation
  const handleNextStep = () => {
    if (tutorialStep === 1) {
      setTutorialStep(2);
    } else {
      setTutorialStep(0); // End tutorial
    }
  };
  
  const handleSkipTutorial = () => {
    setTutorialStep(0);
  };

  // Reset selection when switching from 'fruits' to 'connections' and there is a selection
 
  useEffect(() => {
    if (viewMode === 'connections' && selectedChords.length > 0) {
      setSelectedChords([]);
    }
  }, [viewMode]);

  // Deselect all chords function
  const deselectAllChords = () => {
    setSelectedChords([]);
  };

  // Chord selection handler for both view modes
  const handleChordSelect = (chord) => {
    console.log('Chord selected:', chord, 'Current viewMode:', viewMode);
    console.log('Current selectedChords:', JSON.stringify(selectedChords));
    
    if (viewMode === 'fruits') {
      if (selectedChords.length === 0) {
        // First click: select the chord
        console.log('First selection:', chord);
        setSelectedChords([chord]);
      } else if (selectedChords.length === 1) {
        const first = selectedChords[0];
        console.log('Second selection attempt. First chord:', first, 'Current chord:', chord);
        
        if (first === chord) {
          // Second click on the same chord: create a scale with two versions of the chord a semitone apart
          console.log('Same chord clicked twice - creating scale');
          // We add the same chord twice to the selection array
          const newSelection = [chord, chord];
          console.log('Setting new selection:', JSON.stringify(newSelection));
          setSelectedChords(newSelection);
        } else {
          // Clicking a different chord when one is already selected
          // Only allow if a connection exists in either direction
          const isValidPair = connections.some(
            c =>
              (c.from === first && c.to === chord) ||
              (c.from === chord && c.to === first)
          );
          console.log('Is valid pair?', isValidPair);
          if (isValidPair) {
            const newSelection = [first, chord];
            console.log('Setting valid pair:', JSON.stringify(newSelection));
            setSelectedChords(newSelection);
          }
          // else do nothing if not a valid pair
        }
      } else if (selectedChords.length === 2) {
        // If two chords are already selected
        if (selectedChords[0] === selectedChords[1] && selectedChords[0] === chord) {
          // Third click on the same chord that was selected twice - deselect it
          console.log('Third click on same chord - deselecting');
          setSelectedChords([]);
        } else {
          // Clicking a different chord when two chords are already selected
          console.log('Resetting selection to:', chord);
          setSelectedChords([chord]);
        }
      } else {
        // Fallback case
        console.log('Resetting selection to:', chord);
        setSelectedChords([chord]);
      }
    } else if (viewMode === 'connections') {
      console.log('In connections mode, chord:', chord);
      console.log('Includes chord?', selectedChords.includes(chord), 'Length:', selectedChords.length);
      
      if (selectedChords.length === 0) {
        // First click: select the chord
        console.log('First selection in connections mode:', chord);
        setSelectedChords([chord]);
      } else if (selectedChords.length === 1) {
        const first = selectedChords[0];
        
        if (first === chord) {
          // Second click on the same chord: create a scale
          console.log('Same chord clicked twice in connections mode - creating scale');
          setSelectedChords([chord, chord]);
        } else {
          // Check if a connection exists in either direction
          const isValidPair = connections.some(
            c =>
              (c.from === first && c.to === chord) ||
              (c.from === chord && c.to === first)
          );
          console.log('Is valid pair in connections mode?', isValidPair);
          
          if (isValidPair) {
            // If it's a valid pair, select both chords
            setSelectedChords([first, chord]);
          } else {
            // If it's not a valid pair, make the new chord the first selected chord
            console.log('Not a valid pair in connections mode, setting new first chord:', chord);
            setSelectedChords([chord]);
          }
        }
      } else if (selectedChords.length === 2) {
        // If two chords are already selected
        if (selectedChords[0] === selectedChords[1] && selectedChords[0] === chord) {
          // Third click on the same chord that was selected twice - deselect it
          console.log('Third click on same chord in connections mode - deselecting');
          setSelectedChords([]);
        } else {
          // Clicking a different chord when two chords are already selected
          console.log('Resetting selection in connections mode to:', chord);
          setSelectedChords([chord]);
        }
      } else {
        // Fallback case
        setSelectedChords([chord]);
      }
    }
  };

  // Compute possible chords for animation (only in 'fruits' mode, when one chord is selected)
  let possibleChords = [];
  if (viewMode === 'fruits' && selectedChords.length === 1) {
    const first = selectedChords[0];
    possibleChords = Array.from(new Set(
      connections
        .filter(c => c.from === first || c.to === first)
        .map(c => (c.from === first ? c.to : c.from))
    ));
  }
  // DEBUG: log selection and possible chords
  console.log('selectedChords:', selectedChords);
  console.log('possibleChords:', possibleChords);

  // Determine the app class based on tutorial step
  const appClassName = tutorialStep > 0 ? `app tutorial-step-${tutorialStep}` : 'app';
  
  // Handle background click to deselect all chords
  const handleBackgroundClick = (e) => {
    // Don't deselect chords if settings modal is open
    if (settingsOpen) {
      return;
    }
    
    // Function to check if the clicked element should not trigger deselection
    const isProtectedElement = (element) => {
      if (!element) return false;
      
      // List of class names that should not trigger deselection
      const nonDeselectClasses = ['element', 'chord', 'selected-chord', 'first-selected-chord', 'dittoScale',
                                 'connected-chord', 'possible-chord', 'deselect-button', 'controls', 'button',
                                 'tutorial-modal', 'tutorial-buttons', 'sidebar', 'infoBox', 'infoSection',
                                 'arrow-left', 'arrow-right', 'notes-wrapper', 'notesContainer', 'sectionContent',
                                 'infoTitle', 'chordName', 'play-button', 'play-icon', 'titleRow', 'scaleTabs', 'scaleTab',
                                 'settings-overlay', 'settings-modal', 'settings-header', 'settings-content', 'settings-footer',
                                 'settings-section', 'orientation-options', 'orientation-option', 'color-settings', 'color-option',
                                 'color-preview', 'save-button', 'cancel-button', 'close-button'];
      
      // Check if the element or any parent up to 3 levels has one of these classes
      let currentElement = element;
      let depth = 0;
      while (currentElement && depth < 3) {
        if (currentElement.classList) {
          for (const className of nonDeselectClasses) {
            if (currentElement.classList.contains(className)) {
              return true;
            }
          }
        }
        currentElement = currentElement.parentElement;
        depth++;
      }
      return false;
    };
    
    // Deselect if the click is not on a protected element
    // Removed the requirement for the click to be inside the squared div
    if (!isProtectedElement(e.target)) {
      deselectAllChords();
    }
  };

  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={
        <HomePage>
          <div className={appClassName} onClick={handleBackgroundClick}>
            {/* Settings Modal */}
            <Settings
              isOpen={settingsOpen}
              onClose={() => setSettingsOpen(false)}
              fretboardOrientation={fretboardOrientation}
              setFretboardOrientation={setFretboardOrientation}
              firstChordColor={firstChordColor}
              secondChordColor={secondChordColor}
              electronColor={electronColor}
              setFirstChordColor={setFirstChordColor}
              setSecondChordColor={setSecondChordColor}
              setElectronColor={setElectronColor}
            />
            
            {/* Simple Tutorial UI */}
            {tutorialStep > 0 && (
              <div className="tutorial-container">
                {/* Tutorial modal */}
                <div className="tutorial-modal">
                  <h3>
                    {tutorialStep === 1 ? 'Chords' : 'Connections'}
                  </h3>
                  <p>
                    {tutorialStep === 1 
                      ? 'These elements are chords.' 
                      : 'These are connections.'}
                  </p>
                  <div className="tutorial-buttons">
                    <button onClick={handleSkipTutorial}>Skip</button>
                    <button onClick={handleNextStep}>
                      {tutorialStep === 1 ? 'Next' : 'Finish'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <Inspector2 
              hoveredChord={hoveredChord} 
              hoveredElectron={hoveredElectron}
              selectedChords={selectedChords} 
              selectedRoot={selectedRoot} 
              chordTypes={chordTypes} 
              chordRootOffsets={chordRootOffsets} 
            />
            
            <div className="logo">
              <Logo fill="white" stroke="white" />
            </div>
            
            {/* ElectronsDisplay moved to scaler div */}
            
            <Sidebar 
              onRootChange={setSelectedRoot} 
              selectedRoot={selectedRoot} 
              onToggleSlides={() => setShowSlides(prev => !prev)} 
              onToggleMatrix={() => setMatrixExpanded(prev => !prev)}
              matrixExpanded={matrixExpanded}
              onToggleElectrons={() => {
                // Log before state change
                console.log('Before toggle - showElectrons:', showElectrons);
                
                // Use the functional form of setState to ensure we're working with the latest state
                setShowElectrons(currentState => {
                  const newState = !currentState;
                  console.log('Setting showElectrons to:', newState);
                  
                  // If turning off electrons, also turn off trichords
                  if (!newState) {
                    setShowTrichords(false);
                  }
                  
                  return newState;
                });
              }}
              showElectrons={showElectrons}
              onToggleTrichords={() => {
                setShowTrichords(currentState => !currentState);
              }}
              showTrichords={showTrichords}
              onOpenSettings={() => setSettingsOpen(true)}
            />
            <div className="content-wrapper">
              {showSlides ? (
                <SlidePresentation onClose={() => setShowSlides(false)} />
              ) : (
                <>
                  <div className="scaler" style={{ marginTop: selectedChords.length < 2 ? '200px' : '0' }}>
                    <Diagram 
                      handleChordSelect={handleChordSelect} 
                      selectedChords={selectedChords} 
                      possibleChords={possibleChords}
                      onChordHover={setHoveredChord}
                      hoveredChord={hoveredChord}
                      showElectrons={showElectrons}
                      onElectronHover={setHoveredElectron}
                      selectedRoot={selectedRoot}
                      chordTypes={chordTypes}
                      chordRootOffsets={chordRootOffsets}
                      displayOrderSwapped={displayOrderSwapped}
                      electronColor={electronColor}
                      /* Pass trichord props to Diagram */
                      showTrichords={showTrichords}
                      trichordMappings={trichordMappings}
                      trichordPriorities={trichordPriorities}
                      trichordColor={electronColor} /* Use the same color as electrons */
                    />
                    <Connections viewMode={selectedChords.length === 2 ? 'fruits' : 'connections'} selectedChords={selectedChords} />
                  </div>
                  
                  {/* Always show InfoBox when chords are selected */}
                  <InfoBox 
                    selectedRoot={selectedRoot} 
                    selectedChords={selectedChords}
                    chordTypes={chordTypes}
                    chordRootOffsets={chordRootOffsets}
                    hoveredElectron={hoveredElectron}
                    onRootChange={(note) => {
                      console.log('InfoBox changing root to:', note);
                      setSelectedRoot(note);
                    }}
                    onSwapChords={handleSwapChords}
                    onDisplayOrderSwap={handleDisplayOrderSwap}
                    displayOrderSwapped={displayOrderSwapped}
                    fretboardOrientation={fretboardOrientation}
                    firstChordColor={firstChordColor}
                    secondChordColor={secondChordColor}
                    electronColor={electronColor}
                  />
                  
                  {/* Show Matrix regardless of chord selection state */}
                  <Matrix 
                    isVisible={true} 
                    onRootChange={(note) => {
                      console.log('Matrix changing root to:', note);
                      // Force update the root selector by setting the state directly
                      setSelectedRoot(note);
                      // Don't deselect chords when changing root
                    }} 
                    selectedRoot={selectedRoot}
                    isExpanded={matrixExpanded}
                    setIsExpanded={setMatrixExpanded}
                  />
                </>
              )}
            </div>
          </div>
        </HomePage>
      } />
      
      {/* Fretboard Route */}
      <Route path="/fretboard" element={<FretboardPage />} />
    </Routes>
  )
}

export default App
