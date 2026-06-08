"use client";
import React, { useState } from "react";

const examQuestions = [
  // ÇOKTAN SEÇMELİ (Multiple Choice) - 5 Soru x 10 Puan = 50 Puan
  {
    id: "q1",
    type: "multiple-choice",
    points: 10,
    text: "1. B-Tree (Derece t=3) ağacında veri tabanı indekslemesi yaparken, yukarıdan aşağıya inerken kapasitesi tamamen dolmuş (2t-1 elemanlı) bir düğüm gördüğünüzde B-Tree algoritması hangi işlemi uygular?",
    options: [
      { value: "a", label: "A) Ağacın dengesini bozmamak için o düğümü atlar ve yapraklara kadar inmeye devam eder." },
      { value: "b", label: "B) 'Proactive Splitting' yaparak o düğümü hemen ikiye böler ve ortanca elemanı yukarı iter." },
      { value: "c", label: "C) Elemanı diske değil RAM'e (Önbelleğe) yazar." },
      { value: "d", label: "D) Kırmızı-Siyah (Red-Black) ağacı rotasyonları uygular." }
    ],
    answer: "b"
  },
  {
    id: "q2",
    type: "multiple-choice",
    points: 10,
    text: "2. Ayrı Zincirleme (Separate Chaining) tablosundan eleman silme fonksiyonunda neden `n.key` yerine `n.next.key` kontrol edilerek ilerlenir?",
    options: [
      { value: "a", label: "A) Hash çarpışmalarını (Collision) önlemek için." },
      { value: "b", label: "B) Dizi (Array) sınırlarını aşmamak için." },
      { value: "c", label: "C) Tek yönlü bağlı listede bağlantıyı koparabilmek (n.next = n.next.next) için ebeveyn düğümün referansına ihtiyaç duyulduğundan." }
    ],
    answer: "c"
  },
  {
    id: "q3",
    type: "multiple-choice",
    points: 10,
    text: "3. Ağırlıksız bir grafta (tüm yollar 1 birim) A noktasından B noktasına giden 'En Kısa Yolu' kesin olarak bulan algoritma hangisidir?",
    options: [
      { value: "a", label: "A) DFS (Derinliğine Arama - Yığıt kullanır)" },
      { value: "b", label: "B) BFS (Genişliğine Arama - Kuyruk kullanır)" },
      { value: "c", label: "C) Kruskal Algoritması" },
      { value: "d", label: "D) Euler Döngüsü" }
    ],
    answer: "b"
  },
  {
    id: "q4",
    type: "multiple-choice",
    points: 10,
    text: "4. Java'da Hash tablosu indeksi hesaplanırken `(key.hashCode() & 0x7fffffff) % M` işlemi neden yapılır?",
    options: [
      { value: "a", label: "A) Tablo boyutunu (M) aşmayı engeller." },
      { value: "b", label: "B) Mod alma işlemini donanımsal olarak hızlandırır." },
      { value: "c", label: "C) Negatif sayıların işaret bitini sıfırlayarak ArrayIndexOutOfBounds çökmesini (Crash) önler." }
    ],
    answer: "c"
  },
  {
    id: "q5",
    type: "multiple-choice",
    points: 10,
    text: "5. N adet elemanın ve M büyüklüğünde bir tablonun kullanıldığı istatistiksel Hashing analizinde, bir slotun tamamen boş kalma olasılığı `e^(-α)` olarak hesaplanır. Bu hesaplama hangi olasılık dağılımından gelir?",
    options: [
      { value: "a", label: "A) Poisson Dağılımı" },
      { value: "b", label: "B) Gauss Dağılımı" },
      { value: "c", label: "C) Binom Dağılımı" }
    ],
    answer: "a"
  },
  // DOĞRU / YANLIŞ (True/False) - 3 Soru x 5 Puan = 15 Puan
  {
    id: "q6",
    type: "true-false",
    points: 5,
    text: "6. (D/Y) Linear Probing (Açık Adresleme) yönteminde bir eleman silindiğinde, bulunduğu slota direkt olarak `null` değeri atanmalıdır.",
    answer: "false"
  },
  {
    id: "q7",
    type: "true-false",
    points: 5,
    text: "7. (D/Y) Kruskal Algoritmasındaki 'Yol Sıkıştırma (Path Compression)' tekniği, Union-Find veri yapısının derinliğini azaltarak algoritma karmaşıklığını O(1)'e yaklaştırır.",
    answer: "true"
  },
  {
    id: "q8",
    type: "true-false",
    points: 5,
    text: "8. (D/Y) İkili Arama Ağaçlarında (BST) tüm elemanları 'Pre-Order (Kök-Sol-Sağ)' sırasıyla okursak küçükten büyüğe sıralı liste elde ederiz.",
    answer: "false"
  },
  // BOŞLUK DOLDURMA (Fill-in-the-blank) - 2 Soru x 10 Puan = 20 Puan
  {
    id: "q9",
    type: "fill-blank",
    points: 10,
    text: "9. Hash tablolarında 'Dolu Eleman Sayısı / Toplam Slot Sayısı' formülüyle hesaplanan ve sistemin performansını doğrudan etkileyen orana ____________ denir.",
    answer: ["yük faktörü", "load factor", "yuk faktoru", "yük faktoru"]
  },
  {
    id: "q10",
    type: "fill-blank",
    points: 10,
    text: "10. Bir grafta bütün 'KENARLARI' (yolları) kalemi kağıttan kaldırmadan tam bir kez gezerek başlangıç noktasına döndüğümüz döngüye ____________ döngüsü denir.",
    answer: ["euler", "öyler"]
  },
  // EŞLEŞTİRME (Matching) - 1 Soru x 15 Puan = 15 Puan
  {
    id: "q11",
    type: "matching",
    points: 15, // Her doğru eşleşme 5 puan
    text: "11. Aşağıdaki algoritmaları ve veri yapılarını en uygun gerçek dünya kullanım senaryolarıyla eşleştiriniz:",
    pairs: [
      { id: "m1", left: "B+ Tree", right: "İlişkisel Veritabanlarında (SQL) verilerin diskte tutulması ve indekslenmesi." },
      { id: "m2", left: "Kruskal / Prim (MST)", right: "Bir mahalleye en az kablo maliyetiyle fiber optik veya elektrik altyapısı döşenmesi." },
      { id: "m3", left: "Topolojik Sıralama (DFS)", right: "Birbirini gerektiren (önkoşullu) üniversite derslerinin alınma sırasının planlanması." }
    ],
    // The options shown in the dropdown
    options: [
      "Bir mahalleye en az kablo maliyetiyle fiber optik veya elektrik altyapısı döşenmesi.",
      "İlişkisel Veritabanlarında (SQL) verilerin diskte tutulması ve indekslenmesi.",
      "Birbirini gerektiren (önkoşullu) üniversite derslerinin alınma sırasının planlanması.",
      "Sosyal ağlarda 'Ortak Arkadaş' öneri sistemlerinin yapılması." // Şaşırtmaca
    ]
  }
];

