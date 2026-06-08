"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
  Section7
} from "@/components/TheoreticalSections";
import LinearProbingLab from "@/components/labs/LinearProbingLab";
import BTreeLab from "@/components/labs/BTreeLab";
import BSTLab from "@/components/labs/BSTLab";
import ExamSimulation from "@/components/ExamSimulation";

export default function Home() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const renderContent = () => {
    switch (activeSection) {
      case "sec-1": return <Section1 />;
      case "sec-2": return <Section2 />;
      case "sec-3": return <Section3 />;
      case "sec-4": return <Section4 />;
      case "sec-5": return <Section5 />;
      case "sec-6": return <Section6 />;
      case "sec-7": return <Section7 />;
      case "lab-hash": return <LinearProbingLab />;
      case "lab-btree": return <BTreeLab />;
      case "lab-bst": return <BSTLab />;
      case "sinav": return <ExamSimulation />;
      default: return <Section1 />;
    }
  };

  return (
    <>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="content-area">
        {renderContent()}
      </div>
    </>
  );
}
