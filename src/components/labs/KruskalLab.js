"use client";
import React, { useState } from "react";

const nodes = [
  { id: "A", x: 400, y: 60 },
  { id: "B", x: 200, y: 150 },
  { id: "C", x: 600, y: 150 },
  { id: "D", x: 100, y: 300 },
  { id: "E", x: 300, y: 300 },
  { id: "F", x: 500, y: 300 },
  { id: "G", x: 700, y: 300 },
];

const initialEdges = [
  { source: "A", target: "B", weight: 7 },
  { source: "A", target: "C", weight: 5 },
  { source: "B", target: "C", weight: 9 },
  { source: "B", target: "D", weight: 8 },
  { source: "B", target: "E", weight: 7 },
  { source: "C", target: "E", weight: 5 },
  { source: "C", target: "F", weight: 6 },
  { source: "D", target: "E", weight: 5 },
  { source: "E", target: "F", weight: 8 },
  { source: "C", target: "G", weight: 9 },
  { source: "F", target: "G", weight: 11 },
];

class UnionFind {
  constructor(elements) {
    this.parent = {};
    elements.forEach(e => (this.parent[e] = e));
  }
  find(i) {
    if (this.parent[i] === i) return i;
    return this.find(this.parent[i]);
  }
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true; // birleştirildi (döngü yok)
    }
    return false; // zaten aynı kümedeler (döngü var)
  }
}

export default function KruskalLab() {
  const [acceptedEdges, setAcceptedEdges] = useState([]);
  const [rejectedEdges, setRejectedEdges] = useState([]);
  const [currentEdge, setCurrentEdge] = useState(null);
  const [logMessage, setLogMessage] = useState({ text: "Animasyonu başlatın.", type: "text-main" });
  const [isRunning, setIsRunning] = useState(false);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getEdgeId = (e) => {
    return [e.source, e.target].sort().join("-");
  };

  const runKruskal = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setAcceptedEdges([]);
    setRejectedEdges([]);
    setCurrentEdge(null);
    setLogMessage({ text: "Ağırlıklar küçükten büyüğe sıralanıyor...", type: "text-main" });
    await sleep(1000);

    let edgesSorted = [...initialEdges].sort((a, b) => a.weight - b.weight);
    let uf = new UnionFind(nodes.map(n => n.id));
    
    let accepted = [];
    let rejected = [];

    for (let edge of edgesSorted) {
      const edgeId = getEdgeId(edge);
      setCurrentEdge(edgeId);
      setLogMessage({ text: `${edge.source}-${edge.target} kenarı (Ağırlık: ${edge.weight}) değerlendiriliyor...`, type: "warning" });
      await sleep(1200);

      const canUnion = uf.union(edge.source, edge.target);

      if (canUnion) {
        accepted.push(edgeId);
        setAcceptedEdges([...accepted]);
        setLogMessage({ text: `${edge.source}-${edge.target} eklendi! (Döngü oluşturmuyor).`, type: "success" });
      } else {
        rejected.push(edgeId);
        setRejectedEdges([...rejected]);
        setLogMessage({ text: `${edge.source}-${edge.target} reddedildi! (Döngü oluşturuyor).`, type: "danger" });
      }
      await sleep(1000);
    }

    setCurrentEdge(null);
    setLogMessage({ text: "Kruskal MST tamamlandı! Minimum kapsayan ağaç oluşturuldu.", type: "success" });
    setIsRunning(false);
  };

  const resetGraph = () => {
    setAcceptedEdges([]);
    setRejectedEdges([]);
    setCurrentEdge(null);
    setLogMessage({ text: "Graf sıfırlandı.", type: "text-main" });
  };

  return (
    <div className="section active">
      <h1>Laboratuvar 4: Kruskal MST Simülatörü</h1>
      <div className="card">
        <p><strong>Deney:</strong> Kruskal Algoritması, grafı en az maliyetle birbirine bağlar (Minimum Spanning Tree). Kenarlar ağırlıklarına göre sıralanır ve döngü (cycle) yaratmayanlar seçilir. Yeşiller seçilenler, kırmızılar reddedilenlerdir.</p>
        
        <div className="controls">
          <button className="action-btn" onClick={runKruskal} disabled={isRunning}>Kruskal'ı Başlat</button>
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
          <svg viewBox="0 0 800 400" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.7"/>
              </filter>
            </defs>

            {/* Kenarları (Edges) Çiz */}
            {initialEdges.map((edge, i) => {
              const edgeId = getEdgeId(edge);
              const isAccepted = acceptedEdges.includes(edgeId);
              const isRejected = rejectedEdges.includes(edgeId);
              const isCurrent = currentEdge === edgeId;
              
              const n1 = nodes.find(n => n.id === edge.source);
              const n2 = nodes.find(n => n.id === edge.target);

              let strokeColor = "rgba(255,255,255,0.15)";
              let strokeWidth = "3";
              let zIndex = 0;

              if (isAccepted) {
                strokeColor = "var(--success)";
                strokeWidth = "6";
              } else if (isRejected) {
                strokeColor = "var(--danger)";
                strokeWidth = "2";
              } else if (isCurrent) {
                strokeColor = "var(--warning)";
                strokeWidth = "6";
              }

              // Çizgi üzerindeki metnin konumu (orta nokta)
              const midX = (n1.x + n2.x) / 2;
              const midY = (n1.y + n2.y) / 2;

              return (
                <g key={i}>
                  <line 
                    x1={n1.x} y1={n1.y}
                    x2={n2.x} y2={n2.y}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isRejected ? "5,5" : "none"}
                    style={{ transition: "all 0.5s ease" }}
                  />
                  {/* Ağırlık Metni */}
                  <circle cx={midX} cy={midY} r="14" fill="var(--card-bg)" stroke={strokeColor} strokeWidth="1" />
                  <text 
                    x={midX} y={midY} 
                    textAnchor="middle" dy=".3em" 
                    fill="var(--text-main)" fontSize="12" fontWeight="bold"
                  >
                    {edge.weight}
                  </text>
                </g>
              );
            })}

            {/* Düğümleri (Nodes) Çiz */}
            {nodes.map((node) => {
              return (
                <g key={node.id}>
                  <circle 
                    cx={node.x} cy={node.y} 
                    r="20" 
                    fill="var(--sidebar-bg)"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    filter="url(#shadow)"
                  />
                  <text 
                    x={node.x} y={node.y} 
                    textAnchor="middle" dy=".3em" 
                    fill="var(--text-main)"
                    fontSize="14" fontWeight="900"
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
