import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function RehashingAnimation() {
  return (
    <AnimationPlayer steps={5} intervalMs={3000} minHeight="260px">
      {(step) => (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="anim-message" style={{ top: '0px', bottom: 'auto', zIndex: 10 }}>
            Rehashing (Yeniden Boyutlandırma)
            <br/>
            {step === 0 && "Tablo Boyutu: 3. Elemanlar: A, B. (Load Factor: %66)"}
            {step === 1 && "Yeni eleman 'C' eklenmek isteniyor. Kapasite doluyor!"}
            {step === 2 && "Tablo boyutu 2 katına (6) çıkarıldı."}
            {step === 3 && "Eski elemanlar (A, B) yeni boyut (6) üzerinden tekrar hashlenir."}
            {step === 4 && "Rehashing bitti. Yeni eleman 'C' başarıyla eklendi."}
          </div>

          <div style={{ position: 'relative', width: '100%', height: '150px', marginTop: '60px' }}>
            
            {/* Old Table (Size 3) */}
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: step >= 2 ? 0 : 1, y: step >= 2 ? -20 : 0 }}
              style={{ display: 'flex', gap: '10px', justifyContent: 'center', width: '100%', position: 'absolute', top: '20px' }}
            >
              <div style={{ width:'40px', height:'40px', border:'2px solid var(--secondary-accent)', display:'flex', alignItems:'center', justifyContent:'center' }}>A</div>
              <div style={{ width:'40px', height:'40px', border:'2px solid var(--secondary-accent)', display:'flex', alignItems:'center', justifyContent:'center' }}>B</div>
              <div style={{ width:'40px', height:'40px', border:'2px solid var(--danger)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {step === 1 ? <span style={{ color: 'var(--danger)' }}>C?</span> : ''}
              </div>
            </motion.div>

            {/* New Table (Size 6) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
              style={{ display: 'flex', gap: '10px', justifyContent: 'center', width: '100%', position: 'absolute', top: '50px' }}
            >
              <div style={{ width:'40px', height:'40px', border:'2px solid var(--secondary-accent)', display:'flex', alignItems:'center', justifyContent:'center' }}></div>
              <div style={{ width:'40px', height:'40px', border:'2px solid var(--secondary-accent)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <motion.span animate={{ opacity: step >= 3 ? 1 : 0 }}>A</motion.span>
              </div>
              <div style={{ width:'40px', height:'40px', border:'2px solid var(--secondary-accent)', display:'flex', alignItems:'center', justifyContent:'center' }}></div>
              <div style={{ width:'40px', height:'40px', border:'2px solid var(--secondary-accent)', display:'flex', alignItems:'center', justifyContent:'center' }}></div>
              <div style={{ width:'40px', height:'40px', border:'2px solid var(--secondary-accent)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <motion.span animate={{ opacity: step >= 3 ? 1 : 0 }}>B</motion.span>
              </div>
              <div style={{ width:'40px', height:'40px', border:'2px solid var(--success)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <motion.span animate={{ opacity: step >= 4 ? 1 : 0 }} style={{ color: 'var(--success)' }}>C</motion.span>
              </div>
            </motion.div>

          </div>
        </div>
      )}
    </AnimationPlayer>
  );
}
