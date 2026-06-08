"use client";
import React, { useState } from "react";

export default function LinearProbingLab() {
  const TABLE_SIZE = 10;
  const [hashTable, setHashTable] = useState(new Array(TABLE_SIZE).fill(null));
  const [inputValue, setInputValue] = useState("");
  const [logMessage, setLogMessage] = useState({ text: "Bekleniyor...", type: "success" });

  const insertToHash = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      setLogMessage({ text: "Lütfen geçerli bir sayı girin!", type: "danger" });
      return;
    }

    let index = val % TABLE_SIZE;
    let originalIndex = index;
    let step = 0;
    
    const newTable = [...hashTable];

    while (newTable[index] !== null) {
      step++;
      if (step > TABLE_SIZE) {
        setLogMessage({ text: `Hata: Tablo %100 Dolu! (α = 1). Sistem kilitlendi.`, type: "danger" });
        return;
      }
      index = (originalIndex + step) % TABLE_SIZE;
    }

    newTable[index] = val;
    setHashTable(newTable);
    setInputValue("");

    if (step === 0) {
      setLogMessage({ text: `[BAŞARILI] ${val} elemanı ${index}. indekse yerleşti (Çarpışma yok).`, type: "success" });
    } else {
      setLogMessage({ text: `[BİRİNCİL KÜMELENME] Çarpışma! Yuva ${originalIndex} doluydu. Linear probing ile kaydırılarak ${index}. indekse konuldu.`, type: "warning" });
    }
  };

  const resetHash = () => {
    setHashTable(new Array(TABLE_SIZE).fill(null));
    setLogMessage({ text: "Tablo sıfırlandı. Olasılıklar yenilendi.", type: "text-main" });
    setInputValue("");
  };

  return (
    <div className="section active">
      <h1>Laboratuvar 1: Linear Probing Simülatörü</h1>
      <div className="card">
        <p><strong>Deney:</strong> <code>h(x) = x % 10</code> fonksiyonu kullanılıyor. Çarpışma olduğunda (örn: 15 ve 25) kümelenmenin (Clustering) nasıl biriktiğini kendi gözlerinizle görün.</p>
        
        <div className="controls">
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Sayı girin (Örn: 25)" 
          />
          <button className="action-btn" onClick={insertToHash}>Hücreye Gönder</button>
          <button className="action-btn danger" onClick={resetHash}>Sistemi Sıfırla</button>
        </div>
        <p style={{ color: logMessage.type === 'text-main' ? 'var(--text-main)' : 'var(--' + logMessage.type + ')', fontFamily: 'monospace', marginTop: '15px', fontSize: '1.1rem' }}>
          {logMessage.text}
        </p>

        <div className="hash-table">
          {hashTable.map((val, i) => (
            <div key={i} className="hash-slot">
              <span className="slot-index">{i}</span>
              {val !== null ? val : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
