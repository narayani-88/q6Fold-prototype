import React, { useState, useEffect, useRef } from 'react';

const QuantumGates: React.FC = () => {
  const [currentGate, setCurrentGate] = useState(-1);
  const [qubitStates, setQubitStates] = useState([
    { id: 0, phase: 0, entangled: false, active: false },
    { id: 1, phase: 0, entangled: false, active: false },
    { id: 2, phase: 0, entangled: false, active: false }
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  const gates = [
    {
      name: "Hadamard Gate",
      symbol: "H",
      emoji: "🎲",
      description: "Creates superposition - like flipping a quantum coin",
      effect: "Puts qubit in superposition of 0 and 1"
    },
    {
      name: "CNOT Gate", 
      symbol: "⊕",
      emoji: "🔗",
      description: "Entangles qubits - what happens to one affects the other",
      effect: "Creates quantum entanglement between qubits"
    },
    {
      name: "Phase Gate",
      symbol: "S",
      emoji: "⟳",
      description: "Rotates the qubit's state on the Bloch sphere",
      effect: "Applies phase rotation to the qubit"
    },
    {
      name: "Pauli-X Gate",
      symbol: "X",
      emoji: "↔",
      description: "Bit flip - rotates qubit around X-axis",
      effect: "Flips qubit from |0⟩ to |1⟩ or vice versa"
    },
    {
      name: "Pauli-Y Gate",
      symbol: "Y", 
      emoji: "↕",
      description: "Complex rotation around Y-axis",
      effect: "Applies Y rotation with phase"
    },
    {
      name: "Pauli-Z Gate",
      symbol: "Z",
      emoji: "🔄",
      description: "Phase flip - rotates around Z-axis", 
      effect: "Changes phase of |1⟩ state"
    }
  ];

  useEffect(() => {
    // Start the sequence immediately
    const startTimer = setTimeout(() => {
      setCurrentGate(0);
    }, 1000);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (currentGate >= 0 && currentGate < gates.length - 1) {
      const timer = setTimeout(() => {
        setCurrentGate(prev => prev + 1);
      }, 4000); // 4 seconds per gate

      return () => clearTimeout(timer);
    }
  }, [currentGate, gates.length]);

  // Update qubit states when gate changes
  useEffect(() => {
    if (currentGate >= 0) {
      setQubitStates(prev => prev.map((qubit, index) => {
        const newQubit = { ...qubit };
        
        if (currentGate === 0) { // Hadamard
          newQubit.active = index === 0;
          newQubit.phase = index === 0 ? 45 : newQubit.phase;
        } else if (currentGate === 1) { // CNOT
          newQubit.entangled = index < 2;
          newQubit.active = index < 2;
        } else if (currentGate === 2) { // Phase
          newQubit.phase = index === 1 ? newQubit.phase + 90 : newQubit.phase;
          newQubit.active = index === 1;
        } else if (currentGate >= 3) { // Pauli gates
          newQubit.phase = newQubit.phase + 30;
          newQubit.active = index === (currentGate - 3);
        }
        
        return newQubit;
      }));
    }
  }, [currentGate]);

  // Auto-scroll to keep active content in view
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [currentGate]);

  const QubitVisualization: React.FC<{ qubit: typeof qubitStates[0], gateType: string }> = ({ qubit, gateType }) => {
    const getQubitAnimation = () => {
      if (!qubit.active) return '';
      switch (gateType) {
        case 'hadamard': return 'animate-spin';
        case 'cnot': return 'animate-pulse-soft';
        case 'phase': return 'animate-rotate-slow';
        case 'pauli': return 'animate-bounce';
        default: return 'animate-glow';
      }
    };

    return (
      <div className="relative animate-slideInRight">
        {/* Quantum wire */}
        <div className="quantum-wire h-1 bg-quantum-primary rounded-full mb-4 relative overflow-hidden mx-auto">
          {qubit.active && (
            <div className="absolute inset-0 bg-quantum-accent animate-pulse rounded-full" />
          )}
          {/* Energy particles flowing on wire */}
          {qubit.active && (
            <>
              <div className="absolute w-2 h-2 bg-quantum-secondary rounded-full animate-flow" style={{ top: '-2px' }} />
              <div className="absolute w-2 h-2 bg-quantum-accent rounded-full animate-flow" style={{ top: '-2px', animationDelay: '0.5s' }} />
            </>
          )}
        </div>
        
        {/* Bloch Sphere Visualization for Phase Gate */}
        {gateType === 'phase' && qubit.active && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 border border-quantum-accent rounded-full opacity-30 animate-rotate-slow" />
            <div className="absolute w-1 h-8 bg-quantum-accent opacity-50 animate-rotate-slow" />
          </div>
        )}
        
        {/* Qubit sphere */}
        <div 
          className={`quantum-element rounded-full border-2 flex items-center justify-center relative transition-all duration-1000 mx-auto ${
            qubit.active 
              ? `bg-quantum-primary border-quantum-secondary shadow-lg ${getQubitAnimation()}` 
              : 'bg-quantum-surface border-quantum-accent'
          } ${qubit.entangled ? 'ring-2 ring-quantum-secondary animate-pulse' : ''}`}
          style={{ 
            transform: `rotate(${qubit.phase}deg) ${gateType === 'hadamard' && qubit.active ? 'rotateY(180deg)' : ''}`,
            boxShadow: qubit.active ? '0 0 15px var(--quantum-primary)' : 'none',
            transformOrigin: 'center',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Superposition indicator for Hadamard */}
          {gateType === 'hadamard' && qubit.active && (
            <>
              <div className="absolute text-xs text-quantum-secondary opacity-70 -top-4 animate-float">0</div>
              <div className="absolute text-xs text-quantum-secondary opacity-70 -bottom-4 animate-float" style={{ animationDelay: '0.5s' }}>1</div>
            </>
          )}
          
          <div className="text-xs font-mono text-white relative z-10">
            |ψ⟩
          </div>
          
          {/* Coin flip effect for Hadamard */}
          {gateType === 'hadamard' && qubit.active && (
            <div className="absolute inset-0 flex items-center justify-center text-lg animate-spin">
              🪙
            </div>
          )}
          
          {/* Entanglement waves */}
          {qubit.entangled && (
            <>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-quantum-secondary rounded-full animate-pulse-soft" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border border-quantum-secondary rounded-full animate-ping opacity-30" />
              {/* Entanglement beam */}
              <div className="absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-quantum-secondary to-transparent animate-pulse" />
            </>
          )}
        </div>
        
        {/* Gate effect indicators */}
        {qubit.active && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-center">
            {gateType === 'hadamard' && <div className="text-quantum-secondary animate-pulse">Superposition</div>}
            {gateType === 'cnot' && <div className="text-quantum-secondary animate-pulse">Entangling</div>}
            {gateType === 'phase' && <div className="text-quantum-accent animate-pulse">Phase Shift</div>}
            {gateType === 'pauli' && <div className="text-quantum-primary animate-pulse">Rotation</div>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="quantum-container">
      {currentGate >= 0 ? (
        <div className="quantum-active-gate">
          {/* Current Gate Focus */}
          <div className="text-center mb-3">
            <div className="text-4xl mb-2 animate-glow">{gates[currentGate].emoji}</div>
            <h2 className="text-lg font-bold text-quantum-primary mb-1">
              {gates[currentGate].name}
            </h2>
            <p className="text-sm text-gray-300 mb-2">
              {gates[currentGate].description}
            </p>
            <div className="inline-block bg-quantum-background rounded px-2 py-1 text-xs text-quantum-accent">
              {gates[currentGate].effect}
            </div>
          </div>

          {/* Live Quantum Circuit */}
          <div className="border-t border-quantum-accent/20 pt-3">
            <h4 className="text-center text-quantum-secondary mb-2 text-sm">Live Quantum Circuit</h4>
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto px-4">
              {qubitStates.map((qubit, index) => {
                const getCurrentGateType = () => {
                  if (currentGate === 0) return 'hadamard';
                  if (currentGate === 1) return 'cnot';
                  if (currentGate === 2) return 'phase';
                  if (currentGate >= 3) return 'pauli';
                  return 'default';
                };

                return (
                  <div key={qubit.id} className="text-center overflow-hidden">
                    <div className="text-xs text-gray-400 mb-1">Qubit {index}</div>
                    <div className="relative" style={{minHeight: '120px'}}>
                      <QubitVisualization qubit={qubit} gateType={getCurrentGateType()} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Status */}
            <div className="mt-3 text-center">
              <div className="inline-flex items-center space-x-2 bg-quantum-background rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-quantum-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-quantum-primary font-medium">
                  {currentGate === 0 && "🪙 Creating superposition..."}
                  {currentGate === 1 && "🔗 Entangling qubits..."}
                  {currentGate === 2 && "⚛️ Rotating on Bloch sphere..."}
                  {currentGate >= 3 && "↻ Applying Pauli rotation..."}
                </span>
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="text-center mt-3">
            <div className="inline-flex items-center space-x-2">
              <span className="text-xs text-quantum-secondary">
                Step {currentGate + 1} of {gates.length}
              </span>
              <div className="w-20 h-1 bg-quantum-surface rounded-full">
                <div 
                  className="h-full bg-quantum-primary rounded-full transition-all duration-1000"
                  style={{ width: `${((currentGate + 1) / gates.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Completion Status */}
          {currentGate === gates.length - 1 && (
            <div className="mt-3 text-center">
              <div className="inline-block bg-quantum-primary/10 border border-quantum-primary rounded-lg p-2 animate-glow">
                <div className="flex items-center justify-center space-x-2">
                  <div className="text-xl">🔐</div>
                  <div>
                    <div className="text-sm font-bold text-quantum-primary">Quantum Encryption Complete!</div>
                    <div className="text-xs text-gray-400">Data is quantum-secured and ready</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="quantum-initializing">
          <div className="text-5xl mb-3 animate-pulse">⚛️</div>
          <h2 className="text-lg text-quantum-accent mb-1">Initializing Quantum System</h2>
          <p className="text-sm text-gray-400 mb-3">Preparing to apply quantum encryption gates...</p>
          <div className="w-24 h-1 bg-quantum-surface rounded-full mx-auto">
            <div className="h-full bg-quantum-accent rounded-full animate-pulse w-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantumGates;
