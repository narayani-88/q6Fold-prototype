import React, { useState, useEffect, useRef } from 'react';

const Decryption: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [currentGate, setCurrentGate] = useState(-1);
  const [decodingProgress, setDecodingProgress] = useState(0);
  const activeStageRef = useRef<HTMLDivElement>(null);

  const reverseGates = [
    { name: "Inverse Pauli-Z", symbol: "Z†", emoji: "🔄", description: "Undoing phase flip" },
    { name: "Inverse Pauli-Y", symbol: "Y†", emoji: "↕", description: "Reversing Y rotation" },
    { name: "Inverse Pauli-X", symbol: "X†", emoji: "↔", description: "Undoing bit flip" },
    { name: "Inverse Phase", symbol: "S†", emoji: "⟲", description: "Reversing phase rotation" },
    { name: "Inverse CNOT", symbol: "⊕†", emoji: "🔗", description: "Breaking entanglement" },
    { name: "Inverse Hadamard", symbol: "H†", emoji: "🎲", description: "Collapsing superposition" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (stage === 0 && currentGate < reverseGates.length - 1) {
        setCurrentGate(prev => prev + 1);
      } else if (stage === 0 && currentGate === reverseGates.length - 1) {
        setTimeout(() => setStage(1), 1000);
      } else if (stage === 1) {
        setDecodingProgress(prev => Math.min(prev + 20, 100));
        if (decodingProgress >= 100) {
          setTimeout(() => setStage(2), 1000);
        }
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [stage, currentGate, reverseGates.length, decodingProgress]);

  // Auto-scroll to keep active stage in view
  useEffect(() => {
    if (activeStageRef.current) {
      activeStageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [stage, currentGate, decodingProgress]);

  return (
    <div className="w-full max-w-6xl">
      <div className="text-center mb-8">
        <h3 className="text-xl text-quantum-accent mb-4">Quantum Decryption</h3>
        <p className="text-sm text-gray-400">Reversing the encryption process to recover the message</p>
      </div>

      {/* Stage 1: Inverse Quantum Gates */}
      {stage === 0 && (
        <div ref={activeStageRef} className="mb-8">
          <h4 className="text-center text-quantum-secondary mb-6">Applying Inverse Gates</h4>
          
          {/* Current Gate Display */}
          <div className="bg-quantum-surface rounded-lg p-6 mb-6">
            <div className="flex justify-center mb-6">
              {currentGate >= 0 && (
                <div className="bg-quantum-background rounded-lg p-6 animate-glow">
                  <div className="text-4xl mb-2 text-center">{reverseGates[currentGate].emoji}</div>
                  <div className="text-xl font-bold text-quantum-primary text-center mb-2">
                    {reverseGates[currentGate].name}
                  </div>
                  <div className="text-sm text-gray-400 text-center">
                    {reverseGates[currentGate].description}
                  </div>
                </div>
              )}
            </div>

            {/* Quantum wire with qubits */}
            <div className="flex justify-center space-x-8">
              {[0, 1, 2].map(qubitId => (
                <div key={qubitId} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2">Qubit {qubitId}</div>
                  <div className="h-1 bg-quantum-primary rounded-full w-20 mb-4 relative">
                    {currentGate >= 0 && (
                      <div className="absolute inset-0 bg-quantum-accent animate-pulse rounded-full" />
                    )}
                  </div>
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ${
                    currentGate >= 0 
                      ? 'bg-quantum-primary border-quantum-secondary animate-glow' 
                      : 'bg-quantum-surface border-quantum-accent opacity-50'
                  }`}>
                    <div className="text-xs font-mono text-white">|ψ⟩</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gate Progress */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {reverseGates.map((gate, index) => (
              <div 
                key={index}
                className={`bg-quantum-surface rounded-lg p-3 text-center transition-all duration-500 ${
                  index === currentGate 
                    ? 'ring-2 ring-quantum-primary animate-glow' 
                    : index < currentGate 
                      ? 'bg-quantum-background opacity-75' 
                      : 'opacity-30'
                }`}
              >
                <div className="text-xl mb-1">{gate.emoji}</div>
                <div className="text-xs font-semibold text-quantum-accent">{gate.name}</div>
                <div className="text-xs text-gray-400">{gate.symbol}</div>
                {index === currentGate && (
                  <div className="mt-2 w-full bg-quantum-primary h-1 rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stage 2: Huffman Decoding */}
      {stage >= 1 && (
        <div ref={stage === 1 ? activeStageRef : null} className="mb-8">
          <h4 className="text-center text-quantum-secondary mb-6">Huffman Decoding</h4>
          
          <div className="bg-quantum-surface rounded-lg p-6">
            <div className="flex justify-center items-center space-x-8 mb-6">
              {/* Compressed data */}
              <div className="text-center">
                <div className="w-16 h-16 bg-quantum-accent rounded-lg flex items-center justify-center mb-2 animate-glow">
                  <span className="text-sm">📦</span>
                </div>
                <div className="text-xs text-gray-400">Compressed</div>
              </div>

              {/* Decoding arrow */}
              <div className="text-quantum-primary text-2xl animate-float">→</div>

              {/* Huffman tree (simplified) */}
              <div className="text-center">
                <div className="w-16 h-16 bg-quantum-surface border-2 border-quantum-primary rounded-lg flex items-center justify-center mb-2">
                  <span className="text-sm">🌳</span>
                </div>
                <div className="text-xs text-gray-400">Tree Decode</div>
              </div>

              {/* Decoding arrow */}
              <div className="text-quantum-primary text-2xl animate-float">→</div>

              {/* Binary output */}
              <div className="text-center">
                <div className="w-16 h-16 bg-quantum-primary rounded-lg flex items-center justify-center mb-2 animate-glow">
                  <span className="text-sm">101</span>
                </div>
                <div className="text-xs text-gray-400">Binary</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-quantum-background rounded-full h-2 mb-4">
              <div 
                className="bg-quantum-secondary h-2 rounded-full transition-all duration-500"
                style={{ width: `${decodingProgress}%` }}
              />
            </div>
            <div className="text-center text-quantum-accent font-semibold">
              {decodingProgress}% decoded
            </div>
          </div>
        </div>
      )}

      {/* Stage 3: Binary to Text Conversion */}
      {stage >= 2 && (
        <div ref={stage === 2 ? activeStageRef : null} className="mb-8">
          <h4 className="text-center text-quantum-secondary mb-6">Binary to Text Conversion</h4>
          
          <div className="bg-quantum-surface rounded-lg p-6">
            <div className="flex justify-center items-center space-x-8 mb-6">
              {/* Binary representation */}
              <div className="text-center">
                <div className="font-mono text-sm text-quantum-primary mb-2">
                  01001000 01100101 01101100 01101100 01101111
                </div>
                <div className="text-xs text-gray-400">Binary Data</div>
              </div>

              {/* Conversion arrow */}
              <div className="text-quantum-accent text-3xl animate-pulse">⟳</div>

              {/* Final message */}
              <div className="text-center">
                <div className="text-4xl font-bold text-quantum-primary animate-glow mb-2">
                  Hello
                </div>
                <div className="text-xs text-gray-400">Decrypted Message</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {stage >= 2 && (
        <div className="text-center">
          <div className="inline-block bg-quantum-surface rounded-lg p-8 animate-glow">
            <div className="text-4xl mb-4">🎉</div>
            <div className="text-2xl font-bold text-quantum-primary mb-2">
              Decryption Complete!
            </div>
            <div className="text-quantum-secondary">
              Your message has been successfully recovered using quantum decryption
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-quantum-accent font-semibold">✅ Secure</div>
                <div className="text-gray-400 text-xs">No data compromised</div>
              </div>
              <div className="text-center">
                <div className="text-quantum-accent font-semibold">⚡ Fast</div>
                <div className="text-gray-400 text-xs">Quantum speed</div>
              </div>
              <div className="text-center">
                <div className="text-quantum-accent font-semibold">🔒 Private</div>
                <div className="text-gray-400 text-xs">Unhackable</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Decryption;
