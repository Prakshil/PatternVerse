import React from 'react';

const PatternModal = ({ pattern, isOpen, onClose, onApplyPattern }) => {
  const copyCode = () => {
    const codeToCopy = pattern.code || pattern.css;
    navigator.clipboard.writeText(codeToCopy);
    alert('Code copied to clipboard!');
  };

  const handleApplyPattern = () => {
    onApplyPattern(pattern);
    alert('Pattern applied to the website background!');
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000]" onClick={onClose}>
      <div className="bg-white rounded-xl w-[90%] max-w-xl max-h-[90vh] overflow-y-auto border border-slate-100 animate-slideUp" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div>
            <h2 className="text-slate-800 font-semibold">{pattern.name}</h2>
            {pattern.badge && (
              <span className="inline-block ml-3 bg-blue-50 text-sky-700 px-2 py-0.5 rounded text-xs font-medium">
                ✨ {pattern.badge}
              </span>
            )}
          </div>
          <button className="text-slate-400 hover:bg-slate-100 p-2 rounded" onClick={onClose}>✖️</button>
        </div>
        
        {/* Pattern Preview */}
        <div 
          className="modal-preview"
          style={getPatternStyle()}
        >
        </div>
        
        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="apply-btn" onClick={handleApplyPattern}>
             Apply to Website
          </button>
          <button className="copy-btn" onClick={copyCode}>
            Copy Code
          </button>
        </div>
        
        {/* Code Section */}
        <div className="code-section">
          <h3>Code:</h3>
          <div className="code-box">
            <pre>{pattern.code || pattern.css}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternModal;
