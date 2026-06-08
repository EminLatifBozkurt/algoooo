"use client";
import React, { useState } from "react";

export default function ExamSimulation() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleOptionChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const checkExam = () => {
    let score = 0;
    let mistakes = [];

    const ansKey = { 
        q1: 'c', q2: 'b', q3: 'b', q4: 'a', q5: 'b', 
        q6: 'b', q7: 'b', q8: 'b', q9: 'a', q10: 'b' 
    };
    
    for (let [q, ans] of Object.entries(ansKey)) {
        if (answers[q] === ans) {
            score += 10;
        } else {
            mistakes.push(q.replace('q', 'Soru '));
        }
    }

    setResult({ score, mistakes });
  };

  return (
    <div className="section active">
      <h1>Kapsamlı Final Simülasyonu</h1>
      <div className="card">
        <p style={{ color: "var(--warning)", marginBottom: "20px" }}>
          Tüm notlarından ve hocanın potansiyel tuzaklarından süzülmüş 10 zorlu soru. Hazırsan başlayalım.
        </p>
        
        <div className="question">
            <p>1. İkili arama ağacına iteratif olarak eleman ekleme fonksiyonunda yazılan while döngüsü aşağıya inmeden önce, bulunduğumuz düğümü hangi komutla yedeklemeliyiz ki ekleme yapacağımız ebeveyni unutmayalım?</p>
            <div className="options">
                <label><input type="radio" name="q1" value="a" onChange={() => handleOptionChange('q1', 'a')} /> A) <code>current = root;</code></label>
                <label><input type="radio" name="q1" value="b" onChange={() => handleOptionChange('q1', 'b')} /> B) <code>root = parent.left;</code></label>
                <label><input type="radio" name="q1" value="c" onChange={() => handleOptionChange('q1', 'c')} /> C) <code>parent = current;</code></label>
                <label><input type="radio" name="q1" value="d" onChange={() => handleOptionChange('q1', 'd')} /> D) <code>parent.next = current;</code></label>
            </div>
        </div>

        <div className="question">
            <p>2. Ayrı Zincirleme (Separate Chaining) algoritmasında tablodan bir elemanı sildiğimizde, neden <code>n.key</code> değil de <code>n.next.key</code> kontrol edilir?</p>
            <div className="options">
                <label><input type="radio" name="q2" value="a" onChange={() => handleOptionChange('q2', 'a')} /> A) Dizi sınırlarını aşmamak için.</label>
                <label><input type="radio" name="q2" value="b" onChange={() => handleOptionChange('q2', 'b')} /> B) Tek yönlü bağlı listede bağlantıyı koparabilmek için bir önceki elemanın yerini bilmek gerektiğinden.</label>
                <label><input type="radio" name="q2" value="c" onChange={() => handleOptionChange('q2', 'c')} /> C) Çarpışmaları önlemek için.</label>
            </div>
        </div>

        <div className="question">
            <p>3. Java'da Hash tablosu indeksi hesaplanırken <code>(key.hashCode() & 0x7fffffff)</code> işlemi neden yapılır?</p>
            <div className="options">
                <label><input type="radio" name="q3" value="a" onChange={() => handleOptionChange('q3', 'a')} /> A) Tablo boyutunu aşmayı engeller.</label>
                <label><input type="radio" name="q3" value="b" onChange={() => handleOptionChange('q3', 'b')} /> B) Negatif sayıların işaret bitini sıfırlayarak sonucun her zaman pozitif olmasını sağlar.</label>
                <label><input type="radio" name="q3" value="c" onChange={() => handleOptionChange('q3', 'c')} /> C) Mod alma işlemini hızlandırır.</label>
            </div>
        </div>

        <div className="question">
            <p>4. Linear Probing kullanan bir Closed Hashing tablosunda bir eleman silindiğinde, yerine neden <code>null</code> yazılamaz?</p>
            <div className="options">
                <label><input type="radio" name="q4" value="a" onChange={() => handleOptionChange('q4', 'a')} /> A) Arama zincirini kopartır, sonradan eklenen ve çakışan elemanlar bulunamaz.</label>
                <label><input type="radio" name="q4" value="b" onChange={() => handleOptionChange('q4', 'b')} /> B) NullPointerException verir.</label>
                <label><input type="radio" name="q4" value="c" onChange={() => handleOptionChange('q4', 'c')} /> C) Tablo boyutunu küçültür.</label>
            </div>
        </div>

        <div className="question">
            <p>5. N adet elemanın ve M büyüklüğünde bir tablonun kullanıldığı istatistiksel Hashing analizinde, bir slotun tamamen boş kalma olasılığı hangi dağılımla ifade edilir?</p>
            <div className="options">
                <label><input type="radio" name="q5" value="a" onChange={() => handleOptionChange('q5', 'a')} /> A) Binom Dağılımı</label>
                <label><input type="radio" name="q5" value="b" onChange={() => handleOptionChange('q5', 'b')} /> B) Poisson Dağılımı (e<sup>-α</sup>)</label>
                <label><input type="radio" name="q5" value="c" onChange={() => handleOptionChange('q5', 'c')} /> C) Gauss Dağılımı</label>
            </div>
        </div>

        <div className="question">
            <p>6. B-Tree (Derece t=3) ağacında yukarıdan aşağıya inerken bir düğümde 5 eleman (2t-1) gördünüz. Algoritma ne yapar?</p>
            <div className="options">
                <label><input type="radio" name="q6" value="a" onChange={() => handleOptionChange('q6', 'a')} /> A) Ağacın dengesini bozmamak için geçer.</label>
                <label><input type="radio" name="q6" value="b" onChange={() => handleOptionChange('q6', 'b')} /> B) Proactive Splitting yaparak o düğümü hemen ikiye böler.</label>
                <label><input type="radio" name="q6" value="c" onChange={() => handleOptionChange('q6', 'c')} /> C) Elemanı kuyruğa atar.</label>
            </div>
        </div>

        <div className="question">
            <p>7. Bütün KENARLARI tam 1 kez gezdiğin, kalemi kağıttan kaldırmadan çizdiğin şekil hangi graftır ve şartı nedir?</p>
            <div className="options">
                <label><input type="radio" name="q7" value="a" onChange={() => handleOptionChange('q7', 'a')} /> A) Hamilton (Tüm düğüm dereceleri tek olmalı)</label>
                <label><input type="radio" name="q7" value="b" onChange={() => handleOptionChange('q7', 'b')} /> B) Euler (Tüm düğüm dereceleri çift olmalı)</label>
                <label><input type="radio" name="q7" value="c" onChange={() => handleOptionChange('q7', 'c')} /> C) Kruskal (Döngü olmamalı)</label>
            </div>
        </div>

        <div className="question">
            <p>8. Ağırlıksız bir grafta En Kısa Yolu bulan algoritma hangisidir?</p>
            <div className="options">
                <label><input type="radio" name="q8" value="a" onChange={() => handleOptionChange('q8', 'a')} /> A) DFS (Stack kullanır)</label>
                <label><input type="radio" name="q8" value="b" onChange={() => handleOptionChange('q8', 'b')} /> B) BFS (Queue kullanır)</label>
                <label><input type="radio" name="q8" value="c" onChange={() => handleOptionChange('q8', 'c')} /> C) Prim</label>
            </div>
        </div>

        <div className="question">
            <p>9. Kruskal Algoritmasında <code>parent[i] = find(parent[i])</code> satırı ne işe yarar?</p>
            <div className="options">
                <label><input type="radio" name="q9" value="a" onChange={() => handleOptionChange('q9', 'a')} /> A) Path Compression (Yol Sıkıştırma) yaparak ağacı dümdüz hale getirir ve O(1) maliyete indirir.</label>
                <label><input type="radio" name="q9" value="b" onChange={() => handleOptionChange('q9', 'b')} /> B) Ağacı B-Tree'ye dönüştürür.</label>
                <label><input type="radio" name="q9" value="c" onChange={() => handleOptionChange('q9', 'c')} /> C) Döngü yaratır.</label>
            </div>
        </div>

        <div className="question">
            <p>10. (Kod Analizi) Linear Probing (Açık Adresleme) kullanılarak tasarlanmış bir Hashing tablosunda "Mezar Taşı" mantığını uygulayan silme işlemi kodu hangisidir?</p>
            <div className="options">
                <label><input type="radio" name="q10" value="a" onChange={() => handleOptionChange('q10', 'a')} /> A) <code>table[i] = null;</code></label>
                <label><input type="radio" name="q10" value="b" onChange={() => handleOptionChange('q10', 'b')} /> B) <code>table[i].deleted = true;</code></label>
                <label><input type="radio" name="q10" value="c" onChange={() => handleOptionChange('q10', 'c')} /> C) <code>table[i] = table[i+1];</code></label>
            </div>
        </div>

        <button className="action-btn" onClick={checkExam} style={{ width: "100%", padding: "15px", fontSize: "1.2rem" }}>
            Sınavı Tamamla ve Sonucu Gör
        </button>

        {result && (
            <div id="exam-result" style={{ fontSize: "1.8rem", fontWeight: "bold", marginTop: "30px", textAlign: "center", padding: "20px", borderRadius: "8px" }}>
                {result.score === 100 ? (
                    <span style={{ color: "var(--success)" }}>🏆 TEBRİKLER! Puan: 100. <br/> Sen bu Algoritma Analizi finalini ezip geçeceksin!</span>
                ) : result.score >= 70 ? (
                    <span style={{ color: "var(--warning)" }}>Puanın: {result.score}. Geçer not aldın ama şu sorularda hata var: {result.mistakes.join(', ')}. Notlara tekrar göz atmalısın.</span>
                ) : (
                    <span style={{ color: "var(--danger)" }}>Puanın: {result.score}. Bayağı eksik var. Hatalı sorular: {result.mistakes.join(', ')}. Konuları tekrar et!</span>
                )}
            </div>
        )}

      </div>
    </div>
  );
}
