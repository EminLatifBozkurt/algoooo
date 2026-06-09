import React, { useState, useEffect } from 'react';

export default function BTreeAnimation() {
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
        {step === 0 && "Düğüm tam dolu: [10 | 20 | 30]"}
        {step === 1 && "Proactive Splitting: Ortanca değer (20) seçilir."}
        {step === 2 && "Düğüm ikiye bölünür. Ortanca değer yukarı itilir!"}
        {step === 3 && "Ebeveyn (20) ve iki çocuk [10], [30] oluştu."}
      </div>

      <div className="btree-node" style={{
        top: '60px', left: 'calc(50% - 25px)',
        opacity: step >= 2 ? 1 : 0,
        transform: step >= 2 ? 'translateY(0)' : 'translateY(20px)',
      }}>
        <div className="btree-key highlight">20</div>
      </div>

      <div className="anim-edge" style={{ width: '50px', left: 'calc(50% - 40px)', top: '100px', transform: 'rotate(120deg)', opacity: step >= 3 ? 1 : 0 }} />
      <div className="anim-edge" style={{ width: '50px', left: 'calc(50% - 10px)', top: '100px', transform: 'rotate(60deg)', opacity: step >= 3 ? 1 : 0 }} />

      <div className="btree-node" style={{
        top: '140px',
        left: step >= 2 ? 'calc(50% - 90px)' : 'calc(50% - 55px)',
      }}>
        <div className="btree-key">10</div>
        {step < 2 && <div className={`btree-key ${step === 1 ? 'highlight' : ''}`}>20</div>}
        {step < 2 && <div className="btree-key">30</div>}
      </div>

      <div className="btree-node" style={{
        top: '140px',
        left: 'calc(50% + 40px)',
        opacity: step >= 2 ? 1 : 0,
      }}>
        <div className="btree-key">30</div>
      </div>
    </div>
  );
}
