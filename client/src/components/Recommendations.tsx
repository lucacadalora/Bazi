import { useState, useEffect } from "react";
import { BaziAnalysis } from "@shared/schema";
import { 
  WoodIcon, 
  FireIcon, 
  EarthIcon, 
  MetalIcon, 
  WaterIcon, 
  YinYangIcon 
} from "./icons/ElementIcons";
import { Card, CardContent } from "@/components/ui/card";

interface RecommendationsProps {
  analysis: BaziAnalysis | null;
}

export default function Recommendations({ analysis }: RecommendationsProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (analysis) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [analysis]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!analysis) {
    return (
      <div className="text-center py-12">
        <div className="bg-paper/30 rounded-xl p-8 max-w-xl mx-auto">
          <div className="mb-6 text-accent opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold mb-3 text-ink">No Recommendations Yet</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Please go to the "Your Information" tab and generate your BaZi analysis first to receive personalized recommendations.
          </p>
          <button 
            className="inline-flex items-center text-accent hover:text-accent-dark font-medium"
            onClick={() => {
              const informationTab = document.getElementById("information-tab");
              if (informationTab) {
                informationTab.click();
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  // Get appropriate color class for each element
  const getElementColor = (element: string) => {
    switch (element.toLowerCase()) {
      case 'wood':
        return {
          bg: 'bg-secondary',
          text: 'text-secondary',
          bgLight: 'bg-secondary/20',
        };
      case 'fire':
        return {
          bg: 'bg-primary',
          text: 'text-primary',
          bgLight: 'bg-primary/20',
        };
      case 'earth':
        return {
          bg: 'bg-accent',
          text: 'text-accent',
          bgLight: 'bg-accent/20',
        };
      case 'metal':
        return {
          bg: 'bg-metal-dark',
          text: 'text-metal-dark',
          bgLight: 'bg-metal/20',
        };
      case 'water':
        return {
          bg: 'bg-water',
          text: 'text-water',
          bgLight: 'bg-water/20',
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-500',
          bgLight: 'bg-gray-100',
        };
    }
  };

  // Get element icon component
  const getElementIcon = (element: string) => {
    switch (element.toLowerCase()) {
      case 'wood':
        return <WoodIcon className="h-5 w-5" />;
      case 'fire':
        return <FireIcon className="h-5 w-5" />;
      case 'earth':
        return <EarthIcon className="h-5 w-5" />;
      case 'metal':
        return <MetalIcon className="h-5 w-5" />;
      case 'water':
        return <WaterIcon className="h-5 w-5" />;
      default:
        return <YinYangIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <h2 className="font-display text-3xl font-semibold text-ink mb-6">Personalized Recommendations</h2>
      <p className="text-gray-600 mb-8">
        Based on your BaZi chart analysis, we've created customized recommendations to help you optimize your energy 
        and navigate upcoming opportunities and challenges.
      </p>
      
      {/* Upcoming Favorable Periods */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="font-display text-xl font-medium mb-6">Favorable Periods in {new Date().getFullYear()}</h3>
        
        <div className="relative">
          {/* Timeline */}
          <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
          
          <div className="space-y-6 relative">
            {analysis.recommendations.periods.map((period, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center">
                {index % 2 === 0 ? (
                  <>
                    <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                      <div className="bg-secondary/10 p-4 rounded-lg shadow-sm md:ml-auto md:mr-0">
                        <h4 className="font-medium text-secondary mb-2">{period.timeframe}</h4>
                        <p className="text-sm text-gray-700">{period.description}</p>
                        <div className="mt-3 flex md:justify-end">
                          <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full">{period.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2 mb-4 md:mb-0">
                      <div className="w-10 h-10 rounded-full bg-secondary border-4 border-white shadow flex items-center justify-center z-10 relative">
                        {index === 0 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 md:pl-8 order-3"></div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 md:pr-8 order-2"></div>
                    <div className="order-1 md:order-2 mb-4 md:mb-0">
                      <div className="w-10 h-10 rounded-full bg-accent border-4 border-white shadow flex items-center justify-center z-10 relative">
                        {index === 1 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 md:pl-8 order-3">
                      <div className="bg-accent/10 p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-accent mb-2">{period.timeframe}</h4>
                        <p className="text-sm text-gray-700">{period.description}</p>
                        <div className="mt-3">
                          <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">{period.type}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Practice Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium">Recommended Practices</h3>
            </div>
            
            <ul className="space-y-4">
              {analysis.recommendations.practices.map((practice, index) => {
                const colors = getElementColor(practice.element);
                return (
                  <li key={index} className="flex items-start">
                    <div className={`${colors.bg} text-white p-1 rounded-full mr-3 flex-shrink-0 mt-0.5`}>
                      {getElementIcon(practice.element)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{practice.name}</h4>
                      <p className="text-sm text-gray-600">{practice.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium">Practices to Moderate</h3>
            </div>
            
            <ul className="space-y-4">
              {analysis.recommendations.avoidances.map((avoidance, index) => {
                const colors = getElementColor(avoidance.element);
                return (
                  <li key={index} className="flex items-start">
                    <div className={`${colors.bg} text-white p-1 rounded-full mr-3 flex-shrink-0 mt-0.5`}>
                      {getElementIcon(avoidance.element)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{avoidance.name}</h4>
                      <p className="text-sm text-gray-600">{avoidance.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Environment Recommendations */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-medium mb-6">Environment & Lifestyle Recommendations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800">Home Environment</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {analysis.recommendations.environment.home.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800">Dietary Balance</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {analysis.recommendations.environment.diet.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800">Daily Routines</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {analysis.recommendations.environment.routine.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Custom Feng Shui Advice */}
      <Card className="bg-paper mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 pr-0 md:pr-8">
              <h3 className="font-display text-xl font-medium mb-4">Personalized Feng Shui Recommendations</h3>
              <p className="text-gray-700 mb-4">
                Enhancing your space according to Feng Shui principles can significantly improve how energy flows through your life.
                These recommendations are customized based on your BaZi chart:
              </p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Home & Office Arrangement</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {analysis.recommendations.fengShui.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-water mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Balancing Elements in Your Space</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {analysis.recommendations.fengShui.slice(3).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/3 mt-6 md:mt-0">
              {/* Feng shui bagua representation */}
              <div className="rounded-lg shadow-md w-full h-auto bg-white p-4">
                <div className="grid grid-cols-3 grid-rows-3 gap-1 aspect-square">
                  <div className="bg-purple-100 rounded p-2 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">Wealth</span>
                    <span className="text-xs">SE</span>
                  </div>
                  <div className="bg-red-100 rounded p-2 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">Fame</span>
                    <span className="text-xs">S</span>
                  </div>
                  <div className="bg-pink-100 rounded p-2 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">Marriage</span>
                    <span className="text-xs">SW</span>
                  </div>
                  <div className="bg-green-100 rounded p-2 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">Family</span>
                    <span className="text-xs">E</span>
                  </div>
                  <div className="bg-yellow-100 rounded p-2 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">Health</span>
                    <span className="text-xs">Center</span>
                  </div>
                  <div className="bg-gray-100 rounded p-2 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">Creativity</span>
                    <span className="text-xs">W</span>
                  </div>
                  <div className="bg-blue-100 rounded p-2 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">Knowledge</span>
                    <span className="text-xs">NE</span>
                  </div>
                  <div className="bg-indigo-100 rounded p-2 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">Career</span>
                    <span className="text-xs">N</span>
                  </div>
                  <div className="bg-zinc-100 rounded p-2 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">Helpful</span>
                    <span className="text-xs">NW</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Traditional Feng Shui Bagua Map for reference</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Annual Talismans */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-medium mb-4">Annual Talismans & Symbols</h3>
          <p className="text-gray-700 mb-4">
            Traditional BaZi practice includes specific talismans and symbols to enhance your fortune.
            The following items are recommended for the current year:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {analysis.recommendations.talismans.map((talisman, index) => {
              const colors = getElementColor(talisman.element);
              return (
                <div key={index} className={`${colors.bgLight} rounded-lg p-4 text-center`}>
                  <div className={`w-16 h-16 rounded-full ${colors.bgLight} flex items-center justify-center mx-auto mb-3`}>
                    {talisman.element.toLowerCase() === 'wood' ? (
                      <span className="font-chinese text-2xl text-secondary">木</span>
                    ) : talisman.element.toLowerCase() === 'fire' ? (
                      <span className="font-chinese text-2xl text-primary">火</span>
                    ) : talisman.element.toLowerCase() === 'earth' ? (
                      <span className="font-chinese text-2xl text-accent">土</span>
                    ) : talisman.element.toLowerCase() === 'metal' ? (
                      <span className="font-chinese text-2xl text-metal-dark">金</span>
                    ) : talisman.element.toLowerCase() === 'water' ? (
                      <span className="font-chinese text-2xl text-water">水</span>
                    ) : (
                      <YinYangIcon className={`h-8 w-8 ${colors.text}`} />
                    )}
                  </div>
                  <h4 className="font-medium text-gray-800 mb-1">{talisman.name}</h4>
                  <p className="text-xs text-gray-600">{talisman.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
