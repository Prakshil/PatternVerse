import React, { useState, useEffect } from 'react';
import PatternGrid from './components/PatternGrid';
import PatternModal from './components/PatternModal';
import { patterns as localPatterns } from './data/patterns';
import './App.css';


function parsePublicPattern(raw) {
  // Try to extract the exported array from the TS file string
  try {
    // Remove import/export lines, get the array literal
    const arrMatch = raw.match(/export const [a-zA-Z0-9_]+\s*[:=][^\[]*(\[[\s\S]*?\]);/);
    if (!arrMatch) return [];
    // eslint-disable-next-line no-eval
    return eval(arrMatch[1]);
  } catch (e) {
    return [];
  }
}

function patternFromPublic(p) {
  // Convert public pattern object to local format
  return {
    id: p.id,
    name: p.name,
    badge: p.badge,
    category: p.category,
    css: p.style?.backgroundImage?.trim() || p.style?.background || '',
    backgroundSize: p.style?.backgroundSize,
    code: p.code,
    description: p.description,
  };
}

function App() {
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPatterns, setAllPatterns] = useState(localPatterns);
  const [appliedPattern, setAppliedPattern] = useState(localPatterns[0]);
  // Fetch patterns from public/patterns.ts and merge
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/patterns.ts')
      .then(res => res.text())
      .then(raw => {
        const arr = parsePublicPattern(raw);
        if (Array.isArray(arr)) {
          const converted = arr.map(patternFromPublic);
          // Merge, avoid duplicates by id
          const ids = new Set(localPatterns.map(p => p.id));
          const merged = [...localPatterns, ...converted.filter(p => !ids.has(p.id))];
          setAllPatterns(merged);
        }
      })
      .catch(() => {});
  }, []);

  const handlePreview = (pattern) => {
    setSelectedPattern(pattern);
    setIsModalOpen(true);
  };

  const handleGetCode = (pattern) => {
    setSelectedPattern(pattern);
    setIsModalOpen(true);
  };

  const handleApplyPattern = (pattern) => {
    setAppliedPattern(pattern);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPattern(null);
  };

  // Effect to handle body background when pattern is applied
  useEffect(() => {
    if (appliedPattern) {
      // Store original body background
      const originalBackground = document.body.style.background;
      // Make body background transparent
      document.body.style.background = 'transparent';
      
      // Cleanup function to restore original background
      return () => {
        document.body.style.background = originalBackground;
      };
    }
  }, [appliedPattern]);

  // Create dynamic style for applied pattern
  const getAppliedPatternStyle = () => {
    if (!appliedPattern) return {};
    
    const style = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none'
    };

    // Handle different pattern types
    if (appliedPattern.css.includes('linear-gradient') && appliedPattern.css.includes('1px')) {
      // Handle grid patterns (they use backgroundImage)
      style.backgroundImage = appliedPattern.css;
      style.backgroundColor = '#ffffff'; // White background for grid patterns
    } else if (appliedPattern.css.includes('radial-gradient') && appliedPattern.css.includes('1px')) {
      // Handle dot grid patterns
      style.backgroundImage = appliedPattern.css;
      style.backgroundColor = '#ffffff'; // White background for dot patterns
    } else if (appliedPattern.css.includes('linear-gradient') || appliedPattern.css.includes('radial-gradient')) {
      // Handle normal gradients
      style.background = appliedPattern.css;
    } else if (appliedPattern.css.includes('url(') || appliedPattern.css.includes('data:image')) {
      // Handle SVG patterns and images
      style.backgroundImage = appliedPattern.css;
      style.backgroundRepeat = 'repeat';
    } else if (appliedPattern.css.includes('repeating-linear-gradient') || appliedPattern.css.includes('repeating-radial-gradient')) {
      // Handle repeating gradients (stripes, etc.)
      style.background = appliedPattern.css;
    } else if (appliedPattern.css.includes('conic-gradient')) {
      // Handle conic gradients
      style.background = appliedPattern.css;
    } else {
      // Fallback for other patterns
      style.background = appliedPattern.css;
    }

    // Apply additional properties
    if (appliedPattern.backgroundSize) {
      style.backgroundSize = appliedPattern.backgroundSize;
    }
    if (appliedPattern.backgroundPosition) {
      style.backgroundPosition = appliedPattern.backgroundPosition;
    }
    if (appliedPattern.backgroundRepeat) {
      style.backgroundRepeat = appliedPattern.backgroundRepeat;
    }
    if (appliedPattern.backgroundColor) {
      style.backgroundColor = appliedPattern.backgroundColor;
    }

    return style;
  };

  // Function to detect if a pattern is dark themed
  const isDarkPattern = (pattern) => {
    if (!pattern) return false;
    
    const css = pattern.css.toLowerCase();
    
    // Check for dark colors in the pattern
    const darkPatterns = [
      '#0f0f23', '#1a0b0b', '#1e3a8a', '#7f1d1d', // specific dark colors from our patterns
      'rgb(15,15,35)', 'rgb(26,11,11)', 'rgb(30,58,138)', 'rgb(127,29,29)',
      // General dark color detection
      '#000', '#111', '#222', '#333', '#444',
      'rgb(0,0,0)', 'rgb(17,17,17)', 'rgb(34,34,34)', 'rgb(51,51,51)', 'rgb(68,68,68)'
    ];
    
    // Check if pattern contains dark colors
    const containsDarkColors = darkPatterns.some(color => css.includes(color));
    
    // Check for dark pattern names
    const darkNames = ['dark', 'crimson', 'depth', 'midnight', 'shadow', 'night'];
    const hasDarkName = darkNames.some(name => pattern.name.toLowerCase().includes(name));
    
    return containsDarkColors || hasDarkName;
  };

  // Function to detect if a pattern is light themed (white/light backgrounds)
  const isLightPattern = (pattern) => {
    if (!pattern) return false;
    
    const css = pattern.css.toLowerCase();
    
    // Check for light/white colors in the pattern
    const lightPatterns = [
      '#ffffff', '#fff', 'white', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1',
      '#fff8f0', '#fff9f5', '#fefefe', '#f9f9f9', '#f5f5f5',
      'rgb(255,255,255)', 'rgb(248,250,252)', 'rgb(241,245,249)'
    ];
    
    // Check if pattern contains light colors
    const containsLightColors = lightPatterns.some(color => css.includes(color));
    
    // Check for light pattern names
    const lightNames = ['white', 'light', 'bright', 'paper', 'snow'];
    const hasLightName = lightNames.some(name => pattern.name.toLowerCase().includes(name));
    
    return containsLightColors || hasLightName;
  };

  return (
    <div className={`App ${appliedPattern ? 'pattern-applied' : ''} ${appliedPattern && isDarkPattern(appliedPattern) ? 'dark-theme' : ''} ${appliedPattern && isLightPattern(appliedPattern) ? 'light-theme' : ''}`}>
      {/* Applied Pattern Background */}
      {appliedPattern && (
        <div 
          className="applied-pattern-bg"
          style={getAppliedPatternStyle()}
        />
      )}

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot">●</span> 12+ New Patterns 
            <span className="badge-arrow">Read More →</span>
          </div>

          <h1 className="hero-title patternverse-logo-text">
            Pattern <span className="verse-accent">Verse</span>
            <br/>
            <span className="hero-highlight">CSS Pattern Backgrounds</span>
          </h1>
          <p className="hero-description">
            Play with vibrant, code-powered CSS patterns. Preview, copy, and apply backgrounds instantly—fun, free, and made for creators!
          </p>
          
          <div className="hero-features">
            <div className="feature">
              
              <div>
                <div className="feature-title">One-Click Copy</div>
                <div className="feature-desc">Ready-to-use CSS code</div>
              </div>
            </div>
            <div className="feature">
              
              <div>
                <div className="feature-title">Live Preview</div>
                <div className="feature-desc">See patterns in action</div>
              </div>
            </div>
            <div className="feature">
            
              <div>
                <div className="feature-title">Apply to Site</div>
                <div className="feature-desc">Test patterns live</div>
              </div>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">{allPatterns.length}</div>
              <div className="stat-label">Patterns</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Free</div>
            </div>
            <div className="stat">
              <div className="stat-number">CSS</div>
              <div className="stat-label">& Tailwind</div>
            </div>
          </div>
        </div>
      </header>

      {/* Pattern Library Section */}
      <main className="main">
        <div className="library-header">
          <h2 className="library-title">Pattern Library</h2>
          <p className="library-subtitle">
            Tap on mobile or hover on desktop to see options. Click "Apply" to apply pattern to the whole site!
          </p>
          <div className="pattern-count">{allPatterns.length} patterns</div>
        </div>

        {/* Pattern Grid */}
        <PatternGrid 
          patterns={allPatterns}
          onPreview={handlePreview}
          onGetCode={handleGetCode}
          onApplyPattern={handleApplyPattern}
        />
      </main>

      {/* Modal */}
      <PatternModal
        pattern={selectedPattern}
        isOpen={isModalOpen}
        onClose={closeModal}
        onApplyPattern={handleApplyPattern}
      />
    </div>
  );
}

export default App;
