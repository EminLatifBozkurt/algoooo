import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

export default function AnimationPlayer({ 
  steps, 
  intervalMs = 2000, 
  children,
  minHeight = '250px'
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps - 1) {
            return 0; // Döngü başa sarar
          }
          return prev + 1;
        });
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps, intervalMs]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, steps - 1));
  };
  
  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="anim-container" style={{ minHeight, flexDirection: 'column', position: 'relative' }}>
      
      {/* Animasyon İçerik Alanı */}
      <div style={{ flex: 1, width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
        {typeof children === 'function' ? children(currentStep) : children}
      </div>

      {/* Kontrol Çubuğu */}
      <div style={{
        marginTop: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        background: 'rgba(0,0,0,0.5)',
        padding: '10px 20px',
        borderRadius: '30px',
        zIndex: 10,
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
      }}>
        <button onClick={handleReset} style={btnStyle} title="Başa Dön">
          <RotateCcw size={18} />
        </button>
        <button onClick={handlePrev} style={{...btnStyle, opacity: currentStep === 0 ? 0.3 : 1}} disabled={currentStep === 0} title="Önceki Adım">
          <SkipBack size={18} />
        </button>
        
        <button onClick={handlePlayPause} style={{...btnStyle, background: 'var(--accent)', color: '#111', padding: '10px'}} title={isPlaying ? "Duraklat" : "Oynat"}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <button onClick={handleNext} style={{...btnStyle, opacity: currentStep === steps - 1 ? 0.3 : 1}} disabled={currentStep === steps - 1} title="Sonraki Adım">
          <SkipForward size={18} />
        </button>

        <div style={{ marginLeft: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 'bold' }}>
          {currentStep + 1} / {steps}
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-main)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  borderRadius: '50%',
  transition: 'transform 0.2s ease, background 0.2s ease'
};
