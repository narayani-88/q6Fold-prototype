import React, { useState, useEffect, useRef } from 'react';

interface HuffmanCodingProps {
  message: string;
}

const HuffmanCoding: React.FC<HuffmanCodingProps> = ({ message }) => {
  const [stage, setStage] = useState(0);
  const [flowingBits, setFlowingBits] = useState(0);
  const activeStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage(prev => Math.min(prev + 1, 3));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to keep active stage in view
  useEffect(() => {
    if (activeStageRef.current) {
      activeStageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 2) {
      const bitTimer = setInterval(() => {
        setFlowingBits(prev => prev + 1);
      }, 300);
      
      setTimeout(() => clearInterval(bitTimer), 3000);
      return () => clearInterval(bitTimer);
    }
  }, [stage]);

  // Simple Huffman codes for "Hello"
  const huffmanCodes: { [key: string]: string } = {
    'H': '00',
    'e': '01',
    'l': '1',
    'o': '10'
  };

  const getCompressedSize = () => {
    return message.split('').reduce((acc, char) => acc + (huffmanCodes[char]?.length || 8), 0);
  };

  const originalSize = message.length * 8;
  const compressedSize = getCompressedSize();
  const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-6">
        <h3 className="responsive-subheading text-quantum-accent mb-2 animate-fadeInUp">Huffman Compression</h3>
        <p className="responsive-text text-gray-400 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>Frequent letters get shorter codes</p>
      </div>

      <div className="space-y-6">
        {/* Huffman Tree Section */}
        <div ref={stage === 1 ? activeStageRef : null} className="bg-quantum-surface rounded-lg p-6">
          <h4 className="text-center text-quantum-secondary mb-4 text-lg">Huffman Tree</h4>
          <div className="flex justify-center">
            <div className="w-full max-w-sm h-48 relative">
              <svg viewBox="0 0 280 180" className="w-full h-full">
                {/* Tree structure */}
                {stage >= 1 && (
                  <>
                    {/* Root node */}
                    <circle cx="140" cy="25" r="12" fill="#7c4dff" className="animate-glow" />
                    
                    {/* Level 1 branches */}
                    <line x1="140" y1="37" x2="90" y2="70" stroke="#00d4ff" strokeWidth="2" className="animate-pulse-soft" />
                    <line x1="140" y1="37" x2="190" y2="70" stroke="#00d4ff" strokeWidth="2" className="animate-pulse-soft" />
                    
                    {/* Level 1 nodes */}
                    <circle cx="90" cy="75" r="10" fill="#7c4dff" />
                    <circle cx="190" cy="75" r="10" fill="#7c4dff" />
                    
                    {/* Level 2 branches */}
                    <line x1="90" y1="85" x2="65" y2="110" stroke="#00d4ff" strokeWidth="2" />
                    <line x1="90" y1="85" x2="115" y2="110" stroke="#00d4ff" strokeWidth="2" />
                    <line x1="190" y1="85" x2="165" y2="110" stroke="#00d4ff" strokeWidth="2" />
                    <line x1="190" y1="85" x2="215" y2="110" stroke="#00d4ff" strokeWidth="2" />
                    
                    {/* Leaf nodes with characters */}
                    <circle cx="65" cy="115" r="8" fill="#ff4081" />
                    <text x="65" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">H</text>
                    
                    <circle cx="115" cy="115" r="8" fill="#ff4081" />
                    <text x="115" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">e</text>
                    
                    <circle cx="165" cy="115" r="8" fill="#ff4081" />
                    <text x="165" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">l</text>
                    
                    <circle cx="215" cy="115" r="8" fill="#ff4081" />
                    <text x="215" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">o</text>
                    
                    {/* Binary path labels */}
                    <text x="115" y="55" fill="#00d4ff" fontSize="11" fontWeight="bold">0</text>
                    <text x="165" y="55" fill="#00d4ff" fontSize="11" fontWeight="bold">1</text>
                    <text x="77" y="95" fill="#00d4ff" fontSize="10">0</text>
                    <text x="103" y="95" fill="#00d4ff" fontSize="10">1</text>
                    <text x="177" y="95" fill="#00d4ff" fontSize="10">0</text>
                    <text x="203" y="95" fill="#00d4ff" fontSize="10">1</text>
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Character Codes Section */}
        <div ref={stage === 1 ? activeStageRef : null} className="bg-quantum-surface rounded-lg p-6">
          <h4 className="text-center text-quantum-secondary mb-4 text-lg">Character Codes</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(huffmanCodes).map(([char, code], index) => (
              <div 
                key={char} 
                className={`bg-quantum-background rounded-lg p-3 text-center transition-all duration-500 ${
                  stage >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-quantum-primary font-bold text-xl mb-1">{char}</div>
                <div className="font-mono text-quantum-accent text-sm">{code}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compression Process */}
        {stage >= 2 && (
          <div ref={stage === 2 ? activeStageRef : null} className="bg-quantum-surface rounded-lg p-6 animate-fadeInUp">
            <h4 className="text-center text-quantum-secondary mb-4 text-lg">Compression Process</h4>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-quantum-primary rounded-lg flex items-center justify-center mb-2 animate-glow">
                  <span className="text-sm font-bold">📦</span>
                </div>
                <div className="text-xs text-gray-400">Input</div>
              </div>
              
              <div className="text-quantum-primary text-2xl animate-float">→</div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-quantum-accent rounded-lg flex items-center justify-center mb-2">
                  <span className="text-sm font-bold">🌳</span>
                </div>
                <div className="text-xs text-gray-400">Tree</div>
              </div>
              
              <div className="text-quantum-primary text-2xl animate-float">→</div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-quantum-secondary rounded-lg flex items-center justify-center mb-2 animate-glow">
                  <span className="text-sm font-bold">📋</span>
                </div>
                <div className="text-xs text-gray-400">Output</div>
              </div>
            </div>
          </div>
        )}

        {/* Compression Stats */}
        {stage >= 3 && (
          <div ref={stage === 3 ? activeStageRef : null} className="bg-quantum-surface rounded-lg p-6 animate-fadeInUp">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-quantum-primary mb-2">{originalSize}</div>
                <div className="responsive-text text-gray-400">Original bits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-quantum-secondary mb-2">{compressedSize}</div>
                <div className="responsive-text text-gray-400">Compressed bits</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="text-xl font-semibold text-quantum-accent animate-glow">
                {compressionRatio}% space saved!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HuffmanCoding;
