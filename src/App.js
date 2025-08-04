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
  const [appliedPattern, setAppliedPattern] = useState(localPatterns.find(p => p.id === 'azure-depths') || localPatterns[0]);
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

    // Set background color first if specified
    if (appliedPattern.backgroundColor) {
      style.backgroundColor = appliedPattern.backgroundColor;
    }

    // Handle different pattern types
    if (appliedPattern.css.includes('linear-gradient') && appliedPattern.css.includes('1px')) {
      // Handle grid patterns (they use backgroundImage)
      style.backgroundImage = appliedPattern.css;
      if (!appliedPattern.backgroundColor) {
        style.backgroundColor = '#ffffff'; // White background for grid patterns
      }
    } else if (appliedPattern.css.includes('radial-gradient') && appliedPattern.css.includes('1px')) {
      // Handle dot grid patterns
      style.backgroundImage = appliedPattern.css;
      if (!appliedPattern.backgroundColor) {
        style.backgroundColor = '#ffffff'; // White background for dot patterns
      }
    } else if (appliedPattern.css.includes('linear-gradient') || appliedPattern.css.includes('radial-gradient')) {
      // Handle normal gradients - check if it's a complex multi-gradient pattern
      if (appliedPattern.css.includes(',') && appliedPattern.css.split('gradient').length > 2) {
        // Multiple gradients - use backgroundImage
        style.backgroundImage = appliedPattern.css;
      } else {
        // Single gradient - use background
        style.background = appliedPattern.css;
      }
    } else if (appliedPattern.css.includes('url(') || appliedPattern.css.includes('data:image')) {
      // Handle SVG patterns and images
      style.backgroundImage = appliedPattern.css;
      style.backgroundRepeat = 'repeat';
    } else if (appliedPattern.css.includes('repeating-linear-gradient') || appliedPattern.css.includes('repeating-radial-gradient')) {
      // Handle repeating gradients (stripes, etc.)
      style.backgroundImage = appliedPattern.css;
    } else if (appliedPattern.css.includes('conic-gradient')) {
      // Handle conic gradients
      style.backgroundImage = appliedPattern.css;
    } else {
      // Fallback for other patterns
      style.backgroundImage = appliedPattern.css;
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
    if (appliedPattern.filter) {
      style.filter = appliedPattern.filter;
    }
    if (appliedPattern.opacity) {
      style.opacity = appliedPattern.opacity;
    }
    if (appliedPattern.mixBlendMode) {
      style.mixBlendMode = appliedPattern.mixBlendMode;
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

      {/* PatternVerse Logo - Top Left */}
      <div className="fixed top-4 left-4 md:top-5 md:left-5 lg:top-6 lg:left-6 z-50">
        <div className="patternverse-logo text-xl md:text-2xl lg:text-3xl font-bold">
          Pattern<span className="verse-accent">Verse</span>
        </div>
      </div>

      {/* Contribute Button - Top Right */}
      <div className="fixed top-4 right-4 md:top-5 md:right-5 lg:top-6 lg:right-6 z-50">
        <a 
          href="https://github.com/Prakshil/PatternVerse.git"
          target="_blank"
          rel="noopener noreferrer"
          className="contribute-button flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs md:text-sm lg:text-base font-semibold rounded-lg md:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <svg 
            className="w-4 h-4 md:w-5 md:h-5 fill-current" 
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="hidden sm:inline">Contribute Here</span>
          <span className="sm:hidden">GitHub</span>
        </a>
      </div>

      {/* Hero Section */}
      <header className="hero px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="hero-content max-w-4xl mx-auto text-center">
          <div className="hero-badge hidden sm:block mb-6">
            <span className="badge-dot">●</span> 12+ New Patterns 
            <span className="badge-arrow">Read More →</span>
          </div>

          <h1 className="hero-title patternverse-logo-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            Pattern <span className="verse-accent">Verse</span>
            <br/>
            <span className="hero-highlight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">CSS Pattern Backgrounds</span>
          </h1>
          <p className="hero-description text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Play with vibrant, code-powered CSS patterns. Preview, copy, and apply backgrounds instantly—fun, free, and made for creators!
          </p>
          
          <div className="hero-features flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
            <div className="feature flex items-center justify-center sm:justify-start gap-3">
              <div>
                <div className="feature-title text-sm sm:text-base md:text-lg font-semibold">One-Click Copy</div>
                <div className="feature-desc text-xs sm:text-sm md:text-base opacity-75">Ready-to-use CSS code</div>
              </div>
            </div>
            <div className="feature flex items-center justify-center sm:justify-start gap-3">
              <div>
                <div className="feature-title text-sm sm:text-base md:text-lg font-semibold">Live Preview</div>
                <div className="feature-desc text-xs sm:text-sm md:text-base opacity-75">See patterns in action</div>
              </div>
            </div>
            <div className="feature flex items-center justify-center sm:justify-start gap-3">
              <div>
                <div className="feature-title text-sm sm:text-base md:text-lg font-semibold">Apply to Site</div>
                <div className="feature-desc text-xs sm:text-sm md:text-base opacity-75">Test patterns live</div>
              </div>
            </div>
          </div>

          <div className="hero-stats flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 md:gap-12">
            <div className="stat text-center">
              <div className="stat-number text-2xl sm:text-3xl md:text-4xl font-bold">{allPatterns.length}</div>
              <div className="stat-label text-sm sm:text-base md:text-lg opacity-75">Patterns</div>
            </div>
            <div className="stat text-center">
              <div className="stat-number text-2xl sm:text-3xl md:text-4xl font-bold">100%</div>
              <div className="stat-label text-sm sm:text-base md:text-lg opacity-75">Free</div>
            </div>
            <div className="stat text-center">
              <div className="stat-number text-2xl sm:text-3xl md:text-4xl font-bold">CSS</div>
              <div className="stat-label text-sm sm:text-base md:text-lg opacity-75">& Tailwind</div>
            </div>
          </div>
        </div>
      </header>

      {/* Pattern Library Section */}
      <main className="main px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="library-header text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="library-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Pattern Library</h2>
          <p className="library-subtitle text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-4 px-4">
            Tap on mobile or hover on desktop to see options. Click "Apply" to apply pattern to the whole site!
          </p>
          <div className="pattern-count text-xs sm:text-sm md:text-base font-semibold">{allPatterns.length} patterns</div>
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

      {/* Footer */}
      <footer className="footer bg-white/90 backdrop-blur-xl border-t border-gray-200/50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mt-12 sm:mt-16 lg:mt-20">
        <div className="footer-content max-w-7xl mx-auto">
          {/* Development Notice */}
          <div className="development-notice text-center mb-6">
            <p className="text-sm sm:text-base text-gray-600 font-normal">
              This app is still in development. If you face any bugs, please contact me.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="footer-info flex flex-col items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
              <p className="footer-email text-sm sm:text-base flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <span className="footer-label font-semibold text-gray-800">Contact:</span>
                <a href="mailto:Prakshilmpatel@gmail.com" className="footer-email-link text-violet-600 hover:text-violet-700 font-medium transition-colors">
                  Prakshilmpatel@gmail.com
                </a>
              </p>
              
              {/* Social Links */}
              <div className="social-links flex items-center gap-4 mt-2">
                <a 
                  href="https://github.com/Prakshil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                  title="GitHub Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm">GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/prakshil-patel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="LinkedIn Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
              
              <p className="footer-copyright text-xs sm:text-sm text-gray-600 m-0">
                © 2025 All rights reserved by Prakshil Patel
              </p>
            </div>
            <div className="footer-brand">
              <span className="footer-brand-text font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
                Pattern <span className="verse-accent bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Verse</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
