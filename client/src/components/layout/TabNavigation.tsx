import { useState } from "react";
import { motion } from "framer-motion";

type Tab = "timeline" | "career" | "saved";

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const handleTabClick = (tab: Tab) => {
    onTabChange(tab);
  };

  // Map tabs to their display properties
  const tabs = [
    {
      id: "timeline",
      label: "Life Timeline",
      icon: "fas fa-clock",
      description: "Visualize where you'll be in 5, 10, and 20 years"
    },
    {
      id: "career",
      label: "Career Roadmap",
      icon: "fas fa-briefcase",
      description: "Find the path to your dream job with AI guidance"
    },
    {
      id: "saved",
      label: "Saved Maps",
      icon: "fas fa-save",
      description: "Access your previously generated timelines and careers"
    }
  ];

  return (
    <div className="mb-12">
      {/* Tab Navigation - Desktop */}
      <div className="hidden md:flex items-center justify-center mb-10">
        <div className="bg-[#f5f5f7] rounded-full p-1 flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`relative z-10 rounded-full px-6 py-2 text-sm transition-all ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-[#1d1d1f] hover:text-[#0071e3]"
              } ${tab.id === "timeline" ? "tour-timeline" : tab.id === "career" ? "tour-career" : "tour-saved"}`}
              onClick={() => handleTabClick(tab.id as Tab)}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-[#0071e3] rounded-full -z-10"
                  layoutId="tabBackground"
                  transition={{ duration: 0.3, type: "spring", bounce: 0.15 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Navigation - Mobile */}
      <div className="md:hidden border-b border-[#d2d2d7] mb-8">
        <nav className="-mb-px flex space-x-6 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-1 border-b-2 whitespace-nowrap text-sm ${
                activeTab === tab.id
                  ? "border-[#0071e3] text-[#0071e3] font-medium"
                  : "text-[#86868b] hover:text-[#1d1d1f] border-transparent"
              }`}
              onClick={() => handleTabClick(tab.id as Tab)}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Description */}
      <div className="text-center mb-10">
        <h2 className="text-apple-headline mb-2 text-[#1d1d1f]">
          {tabs.find(tab => tab.id === activeTab)?.label}
        </h2>
        <p className="text-[#86868b] text-apple-subheadline max-w-2xl mx-auto">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
}
