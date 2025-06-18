import React from 'react';

// This component takes an SVG URL and renders it inline
const SvgComponent = ({ src, alt, className, electronColor, trichordColor }) => {
  const [svgContent, setSvgContent] = React.useState('');

  React.useEffect(() => {
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
          // For trichords, only target paths within g elements with class 'trichord_electron'
          const trichordElectronGroups = svgElement.querySelectorAll('g.trichord_electron');
          
          trichordElectronGroups.forEach(group => {
            const paths = group.querySelectorAll('path');
            paths.forEach(path => {
              if (path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none') {
                path.classList.add('trichord-path');
                path.setAttribute('stroke', color);
              }
              if (path.getAttribute('fill') && path.getAttribute('fill') !== 'none') {
                path.classList.add('trichord-fill');
                path.setAttribute('fill', color);
              }
            });
          });
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
        
        // Apply drop-shadow filter directly to SVG
        if (color !== '#ffffff') {
          // Convert hex color to rgba for the drop-shadow
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          
          // Apply the drop-shadow filter with the selected color
          svgElement.setAttribute('filter', `drop-shadow(0 0 8px rgba(${r}, ${g}, ${b}, 1))`);
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
