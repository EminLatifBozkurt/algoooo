"use client";
import React, { useState } from "react";

export default function ChainingHashLab() {
  const TABLE_SIZE = 7;
  const [hashTable, setHashTable] = useState(Array.from({ length: TABLE_SIZE }, () => []));
  const [inputValue, setInputValue] = useState("");
  const [logMessage, setLogMessage] = useState({ text: "Değer girerek tabloyu doldurmaya başlayın.", type: "text-main" });

  const insertToHash = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      setLogMessage({ text: "Lütfen geçerli bir sayı girin!", type: "danger" });
      return;
    }

    const index = val % TABLE_SIZE;
    
    // Create new copy of table
    const newTable = [...hashTable];
    const newChain = [...newTable[index]];
    
    let isCollision = newChain.length > 0;
    
    newChain.push(val);
    newTable[index] = newChain;
    
    setHashTable(newTable);
    setInputValue("");

    if (isCollision) {
      setLogMessage({ text: `[ÇARPIŞMA] ${val} elemanı ${index}. yuvaya gitti. O yuva dolu olduğu için zincire (Linked List) bağlandı!`, type: "warning" });
    } else {
      setLogMessage({ text: `[BAŞARILI] ${val} elemanı doğrudan ${index}. yuvaya yerleşti.`, type: "success" });
    }
  };

  const resetHash = () => {
    setHashTable(Array.from({ length: TABLE_SIZE }, () => []));
    setLogMessage({ text: "Tablo sıfırlandı.", type: "text-main" });
    setInputValue("");
  };

  return (
    <div className="section active">
      <h1>Laboratuvar 5: Ayrı Zincirleme (Separate Chaining) Hashing</h1>
      <div className="card">
        <p><strong>Deney:</strong> <code>h(x) = x % 7</code> fonksiyonu kullanılıyor. Linear Probing'deki gibi yuvadan taşmak yerine, her yuvada bir Bağlı Liste (Linked List) tutulur. Aynı indekse gelen sayılar aşağı doğru sarkarak zincir oluşturur.</p>
        
        <div className="controls">
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Sayı girin (Örn: 15)" 
          />
          <button className="action-btn" onClick={insertToHash}>Hashla ve Ekle</button>
          <button className="action-btn danger" style={{ marginLeft: "auto" }} onClick={resetHash}>Tabloyu Temizle</button>
        </div>
        
        <p style={{ color: logMessage.type === 'text-main' ? 'var(--text-main)' : 'var(--' + logMessage.type + ')', fontFamily: 'monospace', marginTop: '15px', fontSize: '1.1rem' }}>
          {logMessage.text}
        </p>

        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "25px", 
          marginTop: "40px",
          flexWrap: "wrap",
          padding: "20px",
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "8px",
          minHeight: "300px"
        }}>
          {hashTable.map((chain, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Ana Dizi Yuvası */}
              <div style={{
                width: "60px", height: "60px",
                backgroundColor: "var(--primary-bg)",
                border: "2px solid var(--accent)",
                borderRadius: "4px",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                fontSize: "1.2rem", fontWeight: "bold", position: "relative"
              }}>
                <span style={{ position: "absolute", top: "-25px", fontSize: "1rem", color: "var(--secondary-accent)" }}>{idx}</span>
                {chain.length > 0 ? "⛓️" : "null"}
              </div>
              
              {/* Zincir (Linked List) */}
              {chain.map((val, i) => (
                <React.Fragment key={i}>
                  <div style={{ color: "var(--text-main)", margin: "4px 0", fontSize: "1.5rem" }}>↓</div>
                  <div style={{
                    width: "50px", height: "50px",
                    backgroundColor: "var(--sidebar-bg)",
                    border: "1px solid var(--success)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", fontWeight: "bold",
                    color: "var(--text-main)",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.5)"
                  }}>
                     {val}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
