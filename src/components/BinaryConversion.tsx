import React, { useState, useEffect } from 'react';

interface BinaryConversionProps {
  message: string;
}

const BinaryConversion: React.FC<BinaryConversionProps> = ({ message }) => {
  const [currentChar, setCurrentChar] = useState(0);
  const [showBinary, setShowBinary] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentChar < message.length) {
        setCurrentChar(prev => prev + 1);
      } else {
        setShowBinary(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentChar, message.length]);

  const charToBinary = (char: string): string => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="responsive-subheading text-quantum-accent mb-4 animate-fadeInUp">Converting to Binary</h3>
        <p className="responsive-text text-gray-400 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>Each letter becomes 8 bits (1s and 0s)</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {message.split('').map((char, index) => (
          <div key={index} className="flex flex-col items-center space-y-3 md:space-y-4 animate-slideInRight" style={{ animationDelay: `${index * 0.3}s` }}>
            {/* Original Character */}
            <div className={`text-2xl md:text-3xl font-bold transition-all duration-500 ${
              index < currentChar ? 'text-quantum-secondary animate-pulse-soft' : 'text-gray-600'
            }`}>
              {char}
            </div>

            {/* Arrow */}
            {index < currentChar && (
              <div className="text-quantum-accent animate-float text-lg md:text-xl">
                ↓
              </div>
            )}

            {/* Binary Representation */}
            <div className="flex flex-wrap justify-center gap-1 max-w-32">
              {index < currentChar && charToBinary(char).split('').map((bit, bitIndex) => (
                <div
                  key={bitIndex}
                  className={`quantum-element rounded-full flex items-center justify-center text-xs md:text-sm font-mono transition-all duration-300 ${
                    bit === '1' 
                      ? 'bg-quantum-primary text-quantum-background animate-glow' 
                      : 'bg-quantum-surface text-gray-400'
                  }`}
                  style={{ 
                    animationDelay: `${bitIndex * 100}ms`,
                    width: 'clamp(1.5rem, 4vw, 2rem)',
                    height: 'clamp(1.5rem, 4vw, 2rem)',
                    boxShadow: bit === '1' ? '0 0 8px var(--quantum-primary)' : 'none'
                  }}
                >
                  {bit}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showBinary && (
        <div className="mt-6 md:mt-8 text-center animate-fadeInUp">
          <div className="inline-block bg-quantum-surface rounded-lg p-4 max-w-full overflow-x-auto">
            <h4 className="text-quantum-accent mb-2 responsive-text">Complete Binary:</h4>
            <div className="font-mono text-xs md:text-sm break-all">
              {message.split('').map(char => charToBinary(char)).join(' ')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinaryConversion;
