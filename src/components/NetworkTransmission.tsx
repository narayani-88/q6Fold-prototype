import React, { useState, useEffect } from 'react';

const NetworkTransmission: React.FC = () => {
  const [transmissionStage, setTransmissionStage] = useState(0);
  const [packetPosition, setPacketPosition] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransmissionStage(prev => Math.min(prev + 1, 3));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (transmissionStage >= 1) {
      const packetTimer = setInterval(() => {
        setPacketPosition(prev => {
          if (prev >= 100) return 0;
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(packetTimer);
    }
  }, [transmissionStage]);

  const NetworkNode: React.FC<{ label: string; active: boolean; type: 'source' | 'router' | 'destination' }> = ({ 
    label, active, type 
  }) => {
    const getNodeColor = () => {
      switch (type) {
        case 'source': return 'bg-quantum-primary';
        case 'router': return 'bg-quantum-accent';
        case 'destination': return 'bg-quantum-secondary';
        default: return 'bg-quantum-surface';
      }
    };

    return (
      <div className="flex flex-col items-center">
        <div className={`w-16 h-16 rounded-lg ${getNodeColor()} flex items-center justify-center transition-all duration-500 ${
          active ? 'animate-glow shadow-lg' : 'opacity-50'
        }`}>
          {type === 'source' && '💻'}
          {type === 'router' && '🌐'}
          {type === 'destination' && '🏢'}
        </div>
        <div className="text-xs text-gray-400 mt-2">{label}</div>
      </div>
    );
  };

  const QuantumPacket: React.FC<{ position: number }> = ({ position }) => (
    <div 
      className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-75"
      style={{ left: `${position}%` }}
    >
      <div className="relative">
        {/* Main packet cube */}
        <div className="w-8 h-8 bg-gradient-to-r from-quantum-primary to-quantum-secondary rounded animate-glow rotate-45 flex items-center justify-center">
          <div className="text-xs text-white transform -rotate-45">🔐</div>
        </div>
        
        {/* Quantum trail effect */}
        <div className="absolute inset-0 w-8 h-8 bg-quantum-accent rounded opacity-30 animate-pulse scale-150" />
        
        {/* Energy particles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-quantum-primary rounded-full animate-float"
            style={{
              top: `${-10 + i * 5}px`,
              left: `${-5 + i * 8}px`,
              animationDelay: `${i * 200}ms`
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl">
      <div className="text-center mb-8">
        <h3 className="text-xl text-quantum-accent mb-4">Network Transmission</h3>
        <p className="text-sm text-gray-400">Quantum-encrypted data travels across the network</p>
      </div>

      {/* Network Topology */}
      <div className="bg-quantum-surface rounded-lg p-8 mb-8">
        <div className="relative">
          {/* Network path */}
          <div className="flex justify-between items-center mb-8">
            <NetworkNode 
              label="Source" 
              active={transmissionStage >= 0} 
              type="source" 
            />
            <NetworkNode 
              label="Router 1" 
              active={transmissionStage >= 1 && packetPosition > 30} 
              type="router" 
            />
            <NetworkNode 
              label="Router 2" 
              active={transmissionStage >= 1 && packetPosition > 60} 
              type="router" 
            />
            <NetworkNode 
              label="Destination" 
              active={transmissionStage >= 2 && packetPosition > 90} 
              type="destination" 
            />
          </div>

          {/* Connection lines */}
          <div className="absolute top-8 left-8 right-8 h-1 bg-quantum-background rounded-full">
            {/* Active connection segments */}
            {transmissionStage >= 1 && (
              <>
                <div className="h-full bg-gradient-to-r from-quantum-primary to-transparent rounded-full animate-pulse" 
                     style={{ width: '33%' }} />
                <div className="h-full bg-quantum-accent rounded-full animate-pulse absolute" 
                     style={{ left: '33%', width: '34%' }} />
                <div className="h-full bg-gradient-to-l from-quantum-secondary to-transparent rounded-full animate-pulse absolute" 
                     style={{ left: '67%', width: '33%' }} />
              </>
            )}
            
            {/* Animated packet */}
            {transmissionStage >= 1 && <QuantumPacket position={packetPosition} />}
          </div>
        </div>

        {/* Cloud infrastructure */}
        <div className="mt-12 flex justify-center space-x-8">
          {['☁️', '☁️', '☁️'].map((cloud, index) => (
            <div 
              key={index}
              className={`text-4xl transition-all duration-1000 ${
                transmissionStage >= 1 && packetPosition > index * 30 ? 'animate-float' : 'opacity-30'
              }`}
              style={{ animationDelay: `${index * 500}ms` }}
            >
              {cloud}
            </div>
          ))}
        </div>
      </div>

      {/* Transmission Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`bg-quantum-surface rounded-lg p-4 text-center transition-all duration-500 ${
          transmissionStage >= 0 ? 'animate-glow' : 'opacity-50'
        }`}>
          <div className="text-2xl mb-2">📡</div>
          <div className="font-semibold text-quantum-primary">Packet Created</div>
          <div className="text-xs text-gray-400">Quantum data packaged for transmission</div>
        </div>

        <div className={`bg-quantum-surface rounded-lg p-4 text-center transition-all duration-500 ${
          transmissionStage >= 1 ? 'animate-glow' : 'opacity-50'
        }`}>
          <div className="text-2xl mb-2">🔒</div>
          <div className="font-semibold text-quantum-accent">Secure Transit</div>
          <div className="text-xs text-gray-400">Data remains encrypted during transport</div>
        </div>

        <div className={`bg-quantum-surface rounded-lg p-4 text-center transition-all duration-500 ${
          transmissionStage >= 2 ? 'animate-glow' : 'opacity-50'
        }`}>
          <div className="text-2xl mb-2">✅</div>
          <div className="font-semibold text-quantum-secondary">Delivered</div>
          <div className="text-xs text-gray-400">Packet arrived at destination</div>
        </div>
      </div>

      {/* Technical Details */}
      {transmissionStage >= 3 && (
        <div className="mt-8 bg-quantum-surface rounded-lg p-6 animate-glow">
          <h4 className="text-lg font-semibold text-quantum-accent mb-4 text-center">
            Quantum Security Features
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-quantum-primary">🛡️</span>
                <span>Quantum entanglement prevents tampering</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-quantum-secondary">🔍</span>
                <span>Any eavesdropping attempt is detected</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-quantum-accent">⚡</span>
                <span>Superposition ensures data integrity</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-quantum-primary">🌐</span>
                <span>Network-agnostic quantum protection</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkTransmission;
