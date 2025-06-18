import React, { useState, useContext } from 'react'
import styles from './fretboard.module.css'
import classNames from 'classnames';

const Fretboard = ({chord, type, orientation = 'vertical', firstChordColor = '#f08c00', secondChordColor = '#00e1ff'}) => {
  const {name, fretStart, positions, spelling = [], root} = chord;
  // Ensure fretStart is at least 1 to avoid negative indices
  const startFret = Math.max(1, fretStart);
  
  // Use the spelling array from the chord data
  const chordNotes = spelling || [];
  
  // Use chord notes for highlighting on the fretboard
  
  const [notes] = useState([
    ['E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E'], 
    ['B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'], 
    ['G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'], 
    ['D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D'], 
    ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A'], 
    ['E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E'], 
  ]);
  
  // Get the 6 notes for each string starting from startFret - 1
  const visibleNotes = notes.map(stringNotes => {
    // Slice 6 notes starting from startFret - 1 (0-indexed)
    return stringNotes.slice(startFret - 1, startFret + 5);
  });
  
  // Define enharmonic equivalents for note comparison
  const enharmonicMap = {
    'C#': 'Db', 'Db': 'C#',
    'D#': 'Eb', 'Eb': 'D#',
    'F#': 'Gb', 'Gb': 'F#',
    'G#': 'Ab', 'Ab': 'G#',
    'A#': 'Bb', 'Bb': 'A#'
  };

  // Function to check if a position should be displayed
  const shouldShowPosition = (string, fretIndex) => {
    // Always return true to show all notes that are in the chord
    // This ensures all chord notes are highlighted regardless of positions
    return true;
  };

  // Create a grid of cells for the fretboard
  const renderFretboard = () => {
    const cells = [];
    
    // Add notes and create the grid
    for (let string = 0; string < 6; string++) {
      for (let fret = 0; fret < 6; fret++) {
        const note = visibleNotes[string][fret];
        const shouldShow = shouldShowPosition(string, fret);
        
        // Check if the note is in the chord directly
        let isInChord = false;
        
        // Direct match
        if (chordNotes.includes(note)) {
          isInChord = true;
        } 
        // Check enharmonic equivalent
        else if (enharmonicMap[note] && chordNotes.includes(enharmonicMap[note])) {
          isInChord = true;
        }
        
        cells.push(
          <div 
            key={`cell-${string}-${fret}`} 
            className={styles.cell}
            style={{ gridRow: string + 1, gridColumn: fret + 1 }}
          >
            <div 
              className={classNames(
                styles.note,
                {
                  [styles.inChord]: isInChord && shouldShow && !type,
                  [styles.firstChord]: isInChord && shouldShow && type === 'first',
                  [styles.secondChord]: isInChord && shouldShow && type === 'second'
                }
              )}
              style={{
                backgroundColor: isInChord && shouldShow ? 'white' : 'transparent',
                boxShadow: isInChord && shouldShow ? '0 0 5px rgba(0, 0, 0, 0.8)' : 'none'
              }}
            >
              {isInChord && shouldShow ? note : ''}
            </div>
          </div>
        );
      }
    }
    
    return cells;
  };

  // Determine the background color based on type and custom colors
  const backgroundColor = type === 'first' ? firstChordColor : secondChordColor;
  
  return (
    <div 
      className={`${styles.fretboard} ${type === 'first' ? styles.firstFretboard : styles.secondFretboard} ${styles[orientation]}`}
      style={{
        backgroundColor: backgroundColor
      }}>
      <div className={styles.chorNameTitle} style={{ color: type === 'first' ? firstChordColor : secondChordColor }}>{name}</div>
      
      <div className={styles.fretboardGrid}>
        {/* Horizontal string lines */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={`string-${i}`} 
            className={styles.stringLine}
            style={{ gridRow: i + 1 }}
          ></div>
        ))}
        
        {/* Vertical fret lines */}
        {[...Array(7)].map((_, i) => (
          <div 
            key={`fret-${i}`} 
            className={styles.fretLine}
            style={{ gridColumn: i + 1 }}
          ></div>
        ))}
        
        {/* Notes */}
        {renderFretboard()}
        
        {/* Fret numbers */}
        <div className={styles.fretNumbersRow}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={`fretNum-${i}`} 
              className={styles.fretNumberCell} 
              style={{ gridColumn: i + 1 }}>
              {startFret + i - 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Fretboard