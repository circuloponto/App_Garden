import React from 'react'
import styles from './FretboardDisplayer.module.css'
import Fretboard from './Fretboard'
const FretboardDisplayer = ({ firstChord, secondChord, orientation = 'vertical', firstChordColor = '#f08c00', secondChordColor = '#00e1ff' }) => {

  const mockChord1 = {
    name: 'C7',
    spelling: ['C', 'E', 'G', 'Bb'],
    positions: [
      {string: 6, fret: null},
      {string: 5, fret:5},
      {string: 4, fret:3},
      {string: 3, fret: 5},
      {string: 2, fret:3},
      {string: 1, fret: null},
    ],
    fretStart: 3,
  }
  const mockChord2 = {
    name: 'Eb7',
    positions: [
      {string: 6, fret: null},
      {string: 5, fret:7},
      {string: 4, fret:6},
      {string: 3, fret: 7},
      {string: 2, fret:6},
      {string: 1, fret: null},
    ],
    spelling: ['Eb', 'Gb', 'A', 'Db'],
    fretStart: 5,
  }
  
  // Use passed chord data or fall back to mock data if not provided
  const firstChordData = firstChord || mockChord1;
  const secondChordData = secondChord || mockChord2;
  
  // Log the chord data being passed to the Fretboard components
  console.log('FretboardDisplayer - First chord data:', firstChordData);
  console.log('FretboardDisplayer - Second chord data:', secondChordData);
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '40px'}}>
      <Fretboard 
        chord={firstChordData} 
        type="first" 
        orientation={orientation}
        firstChordColor={firstChordColor}
        secondChordColor={secondChordColor}
      />
      <Fretboard 
        chord={secondChordData} 
        type="second" 
        orientation={orientation}
        firstChordColor={firstChordColor}
        secondChordColor={secondChordColor}
      />
    </div>
  )
}

export default FretboardDisplayer