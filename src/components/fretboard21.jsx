import React, { useState } from 'react'
import styles from './fretboardDisplayer21.module.css'
import classNames from 'classnames';

const Fretboard21 = ({chord, type, orientation = 'vertical', firstChordColor = '#f08c00', secondChordColor = '#00e1ff'}) => {
  const {name, fretStart, positions = [], spelling = [], root} = chord;
  
  // Use the spelling array from the chord data
  const chordNotes = spelling || [];
  
  // Extended notes array for all 21 frets plus open strings
  const [notes] = useState([
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'], 
    ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], 
    ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'], 
    ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], 
    ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'], 
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'], 
  ]);
  
  // Define enharmonic equivalents for note comparison
  const enharmonicMap = {
    'C#': 'Db', 'Db': 'C#',
    'D#': 'Eb', 'Eb': 'D#',
    'F#': 'Gb', 'Gb': 'F#',
    'G#': 'Ab', 'Ab': 'G#',
    'A#': 'Bb', 'Bb': 'A#'
  };

  // Function to check if a note is in the chord
  const isNoteInChord = (note) => {
    // Direct match
    if (chordNotes.includes(note)) {
      return true;
    }
    
    // Check enharmonic equivalent
    if (enharmonicMap[note] && chordNotes.includes(enharmonicMap[note])) {
      return true;
    }
    
    return false;
  };

  // Function to check if a position is in the chord's positions array
  const isPositionInChord = (string, fret) => {
    return positions.some(pos => pos.string === string + 1 && pos.fret === fret);
  };

  // Create a grid of cells for the fretboard
  const renderFretboard = () => {
    const cells = [];
    
    // Add special fret markers for important positions
    const specialFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21];
    
    // Add notes and create the grid
    for (let string = 0; string < 6; string++) {
      for (let fret = 0; fret < 22; fret++) { // 0-21 frets (0 is open string)
        const note = notes[string][fret];
        const isInChord = isNoteInChord(note);
        const positionInChord = isPositionInChord(string, fret);
        const isRoot = note === root || (enharmonicMap[note] && enharmonicMap[note] === root);
        
        // Add special fret marker background
        if (string === 0 && specialFrets.includes(fret)) {
          cells.push(
            <div 
              key={`marker-${fret}`}
              className={`${styles.fretMarker} ${styles[`fretMarker${fret}`]}`}
              style={{ 
                gridColumn: fret + 1,
                gridRow: '1 / span 6'
              }}
            />
          );
        }
        
        cells.push(
          <div 
            key={`cell-${string}-${fret}`} 
            className={styles.cell}
            style={{ 
              gridRow: string + 1, 
              gridColumn: fret + 1,
            }}
          >
            <div 
              className={classNames(
                styles.note,
                {
                  [styles.inChord]: isInChord && !type,
                  [styles.firstChord]: isInChord && type === 'first',
                  [styles.secondChord]: isInChord && type === 'second',
                  [styles.root]: isRoot
                }
              )}
              style={{
                backgroundColor: isInChord ? 
                  (type === 'first' ? firstChordColor : 
                   type === 'second' ? secondChordColor : 
                   'white') : 
                  'transparent',
                boxShadow: isInChord ? '0 0 5px rgba(0, 0, 0, 0.8)' : 'none',
                border: positionInChord ? '2px solid white' : 'none'
              }}
            >
              {isInChord ? note : ''}
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
        {[...Array(23)].map((_, i) => (
          <div 
            key={`fret-${i}`} 
            className={styles.fretLine}
            style={{ 
              gridColumn: i + 1,
              backgroundColor: [0, 3, 5, 7, 9, 12, 15, 17, 19, 21].includes(i) ? 
                'rgba(255, 255, 255, 0.8)' : 
                'rgba(255, 255, 255, 0.3)'
            }}
          ></div>
        ))}
        
        {/* Notes */}
        {renderFretboard()}
        
        {/* Fret numbers */}
        <div className={styles.fretNumbersRow}>
          {[...Array(22)].map((_, i) => (
            <div 
              key={`fretNum-${i}`} 
              className={styles.fretNumberCell} 
              style={{ 
                gridColumn: i + 1,
                display: [0, 3, 5, 7, 9, 12, 15, 17, 19, 21].includes(i) ? 'block' : 'none'
              }}>
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Fretboard21