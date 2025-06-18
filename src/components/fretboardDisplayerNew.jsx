import React from 'react'
import styles from './fretboardDisplayerNew.module.css'
import Fretboard21Horizontal from './fretboard21Horizontal'
import Fretboard21Vertical from './fretboard21Vertical'

const FretboardDisplayerNew = ({firstChord, secondChord, orientation = 'vertical', firstChordColor = '#f08c00', secondChordColor = '#00e1ff'}) => {
  // Use different components based on orientation
  const FretboardComponent = orientation === 'vertical' 
    ? Fretboard21Vertical 
    : Fretboard21Horizontal

  // Combine both chord data for a single fretboard display
  const combinedChord = {
    name: firstChord?.name || 'Scale',
    root: firstChord?.root || 'C',
    spelling: firstChord?.spelling || [],
    // Combine positions from both chords with their respective colors
    positions: [
      ...(firstChord?.positions?.map(pos => ({ ...pos, color: firstChordColor })) || []),
      ...(secondChord?.positions?.map(pos => ({ ...pos, color: secondChordColor })) || [])
    ],
    // Pass both chord spellings separately for coloring
    firstChordNotes: firstChord?.spelling || [],
    secondChordNotes: secondChord?.spelling || []
  }

  return (
    <div className={`${styles.fretboardDisplayer} ${styles[orientation]}`}>
      <FretboardComponent
        chord={combinedChord}
        firstChordColor={firstChordColor}
        secondChordColor={secondChordColor}
      />
    </div>
  )
}

export default FretboardDisplayerNew
