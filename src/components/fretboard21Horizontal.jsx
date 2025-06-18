import React from 'react'
import styles from './fretboard21Horizontal.module.css'
import classNames from 'classnames'

const Fretboard21Horizontal = ({chord, firstChordColor = '#f08c00', secondChordColor = '#00e1ff'}) => {
  // Define CSS variables for chord colors
  const cssVars = {
    '--first-chord-color': firstChordColor,
    '--second-chord-color': secondChordColor,
  }

  // Strings (from low E to high E)
  const strings = ['E', 'A', 'D', 'G', 'B', 'E']
  
  // Notes for each fret on each string
  const notes = [
    // Low E string (6th string)
    ['E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db'],
    // A string (5th string)
    ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb'],
    // D string (4th string)
    ['D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'],
    // G string (3rd string)
    ['G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E'],
    // B string (2nd string)
    ['B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'],
    // High E string (1st string)
    ['E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db']
  ]

  // Check if a note is in the first chord
  const isNoteInFirstChord = (note) => {
    if (!chord?.firstChordNotes) return false
    
    // Handle notes with enharmonic equivalents (e.g., "F#/Gb")
    if (note.includes('/')) {
      const [note1, note2] = note.split('/')
      return chord.firstChordNotes.includes(note1) || chord.firstChordNotes.includes(note2)
    }
    
    return chord.firstChordNotes.includes(note)
  }
  
  // Check if a note is in the second chord
  const isNoteInSecondChord = (note) => {
    if (!chord?.secondChordNotes) return false
    
    // Handle notes with enharmonic equivalents (e.g., "F#/Gb")
    if (note.includes('/')) {
      const [note1, note2] = note.split('/')
      return chord.secondChordNotes.includes(note1) || chord.secondChordNotes.includes(note2)
    }
    
    return chord.secondChordNotes.includes(note)
  }

  // Check if a note is the root note of the chord
  const isRootNote = (note, root) => {
    if (!root) return false
    
    // Handle notes with enharmonic equivalents
    if (note.includes('/')) {
      const [note1, note2] = note.split('/')
      return note1 === root || note2 === root
    }
    
    return note === root
  }

  // Special fret markers (typically at frets 3, 5, 7, 9, 12, 15, 17, 19, 21)
  const specialFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21]

  return (
    <div 
      className={styles.fretboard}
      style={{ backgroundColor: 'transparent' }}
    >
      {chord && chord.name && (
        <div className={styles.chorNameTitle}>{chord.name}</div>
      )}
      
      <div className={styles.fretboardGrid}>
        {/* String lines */}
        {strings.map((_, stringIndex) => (
          <div 
            key={`string-${stringIndex}`}
            className={styles.stringLine}
            style={{ top: `${stringIndex * 26 + 13}px` }}
          />
        ))}
        
        {/* Fret lines */}
        {[...Array(22)].map((_, fretIndex) => (
          <div 
            key={`fret-${fretIndex}`}
            className={styles.fretLine}
            style={{ 
              left: `${fretIndex * 26 + 13}px`,
              top: '13px'
            }}
          />
        ))}
        
        {/* Notes */}
        {strings.map((_, stringIndex) => (
          [...Array(22)].map((_, fretIndex) => {
            const note = notes[stringIndex][fretIndex]
            const isInFirstChord = isNoteInFirstChord(note)
            const isInSecondChord = isNoteInSecondChord(note)
            const isRoot = chord && isRootNote(note, chord.root)
            const isPositionInChord = chord && chord.positions && 
              chord.positions.some(pos => pos.string === 6-stringIndex && pos.fret === fretIndex)
            
            // Determine note color based on chord membership
            let noteStyle = {}
            if (isInFirstChord && !isInSecondChord) {
              noteStyle = { backgroundColor: firstChordColor }
            } else if (isInSecondChord && !isInFirstChord) {
              noteStyle = { backgroundColor: secondChordColor }
            } else if (isInFirstChord && isInSecondChord) {
              // For notes in both chords, use a gradient
              noteStyle = { 
                background: `linear-gradient(135deg, ${firstChordColor} 0%, ${firstChordColor} 49%, ${secondChordColor} 51%, ${secondChordColor} 100%)` 
              }
            }
            
            return (
              <div 
                key={`note-${stringIndex}-${fretIndex}`}
                className={styles.cell}
                style={{ 
                  gridRow: stringIndex + 1,
                  gridColumn: fretIndex + 1
                }}
              >
                {(isInFirstChord || isInSecondChord) && (
                  <div 
                    className={classNames(
                      styles.note,
                      styles.inChord,
                      isRoot && styles.rootNote
                    )}
                    style={noteStyle}
                  >
                    {note.includes('/') ? note.split('/')[0] : note}
                  </div>
                )}
              </div>
            )
          })
        ))}
        
        {/* Fret numbers */}
        <div className={styles.fretNumbersRow}>
          {[...Array(22)].map((_, fretIndex) => (
            <div 
              key={`fretNum-${fretIndex}`}
              className={styles.fretNumberCell}
              style={{
                gridColumn: fretIndex + 1,
                color: specialFrets.includes(fretIndex) ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'
              }}
            >
              {fretIndex}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Fretboard21Horizontal
