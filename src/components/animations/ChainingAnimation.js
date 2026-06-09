import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function ChainingAnimation() {
  return (
    <AnimationPlayer steps={5} intervalMs={2500} minHeight="240px">
      {(step) => (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="anim-message" style={{ top: '0px', bottom: 'auto' }}>
            Separate Chaining Ekleme:
            <br/>
            {step === 0 && "1. İndeks 1'e '11' ekle."}
            {step === 1 && "İndeks 1'de yeni bir düğüm oluştu."}
            {step === 2 && "2. Aynı indekse '99' ekle. (Çarpışma!)"}
            {step === 3 && "Çarpışma çözümü: Yeni eleman EN BAŞA eklenir."}
            {step === 4 && "99 eklendi. O(1) hızında listenin başına bağlandı."}
          </div>

          <div style={{ display: 'flex', gap: '30px', marginTop: '60px' }}>
            {/* Slot 0 */}
            <div style={{width:'50px', height:'50px', border:'2px solid var(--secondary-accent)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
              <span style={{ position: 'absolute', top: '-22px', fontSize: '0.8rem', color: '#888' }}>0</span>
            </div>
            
            {/* Slot 1 (Chained) */}
            <motion.div 
              animate={{ borderColor: step === 0 || step === 2 ? 'var(--accent)' : 'var(--secondary-accent)' }}
              style={{width:'50px', height:'50px', border:'2px solid', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}
            >
              <span style={{ position: 'absolute', top: '-22px', fontSize: '0.8rem', color: '#888' }}>1</span>
              
              <div style={{ position: 'absolute', top: '50px', display:'flex', flexDirection:'column', alignItems:'center' }}>
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: step >= 4 ? 1 : 0, height: step >= 4 ? '30px' : 0 }}
                  style={{ width: '2px', backgroundColor: 'var(--text-main)' }}
                />
                
                <motion.div 
                  className="anim-node"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: step >= 4 ? 1 : 0, 
                    opacity: step >= 4 ? 1 : 0,
                    backgroundColor: step === 4 ? 'var(--success)' : 'var(--primary-bg)',
                    borderColor: step === 4 ? 'var(--success)' : 'var(--secondary-accent)'
                  }}
                  style={{ position: 'relative', left: 0, top: 0, marginTop: '5px' }}
                >
                  99
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: step >= 1 ? 1 : 0, height: step >= 1 ? '30px' : 0 }}
                  style={{ width: '2px', backgroundColor: 'var(--text-main)', marginTop: '5px' }}
                />

                <motion.div 
                  className="anim-node"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: step >= 1 ? 1 : 0, 
                    opacity: step >= 1 ? 1 : 0,
                    backgroundColor: step === 1 ? 'var(--success)' : 'var(--primary-bg)',
                    borderColor: step === 1 ? 'var(--success)' : 'var(--secondary-accent)'
                  }}
                  style={{ position: 'relative', left: 0, top: 0, marginTop: '5px' }}
                >
                  11
                </motion.div>
              </div>
            </motion.div>

            {/* Slot 2 */}
            <div style={{width:'50px', height:'50px', border:'2px solid var(--secondary-accent)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
              <span style={{ position: 'absolute', top: '-22px', fontSize: '0.8rem', color: '#888' }}>2</span>
            </div>
          </div>
        </div>
      )}
    </AnimationPlayer>
  );
}
