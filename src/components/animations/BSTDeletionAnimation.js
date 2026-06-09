import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function BSTDeletionAnimation() {
  return (
    <AnimationPlayer steps={5} intervalMs={3000} minHeight="270px">
      {(step) => (
        <>
          <div className="anim-message" style={{ top: '0', bottom: 'auto', zIndex: 10 }}>
            İki Çocuklu Düğüm Silme (Hedef: 20)
            <br/>
            {step === 0 && "1. Adım: Silinecek düğüm (20) bulundu. İki çocuğu var!"}
            {step === 1 && "2. Adım: Sağ alt ağacın en küçüğü (Inorder Successor) aranır."}
            {step === 2 && "3. Adım: Inorder Successor (25) bulundu."}
            {step === 3 && "4. Adım: Hedef düğümün (20) değeri 25 ile değiştirilir."}
            {step === 4 && "5. Adım: Kopyalanan orijinal 25 yapraktan silinir."}
          </div>

          <div className="anim-edge" style={{ left: 'calc(50% - 40px)', top: '65px', width: '50px', transform: 'rotate(135deg)' }} />
          <div className="anim-edge" style={{ left: 'calc(50%)', top: '65px', width: '50px', transform: 'rotate(45deg)' }} />
          
          <motion.div className="anim-edge" animate={{ opacity: step >= 4 ? 0 : 1 }} style={{ left: 'calc(50% + 20px)', top: '135px', width: '40px', transform: 'rotate(135deg)' }} />
          <div className="anim-edge" style={{ left: 'calc(50% + 50px)', top: '135px', width: '40px', transform: 'rotate(45deg)' }} />

          <motion.div 
            className="anim-node"
            animate={{
              backgroundColor: step === 0 ? 'var(--danger)' : (step >= 3 ? 'var(--success)' : 'var(--primary-bg)'),
              borderColor: step === 0 ? 'var(--danger)' : (step >= 3 ? 'var(--success)' : 'var(--secondary-accent)'),
              color: step === 0 || step >= 3 ? 'var(--primary-bg)' : 'var(--text-main)',
              scale: step === 0 || step === 3 ? 1.15 : 1
            }}
            style={{ left: 'calc(50% - 20px)', top: '50px' }}
          >
            {step >= 3 ? '25' : '20'}
          </motion.div>

          <div className="anim-node" style={{ left: 'calc(50% - 80px)', top: '110px' }}>10</div>
          
          <motion.div 
            className="anim-node"
            animate={{
              borderColor: step === 1 ? 'var(--accent)' : 'var(--secondary-accent)',
              boxShadow: step === 1 ? '0 0 10px var(--accent)' : 'none'
            }}
            style={{ left: 'calc(50% + 40px)', top: '110px' }}
          >
            30
          </motion.div>

          <motion.div 
            className="anim-node"
            animate={{
              backgroundColor: step === 2 ? 'var(--accent)' : 'var(--primary-bg)',
              color: step === 2 ? 'var(--primary-bg)' : 'var(--text-main)',
              scale: step === 2 ? 1.15 : 1,
              opacity: step >= 4 ? 0 : 1
            }}
            style={{ left: 'calc(50%)', top: '170px' }}
          >
            25
          </motion.div>

          <div className="anim-node" style={{ left: 'calc(50% + 80px)', top: '170px' }}>40</div>
        </>
      )}
    </AnimationPlayer>
  );
}
