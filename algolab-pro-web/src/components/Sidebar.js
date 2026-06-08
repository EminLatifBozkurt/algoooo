"use client";

import React from "react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const sections = [
    { id: "sec-1", label: "1. BST & Karmaşıklık" },
    { id: "sec-2", label: "2. Hashing Mimarisi" },
    { id: "sec-3", label: "3. Hash İstatistikleri" },
    { id: "sec-4", label: "4. B-Tree Yapıları" },
    { id: "sec-5", label: "5. Graf Teorisi" },
    { id: "sec-6", label: "6. DFS ve BFS" },
    { id: "sec-7", label: "7. MST ve Kruskal" },
  ];

  const labs = [
    { id: "lab-hash", label: "🧪 Lab: Linear Probing" },
    { id: "lab-btree", label: "⚙️ Lab: B-Tree Analizi" },
  ];

  return (
    <div className="sidebar">
      <h2>AlgoLab PRO</h2>
      <p>Tam Kapsamlı Başucu Rehberi</p>

      <div className="nav-category">Konu Anlatımları</div>
      {sections.map((sec) => (
        <button
          key={sec.id}
          className={`nav-btn ${activeSection === sec.id ? "active" : ""}`}
          onClick={() => setActiveSection(sec.id)}
        >
          {sec.label}
        </button>
      ))}

      <div className="nav-category">İnteraktif Laboratuvar</div>
      {labs.map((lab) => (
        <button
          key={lab.id}
          className={`nav-btn ${activeSection === lab.id ? "active" : ""}`}
          onClick={() => setActiveSection(lab.id)}
        >
          {lab.label}
        </button>
      ))}

      <div className="nav-category">Değerlendirme</div>
      <button
        className={`nav-btn ${activeSection === "sinav" ? "active" : ""}`}
        style={{ color: "var(--warning)" }}
        onClick={() => setActiveSection("sinav")}
      >
        📝 Final Simülasyonu
      </button>
    </div>
  );
}
