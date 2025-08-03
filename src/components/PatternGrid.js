import React from 'react';
import PatternCard from './PatternCard';

const PatternGrid = ({ patterns, onPreview, onGetCode, onApplyPattern }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {patterns.map((pattern, index) => (
        <PatternCard
          key={pattern.id}
          pattern={pattern}
          onPreview={onPreview}
          onGetCode={onGetCode}
          onApplyPattern={onApplyPattern}
          index={index}
        />
      ))}
    </div>
  );
};

export default PatternGrid;
