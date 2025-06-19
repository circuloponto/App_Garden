import React from 'react'

import { connections, connections2 } from '../data/connections';
import raiwbow1 from '../assets/SVGs/rainbow1.svg';
import sixteenToEighteen from '../assets/SVGs/sixteenToEighteen.svg';
import eighteenToThree from '../assets/SVGs/eighteenToThree.svg';
import sixteenToThree from '../assets/SVGs/sixteenToThree.svg';
import eightToThree from '../assets/SVGs/eightToThree.svg';
const svgMap = {
  raiwbow1,
  sixteenToEighteen,
  eighteenToThree,
  sixteenToThree,
  eightToThree,
};

const Connections = ({ viewMode, selectedChords }) => {
  // Create a wrapper with fixed dimensions to prevent layout shifts
  // In "fruits" mode, show only connections between the two selected chords
  if (viewMode === 'fruits') {
    if (selectedChords.length !== 2) return null;
    const [chordA, chordB] = selectedChords;
    
    // If the same chord is selected twice (dittoScale), don't show any connections
    if (chordA === chordB) {
      return null;
    }
    
    const visibleConnections = connections.filter(
      c =>
        (c.from === chordA && c.to === chordB) ||
        (c.from === chordB && c.to === chordA)
    );
    return (
      <div className='allConnections'>
        {visibleConnections.map(conn => (
          conn.svg && svgMap[conn.svg] ? (
            <img
              key={`fruits-${conn.from}-${conn.to}-${conn.className}`}
              src={svgMap[conn.svg]}
              className={`connection ${conn.className || '' }`}
              alt="connection-svg"
            />
          ) : (
            <div key={`fruits-${conn.from}-${conn.to}-${conn.className}-div`} className={`connection ${conn.className }`}></div>
          )
        ))}
       {/*  <div className="squared"></div> */}
      </div>
    );
  }

  // In "connections" mode, implement the new filtering logic
  if (viewMode === 'connections') {
    // If no chords are selected, show all connections
    if (selectedChords.length === 0) {
      return (
        <div className='allConnections'>
          {/* Show connections from the original connections array */}
          {connections.map(conn => (
            conn.svg && svgMap[conn.svg] ? (
              <img
                key={`zero-${conn.from}-${conn.to}-${conn.className}`}
                src={svgMap[conn.svg]}
                className={`connection ${conn.className || '' }`}
                alt="connection-svg"
              />
            ) : (
              <div key={`zero-${conn.from}-${conn.to}-${conn.className}-div`} className={`connection ${conn.className}`}></div>
            )
          ))}
          
          {/* Also show connections from connections2 array */}
          {connections2.flatMap(conn => {
            return conn.classNames.map((className, index) => {
              // Create a unique key using chord names, className and index
              const uniqueKey = `zero-${conn.chords.join('-')}-${className}-${index}`;
              
              if (conn.svg && svgMap[conn.svg]) {
                return (
                  <img
                    key={uniqueKey}
                    src={svgMap[conn.svg]}
                    className={`connection ${className}`}
                    alt={`Connection between ${conn.chords.join(' and ')}`}
                  />
                );
              } else {
                return (
                  <div 
                    key={uniqueKey} 
                    className={`connection ${className}`}
                  ></div>
                );
              }
            });
          })}
        </div>
      );
    }

    // If one chord is selected, show all connections related to that chord
    if (selectedChords.length === 1) {
      const selectedChord = selectedChords[0];
      // Only show connections that explicitly include the selected chord
      const relevantConnections = connections2.filter(conn => 
        conn.chords.includes(selectedChord)
      );

      console.log(`Selected chord: ${selectedChord}`);
      console.log('Relevant connections:', relevantConnections);
      
      // Special debugging for seventeen
      if (selectedChord === 'seventeen') {
        console.log('SEVENTEEN SELECTED!');
        const seventeenToSixteen = connections2.filter(conn => 
          conn.chords.includes('seventeen') && conn.chords.includes('sixteen')
        );
        console.log('Found connections with sixteen:', seventeenToSixteen);
        
        // Check if the CSS class exists in the DOM
        if (seventeenToSixteen.length > 0) {
          console.log('CSS classes to look for:', seventeenToSixteen[0].classNames);
          setTimeout(() => {
            seventeenToSixteen[0].classNames.forEach(className => {
              const elements = document.querySelectorAll(`.${className}`);
              console.log(`Found ${elements.length} elements with class ${className}`);
            });
          }, 100);
        }
      }
      
      return (
        <div className='allConnections'>
          {relevantConnections.flatMap(conn => {
            // For debugging
            console.log(`Connection for ${conn.chords.join('-')}:`, conn);
            
            return conn.classNames.map((className, index) => {
              // Create a unique key using chord names, className and index
              const uniqueKey = `${conn.chords.join('-')}-${className}-${index}`;
              
              // Only render this connection if it's actually related to the selected chord
              if (conn.svg && svgMap[conn.svg]) {
                return (
                  <img
                    key={uniqueKey}
                    src={svgMap[conn.svg]}
                    className={`connection ${className}`}
                    alt={`Connection between ${conn.chords.join(' and ')}`}
                  />
                );
              } else {
                return (
                  <div 
                    key={uniqueKey} 
                    className={`connection ${className}`}
                  ></div>
                );
              }
            });
          })}
        </div>
      );
    }

    // If two chords are selected, show only connections between those two chords
    if (selectedChords.length === 2) {
      const [chordA, chordB] = selectedChords;
      
      // If the same chord is selected twice (dittoScale), don't show any connections
      if (chordA === chordB) {
        console.log('Same chord selected twice - hiding all connections');
        return null;
      }
      
      // Find the exact connection between the two selected chords
      const connectionBetweenSelected = connections2.find(conn => 
        conn.chords.includes(chordA) && conn.chords.includes(chordB)
      );

      console.log(`Selected chords: ${chordA} and ${chordB}`);
      console.log('Connection between selected:', connectionBetweenSelected);

      if (!connectionBetweenSelected) return null;

      return (
        <div className='allConnections'>
          {connectionBetweenSelected.classNames.map(className => {
            if (connectionBetweenSelected.svg && svgMap[connectionBetweenSelected.svg]) {
              return (
                <img
                  key={`${chordA}-${chordB}-${className}`}
                  src={svgMap[connectionBetweenSelected.svg]}
                  className={`connection ${className}`}
                  alt={`Connection between ${chordA} and ${chordB}`}
                />
              );
            } else {
              return (
                <div 
                  key={`${chordA}-${chordB}-${className}`} 
                  className={`connection ${className}`}
                ></div>
              );
            }
          })}
        </div>
      );
    }
  }

  // Default return if none of the conditions match
  return null;
};


export default Connections;