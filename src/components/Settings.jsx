import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './Settings.css';

const Settings = ({ 
  isOpen, 
  onClose, 
  fretboardOrientation, 
  setFretboardOrientation, 
  firstChordColor, 
  secondChordColor, 
  electronColor,
  setFirstChordColor, 
  setSecondChordColor,
  setElectronColor
}) => {
  const [localFirstColor, setLocalFirstColor] = useState(firstChordColor);
  const [localSecondColor, setLocalSecondColor] = useState(secondChordColor);
  const [localElectronColor, setLocalElectronColor] = useState(electronColor);

  const handleSave = () => {
    setFirstChordColor(localFirstColor);
    setSecondChordColor(localSecondColor);
    setElectronColor(localElectronColor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header" onClick={(e) => e.stopPropagation()}>
          <h2>Settings</h2>
          <button className="close-button" onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>
            <FaTimes />
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Fretboard Orientation</h3>
            <div className="orientation-options" onClick={(e) => e.stopPropagation()}>
              <label className={`orientation-option ${fretboardOrientation === 'vertical' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="orientation"
                  value="vertical"
                  checked={fretboardOrientation === 'vertical'}
                  onChange={(e) => {
                    e.stopPropagation();
                    setFretboardOrientation('vertical');
                  }}
                />
                <div className="orientation-visual vertical-visual">
                  <div className="fretboard-preview vertical"></div>
                </div>
                <span>Vertical</span>
              </label>
              
              <label className={`orientation-option ${fretboardOrientation === 'horizontal' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="orientation"
                  value="horizontal"
                  checked={fretboardOrientation === 'horizontal'}
                  onChange={(e) => {
                    e.stopPropagation();
                    setFretboardOrientation('horizontal');
                  }}
                />
                <div className="orientation-visual horizontal-visual">
                  <div className="fretboard-preview horizontal"></div>
                </div>
                <span>Horizontal</span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Chord Colors</h3>
            <div className="color-settings" onClick={(e) => e.stopPropagation()}>
              <div className="color-option">
                <label>First Chord Color</label>
                <div className="color-preview" style={{ backgroundColor: localFirstColor }}></div>
                <input
                  type="color"
                  value={localFirstColor}
                  onChange={(e) => {
                    e.stopPropagation();
                    setLocalFirstColor(e.target.value);
                  }}
                />
              </div>
              
              <div className="color-option">
                <label>Second Chord Color</label>
                <div className="color-preview" style={{ backgroundColor: localSecondColor }}></div>
                <input
                  type="color"
                  value={localSecondColor}
                  onChange={(e) => {
                    e.stopPropagation();
                    setLocalSecondColor(e.target.value);
                  }}
                />
              </div>
              
              <div className="color-option">
                <label>Electron Color</label>
                <div className="color-preview" style={{ backgroundColor: localElectronColor }}></div>
                <input
                  type="color"
                  value={localElectronColor}
                  onChange={(e) => {
                    e.stopPropagation();
                    setLocalElectronColor(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="settings-footer" onClick={(e) => e.stopPropagation()}>
          <button className="cancel-button" onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>Cancel</button>
          <button className="save-button" onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
