import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function TraversalAnimation() {
  const getHighlightDFS = (step, nodeId) => {
    if (step === 1 && nodeId === 0) return true;
    if (step === 2 && (nodeId === 0 || nodeId === 1)) return true;
    if (step === 3 && (nodeId === 0 || nodeId === 1 || nodeId === 3)) return true;
    if (step === 4 && (nodeId === 0 || nodeId === 1 || nodeId === 3 || nodeId === 4)) return true;
    if (step >= 5) return true; 
    return false;
  };
  
  const getHighlightBFS = (step, nodeId) => {
    if (step === 1 && nodeId === 0) return true;
    if (step === 2 && (nodeId === 0 || nodeId === 1 || nodeId === 2)) return true;
    if (step === 3 && (nodeId === 0 || nodeId === 1 || nodeId === 2 || nodeId === 3 || nodeId === 4)) return true;
    if (step >= 4) return true;
    return false;
  };

  return (
    <AnimationPlayer steps={12} intervalMs={1500} minHeight="280px">
      {(step) => {
        const isDFS = step < 6;
        const localStep = isDFS ? step : step - 6;

        const getHighlight = (id) => isDFS ? getHighlightDFS(localStep, id) : getHighlightBFS(localStep, id);

        return (
          <>
            <div className="anim-message" style={{ top: '0', bottom: 'auto' }}>
              {isDFS ? "DFS (Derinliğine): Önce en dibe (sol alt) iner. (Stack)" : "BFS (Genişliğine): Seviye seviye ilerler. (Queue)"}
              <br/>
              <span style={{color: 'var(--accent)', fontWeight: 'bold'}}>{isDFS ? "1. Aşama" : "2. Aşama"}</span>
            </div>

            <div className="anim-edge" style={{ left: 'calc(50% - 35px)', top: '75px', width: '50px', transform: 'rotate(135deg)' }} />
            <div className="anim-edge" style={{ left: 'calc(50% - 10px)', top: '75px', width: '50px', transform: 'rotate(45deg)' }} />
            
            <div className="anim-edge" style={{ left: 'calc(50% - 70px)', top: '135px', width: '40px', transform: 'rotate(120deg)' }} />
            <div className="anim-edge" style={{ left: 'calc(50% - 35px)', top: '135px', width: '40px', transform: 'rotate(60deg)' }} />

            {[0, 1, 2, 3, 4].map(id => (
              <motion.div key={id} className="anim-node"
                animate={{
                  backgroundColor: getHighlight(id) ? 'var(--success)' : 'var(--primary-bg)',
                  borderColor: getHighlight(id) ? 'var(--success)' : 'var(--secondary-accent)',
                  color: getHighlight(id) ? 'var(--primary-bg)' : 'var(--text-main)',
                  scale: getHighlight(id) ? 1.15 : 1
                }}
                style={{ 
                  left: id===0 ? 'calc(50% - 20px)' : id===1 ? 'calc(50% - 70px)' : id===2 ? 'calc(50% + 30px)' : id===3 ? 'calc(50% - 100px)' : 'calc(50% - 40px)', 
                  top: id===0 ? '50px' : id<=2 ? '110px' : '170px' 
                }}
              >
                {id}
              </motion.div>
            ))}
          </>
        )
      }}
    </AnimationPlayer>
  );
}
