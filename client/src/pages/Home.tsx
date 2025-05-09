import { useState } from "react";
import { BaziAnalysis } from "@shared/schema";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/layout/Testimonials";
import Cta from "@/components/layout/Cta";
import BaziForm from "@/components/BaziForm";
import AnalysisResults from "@/components/AnalysisResults";
import ElementsBreakdown from "@/components/ElementsBreakdown";
import Recommendations from "@/components/Recommendations";
import TabNavigation from "@/components/TabNavigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState("information");
  const [analysisData, setAnalysisData] = useState<BaziAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle the analysis completion
  const handleAnalysisComplete = (data: BaziAnalysis) => {
    setAnalysisData(data);
    setIsLoading(false);
  };

  // Handle form submission
  const handleFormSubmit = () => {
    setIsLoading(true);
  };

  // Define tab configuration
  const tabs = [
    {
      id: "information",
      label: "Your Information",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: "analysis",
      label: "BaZi Analysis",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: "elements",
      label: "Your Elements",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: "recommendations",
      label: "Recommendations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <Hero />
      
      {/* Main Content Area with Tabs */}
      <main className="container mx-auto px-4 py-12 -mt-16 relative z-20 flex-grow">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
          
          {/* Tab Content */}
          <div id="tabContent">
            {/* Information Form Tab */}
            <div className={activeTab === "information" ? "block" : "hidden"} id="information" role="tabpanel" aria-labelledby="information-tab">
              <BaziForm 
                onAnalysisComplete={handleAnalysisComplete} 
                setActiveTab={setActiveTab} 
              />
            </div>

            {/* Analysis Tab */}
            <div className={activeTab === "analysis" ? "block" : "hidden"} id="analysis" role="tabpanel" aria-labelledby="analysis-tab">
              <AnalysisResults analysis={analysisData} isLoading={isLoading} />
            </div>

            {/* Elements Tab */}
            <div className={activeTab === "elements" ? "block" : "hidden"} id="elements" role="tabpanel" aria-labelledby="elements-tab">
              <ElementsBreakdown analysis={analysisData} />
            </div>

            {/* Recommendations Tab */}
            <div className={activeTab === "recommendations" ? "block" : "hidden"} id="recommendations" role="tabpanel" aria-labelledby="recommendations-tab">
              <Recommendations analysis={analysisData} />
            </div>
          </div>
        </div>
      </main>
      
      <Testimonials />
      
      <Cta />
      
      <Footer />
    </div>
  );
}
