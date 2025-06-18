import React from 'react'
import Fretboard21 from './fretboard21'
import styles from '../components/fretboardDisplayer21.module.css'

const FretboardDisplayer21 = ({ firstChord, secondChord, orientation = 'vertical', firstChordColor = '#f08c00', secondChordColor = '#00e1ff' }) => {

  const mockChord1 = {
    name: 'C7',
    spelling: ['C', 'E', 'G', 'Bb'],
    root: 'C',
    positions: [
      {string: 6, fret: 8},
      {string: 5, fret: 3},
      {string: 4, fret: 5},
      {string: 3, fret: 5},
      {string: 2, fret: 4},
      {string: 1, fret: 3},
    ],
    fretStart: 3,
  }
  
  const mockChord2 = {
    name: 'Eb7',
    spelling: ['Eb', 'G', 'Bb', 'Db'],
    root: 'Eb',
    positions: [
      {string: 6, fret: 6},
      {string: 5, fret: 8},
      {string: 4, fret: 8},
      {string: 3, fret: 8},
      {string: 2, fret: 7},
      {string: 1, fret: 6},
    ],
    fretStart: 6,
  }
  
  // Use passed chord data or fall back to mock data if not provided
  const firstChordData = firstChord || mockChord1;
  const secondChordData = secondChord || mockChord2;
  
  // Log the chord data being passed to the Fretboard components
  console.log('FretboardDisplayer21 - First chord data:', firstChordData);
  console.log('FretboardDisplayer21 - Second chord data:', secondChordData);
  
  return (
    <div className={`${styles.fretboardDisplayer} ${styles[orientation]}`}>
      <Fretboard21 
        chord={firstChordData} 
        type="first" 
        orientation={orientation}
        firstChordColor={firstChordColor}
        secondChordColor={secondChordColor}
      />
      <Fretboard21 
        chord={secondChordData}
        type="second" 
        orientation={orientation}
        firstChordColor={firstChordColor}
        secondChordColor={secondChordColor}
      />
    </div>
  )
}

export default FretboardDisplayer21