import React from 'react';

// This component takes an SVG URL and renders it inline
const SvgComponent = ({ src, alt, className }) => {
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
        
        // Add classes to paths for the color changing useEffect
        const paths = svgElement.querySelectorAll('path');
        paths.forEach(path => {
          if (path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none') {
            path.classList.add('electron-path');
          }
          if (path.getAttribute('fill') && path.getAttribute('fill') !== 'none') {
            path.classList.add('electron-fill');
          }
        });
        
        // Set the innerHTML
        setSvgContent(svgElement.outerHTML);
      })
      .catch(error => console.error('Error loading SVG:', error));
  }, [src]);

  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-label={alt}
    />
  );
};

export default SvgComponent;
