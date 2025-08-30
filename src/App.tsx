import React, { useState, useEffect } from 'react';
import './App.css';
import BinaryConversion from './components/BinaryConversion';
import HuffmanCoding from './components/HuffmanCoding';
import QuantumGates from './components/QuantumGates';
import NetworkTransmission from './components/NetworkTransmission';
import Decryption from './components/Decryption';
import StepControls from './components/StepControls';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const message = "Hello";
  
  const steps = [
    { title: "Original Message", component: <div className="text-quantum-primary text-4xl font-bold animate-glow">{message}</div> },
    { title: "Binary Conversion", component: <BinaryConversion message={message} /> },
    { title: "Huffman Compression", component: <HuffmanCoding message={message} /> },
    { title: "Quantum Encryption", component: <QuantumGates /> },
    { title: "Network Transmission", component: <NetworkTransmission /> },
    { title: "Quantum Decryption", component: <Decryption /> },
    { title: "Final Message", component: <div className="text-quantum-primary text-4xl font-bold animate-glow">{message}</div> }
  ];

  return (
    <div className="min-h-screen bg-quantum-background text-white">
      <div className="container py-8">
        <h1 className="responsive-heading font-bold text-center mb-4 text-quantum-primary animate-fadeInUp">
          Quantum Encryption Journey
        </h1>
        <p className="text-center text-quantum-secondary mb-8 responsive-text animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Watch your message travel through quantum encryption and back
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-quantum-surface rounded-full h-2 mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div 
            className="bg-quantum-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Current Step Display */}
        <div 
          className="bg-quantum-surface rounded-lg p-6 lg:p-8 mb-8 animate-fadeInUp responsive-container" 
          style={{ animationDelay: '0.6s' }}
        >
          <h2 className="responsive-subheading font-semibold mb-6 text-center text-quantum-accent">
            Step {currentStep + 1}: {steps[currentStep].title}
          </h2>
          <div className="flex justify-center items-center responsive-content px-4">
            <div className="w-full max-w-6xl">
              {steps[currentStep].component}
            </div>
          </div>
        </div>
        
        {/* Step Controls */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <StepControls 
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
            onPrevious={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
            onReset={() => setCurrentStep(0)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
