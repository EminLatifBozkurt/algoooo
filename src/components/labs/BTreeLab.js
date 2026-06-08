"use client";
import React, { useState } from "react";

export default function BTreeLab() {
  const [tValue, setTValue] = useState(3);
  const [results, setResults] = useState(null);

  const calculateBTree = () => {
    const t = parseInt(tValue);
    if (isNaN(t) || t < 2) {
      alert("B-Tree için minimum derece (t) en az 2 olmalıdır!");
      return;
    }

    setResults({
      maxKey: (2 * t) - 1,
      minKey: t - 1,
      maxChild: 2 * t,
      minChild: t,
      splitPoint: (2 * t) - 1,
    });
  };

  return (
    <div className="section active">
      <h1>Laboratuvar 2: B-Tree Parametre Mühendisi</h1>
      <div className="card">
        <p><strong>Deney:</strong> B-Tree'nin derecesini (t) değiştirerek, bir düğümün kapasitelerinin nasıl şekillendiğini anında analiz edin. (Sınavdaki tablo soruları için harika pratik).</p>
        
        <div className="controls">
          <label style={{ fontWeight: "bold", fontSize: "1.1rem", color: "var(--text-main)" }}>Derece (t) Giriniz (t ≥ 2): </label>
          <input 
            type="number" 
            value={tValue} 
            min="2"
            onChange={(e) => setTValue(e.target.value)}
          />
          <button className="action-btn" onClick={calculateBTree}>Sınırları Hesapla</button>
        </div>

        {results && (
          <div style={{ marginTop: "20px" }}>
            <table>
              <thead>
                <tr>
                  <th>Özellik</th>
                  <th>Formül</th>
                  <th>Hesaplanan Değer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Maksimum Anahtar (Key) Sayısı</td>
                  <td>2t - 1</td>
                  <td style={{ fontWeight: "bold", color: "var(--danger)" }}>{results.maxKey}</td>
                </tr>
                <tr>
                  <td>Minimum Anahtar (Key) Sayısı</td>
                  <td>t - 1</td>
                  <td style={{ fontWeight: "bold" }}>{results.minKey}</td>
                </tr>
                <tr>
                  <td>Maksimum Çocuk (Child) Sayısı</td>
                  <td>2t</td>
                  <td style={{ fontWeight: "bold", color: "var(--success)" }}>{results.maxChild}</td>
                </tr>
                <tr>
                  <td>Minimum Çocuk (Child) Sayısı</td>
                  <td>t</td>
                  <td style={{ fontWeight: "bold" }}>{results.minChild}</td>
                </tr>
              </tbody>
            </table>
            <p style={{ color: "var(--warning)", marginTop: "15px", textAlign: "center" }}>
              💡 Not: Ağaç ekleme yaparken düğümdeki anahtar sayısı <strong>{results.splitPoint}</strong> değerine ulaştığında Proactive Splitting (Önceden Bölme) gerçekleşir.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
