import React from 'react';

const PatternModal = ({ pattern, isOpen, onClose, onApplyPattern }) => {
  const copyCode = async () => {
    try {
      const codeToCopy = pattern.code || pattern.css;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeToCopy);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = codeToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleApplyPattern = () => {
    onApplyPattern(pattern);
  };

  const getPatternStyle = () => {
    if (!pattern) return {};
    
    const style = {};
    
    if (pattern.css.includes('linear-gradient') || pattern.css.includes('radial-gradient')) {
      style.background = pattern.css;
    } else {
      style.backgroundImage = pattern.css;
    }
    
    if (pattern.backgroundSize) {
      style.backgroundSize = pattern.backgroundSize;
    }
    if (pattern.backgroundPosition) {
      style.backgroundPosition = pattern.backgroundPosition;
    }
    if (pattern.backgroundColor) {
      style.backgroundColor = pattern.backgroundColor;
    }
    
    return style;
  };

  if (!isOpen || !pattern) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000] p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-xs sm:max-w-md lg:max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-100 animate-slideUp" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-100">
          <div>
            <h2 className="text-slate-800 font-semibold text-lg sm:text-xl">{pattern.name}</h2>
            {pattern.badge && (
              <span className="inline-block mt-1 sm:ml-3 sm:mt-0 bg-blue-50 text-sky-700 px-2 py-0.5 rounded text-xs font-medium">
                ✨ {pattern.badge}
              </span>
            )}
          </div>
          <button className="text-slate-400 hover:bg-slate-100 p-2 rounded text-lg sm:text-xl" onClick={onClose}>✖️</button>
        </div>
        
        {/* Pattern Preview */}
        <div 
          className="modal-preview h-32 sm:h-40 md:h-48 lg:h-56 w-full relative border-b border-slate-100"
          style={getPatternStyle()}
        >
        </div>
        
        {/* Action Buttons */}
        <div className="modal-actions flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-b border-slate-100">
          <button 
            className="apply-btn flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-150 text-sm sm:text-base" 
            onClick={handleApplyPattern}
          >
            🎨 Apply to Website
          </button>
          <button 
            className="copy-btn flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-200 transition-colors duration-150 text-sm sm:text-base" 
            onClick={copyCode}
          >
            📋 Copy Code
          </button>
        </div>
        
        {/* Code Section */}
        <div className="code-section p-4 sm:p-6">
          <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-3">Code:</h3>
          <div className="code-box bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-4 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap break-words">{pattern.code || pattern.css}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternModal;
