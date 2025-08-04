import React from 'react';

const PatternCard = ({ pattern, onPreview, onGetCode, onApplyPattern, index }) => {
  const getPatternStyle = () => {
    const style = {};

    // Set background color first if specified
    if (pattern.backgroundColor) {
      style.backgroundColor = pattern.backgroundColor;
    }

    // Handle different pattern types for preview
    if (pattern.css.includes('linear-gradient') && pattern.css.includes('1px')) {
      style.backgroundImage = pattern.css;
      if (!pattern.backgroundColor) {
        style.backgroundColor = '#ffffff';
      }
    } else if (pattern.css.includes('radial-gradient') && pattern.css.includes('1px')) {
      style.backgroundImage = pattern.css;
      if (!pattern.backgroundColor) {
        style.backgroundColor = '#ffffff';
      }
    } else if (pattern.css.includes('linear-gradient') || pattern.css.includes('radial-gradient')) {
      // Handle normal gradients - check if it's a complex multi-gradient pattern
      if (pattern.css.includes(',') && pattern.css.split('gradient').length > 2) {
        // Multiple gradients - use backgroundImage
        style.backgroundImage = pattern.css;
      } else {
        // Single gradient - use background
        style.background = pattern.css;
      }
    } else if (pattern.css.includes('repeating-linear-gradient') || pattern.css.includes('repeating-radial-gradient')) {
      style.backgroundImage = pattern.css;
    } else {
      style.backgroundImage = pattern.css;
    }
    
    if (pattern.backgroundSize) style.backgroundSize = pattern.backgroundSize;
    if (pattern.backgroundPosition) style.backgroundPosition = pattern.backgroundPosition;
    if (pattern.backgroundRepeat) style.backgroundRepeat = pattern.backgroundRepeat;
    if (pattern.filter) style.filter = pattern.filter;
    if (pattern.opacity) style.opacity = pattern.opacity;
    if (pattern.mixBlendMode) style.mixBlendMode = pattern.mixBlendMode;

    return style;
  };

  const handlePreviewClick = () => {
    onApplyPattern(pattern);
  };

  const cardStyle = {
    animationDelay: `${index * 0.1}s`
  };

  return (
    <div
      className="pattern-card w-full mx-auto rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] flex flex-col shadow-sm hover:shadow-lg overflow-hidden group"
      style={cardStyle}
    >
      {/* Pattern Display Area */}
      <div
        className="pattern-preview rounded-t-xl sm:rounded-t-2xl h-32 sm:h-40 md:h-48 w-full relative flex items-center justify-center"
        style={getPatternStyle()}
      >
        {/* New Badge */}
      </div>

      {/* Pattern Info */}
      <div className="pattern-info flex flex-col items-center gap-3 sm:gap-4 py-4 sm:py-6 px-3 sm:px-4">
        <h3 className="pattern-name text-sm sm:text-base md:text-lg font-semibold text-white mb-0 text-center w-full whitespace-normal leading-tight drop-shadow-lg">{pattern.name}</h3>
        {/* Buttons */}
        <div className="button-group flex gap-2 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="preview-btn flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors duration-150 text-xs sm:text-sm"
            onClick={handlePreviewClick}
            title="Apply this pattern to the whole website"
          >
            Apply
          </button>
          <button
            className="copy-btn flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 sm:py-3 rounded-lg border border-gray-200 transition-colors duration-150 text-xs sm:text-sm"
            onClick={() => onGetCode(pattern)}
            title="View and copy the code"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatternCard;
