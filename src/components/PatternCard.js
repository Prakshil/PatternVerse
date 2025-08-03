import React from 'react';

const PatternCard = ({ pattern, onPreview, onGetCode, onApplyPattern, index }) => {
  const getPatternStyle = () => {
    const style = {};

    // Handle different pattern types for preview
    if (pattern.css.includes('linear-gradient') && pattern.css.includes('1px')) {
      style.backgroundImage = pattern.css;
      style.backgroundColor = '#ffffff';
    } else if (pattern.css.includes('radial-gradient') && pattern.css.includes('1px')) {
      style.backgroundImage = pattern.css;
      style.backgroundColor = '#ffffff';
    } else if (pattern.css.includes('linear-gradient') || pattern.css.includes('radial-gradient')) {
      style.background = pattern.css;
    } else {
      style.backgroundImage = pattern.css;
    }
    if (pattern.backgroundSize) style.backgroundSize = pattern.backgroundSize;
    if (pattern.backgroundPosition) style.backgroundPosition = pattern.backgroundPosition;
    if (pattern.backgroundRepeat) style.backgroundRepeat = pattern.backgroundRepeat;
    if (pattern.backgroundColor) style.backgroundColor = pattern.backgroundColor;

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
      className="pattern-card max-w-sm w-full mx-auto rounded-2xl bg-white dark:bg-zinc-900 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.01] flex flex-col shadow-none overflow-hidden group"
      style={cardStyle}
    >
      {/* Pattern Display Area */}
      <div
        className="pattern-preview rounded-t-2xl h-40 w-full relative flex items-center justify-center"
        style={getPatternStyle()}
      >
        {/* New Badge */}
      </div>

      {/* Pattern Info */}
      <div className="pattern-info flex flex-col items-center gap-2 py-6 px-4 bg-white/80 dark:bg-zinc-900/80">
        <h3 className="pattern-name text-lg font-semibold text-gray-800 dark:text-gray-100 mb-0 text-center w-full whitespace-normal leading-tight">{pattern.name}</h3>
        {/* Buttons */}
        <div className="button-group flex gap-2 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="preview-btn flex-1 bg-violet-600 text-white font-semibold py-2 rounded-lg transition-colors duration-150 hover:bg-violet-700 text-sm"
            onClick={handlePreviewClick}
            title="Apply this pattern to the whole website"
          >
            Apply
          </button>
          <button
            className="copy-btn flex-1 bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg border border-gray-200 transition-colors duration-150 hover:bg-gray-200 text-sm"
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
