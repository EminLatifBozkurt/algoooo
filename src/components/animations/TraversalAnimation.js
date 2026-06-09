import React, { useState, useEffect } from 'react';

export default function TraversalAnimation() {
  const [step, setStep] = useState(0);
  const [isDFS, setIsDFS] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => {
        if (s === 5) {
          setIsDFS((prev) => !prev);
          return 0;
        }
        return s + 1;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [isDFS]);

  const getHighlight = (nodeId) => {
    if (isDFS) {
      if (step === 1 && nodeId === 0) return true;
      if (step === 2 && (nodeId === 0 || nodeId === 1)) return true;
      if (step === 3 && (nodeId === 0 || nodeId === 1 || nodeId === 3)) return true;
      if (step === 4 && (nodeId === 0 || nodeId === 1 || nodeId === 3 || nodeId === 4)) return true;
      if (step === 5) return true; 
    } else {
      if (step === 1 && nodeId === 0) return true;
      if (step === 2 && (nodeId === 0 || nodeId === 1 || nodeId === 2)) return true;
      if (step === 3 && (nodeId === 0 || nodeId === 1 || nodeId === 2 || nodeId === 3 || nodeId === 4)) return true;
      if (step >= 4) return true;
    }
    return false;
  };

  return (
    <div className="anim-container" style={{ minHeight: '260px' }}>
      <div className="anim-message" style={{ top: '10px', bottom: 'auto' }}>
        {isDFS ? "DFS (Derinliğine): Önce en dibe (sol alt) iner. (Stack)" : "BFS (Genişliğine): Seviye seviye ilerler. (Queue)"}
      </div>

      <div className="anim-edge" style={{ left: 'calc(50% - 35px)', top: '75px', width: '50px', transform: 'rotate(135deg)' }} />
      <div className="anim-edge" style={{ left: 'calc(50% - 10px)', top: '75px', width: '50px', transform: 'rotate(45deg)' }} />
      
      <div className="anim-edge" style={{ left: 'calc(50% - 70px)', top: '135px', width: '40px', transform: 'rotate(120deg)' }} />
      <div className="anim-edge" style={{ left: 'calc(50% - 35px)', top: '135px', width: '40px', transform: 'rotate(60deg)' }} />

      <div className={`anim-node ${getHighlight(0) ? 'success' : ''}`} style={{ left: 'calc(50% - 20px)', top: '50px' }}>0</div>
      <div className={`anim-node ${getHighlight(1) ? 'success' : ''}`} style={{ left: 'calc(50% - 70px)', top: '110px' }}>1</div>
      <div className={`anim-node ${getHighlight(2) ? 'success' : ''}`} style={{ left: 'calc(50% + 30px)', top: '110px' }}>2</div>
      <div className={`anim-node ${getHighlight(3) ? 'success' : ''}`} style={{ left: 'calc(50% - 100px)', top: '170px' }}>3</div>
      <div className={`anim-node ${getHighlight(4) ? 'success' : ''}`} style={{ left: 'calc(50% - 40px)', top: '170px' }}>4</div>
    </div>
  );
}
