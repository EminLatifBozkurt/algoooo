import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function PrimAnimation() {
  return (
    <AnimationPlayer steps={6} intervalMs={2500} minHeight="270px">
      {(step) => (
        <>
          <div className="anim-message" style={{ top: '0', bottom: 'auto', zIndex: 10 }}>
            Prim Algoritması (Tek noktadan büyüme)
            <br/>
            {step === 0 && "1. Adım: A düğümünden başla. (Fethedilenler: A)"}
            {step === 1 && "A'dan çıkan en ucuz kenarı (A-C: 1) seç."}
            {step === 2 && "Fethedilenler: {A, C}. Dışarı uzananlar: A-B(3), C-B(2), C-D(4)."}
            {step === 3 && "En ucuz dış kenarı (C-B: 2) seç."}
            {step === 4 && "Fethedilenler: {A, C, B}. Kalan dış kenarlar: B-D(5), C-D(4)."}
            {step === 5 && "En ucuz dış kenarı (C-D: 4) seç. MST Tamamlandı."}
          </div>

          <motion.div className="anim-node" animate={{ backgroundColor: step >= 0 ? 'var(--success)' : 'var(--primary-bg)', color: step >= 0 ? '#111' : 'var(--text-main)' }} style={{ left: 'calc(50% - 20px)', top: '60px' }}>A</motion.div>
          <motion.div className="anim-node" animate={{ backgroundColor: step >= 3 ? 'var(--success)' : 'var(--primary-bg)', color: step >= 3 ? '#111' : 'var(--text-main)' }} style={{ left: 'calc(50% - 90px)', top: '130px' }}>B</motion.div>
          <motion.div className="anim-node" animate={{ backgroundColor: step >= 1 ? 'var(--success)' : 'var(--primary-bg)', color: step >= 1 ? '#111' : 'var(--text-main)' }} style={{ left: 'calc(50% + 50px)', top: '130px' }}>C</motion.div>
          <motion.div className="anim-node" animate={{ backgroundColor: step >= 5 ? 'var(--success)' : 'var(--primary-bg)', color: step >= 5 ? '#111' : 'var(--text-main)' }} style={{ left: 'calc(50% - 20px)', top: '200px' }}>D</motion.div>

          {/* A-B (3) */}
          <div className="anim-edge" style={{ left: 'calc(50% - 55px)', top: '95px', width: '70px', transform: 'rotate(135deg)', zIndex: 1 }}>
            <span style={{ position:'absolute', top:'-20px', left:'30px', color: '#888', fontWeight:'bold' }}>3</span>
          </div>

          {/* A-C (1) */}
          <motion.div className="anim-edge" 
            animate={{ backgroundColor: step >= 1 ? 'var(--accent)' : '#444', height: step >= 1 ? '3px' : '2px', boxShadow: step >= 1 ? '0 0 8px var(--accent)' : 'none' }}
            style={{ left: 'calc(50% + 15px)', top: '95px', width: '70px', transform: 'rotate(45deg)', zIndex: 2 }}>
            <span style={{ position:'absolute', top:'-20px', left:'30px', color: step >= 1 ? 'var(--accent)' : '#888', fontWeight:'bold' }}>1</span>
          </motion.div>

          {/* C-B (2) */}
          <motion.div className="anim-edge" 
            animate={{ backgroundColor: step >= 3 ? 'var(--accent)' : '#444', height: step >= 3 ? '3px' : '2px', boxShadow: step >= 3 ? '0 0 8px var(--accent)' : 'none' }}
            style={{ left: 'calc(50% - 50px)', top: '150px', width: '100px', zIndex: 2 }}>
            <span style={{ position:'absolute', top:'-20px', left:'45px', color: step >= 3 ? 'var(--accent)' : '#888', fontWeight:'bold' }}>2</span>
          </motion.div>

          {/* C-D (4) */}
          <motion.div className="anim-edge" 
            animate={{ backgroundColor: step >= 5 ? 'var(--accent)' : '#444', height: step >= 5 ? '3px' : '2px', boxShadow: step >= 5 ? '0 0 8px var(--accent)' : 'none' }}
            style={{ left: 'calc(50% + 15px)', top: '165px', width: '70px', transform: 'rotate(135deg)', zIndex: 2 }}>
            <span style={{ position:'absolute', top:'-20px', left:'30px', color: step >= 5 ? 'var(--accent)' : '#888', fontWeight:'bold' }}>4</span>
          </motion.div>

          {/* B-D (5) */}
          <div className="anim-edge" style={{ left: 'calc(50% - 55px)', top: '165px', width: '70px', transform: 'rotate(45deg)', zIndex: 1 }}>
            <span style={{ position:'absolute', top:'5px', left:'30px', color: '#888', fontWeight:'bold' }}>5</span>
          </div>

        </>
      )}
    </AnimationPlayer>
  );
}
