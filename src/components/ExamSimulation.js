"use client";
import React, { useState } from "react";

const examQuestions = [
  // ÇOKTAN SEÇMELİ (15 Soru)
  {
    id: "q1", type: "multiple-choice", points: 3,
    text: "1. İkili Arama Ağaçlarına (BST) ekleme yaparken iteratif while döngüsünde 'parent = current' atamasını unuttuğunuzu varsayalım. Current null olduğunda hangi hatayı alırsınız?",
    options: [
      { value: "a", label: "A) Ağaca yeni düğüm eklenir ama yanlış yere eklenir." },
      { value: "b", label: "B) NullPointerException alınır veya eleman ağaca bağlanamaz çünkü yeni düğümü bağlayacağımız ebeveyni (parent) kaybetmiş oluruz." },
      { value: "c", label: "C) Ağaç otomatik olarak AVL ağacına dönüşür." }
    ], answer: "b"
  },
  {
    id: "q2", type: "multiple-choice", points: 3,
    text: "2. BST'de 'İki Çocuklu Bir Düğümü' silerken, silinen düğümün yerine hangi eleman kopyalanır?",
    options: [
      { value: "a", label: "A) Sol alt ağacın kökü" },
      { value: "b", label: "B) Sağ alt ağacın kökü" },
      { value: "c", label: "C) Sağ alt ağacın en KÜÇÜK elemanı (Inorder Successor)" },
      { value: "d", label: "D) Sol alt ağacın en KÜÇÜK elemanı" }
    ], answer: "c"
  },
  {
    id: "q3", type: "multiple-choice", points: 3,
    text: "3. Hashing işleminde 'Division Method' kullanırken h(k) = k mod M denklemi için M değeri nasıl seçilmelidir?",
    options: [
      { value: "a", label: "A) Çift sayı olmalıdır." },
      { value: "b", label: "B) 2'nin bir kuvveti olmalıdır (örn: 1024)." },
      { value: "c", label: "C) Asal bir sayı olmalıdır." }
    ], answer: "c"
  },
  {
    id: "q4", type: "multiple-choice", points: 3,
    text: "4. Ayrı Zincirleme (Separate Chaining) kullanan bir Hash tablosunda yeni eklenen eleman neden bağlı listenin EN BAŞINA (head) eklenir?",
    options: [
      { value: "a", label: "A) Silme işlemini hızlandırmak için." },
      { value: "b", label: "B) O(1) sabit zamanda ekleme yapmak için (Sonuna eklemek O(N) zaman alır)." },
      { value: "c", label: "C) Çarpışmaları (Collision) tamamen yok etmek için." }
    ], answer: "b"
  },
  {
    id: "q5", type: "multiple-choice", points: 3,
    text: "5. Closed Hashing'de (Açık Adresleme) 'Mezar Taşı (Tombstone)' mantığı neyi çözer?",
    options: [
      { value: "a", label: "A) NullPointerException'ları çözer." },
      { value: "b", label: "B) Linear Probing'de silinen bir yuvaya 'null' atandığında kopan arama zincirini (Search Chain) korumayı sağlar." },
      { value: "c", label: "C) Hash fonksiyonunun hızını iki katına çıkarır." }
    ], answer: "b"
  },
  {
    id: "q6", type: "multiple-choice", points: 3,
    text: "6. Bir Hash tablosunun Yük Faktörü (Load Factor - α) 0.9'a ulaştığında Linear Probing algoritmasının başarısız arama maliyeti ne olur?",
    options: [
      { value: "a", label: "A) Yaklaşık 2 adım" },
      { value: "b", label: "B) Yaklaşık 5.5 adım" },
      { value: "c", label: "C) Yaklaşık 50.5 adım (Ciddi performans çöküşü)" }
    ], answer: "c"
  },
  {
    id: "q7", type: "multiple-choice", points: 3,
    text: "7. Neden Oracle ve MySQL gibi devasa veritabanları İkili Arama Ağaçları (BST) yerine B+ Tree kullanır?",
    options: [
      { value: "a", label: "A) Disk okuma/yazma (I/O) maliyetini azaltmak için ağacın derinliğini kısa (yatayda geniş) tuttukları için." },
      { value: "b", label: "B) Veriyi şifrelemek daha kolay olduğu için." },
      { value: "c", label: "C) B-Tree bellekten (RAM) hiç harcamadığı için." }
    ], answer: "a"
  },
  {
    id: "q8", type: "multiple-choice", points: 3,
    text: "8. B-Tree algoritmasında 'Proactive Splitting (Önceden Bölme)' nerede ve neden yapılır?",
    options: [
      { value: "a", label: "A) Yukarıdan aşağı inerken kapasitesi dolu (2t-1) bir düğüm görülünce hemen ikiye bölünür ki, sonradan aşağıdan yukarı (Backtracking) kırma işlemi gerekmesin." },
      { value: "b", label: "B) Ağacı tamamen bellekten silmek için." },
      { value: "c", label: "C) Yapraklara ulaşıldığında yapılır." }
    ], answer: "a"
  },
  {
    id: "q9", type: "multiple-choice", points: 3,
    text: "9. Seyrek (Sparse) olan, yani çok fazla düğümü (Şehir) ama çok az kenarı (Yolu) olan bir Facebook arkadaş ağını bellekte tutmak için hangisi kullanılmalıdır?",
    options: [
      { value: "a", label: "A) Adjacency Matrix (Komşuluk Matrisi)" },
      { value: "b", label: "B) Adjacency List (Komşuluk Listesi)" }
    ], answer: "b"
  },
  {
    id: "q10", type: "multiple-choice", points: 3,
    text: "10. Bir labirente dalıp çıkmaza girene kadar derinlere inen, çıkmaza girince geri dönen (Backtracking) ve Stack (Yığıt) kullanan algoritma hangisidir?",
    options: [
      { value: "a", label: "A) BFS (Genişliğine Arama)" },
      { value: "b", label: "B) DFS (Derinliğine Arama)" },
      { value: "c", label: "C) Prim Algoritması" }
    ], answer: "b"
  },
  {
    id: "q11", type: "multiple-choice", points: 3,
    text: "11. BFS algoritmasının kod implementasyonunda 'visited[neighbor] = true' ataması hangi aşamada yapılmalıdır?",
    options: [
      { value: "a", label: "A) Düğüm kuyruktan (Queue) çıkartıldığı an." },
      { value: "b", label: "B) Düğüm kuyruğa eklendiği an (Aksi takdirde aynı düğüm defalarca kuyruğa eklenebilir)." }
    ], answer: "b"
  },
  {
    id: "q12", type: "multiple-choice", points: 3,
    text: "12. Kruskal Algoritmasında iki şehri birbirine bağlarken döngü (Cycle) oluşup oluşmadığını anlayan fonksiyon ve mantığı hangisidir?",
    options: [
      { value: "a", label: "A) find(x) == find(y). Eğer iki şehrin en tepedeki atası aynıysa, döngü olur." },
      { value: "b", label: "B) Mod alma işlemi." },
      { value: "c", label: "C) Stack'e atarak kontrol edilir." }
    ], answer: "a"
  },
  {
    id: "q13", type: "multiple-choice", points: 3,
    text: "13. Kruskal'daki 'Yol Sıkıştırma (Path Compression)' ne işe yarar?",
    options: [
      { value: "a", label: "A) Diskte kapladığı alanı ZIP gibi sıkıştırır." },
      { value: "b", label: "B) Union-Find ağacında arama yaparken yoldaki tüm elemanları direkt Köke bağlayarak, bir sonraki arama maliyetini O(1)'e çeker." }
    ], answer: "b"
  },
  {
    id: "q14", type: "multiple-choice", points: 3,
    text: "14. Ağırlıksız bir grafta En Kısa Yolu bulan algoritma nedir?",
    options: [
      { value: "a", label: "A) DFS" },
      { value: "b", label: "B) BFS" },
      { value: "c", label: "C) Kruskal" }
    ], answer: "b"
  },
  {
    id: "q15", type: "multiple-choice", points: 3,
    text: "15. Hangi graf problemi bir 'NP-Complete' problemdir ve bilinen hızlı bir algoritması yoktur?",
    options: [
      { value: "a", label: "A) Euler Döngüsü (Tüm yolları gezme)" },
      { value: "b", label: "B) Hamilton Döngüsü (Gezgin Satıcı - Tüm şehirleri tam 1 kez gezme)" },
      { value: "c", label: "C) Topolojik Sıralama" }
    ], answer: "b"
  },

  // DOĞRU / YANLIŞ (10 Soru)
  { id: "q16", type: "true-false", points: 2, text: "16. (D/Y) Java'da (key.hashCode() & 0x7fffffff) işlemi, sayının her zaman tek sayı olmasını sağlar.", answer: "false" },
  { id: "q17", type: "true-false", points: 2, text: "17. (D/Y) Double Hashing yönteminde, ikinci hash fonksiyonu (h2) hiçbir zaman '0' değerini üretmemelidir.", answer: "true" },
  { id: "q18", type: "true-false", points: 2, text: "18. (D/Y) Adjacency Matrix'in uzay/bellek maliyeti O(V^2)'dir.", answer: "true" },
  { id: "q19", type: "true-false", points: 2, text: "19. (D/Y) Adjacency List kullanarak yazılmış bir BFS'nin zaman karmaşıklığı O(V^3)'tür.", answer: "false" },
  { id: "q20", type: "true-false", points: 2, text: "20. (D/Y) Inorder Traversal, İkili Arama Ağacındaki (BST) sayıları küçükten büyüğe sıralı şekilde ekrana yazdırır.", answer: "true" },
  { id: "q21", type: "true-false", points: 2, text: "21. (D/Y) B-Tree'de (derece t=3) bir düğümde minimum (t-1) yani 2 eleman olmalıdır.", answer: "true" },
  { id: "q22", type: "true-false", points: 2, text: "22. (D/Y) Kruskal Algoritması kenarları en pahalıdan (Büyükten) ucuza doğru sıralayarak başlar.", answer: "false" },
  { id: "q23", type: "true-false", points: 2, text: "23. (D/Y) Prim Algoritması da Dijkstra gibi Min-Heap (Priority Queue) kullanılarak yazılabilir.", answer: "true" },
  { id: "q24", type: "true-false", points: 2, text: "24. (D/Y) Java'daki HashMap, Yük Faktörü %75'i geçtiğinde kapasitesini iki katına çıkarıp (Rehashing) tüm verileri baştan dizer.", answer: "true" },
  { id: "q25", type: "true-false", points: 2, text: "25. (D/Y) Postorder gezintisi, işletim sistemlerinde içi dolu klasörleri bellekten silmek için (Garbage Collection) mükemmel bir yapıdır.", answer: "true" },

  // BOŞLUK DOLDURMA (10 Soru)
  { id: "q26", type: "fill-blank", points: 2, text: "26. Bir Hash tablosunda Dolu Eleman Sayısının, Tablonun Toplam Kapasitesine bölünmesiyle elde edilen istatistiksel orana __________ denir.", answer: ["yük faktörü", "load factor", "yuk faktoru", "yük faktoru"] },
  { id: "q27", type: "fill-blank", points: 2, text: "27. Linear Probing algoritmasında, dolu bir slot gördüğümüzde hemen bir sonraki slota bakma eğilimimiz, verilerin birbirine yapışarak büyük duvarlar oluşturduğu __________ (İngilizce 2 kelime) problemine neden olur.", answer: ["primary clustering", "birincil kümelenme", "primary cluster"] },
  { id: "q28", type: "fill-blank", points: 2, text: "28. Sadece bağlı liste ve kuyruk kullanarak kodlanan, grafı dalga dalga (seviye seviye) gezen algoritmanın 3 harfli kısa adı nedir?", answer: ["bfs"] },
  { id: "q29", type: "fill-blank", points: 2, text: "29. Birbirini gerektiren olayların sıraya konduğu (Örn: Üniversitede Matematik 1 almadan Matematik 2 alınamaz) yönlü graflarda DFS kullanılarak yapılan bu işleme __________ sıralama denir.", answer: ["topolojik", "topological"] },
  { id: "q30", type: "fill-blank", points: 2, text: "30. Bir graftaki tüm düğümleri dolaşan ama bunu yaparken kenar maliyetlerini (ağırlıklarını) en aza indiren, içinde döngü barındırmayan alt yapıya (Kısaltması MST) Minimum __________ Tree denir.", answer: ["spanning"] },

  // EŞLEŞTİRME (1 Büyük Soru - Matris)
  {
    id: "q31",
    type: "matching",
    points: 15, 
    text: "31. Algoritmaları ve Veri Yapılarını en uygun gerçek dünya kullanım alanlarıyla eşleştiriniz:",
    pairs: [
      { id: "m1", left: "B+ Tree", right: "PostgreSQL ve MySQL disk indekslemesi" },
      { id: "m2", left: "Separate Chaining", right: "RAM içi DNS (IP) Çözümleme Sistemleri" },
      { id: "m3", left: "BFS (Genişliğine Arama)", right: "LinkedIn Ortak Arkadaş Öneri Algoritması" },
      { id: "m4", left: "Kruskal / Prim (MST)", right: "Mahalleye ucuz maliyetli fiber optik çekilmesi" },
      { id: "m5", left: "Topolojik Sıralama (DFS)", right: "Üniversite ders müfredatı bağımlılıkları" }
    ],
    options: [
      "Mahalleye ucuz maliyetli fiber optik çekilmesi",
      "PostgreSQL ve MySQL disk indekslemesi",
      "Üniversite ders müfredatı bağımlılıkları",
      "RAM içi DNS (IP) Çözümleme Sistemleri",
      "LinkedIn Ortak Arkadaş Öneri Algoritması"
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
    let rawScore = 0;
    let maxPossibleScore = 0;
    let mistakes = [];

    examQuestions.forEach(q => {
      maxPossibleScore += q.points;
      let isCorrect = false;

      if (q.type === "multiple-choice" || q.type === "true-false") {
        if (answers[q.id] === q.answer) {
          rawScore += q.points;
          isCorrect = true;
        }
      } 
      else if (q.type === "fill-blank") {
        const userAnswer = (answers[q.id] || "").trim().toLowerCase();
        if (q.answer.includes(userAnswer) && userAnswer !== "") {
          rawScore += q.points;
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
        
        rawScore += matchScore;
        if (allCorrect) isCorrect = true;
        else if (matchScore > 0 && !allCorrect) mistakes.push(`${q.id.replace('q', 'Soru ')} (Kısmen doğru)`);
      }

      if (!isCorrect && q.type !== "matching") {
        mistakes.push(q.id.replace('q', 'Soru '));
      }
    });

    // 100 üzerinden oransal hesaplama
    const finalScore = Math.round((rawScore / maxPossibleScore) * 100);
    setResult({ score: finalScore, mistakes });
  };

  return (
    <div className="section active">
      <h1>Kapsamlı Sınav Simülasyonu (V3.0 - Devasa Soru Havuzu)</h1>
      <div className="card">
        <p style={{ color: "var(--warning)", marginBottom: "20px" }}>
          Soru havuzu gerçek bir final sınavı düzeyine genişletildi (Toplam {examQuestions.length} Soru). Her sorunun puanı zorluğuna göre ayarlıdır. 100 üzerinden değerlendirilecektir.
        </p>
        
        {examQuestions.map(q => {
          return (
            <div className="question" key={q.id} style={{ marginBottom: "25px", padding: "15px", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p style={{ fontWeight: "bold", marginBottom: "15px" }}>{q.text} <span style={{fontSize: "0.8rem", color: "var(--accent-color)"}}>({q.points} Puan)</span></p>
              
              {/* Çoktan Seçmeli */}
              {q.type === "multiple-choice" && (
                <div className="options">
                  {q.options.map(opt => (
                    <label key={opt.value} style={{ display: "block", marginBottom: "8px", cursor: "pointer", lineHeight: "1.4" }}>
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
                        <option value="">-- Eşleştirin --</option>
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
                {result.score >= 90 ? (
                    <p style={{ color: "var(--success)" }}>🏆 KUSURSUZ! Gerçek finali resmen ezip geçeceksin.</p>
                ) : result.score >= 70 ? (
                    <p style={{ color: "var(--warning)" }}>Tebrikler, oldukça iyisin ama ufak dikkatsizlikler var. <br/><span style={{ fontSize: "1rem" }}>Hatalı/Eksik Sorular: {result.mistakes.join(', ')}</span></p>
                ) : (
                    <p style={{ color: "var(--danger)" }}>Bu devasa sınavda biraz geride kaldın. <br/><span style={{ fontSize: "1rem" }}>Hatalı/Eksik Sorular: {result.mistakes.join(', ')}</span><br/><span style={{ fontSize: "1rem" }}>Tüm kod bloklarını ve konuları tekrar gözden geçirmelisin!</span></p>
                )}
            </div>
        )}

      </div>
    </div>
  );
}
