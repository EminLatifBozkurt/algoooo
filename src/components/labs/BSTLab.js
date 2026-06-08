"use client";
import React, { useState, useRef, useEffect } from "react";

// Ağaç Düğümü Sınıfı
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

export default function BSTLab() {
  const [treeType, setTreeType] = useState("bst");
  const [values, setValues] = useState([]); // Girilen tüm değerleri tutar
  const [root, setRoot] = useState(null);
  
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [logMessage, setLogMessage] = useState({ text: "Ağaç türünü seçip sayıları eklemeye başlayın.", type: "text-main" });
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Ekran boyutuna göre SVG genişliğini ayarla
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 400
        });
      }
    };
    
    updateDimensions();
    // Gecikmeli bir tane daha çağır (render sonrası tam oturması için)
    setTimeout(updateDimensions, 100);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Ağaçtaki düğümlerin koordinatlarını hesaplayan fonksiyon
  const calculateCoordinates = (node, x, y, dx) => {
    if (!node) return;
    node.x = x;
    node.y = y;
    // Derinlere inildikçe yatay aralığı (dx) daralt ki çakışmasın
    calculateCoordinates(node.left, x - dx, y + 60, dx * 0.55);
    calculateCoordinates(node.right, x + dx, y + 60, dx * 0.55);
  };

  // Values veya treeType değiştiğinde ağacı baştan kur
  useEffect(() => {
    if (values.length === 0) {
      setRoot(null);
      return;
    }
    
    let newRoot = null;
    
    if (treeType === "bst") {
      const insertBST = (r, val) => {
         if (!r) return new TreeNode(val);
         if (val < r.val) r.left = insertBST(r.left, val);
         else if (val > r.val) r.right = insertBST(r.right, val);
         return r;
      }
      for (const v of values) {
         newRoot = insertBST(newRoot, v);
      }
    } else {
      // Heap (Max veya Min)
      let heap = [];
      const isMax = treeType === "max-heap";
      for (const v of values) {
         heap.push(v);
         let i = heap.length - 1;
         while(i > 0) {
            let p = Math.floor((i-1)/2);
            if (isMax ? heap[p] < heap[i] : heap[p] > heap[i]) {
                let tmp = heap[i]; heap[i] = heap[p]; heap[p] = tmp;
                i = p;
            } else break;
         }
      }
      // Diziyi ağaç yapısına (TreeNode) çevir
      const nodes = heap.map(v => new TreeNode(v));
      for(let i=0; i<nodes.length; i++) {
         if(2*i+1 < nodes.length) nodes[i].left = nodes[2*i+1];
         if(2*i+2 < nodes.length) nodes[i].right = nodes[2*i+2];
      }
      newRoot = nodes[0];
    }
    
    // Koordinatları hesapla
    if (newRoot) {
      // Başlangıç x'i ekranın ortası, başlangıç dx'i ekranın 1/4'ü
      calculateCoordinates(newRoot, dimensions.width / 2, 40, dimensions.width / 4);
    }
    setRoot(newRoot);
    setHighlightedNodes([]); // Ağaç değişince vurguyu sıfırla
  }, [values, treeType, dimensions]);

  // Yeni Eleman(lar) Ekleme (Toplu veya Tekli)
  const handleInsert = () => {
    const arr = inputValue.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (arr.length === 0) {
      setLogMessage({ text: "Lütfen geçerli sayılar girin (Örn: 10, 20, 30)", type: "danger" });
      return;
    }

    setValues(prev => {
      const newVals = [...prev];
      let added = 0;
      arr.forEach(val => {
        // BST ise ve zaten varsa ekleme (isteğe bağlı kural, ama biz basit tutalım)
        if (treeType === "bst" && newVals.includes(val)) return;
        newVals.push(val);
        added++;
      });
      if (added > 0) {
         setLogMessage({ text: `[BAŞARILI] ${added} adet düğüm ${treeType.toUpperCase()} kurallarına göre yerleştirildi.`, type: "success" });
      } else {
         setLogMessage({ text: `Girdiğiniz sayılar zaten ağaçta var.`, type: "warning" });
      }
      return newVals;
    });
    setInputValue("");
  };

  // Ağaçta Arama (Sadece BST için animasyon, Heap için doğrudan DFS)
  const handleSearch = async () => {
    const val = parseInt(searchValue);
    if (isNaN(val)) {
      setLogMessage({ text: "Aranacak geçerli bir sayı girin!", type: "danger" });
      return;
    }

    setLogMessage({ text: `${val} aranıyor...`, type: "text-main" });
    setHighlightedNodes([]);
    
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    if (treeType === "bst") {
      let current = root;
      let path = [];
      while (current) {
        path.push(current.val);
        setHighlightedNodes([...path]);
        await sleep(400);

        if (val === current.val) {
          setLogMessage({ text: `[BULUNDU] ${val} değeri ağaçta bulundu!`, type: "success" });
          return;
        } else if (val < current.val) current = current.left;
        else current = current.right;
      }
    } else {
      // Heap için DFS ile bulalım (Çünkü Heap arama ağacı değildir)
      let foundPath = null;
      const dfs = async (node, path) => {
         if (!node || foundPath) return;
         const currentPath = [...path, node.val];
         setHighlightedNodes([...currentPath]);
         await sleep(300);
         
         if (node.val === val) {
            foundPath = currentPath;
            return;
         }
         await dfs(node.left, currentPath);
         await dfs(node.right, currentPath);
      }
      await dfs(root, []);
      if (foundPath) {
         setLogMessage({ text: `[BULUNDU] ${val} değeri Heap içerisinde tarandı ve bulundu!`, type: "success" });
         return;
      }
    }
    
    setLogMessage({ text: `[BULUNAMADI] ${val} değeri ağaçta yok.`, type: "danger" });
  };

  const resetTree = () => {
    setValues([]);
    setHighlightedNodes([]);
    setLogMessage({ text: "Ağaç sıfırlandı. Yeni veriler girebilirsiniz.", type: "text-main" });
    setInputValue("");
    setSearchValue("");
  };

  // SVG İçin Kenarları Çiz
  const renderEdges = (node) => {
    if (!node) return null;
    let edges = [];
    if (node.left) {
      edges.push(
        <line
          key={`edge-${node.val}-${node.left.val}`}
          x1={node.x} y1={node.y}
          x2={node.left.x} y2={node.left.y}
          stroke="var(--secondary-accent)" strokeWidth="3"
          opacity="0.6"
        />
      );
      edges = edges.concat(renderEdges(node.left));
    }
    if (node.right) {
      edges.push(
        <line
          key={`edge-${node.val}-${node.right.val}`}
          x1={node.x} y1={node.y}
          x2={node.right.x} y2={node.right.y}
          stroke="var(--secondary-accent)" strokeWidth="3"
          opacity="0.6"
        />
      );
      edges = edges.concat(renderEdges(node.right));
    }
    return edges;
  };

  // SVG İçin Düğümleri Çiz
  const renderNodes = (node) => {
    if (!node) return null;
    let nodes = [];
    
    const isHighlighted = highlightedNodes.includes(node.val);
    const isTarget = highlightedNodes[highlightedNodes.length - 1] === node.val && highlightedNodes.length > 0;
    
    // Premium Tasarım: Gradients
    let fillUrl = "url(#nodeGrad)";
    if (isHighlighted) fillUrl = "url(#nodeGradSuccess)";
    if (isTarget) fillUrl = "var(--warning)"; // hedef bulunduysa sarı falan

    nodes.push(
      <g key={`node-${node.val}`}>
        <circle
          cx={node.x} cy={node.y}
          r="22"
          fill={fillUrl}
          stroke={isHighlighted ? "var(--success)" : "var(--primary-bg)"}
          strokeWidth="4"
          filter="url(#shadow)"
          style={{ transition: "all 0.3s ease" }}
        />
        <text
          x={node.x} y={node.y}
          textAnchor="middle" dy=".3em"
          fill="#111"
          fontSize="15"
          fontWeight="900"
        >
          {node.val}
        </text>
      </g>
    );

    if (node.left) nodes = nodes.concat(renderNodes(node.left));
    if (node.right) nodes = nodes.concat(renderNodes(node.right));

    return nodes;
  };

  return (
    <div className="section active">
      <h1>Laboratuvar 2: Gelişmiş Ağaç (Tree) Visualizer</h1>
      <div className="card">
        <p><strong>Deney:</strong> Ağaç türünü seçin ve sayıları girin (örn: <code>50, 30, 70, 20, 40, 60, 80</code>). Ağacın kurallara göre nasıl şekillendiğini canlı izleyin.</p>
        
        <div className="controls" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <select 
             value={treeType} 
             onChange={(e) => setTreeType(e.target.value)}
             style={{
               padding: "12px", borderRadius: "6px", border: "1px solid var(--accent)",
               background: "var(--card-bg)", color: "white", fontSize: "1rem", outline: "none", cursor: "pointer"
             }}
          >
            <option value="bst">İkili Arama Ağacı (BST)</option>
            <option value="max-heap">Max-Heap</option>
            <option value="min-heap">Min-Heap</option>
          </select>

          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Sayılar (Örn: 10, 20, 5)" 
            style={{ flex: 1, minWidth: "200px" }}
          />
          <button className="action-btn" onClick={handleInsert}>Ağaca Diz</button>
          
          <input 
            type="number" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Aranacak" 
            style={{ width: "120px" }}
          />
          <button className="action-btn" style={{ backgroundColor: "var(--secondary-accent)" }} onClick={handleSearch}>Bul</button>
          
          <button className="action-btn danger" style={{ marginLeft: "auto" }} onClick={resetTree}>Sıfırla</button>
        </div>
        
        <p style={{ color: logMessage.type === 'text-main' ? 'var(--text-main)' : 'var(--' + logMessage.type + ')', fontFamily: 'monospace', marginTop: '15px', fontSize: '1.1rem' }}>
          {logMessage.text}
        </p>

        <div 
          ref={containerRef} 
          style={{ 
            width: "100%", 
            height: "450px", 
            backgroundColor: "#181825", // Darker canvas background
            borderRadius: "12px", 
            marginTop: "20px", 
            border: "1px solid var(--card-bg)",
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.5)",
            overflow: "auto" 
          }}
        >
          {dimensions.width > 0 && (
            <svg width={Math.max(dimensions.width, 800)} height={450}>
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.7"/>
                </filter>
                <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--secondary-accent)" />
                </linearGradient>
                <linearGradient id="nodeGradSuccess" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--success)" />
                  <stop offset="100%" stopColor="#2e8b57" />
                </linearGradient>
              </defs>
              
              {/* Kenarları (çizgileri) önce çiz ki düğümlerin arkasında kalsınlar */}
              {renderEdges(root)}
              {/* Düğümleri çiz */}
              {renderNodes(root)}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
