import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string; icon: React.ReactNode }[];
}

export default function TabNavigation({ activeTab, setActiveTab, tabs }: TabNavigationProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  return (
    <div className="border-b border-gray-200 mb-8 overflow-x-auto pb-1">
      <ul className={`flex ${isMobile ? 'w-max min-w-full' : 'flex-wrap'} -mb-px text-sm font-medium text-center`} role="tablist">
        {tabs.map((tab) => (
          <li key={tab.id} className={`${isMobile ? 'flex-shrink-0' : 'mr-2'}`} role="presentation">
            <button
              className={`inline-block ${isMobile ? 'px-3 py-3' : 'p-4'} border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              } rounded-t-lg whitespace-nowrap`}
              id={`${tab.id}-tab`}
              data-tabs-target={`#${tab.id}`}
              type="button"
              role="tab"
              aria-controls={tab.id}
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="flex items-center">
                {tab.icon}
                <span className={isMobile && tab.id !== activeTab ? "hidden sm:inline" : ""}>{tab.label}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
