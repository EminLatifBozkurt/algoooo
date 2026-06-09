import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function HashingAnimation() {
  const slots = [
    { id: 0, val: null },
    { id: 1, val: 11 },
    { id: 2, val: 22 }, 
    { id: 3, val: 33 }, 
    { id: 4, val: null }, 
  ];

  return (
    <AnimationPlayer steps={5} intervalMs={2000} minHeight="220px">
      {(step) => (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="anim-message" style={{ top: '0px', bottom: 'auto' }}>
            Linear Probing Ekleme: 42 (Hash: 42 % 5 = 2)
            <br/>
            {step === 0 && "Adım 1: İndeks 2'ye bak."}
            {step === 1 && "İndeks 2 DOLU. Çarpışma! Bir sonrakine atla."}
            {step === 2 && "İndeks 3'e bak. DOLU. Çarpışma! Atla."}
            {step === 3 && "İndeks 4 BOŞ. Oraya yerleştir."}
            {step === 4 && "İşlem başarılı."}
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '60px', position: 'relative' }}>
            {slots.map((s, idx) => {
              let isTarget = false;
              let isSuccess = false;
              if (step === 0 && idx === 2) isTarget = true;
              if (step === 1 && idx === 2) isTarget = true;
              if (step === 2 && idx === 3) isTarget = true;
              if (step === 3 && idx === 4) isSuccess = true;
              if (step === 4 && idx === 4) isSuccess = true;

              return (
                <motion.div key={idx} 
                  animate={{
                    borderColor: isTarget ? 'var(--danger)' : (isSuccess ? 'var(--success)' : 'var(--secondary-accent)'),
                    boxShadow: isTarget ? '0 0 15px var(--danger)' : (isSuccess ? '0 0 15px var(--success)' : 'none'),
                    y: isTarget || isSuccess ? -5 : 0
                  }}
                  style={{
                    width: '50px', height: '50px', 
                    border: '2px solid',
                    backgroundColor: 'var(--primary-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', fontSize: '1.2rem',
                    position: 'relative',
                    borderRadius: '8px'
                  }}>
                  <span style={{ position: 'absolute', top: '-22px', fontSize: '0.8rem', color: 'var(--text-main)', opacity: 0.7 }}>{idx}</span>
                  {(step >= 3 && idx === 4) ? '' : s.val}
                </motion.div>
              );
            })}

            {/* Hareketli 42 objesi */}
            <motion.div 
              className="anim-node"
              initial={{ x: 2 * 65, y: -60, opacity: 0 }}
              animate={{
                x: step < 2 ? 2 * 65 : (step === 2 ? 3 * 65 : 4 * 65),
                y: step >= 3 ? 5 : -40,
                opacity: 1,
                backgroundColor: step >= 3 ? 'var(--success)' : 'var(--accent)',
                borderColor: step >= 3 ? 'var(--success)' : 'var(--accent)',
                color: 'var(--primary-bg)',
                scale: step >= 3 ? 1 : 1.1
              }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              style={{ position: 'absolute', top: 0, left: 0, marginLeft: '-5px', marginTop: '-5px', zIndex: 10 }}
            >
              42
            </motion.div>
          </div>
        </div>
      )}
    </AnimationPlayer>
  );
}
