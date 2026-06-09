import React, { useState, useEffect } from 'react';

export default function BSTAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="anim-container" style={{ minHeight: '220px' }}>
      <div className="anim-message" style={{ top: '10px', bottom: 'auto' }}>
        {step === 0 && "12 Ekle: Kökten (10) başla. 12 > 10, sağa git."}
        {step === 1 && "Şu anki: 15. 12 < 15, sola git."}
        {step === 2 && "Sol boş (null). 12 buraya eklenir!"}
        {step === 3 && "Ekleme tamamlandı."}
      </div>

      <div className="anim-edge" style={{ left: 'calc(50% - 30px)', top: '50px', width: '60px', transform: 'rotate(135deg)' }} />
      <div className={`anim-edge ${step >= 1 ? 'highlight' : ''}`} style={{ left: 'calc(50% + 10px)', top: '50px', width: '60px', transform: 'rotate(45deg)' }} />
      <div className={`anim-edge ${step >= 2 ? 'highlight' : ''}`} style={{ left: 'calc(50% + 30px)', top: '110px', width: '40px', transform: 'rotate(135deg)', opacity: step >= 2 ? 1 : 0 }} />

      <div className={`anim-node ${step === 0 ? 'highlight' : ''}`} style={{ left: 'calc(50% - 20px)', top: '30px' }}>10</div>
      <div className="anim-node" style={{ left: 'calc(50% - 80px)', top: '90px' }}>5</div>
      <div className={`anim-node ${step === 1 ? 'highlight' : ''}`} style={{ left: 'calc(50% + 40px)', top: '90px' }}>15</div>
      
      <div className={`anim-node ${step >= 2 ? 'success' : ''}`} style={{ 
        left: step >= 2 ? 'calc(50% - 5px)' : (step === 1 ? 'calc(50% + 40px)' : 'calc(50% - 20px)'), 
        top: step >= 2 ? '140px' : (step === 1 ? '90px' : '30px'),
        opacity: step === 3 ? 1 : (step >= 2 ? 1 : 0),
        zIndex: 3,
        transform: step >= 2 ? 'scale(1)' : 'scale(0.5)'
      }}>
        12
      </div>
    </div>
  );
}
