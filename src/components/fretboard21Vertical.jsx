import React from 'react'
import styles from './fretboard21Vertical.module.css'
import classNames from 'classnames'

const Fretboard21Vertical = ({chord, firstChordColor = '#f08c00', secondChordColor = '#00e1ff', flipStrings = false, scalePattern = null, showAllScale = false, clearAll = false, arpeggioData = null, selectedStringSet = null}) => {
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

  // Check if a position is in the current scale pattern
  const isInScalePattern = (stringIndex, fretIndex) => {
    if (!scalePattern || !scalePattern.notes) return false
    return scalePattern.notes.some(pos => pos.string === stringIndex && pos.fret === fretIndex)
  }

  // Check if a position is in the all scale notes
  const isInAllScale = (stringIndex, fretIndex) => {
    if (!showAllScale || !chord?.allScaleNotes) return false
    return chord.allScaleNotes.some(pos => pos.string === stringIndex && pos.fret === fretIndex)
  }

  // Check if a position is a root note in scale pattern
  const isRootInPattern = (stringIndex, fretIndex) => {
    if (!scalePattern || !scalePattern.notes) return false
    const patternNote = scalePattern.notes.find(pos => pos.string === stringIndex && pos.fret === fretIndex)
    return patternNote && patternNote.isRoot
  }

  // Check if a position is in the current arpeggio
  const isInArpeggio = (stringIndex, fretIndex) => {
    if (!arpeggioData || !arpeggioData.positions) return false
    return arpeggioData.positions.some(pos => pos.string === stringIndex && pos.fret === fretIndex)
  }

  // Check if a position is currently being played in the arpeggio sequence
  const isCurrentArpeggioNote = (stringIndex, fretIndex) => {
    if (!arpeggioData || !arpeggioData.isPlaying || arpeggioData.currentStep < 0) return false
    
    const currentStepPositions = arpeggioData.positions.filter(pos => 
      pos.arpeggioNoteIndex === arpeggioData.currentStep
    )
    
    return currentStepPositions.some(pos => pos.string === stringIndex && pos.fret === fretIndex)
  }

  // Check if a position is an arpeggio root note
  const isArpeggioRoot = (stringIndex, fretIndex) => {
    if (!arpeggioData || !arpeggioData.positions) return false
    const arpeggioNote = arpeggioData.positions.find(pos => pos.string === stringIndex && pos.fret === fretIndex)
    return arpeggioNote && arpeggioNote.isArpeggioRoot
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

  // Special fret markers (standard guitar fret markers)
  const specialFrets = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21]

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
            style={{ top: `${(flipStrings ? (strings.length - 1 - stringIndex) : stringIndex) * 26 + 13}px` }}
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
        {strings.map((_, stringIndex) => {
          // Check if this string should be shown based on selected string set
          const shouldShowString = !selectedStringSet || 
            selectedStringSet.strings.includes(stringIndex);
          
          return [...Array(22)].map((_, fretIndex) => {
            const note = notes[stringIndex][fretIndex]
            const isInFirstChord = isNoteInFirstChord(note)
            const isInSecondChord = isNoteInSecondChord(note)
            const isRoot = chord && isRootNote(note, chord.root)
            const isPositionInChord = chord && chord.positions && 
              chord.positions.some(pos => pos.string === 6-stringIndex && pos.fret === fretIndex)
            
            // Check scale pattern conditions
            const inScalePattern = isInScalePattern(stringIndex, fretIndex)
            const inAllScale = showAllScale && isInAllScale(stringIndex, fretIndex) // Only check if showAllScale is true
            const isPatternRoot = isRootInPattern(stringIndex, fretIndex)
            
            // Check arpeggio conditions
            const inArpeggio = isInArpeggio(stringIndex, fretIndex)
            const isCurrentlyPlaying = isCurrentArpeggioNote(stringIndex, fretIndex)
            const isArpRoot = isArpeggioRoot(stringIndex, fretIndex)
            
            // Determine what to show based on mode
            let shouldShow = false
            let noteStyle = {}
            let noteClass = styles.note
            
            if (clearAll) {
              // Clear all mode - show nothing
              shouldShow = false
            } else if (arpeggioData) {
              // Arpeggio mode - ONLY show arpeggio notes, hide everything else
              if (inArpeggio) {
                shouldShow = true
                if (isCurrentlyPlaying) {
                  // Currently playing note - bright highlight with pulse
                  noteStyle = { 
                    backgroundColor: '#ffff00', // Bright yellow for current note
                    border: '3px solid #ff0000',
                    boxShadow: '0 0 15px #ffff00',
                    animation: 'pulse 0.5s infinite'
                  }
                  noteClass = classNames(styles.note, styles.arpeggioNote, styles.currentNote)
                } else if (isArpRoot) {
                  // Arpeggio root note
                  noteStyle = { 
                    backgroundColor: '#ff6b6b',
                    border: '3px solid #ffffff'
                  }
                  noteClass = classNames(styles.note, styles.arpeggioNote, styles.arpeggioRoot)
                } else {
                  // Regular arpeggio note
                  noteStyle = { 
                    backgroundColor: '#4ecdc4',
                    border: '2px solid #333333'
                  }
                  noteClass = classNames(styles.note, styles.arpeggioNote)
                }
              } else {
                // When arpeggio is active, hide all non-arpeggio notes
                shouldShow = false
              }
            } else if (scalePattern && inScalePattern) {
              // Scale pattern mode - show only pattern notes (when no arpeggio active)
              shouldShow = true
              noteStyle = { 
                backgroundColor: isPatternRoot ? firstChordColor : secondChordColor,
                border: isPatternRoot ? '3px solid #ffffff' : '2px solid #333333'
              }
              noteClass = classNames(styles.note, styles.scaleNote, isPatternRoot && styles.rootNote)
            } else if (showAllScale && inAllScale) {
              // Show all scale mode - show all scale notes (only when explicitly enabled)
              shouldShow = true
              noteStyle = { 
                backgroundColor: firstChordColor,
                border: '2px solid #333333'
              }
              noteClass = classNames(styles.note, styles.scaleNote)
            } else if (showAllScale && (isInFirstChord || isInSecondChord)) {
              // Show all chord notes when in show all scale mode
              shouldShow = true
              if (isInFirstChord && !isInSecondChord) {
                noteStyle = { backgroundColor: firstChordColor }
                noteClass = classNames(styles.note, styles.inChord, isRoot && styles.rootNote)
              } else if (isInSecondChord && !isInFirstChord) {
                noteStyle = { backgroundColor: secondChordColor }
                noteClass = classNames(styles.note, styles.inChord, isRoot && styles.rootNote)
              } else if (isInFirstChord && isInSecondChord) {
                noteStyle = { 
                  background: `linear-gradient(135deg, ${firstChordColor} 0%, ${firstChordColor} 49%, ${secondChordColor} 51%, ${secondChordColor} 100%)` 
                }
                noteClass = classNames(styles.note, styles.inChord, isRoot && styles.rootNote)
              }
            } else if (!scalePattern && !showAllScale) {
              // Default chord mode - only show chord notes, not scale notes
              if (isInFirstChord && !isInSecondChord) {
                shouldShow = true
                noteStyle = { backgroundColor: firstChordColor }
                noteClass = classNames(styles.note, styles.inChord, isRoot && styles.rootNote)
              } else if (isInSecondChord && !isInFirstChord) {
                shouldShow = true
                noteStyle = { backgroundColor: secondChordColor }
                noteClass = classNames(styles.note, styles.inChord, isRoot && styles.rootNote)
              } else if (isInFirstChord && isInSecondChord) {
                shouldShow = true
                noteStyle = { 
                  background: `linear-gradient(135deg, ${firstChordColor} 0%, ${firstChordColor} 49%, ${secondChordColor} 51%, ${secondChordColor} 100%)` 
                }
                noteClass = classNames(styles.note, styles.inChord, isRoot && styles.rootNote)
              }
              // Explicitly don't show anything else in default mode
            }
            
            // Apply string set filter - only show notes on selected strings
            if (!shouldShowString) {
              shouldShow = false;
            }
            
            return (
              <div 
                key={`note-${stringIndex}-${fretIndex}`}
                className={styles.cell}
                style={{ 
                  gridRow: (flipStrings ? (strings.length - stringIndex) : (stringIndex + 1)),
                  gridColumn: fretIndex + 1,
                  transform: 'translateX(13px) translateY(13px)' // Move right to center between frets, down to sit on correct string line
                }}
              >
                {shouldShow && (
                  <div 
                    className={noteClass}
                    style={noteStyle}
                  >
                    {note.includes('/') ? note.split('/')[0] : note}
                  </div>
                )}
              </div>
            )
          });
        })}
        
        {/* Fret numbers */}
        <div className={styles.fretNumbersRow}>
          {[...Array(22)].map((_, fretIndex) => (
            <div 
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

export default Fretboard21Vertical
