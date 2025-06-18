import React from 'react'
import Button from './button'
import RootSelector from './RootSelector'
import { FaEye, FaEyeSlash, FaChessBoard, FaSlidersH, FaAtom, FaCog } from 'react-icons/fa'

const Sidebar = ({ 
  onRootChange, 
  onToggleSlides, 
  selectedRoot, 
  onToggleMatrix, 
  matrixExpanded, 
  onToggleElectrons, 
  showElectrons, 
  onOpenSettings,
  onToggleTrichords,
  showTrichords
}) => {
  return (
    <div className='buttons'>
      <Button 
        title="All Electrons" 
        stateOptions={['OFF', 'ON']} 
        icon={FaAtom}
        setViewMode={() => {
          console.log('Sidebar: Calling onToggleElectrons directly');
          onToggleElectrons();
        }}
        activeState={showElectrons ? 1 : 0}
      />
      {/* Only show the trichords button when electrons are enabled */}
      {showElectrons && (
        <Button 
          title="Show Trichords" 
          stateOptions={['OFF', 'ON']} 
          icon={FaEye}
          setViewMode={() => {
            console.log('Sidebar: Calling onToggleTrichords');
            onToggleTrichords();
          }}
          activeState={showTrichords ? 1 : 0}
        />
      )}
   
      <RootSelector 
        options={['C', 'Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']}
        onRootChange={onRootChange}
        selectedRoot={selectedRoot}
        onToggleMatrix={onToggleMatrix}
        matrixExpanded={matrixExpanded}
      />
      <Button 
        title="Slide Presentation" 
        stateOptions={['OFF', 'ON']} 
        setViewMode={(mode) => {
          onToggleSlides();
        }} 
        icon={FaSlidersH}
      />
      <Button 
        title="Settings" 
        stateOptions={['OPEN']} 
        setViewMode={() => {
          onOpenSettings();
        }} 
        icon={FaCog}
      />
    </div>
  )
}

export default Sidebar