import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function MSTAnimation() {
  return (
    <AnimationPlayer steps={6} intervalMs={2000} minHeight="270px">
      {(step) => (
        <>
          <div className="anim-message" style={{ top: '0', bottom: 'auto' }}>
            Kruskal Algoritması (Açgözlü)
            <br/>
            {step === 0 && "1. Adım: Tüm kenarları ağırlıklarına göre sırala."}
            {step === 1 && "2. Adım: En hafif kenarı (2) seç."}
            {step === 2 && "3. Adım: Sonraki en hafif kenarı (3) seç."}
            {step === 3 && "4. Adım: Ağırlığı 4 olan kenar DÖNGÜ yapar! Reddet."}
            {step === 4 && "5. Adım: Sonraki kenarı (5) seç."}
            {step === 5 && "MST Tamamlandı. Tüm düğümler bağlandı."}
          </div>

          <div className="anim-node" style={{ left: 'calc(50% - 20px)', top: '60px' }}>A</div>
          <div className="anim-node" style={{ left: 'calc(50% - 90px)', top: '130px' }}>B</div>
          <div className="anim-node" style={{ left: 'calc(50% + 50px)', top: '130px' }}>C</div>
          <div className="anim-node" style={{ left: 'calc(50% - 20px)', top: '200px' }}>D</div>

          <motion.div className="anim-edge" 
            animate={{
              backgroundColor: step >= 1 ? 'var(--success)' : '#444',
              height: step >= 1 ? '3px' : '2px',
              boxShadow: step >= 1 ? '0 0 8px var(--success)' : 'none'
            }}
            style={{ left: 'calc(50% - 55px)', top: '95px', width: '70px', transform: 'rotate(135deg)' }}>
            <span style={{ position:'absolute', top:'-20px', left:'30px', color: step >= 1 ? 'var(--success)' : 'var(--text-main)', fontWeight:'bold' }}>2</span>
          </motion.div>

          <motion.div className="anim-edge" 
            animate={{
              backgroundColor: step >= 2 ? 'var(--success)' : '#444',
              height: step >= 2 ? '3px' : '2px',
              boxShadow: step >= 2 ? '0 0 8px var(--success)' : 'none'
            }}
            style={{ left: 'calc(50% + 15px)', top: '95px', width: '70px', transform: 'rotate(45deg)' }}>
            <span style={{ position:'absolute', top:'-20px', left:'30px', color: step >= 2 ? 'var(--success)' : 'var(--text-main)', fontWeight:'bold' }}>3</span>
          </motion.div>

          <motion.div className="anim-edge" 
            animate={{
              backgroundColor: step === 3 ? 'var(--danger)' : '#444',
              height: step === 3 ? '3px' : '2px',
              zIndex: step===3 ? 3 : 1,
              boxShadow: step === 3 ? '0 0 8px var(--danger)' : 'none'
            }}
            style={{ left: 'calc(50% - 50px)', top: '150px', width: '100px' }}>
            <span style={{ position:'absolute', top:'-20px', left:'45px', color: step === 3 ? 'var(--danger)' : 'var(--text-main)', fontWeight:'bold' }}>4</span>
          </motion.div>

          <motion.div className="anim-edge" 
            animate={{
              backgroundColor: step >= 4 ? 'var(--success)' : '#444',
              height: step >= 4 ? '3px' : '2px',
              boxShadow: step >= 4 ? '0 0 8px var(--success)' : 'none'
            }}
            style={{ left: 'calc(50% - 55px)', top: '165px', width: '70px', transform: 'rotate(45deg)' }}>
            <span style={{ position:'absolute', top:'5px', left:'30px', color: step >= 4 ? 'var(--success)' : 'var(--text-main)', fontWeight:'bold' }}>5</span>
          </motion.div>
        </>
      )}
    </AnimationPlayer>
  );
}