export default function ExamSimulation() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleOptionChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleMatchingChange = (questionId, pairId, selectedValue) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [pairId]: selectedValue
      }
    }));
  };

  const checkExam = () => {
    let score = 0;
    let mistakes = [];

    examQuestions.forEach(q => {
      let isCorrect = false;

      if (q.type === "multiple-choice" || q.type === "true-false") {
        if (answers[q.id] === q.answer) {
          score += q.points;
          isCorrect = true;
        }
      } 
      else if (q.type === "fill-blank") {
        const userAnswer = (answers[q.id] || "").trim().toLowerCase();
        if (q.answer.includes(userAnswer)) {
          score += q.points;
          isCorrect = true;
        }
      }
      else if (q.type === "matching") {
        const userMatches = answers[q.id] || {};
        let matchScore = 0;
        let allCorrect = true;
        
        q.pairs.forEach(pair => {
          if (userMatches[pair.id] === pair.right) {
            matchScore += (q.points / q.pairs.length);
          } else {
            allCorrect = false;
          }
        });
        
        score += matchScore;
        if (allCorrect) isCorrect = true;
        else if (matchScore > 0) mistakes.push(`${q.id.replace('q', 'Soru ')} (Kısmen doğru)`);
      }

      if (!isCorrect && q.type !== "matching") {
        mistakes.push(q.id.replace('q', 'Soru '));
      }
    });

    setResult({ score: Math.round(score), mistakes });
  };

  return (
    <div className="section active">
      <h1>Kapsamlı Final Simülasyonu (V2.0)</h1>
      <div className="card">
        <p style={{ color: "var(--warning)", marginBottom: "20px" }}>
          Sınav formatı güncellenmiştir! Çoktan seçmeli, doğru/yanlış, boşluk doldurma ve gerçek dünya eşleştirme senaryoları içerir. Hazırsan başlayalım!
        </p>
        
        {examQuestions.map(q => {
          return (
            <div className="question" key={q.id} style={{ marginBottom: "25px", padding: "15px", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p style={{ fontWeight: "bold", marginBottom: "15px" }}>{q.text}</p>
              
              {/* Çoktan Seçmeli */}
              {q.type === "multiple-choice" && (
                <div className="options">
                  {q.options.map(opt => (
                    <label key={opt.value} style={{ display: "block", marginBottom: "8px", cursor: "pointer" }}>
                      <input 
                        type="radio" 
                        name={q.id} 
                        value={opt.value} 
                        onChange={() => handleOptionChange(q.id, opt.value)} 
                        style={{ marginRight: "10px" }}
                      /> 
                      {opt.label}
                    </label>
                  ))}
                </div>
              )}

              {/* Doğru / Yanlış */}
              {q.type === "true-false" && (
                <div className="options" style={{ display: "flex", gap: "20px" }}>
                  <label style={{ cursor: "pointer" }}>
                    <input type="radio" name={q.id} value="true" onChange={() => handleOptionChange(q.id, "true")} style={{ marginRight: "8px" }}/> 
                    <strong style={{ color: "var(--success)" }}>Doğru</strong>
                  </label>
                  <label style={{ cursor: "pointer" }}>
                    <input type="radio" name={q.id} value="false" onChange={() => handleOptionChange(q.id, "false")} style={{ marginRight: "8px" }}/> 
                    <strong style={{ color: "var(--danger)" }}>Yanlış</strong>
                  </label>
                </div>
              )}

              {/* Boşluk Doldurma */}
              {q.type === "fill-blank" && (
                <div className="options">
                  <input 
                    type="text" 
                    placeholder="Cevabınızı buraya yazın..."
                    onChange={(e) => handleOptionChange(q.id, e.target.value)}
                    style={{ 
                      width: "100%", padding: "12px", 
                      backgroundColor: "var(--bg-color)", color: "var(--text-color)", 
                      border: "1px solid var(--accent-color)", borderRadius: "6px",
                      fontSize: "1rem"
                    }}
                  />
                </div>
              )}

              {/* Eşleştirme */}
              {q.type === "matching" && (
                <div className="options" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {q.pairs.map(pair => (
                    <div key={pair.id} style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                      <div style={{ flex: "1", minWidth: "200px", fontWeight: "600", color: "var(--secondary-accent)" }}>
                        {pair.left}
                      </div>
                      <select 
                        onChange={(e) => handleMatchingChange(q.id, pair.id, e.target.value)}
                        style={{ 
                          flex: "2", minWidth: "250px", padding: "10px", 
                          backgroundColor: "var(--bg-color)", color: "var(--text-color)", 
                          border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px" 
                        }}
                      >
                        <option value="">-- Seçim Yapınız --</option>
                        {q.options.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <button className="action-btn" onClick={checkExam} style={{ width: "100%", padding: "15px", fontSize: "1.2rem", marginTop: "10px" }}>
            Sınavı Tamamla ve Sonucu Gör
        </button>

        {result && (
            <div id="exam-result" style={{ fontSize: "1.3rem", marginTop: "30px", textAlign: "center", padding: "20px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid var(--accent-color)" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "15px", color: result.score >= 80 ? "var(--success)" : result.score >= 50 ? "var(--warning)" : "var(--danger)" }}>
                  Puan: {result.score} / 100
                </div>
                {result.score === 100 ? (
                    <p style={{ color: "var(--success)" }}>🏆 KUSURSUZ! Bütün veri yapılarına ve gerçek dünya uygulamalarına hakimsin.</p>
                ) : result.score >= 70 ? (
                    <p style={{ color: "var(--warning)" }}>Tebrikler, geçer not aldın ama eksiklerin var. <br/><span style={{ fontSize: "1rem" }}>Hatalı/Eksik Sorular: {result.mistakes.join(', ')}</span></p>
                ) : (
                    <p style={{ color: "var(--danger)" }}>Maalesef algoritma bilgin henüz yeterli değil. <br/><span style={{ fontSize: "1rem" }}>Hatalı/Eksik Sorular: {result.mistakes.join(', ')}</span><br/><span style={{ fontSize: "1rem" }}>Özellikle yanlış yaptığın konulara geri dönmelisin.</span></p>
                )}
            </div>
        )}

      </div>
    </div>
  );
}
