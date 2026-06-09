import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function BTreeAnimation() {
  return (
    <AnimationPlayer steps={4} intervalMs={2500} minHeight="240px">
      {(step) => (
        <>
          <div className="anim-message" style={{ top: '0', bottom: 'auto' }}>
            {step === 0 && "Düğüm tam dolu: [10 | 20 | 30]"}
            {step === 1 && "Proactive Splitting: Ortanca değer (20) seçilir."}
            {step === 2 && "Düğüm ikiye bölünür. Ortanca değer yukarı itilir!"}
            {step === 3 && "Ebeveyn (20) ve iki çocuk [10], [30] oluştu."}
          </div>

          <motion.div className="btree-node" 
            animate={{
              top: '60px', left: 'calc(50% - 25px)',
              opacity: step >= 2 ? 1 : 0,
              y: step >= 2 ? 0 : 20,
            }}
          >
            <div className="btree-key highlight">20</div>
          </motion.div>

          <motion.div className="anim-edge" 
            animate={{ opacity: step >= 3 ? 1 : 0 }}
            style={{ width: '50px', left: 'calc(50% - 40px)', top: '100px', transform: 'rotate(120deg)' }} />
          <motion.div className="anim-edge" 
            animate={{ opacity: step >= 3 ? 1 : 0 }}
            style={{ width: '50px', left: 'calc(50% - 10px)', top: '100px', transform: 'rotate(60deg)' }} />

          <motion.div className="btree-node" 
            animate={{
              top: '140px',
              x: step >= 2 ? -40 : 0,
              left: 'calc(50% - 55px)'
            }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="btree-key">10</div>
            {step < 2 && <motion.div animate={{ backgroundColor: step === 1 ? 'var(--accent)' : 'transparent', color: step===1 ? 'var(--primary-bg)' : 'var(--text-main)' }} className="btree-key">20</motion.div>}
            {step < 2 && <div className="btree-key">30</div>}
          </motion.div>

          <motion.div className="btree-node" 
            animate={{
              top: '140px',
              left: 'calc(50% + 40px)',
              opacity: step >= 2 ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="btree-key">30</div>
          </motion.div>
        </>
      )}
    </AnimationPlayer>
  );
}
