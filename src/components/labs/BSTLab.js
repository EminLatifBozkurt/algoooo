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
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [logMessage, setLogMessage] = useState({ text: "Ağaç boş. Başlamak için bir sayı ekleyin.", type: "text-main" });
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Ekran boyutuna göre SVG genişliğini ayarla
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 400 // Sabit yükseklik veya içeriğe göre uzayabilir
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Ağaçtaki düğümlerin koordinatlarını hesaplayan fonksiyon
  const calculateCoordinates = (node, x, y, dx) => {
    if (!node) return;
    node.x = x;
    node.y = y;
    calculateCoordinates(node.left, x - dx, y + 60, dx * 0.6);
    calculateCoordinates(node.right, x + dx, y + 60, dx * 0.6);
  };

  // Kök düğüm güncellendiğinde tüm ağacı yeniden hesapla
  const updateTreeLayout = (newRoot) => {
    if (newRoot) {
      calculateCoordinates(newRoot, dimensions.width / 2, 40, dimensions.width / 4);
    }
    setRoot(newRoot);
  };

  // Yeni Eleman Ekleme
  const handleInsert = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      setLogMessage({ text: "Lütfen geçerli bir sayı girin!", type: "danger" });
      return;
    }

    setHighlightedNodes([]);

    if (!root) {
      const newNode = new TreeNode(val);
      updateTreeLayout(newNode);
      setLogMessage({ text: `[EKLENDİ] ${val} kök (root) düğüm olarak eklendi.`, type: "success" });
    } else {
      let current = root;
      let path = [];
      while (true) {
        path.push(current.val);
        if (val === current.val) {
          setLogMessage({ text: `[HATA] ${val} zaten ağaçta mevcut!`, type: "warning" });
          setHighlightedNodes(path);
          break;
        } else if (val < current.val) {
          if (!current.left) {
            current.left = new TreeNode(val);
            path.push(val);
            setLogMessage({ text: `[EKLENDİ] ${val}, ${current.val} düğümünün soluna eklendi.`, type: "success" });
            updateTreeLayout({...root}); // Derin kopyalama veya referans yenileme yerine obje referansını tetikleriz
            setHighlightedNodes(path);
            break;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = new TreeNode(val);
            path.push(val);
            setLogMessage({ text: `[EKLENDİ] ${val}, ${current.val} düğümünün sağına eklendi.`, type: "success" });
            updateTreeLayout({...root});
            setHighlightedNodes(path);
            break;
          }
          current = current.right;
        }
      }
    }
    setInputValue("");
  };

  // Eleman Arama (Animasyonlu)
  const handleSearch = async () => {
    const val = parseInt(searchValue);
    if (isNaN(val)) {
      setLogMessage({ text: "Aranacak geçerli bir sayı girin!", type: "danger" });
      return;
    }

    setLogMessage({ text: `${val} aranıyor...`, type: "text-main" });
    setHighlightedNodes([]);
    
    let current = root;
    let path = [];
    
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    while (current) {
      path.push(current.val);
      setHighlightedNodes([...path]);
      await sleep(500); // 500ms animasyon beklemesi

      if (val === current.val) {
        setLogMessage({ text: `[BULUNDU] ${val} değeri ağaçta bulundu!`, type: "success" });
        return;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    setLogMessage({ text: `[BULUNAMADI] ${val} değeri ağaçta yok.`, type: "danger" });
  };

  // Sistemi Sıfırla
  const resetTree = () => {
    setRoot(null);
    setHighlightedNodes([]);
    setLogMessage({ text: "Ağaç sıfırlandı. Yeni düğümler ekleyebilirsiniz.", type: "text-main" });
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
          stroke="var(--text-main)" strokeWidth="2"
          opacity="0.5"
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
          stroke="var(--text-main)" strokeWidth="2"
          opacity="0.5"
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
    
    let fillColor = "var(--card-bg)";
    let strokeColor = "var(--accent)";
    
    if (isHighlighted) {
      strokeColor = "var(--success)";
      if (isTarget) {
        fillColor = "var(--success)";
      }
    }

    nodes.push(
      <g key={`node-${node.val}`}>
        <circle
          cx={node.x} cy={node.y}
          r="20"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="3"
          style={{ transition: "all 0.3s ease" }}
        />
        <text
          x={node.x} y={node.y}
          textAnchor="middle" dy=".3em"
          fill={isTarget ? "#111" : "var(--text-main)"}
          fontSize="14"
          fontWeight="bold"
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
      <h1>Laboratuvar 2: İkili Arama Ağacı (BST) Visualizer</h1>
      <div className="card">
        <p><strong>Deney:</strong> BST kurallarına göre küçük değerli düğümler sola, büyük değerli düğümler sağa eklenir. Kendi ağacınızı oluşturun ve ağaçta arama yaparken animasyonlu yolu izleyin.</p>
        
        <div className="controls">
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Eklenecek Sayı" 
          />
          <button className="action-btn" onClick={handleInsert}>Ağaca Ekle</button>
          
          <input 
            type="number" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Aranacak Sayı" 
            style={{ marginLeft: "10px" }}
          />
          <button className="action-btn" style={{ backgroundColor: "var(--secondary-accent)" }} onClick={handleSearch}>Ağaçta Bul</button>
          
          <button className="action-btn danger" style={{ marginLeft: "auto" }} onClick={resetTree}>Sıfırla</button>
        </div>
        
        <p style={{ color: logMessage.type === 'text-main' ? 'var(--text-main)' : 'var(--' + logMessage.type + ')', fontFamily: 'monospace', marginTop: '15px', fontSize: '1.1rem' }}>
          {logMessage.text}
        </p>

        <div 
          ref={containerRef} 
          style={{ 
            width: "100%", 
            height: "400px", 
            backgroundColor: "var(--primary-bg)", 
            borderRadius: "8px", 
            marginTop: "20px", 
            border: "1px solid var(--accent)",
            overflow: "auto" 
          }}
        >
          {dimensions.width > 0 && (
            <svg width={Math.max(dimensions.width, 800)} height={400}>
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
