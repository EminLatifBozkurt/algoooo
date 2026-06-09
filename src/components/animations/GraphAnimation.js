import React, { useState, useEffect } from 'react';

export default function GraphAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 2);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="anim-container" style={{ minHeight: '220px', flexDirection: 'column', gap: '15px' }}>
      <div className="anim-message" style={{ top: '10px', bottom: 'auto' }}>
        {step === 0 ? "Adjacency Matrix (Matris): O(V²) Bellek" : "Adjacency List (Liste): O(V+E) Bellek"}
      </div>

      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '20px', alignItems: 'center' }}>
        
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <div className="anim-node" style={{ left: '40px', top: '0', width: '35px', height: '35px' }}>0</div>
          <div className="anim-node" style={{ left: '0', top: '70px', width: '35px', height: '35px' }}>1</div>
          <div className="anim-node" style={{ left: '80px', top: '70px', width: '35px', height: '35px' }}>2</div>
          <div className="anim-edge highlight" style={{ width: '55px', left: '15px', top: '50px', transform: 'rotate(60deg)' }} />
          <div className="anim-edge highlight" style={{ width: '55px', left: '50px', top: '20px', transform: 'rotate(60deg)' }} />
        </div>

        <div style={{ width: '180px' }}>
          {step === 0 ? (
            <table style={{ fontSize: '0.9rem', margin: 0, width: '100%' }}>
              <tbody>
                <tr><th></th><th>0</th><th>1</th><th>2</th></tr>
                <tr><th>0</th><td>0</td><td style={{color:'var(--accent)', fontWeight:'bold'}}>1</td><td style={{color:'var(--accent)', fontWeight:'bold'}}>1</td></tr>
                <tr><th>1</th><td style={{color:'var(--accent)', fontWeight:'bold'}}>1</td><td>0</td><td>0</td></tr>
                <tr><th>2</th><td style={{color:'var(--accent)', fontWeight:'bold'}}>1</td><td>0</td><td>0</td></tr>
              </tbody>
            </table>
          ) : (
            <div style={{ fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <b>0:</b> <span style={{ background:'var(--card-bg)', padding:'4px 8px', borderRadius:'4px', color:'var(--accent)' }}>1</span>➔<span style={{ background:'var(--card-bg)', padding:'4px 8px', borderRadius:'4px', color:'var(--accent)' }}>2</span>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <b>1:</b> <span style={{ background:'var(--card-bg)', padding:'4px 8px', borderRadius:'4px', color:'var(--accent)' }}>0</span>
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <b>2:</b> <span style={{ background:'var(--card-bg)', padding:'4px 8px', borderRadius:'4px', color:'var(--accent)' }}>0</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
