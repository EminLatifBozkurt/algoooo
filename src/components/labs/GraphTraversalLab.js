"use client";
import React, { useState } from "react";

const nodes = [
  { id: 0, x: 400, y: 60 },
  { id: 1, x: 200, y: 180 },
  { id: 2, x: 600, y: 180 },
  { id: 3, x: 100, y: 340 },
  { id: 4, x: 300, y: 340 },
  { id: 5, x: 700, y: 340 },
  { id: 6, x: 500, y: 340 },
];

const edges = [
  { source: 0, target: 1 }, { source: 0, target: 2 },
  { source: 1, target: 3 }, { source: 1, target: 4 },
  { source: 2, target: 6 }, { source: 2, target: 5 },
  { source: 4, target: 6 }
];

const adjList = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 6, 5],
  3: [1],
  4: [1, 6],
  5: [2],
  6: [2, 4]
};

export default function GraphTraversalLab() {
  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(null);
  const [activeEdges, setActiveEdges] = useState([]);
  const [logMessage, setLogMessage] = useState({ text: "Gezinti türünü seçin.", type: "text-main" });
  const [isRunning, setIsRunning] = useState(false);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runBFS = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setVisited([]);
    setActiveEdges([]);
    setLogMessage({ text: "BFS (Genişlik Öncelikli Arama) başlatılıyor...", type: "text-main" });

    let queue = [0];
    let visitedSet = new Set();
    let edgeSet = [];
    visitedSet.add(0);

    let visitHistory = [];

    while (queue.length > 0) {
      let node = queue.shift();
      setCurrent(node);
      visitHistory.push(node);
      setVisited([...visitHistory]);
      setLogMessage({ text: `Düğüm ${node} işleniyor. Kuyruk: [${queue.join(", ")}]`, type: "warning" });
      await sleep(800);

      for (let neighbor of adjList[node]) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          queue.push(neighbor);
          edgeSet.push(`${Math.min(node, neighbor)}-${Math.max(node, neighbor)}`);
          setActiveEdges([...edgeSet]);
          setLogMessage({ text: `Düğüm ${node} üzerinden ${neighbor} keşfedildi. Kuyruğa eklendi.`, type: "success" });
          await sleep(600);
        }
      }
    }
    setCurrent(null);
    setLogMessage({ text: "BFS Tamamlandı! Tüm düğümler seviye seviye gezildi.", type: "success" });
    setIsRunning(false);
  };

  const runDFS = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setVisited([]);
    setActiveEdges([]);
    setLogMessage({ text: "DFS (Derinlik Öncelikli Arama) başlatılıyor...", type: "text-main" });

    let visitedSet = new Set();
    let edgeSet = [];
    let visitHistory = [];

    const dfs = async (node, parent) => {
      visitedSet.add(node);
      visitHistory.push(node);
      setCurrent(node);
      setVisited([...visitHistory]);
      
      if (parent !== null) {
        edgeSet.push(`${Math.min(node, parent)}-${Math.max(node, parent)}`);
        setActiveEdges([...edgeSet]);
      }
      
      setLogMessage({ text: `Düğüm ${node} ziyaret edildi. Derine iniliyor...`, type: "warning" });
      await sleep(800);

      for (let neighbor of adjList[node]) {
        if (!visitedSet.has(neighbor)) {
          setLogMessage({ text: `${node} üzerinden ${neighbor} düğümüne dalınıyor...`, type: "success" });
          await sleep(600);
          await dfs(neighbor, node);
          setCurrent(node); // Geri dönünce mevcut düğümü güncelle
          setLogMessage({ text: `${neighbor} dalı bitti. ${node} düğümüne geri dönüldü (Backtrack).`, type: "text-main" });
          await sleep(600);
        }
      }
    };

    await dfs(0, null);
    setCurrent(null);
    setLogMessage({ text: "DFS Tamamlandı! Gidilebilecek en derin noktalara ulaşıldı.", type: "success" });
    setIsRunning(false);
  };

  const resetGraph = () => {
    setVisited([]);
    setCurrent(null);
    setActiveEdges([]);
    setLogMessage({ text: "Graf sıfırlandı.", type: "text-main" });
  };

  return (
    <div className="section active">
      <h1>Laboratuvar 3: Graf Gezinti (DFS & BFS) Simülatörü</h1>
      <div className="card">
        <p><strong>Deney:</strong> Ağ üzerindeki düğümlerin farklı algoritmalarla nasıl gezildiğini izleyin. <strong>BFS</strong> (Breadth-First Search) dalga dalga yayılırken, <strong>DFS</strong> (Depth-First Search) gidebildiği kadar derine inip çıkmaz sokakta geri döner.</p>
        
        <div className="controls">
          <button className="action-btn" onClick={runDFS} disabled={isRunning}>Derinlik Öncelikli (DFS)</button>
          <button className="action-btn" style={{ backgroundColor: "var(--secondary-accent)" }} onClick={runBFS} disabled={isRunning}>Genişlik Öncelikli (BFS)</button>
          <button className="action-btn danger" style={{ marginLeft: "auto" }} onClick={resetGraph} disabled={isRunning}>Sıfırla</button>
        </div>
        
        <p style={{ color: logMessage.type === 'text-main' ? 'var(--text-main)' : 'var(--' + logMessage.type + ')', fontFamily: 'monospace', marginTop: '15px', fontSize: '1.1rem' }}>
          {logMessage.text}
        </p>

        <div style={{ 
          width: "100%", 
          backgroundColor: "#181825", 
          borderRadius: "12px", 
          marginTop: "20px", 
          border: "1px solid var(--card-bg)",
          boxShadow: "inset 0 4px 10px rgba(0,0,0,0.5)",
          position: "relative"
        }}>
          {/* viewBox kullanımı ile SVG tüm ekranlarda responsive olur */}
          <svg viewBox="0 0 800 450" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.7"/>
              </filter>
              <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--card-bg)" />
                <stop offset="100%" stopColor="#222" />
              </linearGradient>
              <linearGradient id="nodeGradVisited" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--secondary-accent)" />
              </linearGradient>
              <linearGradient id="nodeGradCurrent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--warning)" />
                <stop offset="100%" stopColor="#d4a017" />
              </linearGradient>
            </defs>

            {/* Kenarları (Edges) Çiz */}
            {edges.map((edge, i) => {
              const edgeId = `${Math.min(edge.source, edge.target)}-${Math.max(edge.source, edge.target)}`;
              const isActive = activeEdges.includes(edgeId);
              const n1 = nodes.find(n => n.id === edge.source);
              const n2 = nodes.find(n => n.id === edge.target);
              return (
                <line 
                  key={i}
                  x1={n1.x} y1={n1.y}
                  x2={n2.x} y2={n2.y}
                  stroke={isActive ? "var(--success)" : "rgba(255,255,255,0.15)"}
                  strokeWidth={isActive ? "6" : "3"}
                  style={{ transition: "all 0.5s ease" }}
                />
              );
            })}

            {/* Düğümleri (Nodes) Çiz */}
            {nodes.map((node) => {
              const isVisited = visited.includes(node.id);
              const isCurrent = current === node.id;
              
              let fillUrl = "url(#nodeGrad)";
              let strokeColor = "var(--primary-bg)";
              
              if (isVisited) {
                fillUrl = "url(#nodeGradVisited)";
                strokeColor = "var(--accent)";
              }
              if (isCurrent) {
                fillUrl = "url(#nodeGradCurrent)";
                strokeColor = "#fff";
              }

              return (
                <g key={node.id}>
                  <circle 
                    cx={node.x} cy={node.y} 
                    r={isCurrent ? "28" : "24"} 
                    fill={fillUrl}
                    stroke={strokeColor}
                    strokeWidth="4"
                    filter="url(#shadow)"
                    style={{ transition: "all 0.3s ease" }}
                  />
                  <text 
                    x={node.x} y={node.y} 
                    textAnchor="middle" dy=".3em" 
                    fill={isVisited ? "#111" : "var(--text-main)"}
                    fontSize="16" fontWeight="900"
                  >
                    {node.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
