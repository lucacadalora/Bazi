import { useState } from "react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string; icon: React.ReactNode }[];
}

export default function TabNavigation({ activeTab, setActiveTab, tabs }: TabNavigationProps) {
  return (
    <div className="border-b border-gray-200 mb-8">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
        {tabs.map((tab) => (
          <li key={tab.id} className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              } rounded-t-lg`}
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
                {tab.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
