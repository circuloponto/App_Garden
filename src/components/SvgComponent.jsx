import React from 'react';

// This component takes an SVG URL and renders it inline
const SvgComponent = ({ src, alt, className, electronColor, trichordColor }) => {
  const [svgContent, setSvgContent] = React.useState('');

  React.useEffect(() => {
    console.log('SvgComponent rendering with props:', { src, electronColor, trichordColor, className });
    // Fetch the SVG content
    fetch(src)
      .then(response => response.text())
      .then(text => {
        // Extract SVG content and add appropriate classes for styling
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        // Determine if this is a trichord or electron SVG based on className
        const isTrichord = className && className.includes('trichord');
        
        // Get the color to use based on component type
        let color;
        if (isTrichord) {
          color = trichordColor !== '#ffffff' ? trichordColor : '#be4bdb';
        } else {
          color = electronColor !== '#ffffff' ? electronColor : '#be4bdb';
        }
        
        // Add classes to paths and apply color directly
        if (isTrichord) {
          // First try to find paths with trichord_electron class
          const trichordElectronPaths = svgElement.querySelectorAll('.trichord_electron path, path.trichord_electron');
          
          if (trichordElectronPaths.length > 0 && electronColor) {
            console.log('Found trichord_electron paths, applying electron color:', electronColor);
            // Apply electron color to all paths with trichord_electron class
            trichordElectronPaths.forEach(path => {
              if (path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none') {
                path.classList.add('electron-path');
                path.setAttribute('stroke', electronColor);
              }
              
              if (path.getAttribute('fill') && path.getAttribute('fill') !== 'none') {
                path.classList.add('electron-fill');
                path.setAttribute('fill', electronColor);
              }
            });
          } else {
            // If no trichord_electron paths found, apply color to all purple paths
            // This ensures backward compatibility with SVGs that don't have the class
            const allPaths = svgElement.querySelectorAll('path');
            
            allPaths.forEach(path => {
              const strokeColor = path.getAttribute('stroke');
              const fillColor = path.getAttribute('fill');
              
              // Check if the path has a purple-ish color (common in trichord SVGs)
              const isPurplePath = 
                (strokeColor && (strokeColor.includes('#be4bdb') || strokeColor.includes('#9c36b5') || 
                               strokeColor.includes('#862e9c') || strokeColor.includes('#purple'))) ||
                (fillColor && (fillColor.includes('#be4bdb') || fillColor.includes('#9c36b5') || 
                             fillColor.includes('#862e9c') || fillColor.includes('#purple')));
              
              if (isPurplePath) {
                // Add the trichord_electron class for future reference
                path.classList.add('trichord_electron');
                
                if (strokeColor && strokeColor !== 'none') {
                  path.classList.add('trichord-path');
                  path.setAttribute('stroke', color);
                }
                
                if (fillColor && fillColor !== 'none') {
                  path.classList.add('trichord-fill');
                  path.setAttribute('fill', color);
                }
              }
            });
          }
        } else {
          // For electrons, continue with the existing behavior
          const paths = svgElement.querySelectorAll('path');
          paths.forEach(path => {
            if (path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none') {
              path.classList.add('electron-path');
              path.setAttribute('stroke', color);
            }
            if (path.getAttribute('fill') && path.getAttribute('fill') !== 'none') {
              path.classList.add('electron-fill');
              path.setAttribute('fill', color);
            }
          });
        }
        
        // Apply drop-shadow filter directly to SVG, but not for trichords in InfoBox
        if (color !== '#ffffff' && !(className && className.includes('trichordSvg'))) {
          // Convert hex color to rgba for the drop-shadow
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          
          // Apply the drop-shadow filter with the selected color
          svgElement.setAttribute('filter', `drop-shadow(0 0 8px rgba(${r}, ${g}, ${b}, 1))`);
        } else if (className && className.includes('trichordSvg')) {
          // Explicitly remove all filter and shadow effects for trichords in InfoBox
          svgElement.removeAttribute('filter');
          svgElement.style.filter = 'none';
          svgElement.style.boxShadow = 'none';
          svgElement.style.textShadow = 'none';
          
          // Remove any filter-related attributes
          const filterAttrs = ['filter', 'drop-shadow', 'box-shadow', 'text-shadow'];
          filterAttrs.forEach(attr => svgElement.removeAttribute(attr));
          
          // Also remove any filter from ALL child elements
          const allElements = svgElement.querySelectorAll('*');
          allElements.forEach(el => {
            // Remove all filter-related attributes
            filterAttrs.forEach(attr => el.removeAttribute(attr));
            
            // Remove all filter-related styles
            el.style.filter = 'none';
            el.style.webkitFilter = 'none';
            el.style.mozFilter = 'none';
            el.style.msFilter = 'none';
            el.style.oFilter = 'none';
            el.style.boxShadow = 'none';
            el.style.textShadow = 'none';
          });
        } else {
          // Reset to default purple color
          svgElement.setAttribute('filter', 'drop-shadow(0 0 8px rgba(218, 119, 242, 1))');
        }
        
        // Set the innerHTML
        setSvgContent(svgElement.outerHTML);
      })
      .catch(error => console.error('Error loading SVG:', error));
  }, [src, electronColor, trichordColor, className]);

  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-label={alt}
    />
  );
};

export default SvgComponent;
