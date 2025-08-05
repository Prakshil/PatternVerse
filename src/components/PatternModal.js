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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-[1000] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-xs sm:max-w-md lg:max-w-2xl max-h-[90vh] overflow-hidden border border-slate-200 shadow-2xl animate-slideUp" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-gray-50">
          <div>
            <h2 className="text-slate-800 font-bold text-lg sm:text-xl mb-1">{pattern.name}</h2>
            {pattern.badge && (
              <span className="inline-block bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-3 py-1 rounded-full text-xs font-semibold">
                ✨ {pattern.badge}
              </span>
            )}
          </div>
          <button className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2.5 rounded-full text-lg transition-all duration-200 hover:scale-105" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Pattern Preview */}
        <div 
          className="modal-preview h-36 sm:h-44 md:h-52 lg:h-60 w-full relative border-b border-slate-100 shadow-inner"
          style={getPatternStyle()}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Action Buttons */}
        <div className="modal-actions flex flex-col sm:flex-row gap-3 p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
          <button 
            className="apply-btn flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3.5 px-5 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2" 
            onClick={handleApplyPattern}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Apply to Website
          </button>
          <button 
            className="copy-btn flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 px-5 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2" 
            onClick={copyCode}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Code
          </button>
        </div>
        
        {/* Code Section */}
        <div className="code-section p-5 sm:p-6 bg-white">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            CSS Code:
          </h3>
          <div className="code-box bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-300 rounded-xl p-4 sm:p-5 overflow-x-auto shadow-inner">
            <pre className="text-xs sm:text-sm text-white whitespace-pre-wrap break-words font-mono leading-relaxed">{pattern.code || pattern.css}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternModal;
