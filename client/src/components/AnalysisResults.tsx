import { useState, useEffect } from "react";
import { BaziAnalysis } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WoodIcon, FireIcon, EarthIcon, MetalIcon, WaterIcon } from "./icons/ElementIcons";

interface AnalysisResultsProps {
  analysis: BaziAnalysis | null;
  isLoading: boolean;
}

export default function AnalysisResults({ analysis, isLoading }: AnalysisResultsProps) {
  const [showResults, setShowResults] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    if (isLoading) {
      setShowResults(false);
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
      return () => clearInterval(interval);
    } else if (analysis) {
      setLoadingProgress(100);
      // Small delay before showing results to complete animation
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, analysis]);

  // Helper function to get element icon
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
        return null;
    }
  };

  if (isLoading || !showResults) {
    return (
      <div className="text-center py-12">
        <div className="inline-block relative w-40 h-40 mb-6">
          <div className="absolute inset-0 bg-contain bg-center opacity-20 spin-slow">
            {/* Yin Yang background */}
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <path d="M50,0A50,50,0,1,1,50,100A50,50,0,1,1,50,0" fill="#000" />
              <path d="M50,0A50,50,0,0,1,50,100A25,25,0,0,1,50,50A25,25,0,0,0,50,0" fill="#fff" />
              <circle cx="50" cy="25" r="5" fill="#000" />
              <circle cx="50" cy="75" r="5" fill="#fff" />
            </svg>
          </div>
          <div className="h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="font-display text-2xl font-semibold mb-3">Calculating Your BaZi Chart</h2>
        <p className="text-gray-600 mb-6">Our systems are consulting the ancient wisdom to reveal your cosmic blueprint</p>
        
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Analyzing birth data</span>
            <span>{loadingProgress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress bg-primary" style={{ width: `${loadingProgress}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-12">
        <h2 className="font-display text-2xl font-semibold mb-3">No Analysis Available</h2>
        <p className="text-gray-600">Please complete the form to generate your BaZi analysis.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-3xl font-semibold text-ink">Your BaZi Analysis</h2>
        <div>
          <Button 
            variant="outline" 
            className="mr-2"
            onClick={() => {
              // In real implementation, would save to PDF or local storage
              alert("This would save your analysis. Feature to be implemented.");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Save
          </Button>
          <Button variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </Button>
        </div>
      </div>
      
      {/* User Chart Summary */}
      <div className="bg-chart-gradient text-white rounded-xl shadow-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <h3 className="font-display text-xl font-semibold mb-3">{analysis.chart.name}'s BaZi Chart</h3>
            <p className="text-white/80 mb-4">{analysis.chart.birthInfo}</p>
            
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="bg-black/20 rounded-lg p-3 text-center">
                <div className="text-accent font-chinese text-xl mb-1">{analysis.chart.yearPillar.symbol}</div>
                <div className="text-xs uppercase tracking-wider opacity-70">Year Pillar</div>
                <div className="font-medium">{analysis.chart.yearPillar.name}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3 text-center">
                <div className="text-accent font-chinese text-xl mb-1">{analysis.chart.monthPillar.symbol}</div>
                <div className="text-xs uppercase tracking-wider opacity-70">Month Pillar</div>
                <div className="font-medium">{analysis.chart.monthPillar.name}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3 text-center">
                <div className="text-accent font-chinese text-xl mb-1">{analysis.chart.dayPillar.symbol}</div>
                <div className="text-xs uppercase tracking-wider opacity-70">Day Pillar</div>
                <div className="font-medium">{analysis.chart.dayPillar.name}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3 text-center">
                <div className="text-accent font-chinese text-xl mb-1">{analysis.chart.hourPillar.symbol}</div>
                <div className="text-xs uppercase tracking-wider opacity-70">Hour Pillar</div>
                <div className="font-medium">{analysis.chart.hourPillar.name}</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {analysis.chart.tags.map((tag, index) => (
                <div key={index} className="bg-black/10 rounded-full px-3 py-1 text-sm">
                  <span className="text-accent-light mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-black/20 rounded-full flex items-center justify-center">
              <span className="font-chinese text-5xl text-accent">命</span>
            </div>
            <div className="mt-3 text-center">
              <div className="text-sm opacity-70">Master Element</div>
              <div className="font-medium">{analysis.chart.masterElement}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Analysis Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start mb-4">
              <div className="element-icon bg-secondary flex-shrink-0 mr-4">
                <WoodIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-medium mb-1">Personality Traits</h3>
                <p className="text-sm text-gray-600">Core characteristics based on your BaZi</p>
              </div>
            </div>
            <ul className="space-y-2 text-gray-700">
              {analysis.personality.map((trait, index) => (
                <li key={index} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-dark mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {trait}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start mb-4">
              <div className="element-icon bg-primary flex-shrink-0 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg font-medium mb-1">Career Insights</h3>
                <p className="text-sm text-gray-600">Professional paths aligned with your energy</p>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{analysis.career.description}</p>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-medium text-gray-800 mb-2">Favorable Career Paths:</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.career.paths.map((path, index) => (
                  <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700">{path}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start mb-4">
              <div className="element-icon bg-accent flex-shrink-0 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg font-medium mb-1">Relationship Dynamics</h3>
                <p className="text-sm text-gray-600">How you connect with others</p>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{analysis.relationships.description}</p>
            
            {analysis.relationships.compatibilities.map((compatibility, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Compatibility with {compatibility.type} signs</span>
                  <span className={`${
                    compatibility.level === 'Very High' ? 'text-primary' : 
                    compatibility.level === 'High' ? 'text-secondary' : 
                    compatibility.level === 'Medium' ? 'text-accent' : 'text-gray-500'
                  } font-medium`}>{compatibility.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                  <div 
                    className={`${
                      compatibility.level === 'Very High' ? 'bg-primary' : 
                      compatibility.level === 'High' ? 'bg-secondary' : 
                      compatibility.level === 'Medium' ? 'bg-accent' : 'bg-gray-500'
                    } h-2.5 rounded-full`} 
                    style={{ width: `${compatibility.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      {/* Yearly Forecast */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-semibold mb-4">Your Forecast for {new Date().getFullYear()}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {analysis.forecast.map((quarter, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h4 className="font-medium">{quarter.period}</h4>
                </div>
                <p className="text-sm text-gray-700">{quarter.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Lucky Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-5">
            <h3 className="font-display text-lg font-semibold mb-4">Favorable Elements</h3>
            <div className="space-y-4">
              {analysis.favorable.elements.map((element, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${
                    element.element.toLowerCase() === 'water' ? 'bg-water' :
                    element.element.toLowerCase() === 'metal' ? 'bg-metal-dark' :
                    element.element.toLowerCase() === 'wood' ? 'bg-secondary' :
                    element.element.toLowerCase() === 'fire' ? 'bg-primary' :
                    'bg-accent'
                  } text-white flex items-center justify-center mr-3`}>
                    {getElementIcon(element.element)}
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      element.element.toLowerCase() === 'water' ? 'text-water' :
                      element.element.toLowerCase() === 'metal' ? 'text-metal-dark' :
                      element.element.toLowerCase() === 'wood' ? 'text-secondary' :
                      element.element.toLowerCase() === 'fire' ? 'text-primary' :
                      'text-accent'
                    }`}>{element.element} Element</h4>
                    <p className="text-sm text-gray-600">{element.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <h3 className="font-display text-lg font-semibold mb-4">Lucky Directions & Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Favorable Directions</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {analysis.favorable.directions.map((direction, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      {direction}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Lucky Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.favorable.colors.map((color, index) => {
                    const colorClass = 
                      color.toLowerCase() === 'blue' ? 'bg-blue-600' :
                      color.toLowerCase() === 'black' ? 'bg-black' :
                      color.toLowerCase() === 'teal' ? 'bg-teal-500' :
                      color.toLowerCase() === 'silver' || color.toLowerCase() === 'gray' ? 'bg-gray-400' :
                      color.toLowerCase() === 'green' ? 'bg-green-500' :
                      color.toLowerCase() === 'gold' || color.toLowerCase() === 'yellow' ? 'bg-yellow-500' :
                      color.toLowerCase() === 'white' ? 'bg-white' :
                      color.toLowerCase() === 'red' ? 'bg-red-600' :
                      'bg-purple-500';
                    
                    return (
                      <div key={index} className={`w-6 h-6 rounded-full ${colorClass} border border-white shadow`}></div>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {analysis.favorable.colors.join(', ')} enhance your energy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Expert Commentary */}
      <Card className="bg-paper mb-8">
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-2">Expert Commentary</h3>
              <p className="text-gray-700">{analysis.commentary}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
