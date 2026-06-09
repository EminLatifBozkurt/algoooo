import React, { useState, useEffect } from 'react';

export default function HashingAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const slots = [
    { id: 0, val: null },
    { id: 1, val: 11 },
    { id: 2, val: 22 }, 
    { id: 3, val: 33 }, 
    { id: 4, val: null }, 
  ];

  return (
    <div className="anim-container" style={{ minHeight: '180px', flexDirection: 'column' }}>
      <div className="anim-message" style={{ top: '10px', bottom: 'auto' }}>
        Linear Probing Ekleme: 42 (Hash: 42 % 5 = 2)
        <br/>
        {step === 0 && "Adım 1: İndeks 2'ye bak."}
        {step === 1 && "İndeks 2 DOLU. Çarpışma! Bir sonrakine atla."}
        {step === 2 && "İndeks 3'e bak. DOLU. Çarpışma! Atla."}
        {step === 3 && "İndeks 4 BOŞ. Oraya yerleştir."}
        {step === 4 && "İşlem başarılı."}
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
        {slots.map((s, idx) => {
          let isTarget = false;
          let isSuccess = false;
          if (step === 0 && idx === 2) isTarget = true;
          if (step === 1 && idx === 2) isTarget = true;
          if (step === 2 && idx === 3) isTarget = true;
          if (step === 3 && idx === 4) isSuccess = true;
          if (step === 4 && idx === 4) isSuccess = true;

          return (
            <div key={idx} style={{
              width: '50px', height: '50px', 
              border: `2px solid ${isTarget ? 'var(--danger)' : (isSuccess ? 'var(--success)' : 'var(--secondary-accent)')}`,
              backgroundColor: 'var(--primary-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '1.2rem',
              position: 'relative',
              boxShadow: isTarget ? '0 0 10px var(--danger)' : (isSuccess ? '0 0 10px var(--success)' : 'none'),
              transition: 'all 0.3s'
            }}>
              <span style={{ position: 'absolute', top: '-22px', fontSize: '0.8rem', color: 'var(--text-main)', opacity: 0.7 }}>{idx}</span>
              {(step >= 3 && idx === 4) ? '42' : s.val}
            </div>
          );
        })}
      </div>
    </div>
  );
}
