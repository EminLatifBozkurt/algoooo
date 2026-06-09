import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function BSTAnimation() {
  return (
    <AnimationPlayer steps={4} intervalMs={2500} minHeight="260px">
      {(step) => (
        <>
          <div className="anim-message" style={{ top: '0', bottom: 'auto', zIndex: 10 }}>
            {step === 0 && "12 Ekle: Kökten (10) başla. 12 > 10, sağa git."}
            {step === 1 && "Şu anki: 15. 12 < 15, sola git."}
            {step === 2 && "Sol boş (null). 12 buraya eklenir!"}
            {step === 3 && "Ekleme tamamlandı."}
          </div>

          <div className="anim-edge" style={{ left: 'calc(50% - 30px)', top: '50px', width: '60px', transform: 'rotate(135deg)' }} />
          <motion.div 
            className="anim-edge"
            animate={{ 
              backgroundColor: step >= 1 ? 'var(--accent)' : '#444',
              height: step >= 1 ? '3px' : '2px',
              boxShadow: step >= 1 ? '0 0 8px var(--accent)' : 'none'
            }}
            style={{ left: 'calc(50% + 10px)', top: '50px', width: '60px', transform: 'rotate(45deg)' }} 
          />
          <motion.div 
            className="anim-edge"
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            style={{ left: 'calc(50% + 30px)', top: '110px', width: '40px', transform: 'rotate(135deg)', backgroundColor: 'var(--accent)', height: '3px', boxShadow: '0 0 8px var(--accent)' }} 
          />

          <motion.div 
            className="anim-node"
            animate={{
              backgroundColor: step === 0 ? 'var(--accent)' : 'var(--primary-bg)',
              color: step === 0 ? 'var(--primary-bg)' : 'var(--text-main)',
              scale: step === 0 ? 1.15 : 1
            }}
            style={{ left: 'calc(50% - 20px)', top: '30px' }}>10</motion.div>
          <div className="anim-node" style={{ left: 'calc(50% - 80px)', top: '90px' }}>5</div>
          <motion.div 
            className="anim-node"
            animate={{
              backgroundColor: step === 1 ? 'var(--accent)' : 'var(--primary-bg)',
              color: step === 1 ? 'var(--primary-bg)' : 'var(--text-main)',
              scale: step === 1 ? 1.15 : 1
            }}
            style={{ left: 'calc(50% + 40px)', top: '90px' }}>15</motion.div>
          
          <motion.div 
            className="anim-node" 
            initial={{ left: 'calc(50% - 20px)', top: '30px', scale: 0.5, opacity: 0 }}
            animate={{ 
              left: step >= 2 ? 'calc(50% - 5px)' : (step === 1 ? 'calc(50% + 40px)' : 'calc(50% - 20px)'), 
              top: step >= 2 ? '140px' : (step === 1 ? '90px' : '30px'),
              opacity: step === 3 ? 1 : (step >= 2 ? 1 : 0.8),
              scale: step >= 2 ? 1.15 : 0.8,
              backgroundColor: step >= 2 ? 'var(--success)' : 'var(--primary-bg)',
              borderColor: step >= 2 ? 'var(--success)' : 'var(--secondary-accent)',
              color: step >= 2 ? 'var(--primary-bg)' : 'var(--text-main)',
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            style={{ zIndex: 3 }}
          >
            12
          </motion.div>
        </>
      )}
    </AnimationPlayer>
  );
}
