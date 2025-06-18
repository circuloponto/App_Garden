// Array of notes with flat notation (used consistently throughout)
const flatNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];



// Map of interval semitones
const intervalMap = {
  '0': 0,
  '1':1, 
  '2': 2,
  'b3': 3,
  '3': 4,
  '4': 5,
  'b5': 6,
  '5': 7,
  '#5': 8,
  '6': 9,
  'b7': 10,
  '7': 11
};

// Function to get the index of a note
export const getNoteIndex = (note) => {
  const normalizedNote = note.charAt(0).toUpperCase() + note.slice(1);
  return flatNotes.indexOf(normalizedNote);
};

// Function to calculate notes from a root and intervals
export const calculateChordNotes = (root, intervals) => {
  console.log(`Calculating chord notes for root: ${root}, intervals: ${intervals.join(', ')}`);
  const rootIndex = getNoteIndex(root);
  
  if (rootIndex === -1) {
    console.error(`Invalid root note: ${root}`);
    return [];
  }
  
  // For debugging chord five
  const isChordFive = intervals.length === 4 && 
                     intervals.includes("0") && 
                     intervals.includes("4") && 
                     intervals.includes("5") && 
                     intervals.includes("b7");
  
  if (isChordFive) {
    console.log("DEBUGGING CHORD FIVE:");
    console.log("Original intervals:", intervals);
  }
  
  // Always include the root note as the first note in the chord
  // Check if "0" or "1" is already in the intervals to avoid duplicates
  const includesRoot = intervals.includes("0") || intervals.includes("1");
  const notesToCalculate = includesRoot ? [...intervals] : ["0", ...intervals];
  
  if (isChordFive) {
    console.log("After root check - notesToCalculate:", notesToCalculate);
  }
  
  console.log(`Root index: ${rootIndex}, Root note: ${flatNotes[rootIndex]}`);
  console.log(`Includes root interval? ${includesRoot}, Will calculate with: ${notesToCalculate.join(', ')}`);
  
  const result = notesToCalculate.map(interval => {
    const semitones = intervalMap[interval];
    if (semitones === undefined) {
      console.error(`Invalid interval: ${interval}`);
      return null;
    }
    const noteIndex = (rootIndex + semitones) % 12;
    const note = flatNotes[noteIndex];
    console.log(`Interval ${interval} -> ${semitones} semitones -> note ${note}`);
    return note;
  }).filter(note => note !== null);
  
  console.log(`Final chord notes: ${result.join(', ')}`);
  return result;
};

// Function to get the full chord name with root
export const getFullChordName = (root, chordName) => {
  return `${root}${chordName}`;
};

// Function to find a chord type by className
export const findChordTypeByClassName = (chordTypes, className) => {
  return chordTypes.find(chord => chord.className === className);
};

// Function to get the offset root note
export const getOffsetRoot = (root, offset) => {
  if (offset === 0 || offset === undefined || offset === null) {
    return root; // No offset, return original root
  }
  
  // Get the index of the root note
  const rootIndex = getNoteIndex(root);
  if (rootIndex === -1) {
    console.error(`Invalid root note: ${root}`);
    return root;
  }
  
  // Calculate the new index with the offset
  // Add 12 to handle negative offsets
  const newIndex = (rootIndex + offset + 12) % 12;
  return flatNotes[newIndex];
};

// Function to get the root offset for a chord pair
export const getRootOffset = (chordRootOffsets, firstChord, secondChord) => {
  const key = `${firstChord}_${secondChord}`;
  return chordRootOffsets[key] || 0; // Default to 0 if no offset is defined
};

// Function to calculate a scale based on the root note and chord offset
export const calculateScale = (root, chordOffset = 0) => {
  const rootIndex = getNoteIndex(root);
  
  if (rootIndex === -1) {
    console.error(`Invalid root note: ${root}`);
    return [];
  }
  
  // Handle both single offset and array of offsets (for multiple scale alternatives)
  if (Array.isArray(chordOffset)) {
    // Return an object with multiple scales
    return chordOffset.reduce((scales, offset, index) => {
      scales[`scale${index + 1}`] = Array.from({ length: 12 }, (_, i) => {
        const noteIndex = (rootIndex + i + offset) % 12;
        return flatNotes[noteIndex];
      });
      return scales;
    }, {});
  } else {
    // Return a single scale as an array
    return Array.from({ length: 12 }, (_, i) => {
      const noteIndex = (rootIndex + i + chordOffset) % 12;
      return flatNotes[noteIndex];
    });
  }
};
