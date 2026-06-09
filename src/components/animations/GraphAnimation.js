import React from 'react';
import { motion } from 'framer-motion';
import AnimationPlayer from './AnimationPlayer';

export default function GraphAnimation() {
  return (
    <AnimationPlayer steps={2} intervalMs={3500} minHeight="240px">
      {(step) => (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="anim-message" style={{ top: '0', bottom: 'auto' }}>
            {step === 0 ? "Adjacency Matrix (Matris): O(V²) Bellek" : "Adjacency List (Liste): O(V+E) Bellek"}
          </div>

          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '40px', alignItems: 'center' }}>
            
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <div className="anim-node" style={{ left: '40px', top: '0', width: '35px', height: '35px' }}>0</div>
              <div className="anim-node" style={{ left: '0', top: '70px', width: '35px', height: '35px' }}>1</div>
              <div className="anim-node" style={{ left: '80px', top: '70px', width: '35px', height: '35px' }}>2</div>
              <motion.div className="anim-edge highlight" animate={{ scale: step===0 ? 1 : 1.1 }} style={{ width: '55px', left: '15px', top: '50px', transform: 'rotate(60deg)' }} />
              <motion.div className="anim-edge highlight" animate={{ scale: step===0 ? 1 : 1.1 }} style={{ width: '55px', left: '50px', top: '20px', transform: 'rotate(60deg)' }} />
            </div>

            <div style={{ width: '180px' }}>
              {step === 0 ? (
                <motion.table initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: '0.9rem', margin: 0, width: '100%' }}>
                  <tbody>
                    <tr><th></th><th>0</th><th>1</th><th>2</th></tr>
                    <tr><th>0</th><td>0</td><td style={{color:'var(--accent)', fontWeight:'bold'}}>1</td><td style={{color:'var(--accent)', fontWeight:'bold'}}>1</td></tr>
                    <tr><th>1</th><td style={{color:'var(--accent)', fontWeight:'bold'}}>1</td><td>0</td><td>0</td></tr>
                    <tr><th>2</th><td style={{color:'var(--accent)', fontWeight:'bold'}}>1</td><td>0</td><td>0</td></tr>
                  </tbody>
                </motion.table>
              ) : (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <b>0:</b> <span style={{ background:'var(--card-bg)', padding:'4px 8px', borderRadius:'4px', color:'var(--accent)' }}>1</span>➔<span style={{ background:'var(--card-bg)', padding:'4px 8px', borderRadius:'4px', color:'var(--accent)' }}>2</span>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <b>1:</b> <span style={{ background:'var(--card-bg)', padding:'4px 8px', borderRadius:'4px', color:'var(--accent)' }}>0</span>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <b>2:</b> <span style={{ background:'var(--card-bg)', padding:'4px 8px', borderRadius:'4px', color:'var(--accent)' }}>0</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimationPlayer>
  );
}
