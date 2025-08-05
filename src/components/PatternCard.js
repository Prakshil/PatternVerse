import React from 'react';

const PatternCard = ({ pattern, onPreview, onGetCode, onApplyPattern, index }) => {
  const getPatternStyle = () => {
    const style = {};

    // Set the correct background color based on the pattern
    if (pattern.backgroundColor) {
      style.backgroundColor = pattern.backgroundColor;
    } else if (pattern.category === 'dark') {
      style.backgroundColor = '#1e293b';
    } else {
      style.backgroundColor = '#ffffff';
    }

    if (pattern.css.includes('backgroundImage') || pattern.css.includes('linear-gradient') || pattern.css.includes('radial-gradient')) {
      style.backgroundImage = pattern.css;
    } else {
      style.background = pattern.css;
    }
    
    if (pattern.backgroundSize) style.backgroundSize = pattern.backgroundSize;
    if (pattern.backgroundPosition) style.backgroundPosition = pattern.backgroundPosition;
    if (pattern.backgroundRepeat) style.backgroundRepeat = pattern.backgroundRepeat;
    if (pattern.filter) style.filter = pattern.filter;
    if (pattern.opacity) style.opacity = pattern.opacity;
    if (pattern.mixBlendMode) style.mixBlendMode = pattern.mixBlendMode;

    return style;
  };

  return (
    <div className="group animate-fadeIn">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col relative">
        {/* Pattern Preview */}
        <div 
          className="h-40 w-full relative overflow-hidden"
          style={getPatternStyle()}
        />

        {/* Card Content - This should remain white for readability */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-white">
          <div className="h-16 flex flex-col justify-start mb-3">
            <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
              {pattern.name}
            </h3>
            {pattern.category === 'dark' && (
              <span className="text-xs text-gray-500 mt-1">Dark Theme</span>
            )}
          </div>
        </div>

        {/* Hover Overlay with Buttons - covers entire card for consistent hover */}
        <div className="absolute inset-0 z-10 bg-black/60 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 flex items-center justify-center">
          <div className="flex flex-col gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={() => onGetCode(pattern)}
              className="bg-white/95 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white hover:scale-105 transition-all duration-200 flex items-center gap-2 min-w-[130px] justify-center shadow-lg"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
              Copy
            </button>
            <button
              onClick={() => onApplyPattern(pattern)}
              className="bg-gray-800/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-900 hover:scale-105 transition-all duration-200 flex items-center gap-2 min-w-[130px] justify-center shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternCard;
