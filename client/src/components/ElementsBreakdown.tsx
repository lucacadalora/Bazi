import { useState, useEffect } from "react";
import { BaziAnalysis } from "@shared/schema";
import { WoodIcon, FireIcon, EarthIcon, MetalIcon, WaterIcon } from "./icons/ElementIcons";

interface ElementsBreakdownProps {
  analysis: BaziAnalysis | null;
}

export default function ElementsBreakdown({ analysis }: ElementsBreakdownProps) {
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
          <div className="mb-6 text-secondary opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold mb-3 text-ink">No Elements Analysis Yet</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Please go to the "Your Information" tab and generate your BaZi analysis first to see your elemental distribution.
          </p>
          <button 
            className="inline-flex items-center text-secondary hover:text-secondary-dark font-medium"
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
          bgLight: 'bg-secondary/10',
          borderColor: 'border-secondary',
        };
      case 'fire':
        return {
          bg: 'bg-primary',
          text: 'text-primary',
          bgLight: 'bg-primary/10',
          borderColor: 'border-primary',
        };
      case 'earth':
        return {
          bg: 'bg-accent',
          text: 'text-accent',
          bgLight: 'bg-accent/10',
          borderColor: 'border-accent',
        };
      case 'metal':
        return {
          bg: 'bg-metal-dark',
          text: 'text-metal-dark',
          bgLight: 'bg-metal/10',
          borderColor: 'border-metal-dark',
        };
      case 'water':
        return {
          bg: 'bg-water',
          text: 'text-water',
          bgLight: 'bg-water/10',
          borderColor: 'border-water',
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-gray-500',
          bgLight: 'bg-gray-100',
          borderColor: 'border-gray-500',
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
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <h2 className="font-display text-3xl font-semibold text-ink mb-6">Your Five Elements Distribution</h2>
      <p className="text-gray-600 mb-8">
        According to BaZi astrology, the five elements (Wood, Fire, Earth, Metal, and Water) form the foundation of your energetic makeup. 
        Below is the distribution of these elements in your chart and how they influence different aspects of your life.
      </p>
      
      {/* Elements Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-xl font-medium mb-4">Element Distribution</h3>
            
            {/* Wood Element */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-secondary mr-2"></div>
                  <span className="font-medium">Wood</span>
                </div>
                <span>{analysis.elements.wood}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${analysis.elements.wood}%` }}></div>
              </div>
            </div>
            
            {/* Fire Element */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary mr-2"></div>
                  <span className="font-medium">Fire</span>
                </div>
                <span>{analysis.elements.fire}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${analysis.elements.fire}%` }}></div>
              </div>
            </div>
            
            {/* Earth Element */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-accent mr-2"></div>
                  <span className="font-medium">Earth</span>
                </div>
                <span>{analysis.elements.earth}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-accent h-2.5 rounded-full" style={{ width: `${analysis.elements.earth}%` }}></div>
              </div>
            </div>
            
            {/* Metal Element */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-metal-dark mr-2"></div>
                  <span className="font-medium">Metal</span>
                </div>
                <span>{analysis.elements.metal}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-metal-dark h-2.5 rounded-full" style={{ width: `${analysis.elements.metal}%` }}></div>
              </div>
            </div>
            
            {/* Water Element */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-water mr-2"></div>
                  <span className="font-medium">Water</span>
                </div>
                <span>{analysis.elements.water}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-water h-2.5 rounded-full" style={{ width: `${analysis.elements.water}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            {/* Pie chart visualization using custom SVG */}
            <div className="relative w-64 h-64">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Create pie chart from element percentages */}
                <circle cx="50" cy="50" r="45" fill="#F9F6EE" stroke="#E5E7EB" strokeWidth="1" />
                
                {/* Dynamic pie chart segments based on element percentages */}
                {(() => {
                  const elements = [
                    { name: 'wood', value: analysis.elements.wood, color: 'rgb(60, 179, 113)' },
                    { name: 'fire', value: analysis.elements.fire, color: 'rgb(178, 34, 34)' },
                    { name: 'earth', value: analysis.elements.earth, color: 'rgb(212, 175, 55)' },
                    { name: 'metal', value: analysis.elements.metal, color: 'rgb(192, 192, 192)' },
                    { name: 'water', value: analysis.elements.water, color: 'rgb(30, 58, 138)' }
                  ];
                  
                  let startAngle = 0;
                  const total = elements.reduce((sum, el) => sum + el.value, 0);
                  
                  return elements.map((element, idx) => {
                    const percentage = element.value / total;
                    const endAngle = startAngle + percentage * 360;
                    
                    // SVG arc path
                    const x1 = 50 + 45 * Math.cos(Math.PI * startAngle / 180);
                    const y1 = 50 + 45 * Math.sin(Math.PI * startAngle / 180);
                    const x2 = 50 + 45 * Math.cos(Math.PI * endAngle / 180);
                    const y2 = 50 + 45 * Math.sin(Math.PI * endAngle / 180);
                    
                    const largeArcFlag = percentage > 0.5 ? 1 : 0;
                    
                    const pathData = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                    
                    const path = (
                      <path 
                        key={idx} 
                        d={pathData} 
                        fill={element.color}
                        stroke="#FFF"
                        strokeWidth="1"
                      />
                    );
                    
                    startAngle = endAngle;
                    return path;
                  });
                })()}
                
                {/* Center circle */}
                <circle cx="50" cy="50" r="20" fill="white" stroke="#E5E7EB" strokeWidth="1" />
                
                {/* Center text - Master element symbol */}
                <text x="50" y="50" fontFamily="Ma Shan Zheng, cursive" fontSize="18" fill="#B22222" textAnchor="middle" dominantBaseline="middle">命</text>
              </svg>
              
              {/* Legend for the chart */}
              <div className="absolute top-0 right-0 bg-white/80 p-1 text-xs rounded">
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 bg-secondary mr-1"></div>
                  <span>Wood</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 bg-primary mr-1"></div>
                  <span>Fire</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 bg-accent mr-1"></div>
                  <span>Earth</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 bg-metal-dark mr-1"></div>
                  <span>Metal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-water mr-1"></div>
                  <span>Water</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Elements Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {analysis.elements.details.map((element, index) => {
          const colors = getElementColor(element.element);
          return (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`${colors.bg} text-white p-4`}>
                <div className="flex items-center">
                  <div className="mr-3">
                    {getElementIcon(element.element)}
                  </div>
                  <h3 className="font-display text-xl font-medium">{element.element} Element</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-4">
                  {element.element === 'Wood' && 'Represents growth, expansion, and creativity.'}
                  {element.element === 'Fire' && 'Represents passion, expression, and transformation.'}
                  {element.element === 'Earth' && 'Provides stability, groundedness, and nurturing qualities.'}
                  {element.element === 'Metal' && 'Brings clarity, precision, and structure to your energy.'}
                  {element.element === 'Water' && 'Represents wisdom, flexibility, and emotional depth.'}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colors.text} mt-1 mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-medium">Strengths:</span> {element.strengths.join(', ')}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary/70 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-medium">Weaknesses:</span> {element.weaknesses.join(', ')}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div>
                      <span className="font-medium">Best expressions:</span> {element.expressions.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Element Interactions */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-element-gradient text-white p-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <h3 className="font-display text-xl font-medium">Element Interactions</h3>
            </div>
          </div>
          <div className="p-5">
            <p className="text-gray-700 mb-4">How your elements influence and balance each other.</p>
            <div className="space-y-2 text-sm">
              {analysis.elements.interactions.map((interaction, index) => {
                const iconClass = 
                  interaction.type === 'Supportive' ? 'text-secondary' :
                  interaction.type === 'Challenging' ? 'text-primary/70' :
                  'text-accent';
                
                const icon = 
                  interaction.type === 'Supportive' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${iconClass} mt-1 mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : interaction.type === 'Challenging' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${iconClass} mt-1 mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${iconClass} mt-1 mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  );
                
                return (
                  <div key={index} className="flex items-start">
                    {icon}
                    <div>
                      <span className="font-medium">{interaction.type}:</span> {interaction.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Element Cycle */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="font-display text-xl font-medium mb-4">The Element Creation & Control Cycle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-4">
              Understanding how the five elements interact is key to balancing your energies. 
              In BaZi, elements follow two important cycles:
            </p>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Creation Cycle (Generating)</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  Wood feeds Fire
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  Fire creates Earth (ash)
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  Earth bears Metal
                </li>
                <li className="flex items-center">
                  <span className="text-metal-dark mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  Metal collects Water
                </li>
                <li className="flex items-center">
                  <span className="text-water mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  Water nourishes Wood
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Control Cycle (Overcoming)</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </span>
                  Wood controls Earth
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </span>
                  Fire controls Metal
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </span>
                  Earth controls Water
                </li>
                <li className="flex items-center">
                  <span className="text-metal-dark mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </span>
                  Metal controls Wood
                </li>
                <li className="flex items-center">
                  <span className="text-water mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </span>
                  Water controls Fire
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            {/* SVG element cycle diagram */}
            <div className="relative w-64 h-64">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Element cycle pentagon */}
                <polygon points="100,10 190,75 155,180 45,180 10,75" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                
                {/* Element positions */}
                <circle cx="100" cy="10" r="15" fill="#3CB371" /> {/* Wood - top */}
                <circle cx="190" cy="75" r="15" fill="#B22222" /> {/* Fire - top right */}
                <circle cx="155" cy="180" r="15" fill="#D4AF37" /> {/* Earth - bottom right */}
                <circle cx="45" cy="180" r="15" fill="#C0C0C0" /> {/* Metal - bottom left */}
                <circle cx="10" cy="75" r="15" fill="#1E3A8A" /> {/* Water - top left */}
                
                {/* Element symbols */}
                <text x="100" y="15" textAnchor="middle" fontSize="14" fill="white" dominantBaseline="middle">木</text>
                <text x="190" y="75" textAnchor="middle" fontSize="14" fill="white" dominantBaseline="middle">火</text>
                <text x="155" y="180" textAnchor="middle" fontSize="14" fill="white" dominantBaseline="middle">土</text>
                <text x="45" y="180" textAnchor="middle" fontSize="14" fill="white" dominantBaseline="middle">金</text>
                <text x="10" y="75" textAnchor="middle" fontSize="14" fill="white" dominantBaseline="middle">水</text>
                
                {/* Creating cycle arrows */}
                <path d="M85,20 Q60,45 25,75" fill="none" stroke="#3CB371" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <path d="M170,85 Q125,125 150,165" fill="none" stroke="#B22222" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <path d="M135,180 Q90,180 60,180" fill="none" stroke="#D4AF37" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <path d="M35,165 Q60,125 15,85" fill="none" stroke="#C0C0C0" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <path d="M25,65 Q70,30 90,20" fill="none" stroke="#1E3A8A" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* Arrow definition */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Personal Element Recommendations */}
      <div className="bg-paper rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="font-display text-xl font-medium mb-4">Balancing Your Elements</h3>
        <p className="text-gray-700 mb-4">
          Based on your BaZi chart, here are personalized recommendations to help you balance your elemental energies:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-primary mb-3">Elements to Strengthen</h4>
            <ul className="space-y-3">
              {analysis.favorable.elements.map((element, index) => (
                <li key={index} className="flex items-start">
                  <div className={`w-8 h-8 rounded-full ${getElementColor(element.element).bg} text-white flex items-center justify-center mr-3 flex-shrink-0`}>
                    {getElementIcon(element.element)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{element.element} Element:</span> {element.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-primary mb-3">Elements to Moderate</h4>
            <ul className="space-y-3">
              {/* Get the two elements with highest percentages */}
              {(() => {
                const sortedElements = [
                  { element: 'Wood', value: analysis.elements.wood },
                  { element: 'Fire', value: analysis.elements.fire },
                  { element: 'Earth', value: analysis.elements.earth },
                  { element: 'Metal', value: analysis.elements.metal },
                  { element: 'Water', value: analysis.elements.water },
                ].sort((a, b) => b.value - a.value).slice(0, 2);
                
                return sortedElements.map((el, index) => {
                  const elementDetail = analysis.elements.details.find(detail => 
                    detail.element.toLowerCase() === el.element.toLowerCase()
                  );
                  
                  // Find the controlling element
                  const controllingElement = 
                    el.element === 'Wood' ? 'Metal' :
                    el.element === 'Fire' ? 'Water' :
                    el.element === 'Earth' ? 'Wood' :
                    el.element === 'Metal' ? 'Fire' :
                    'Earth';
                  
                  return (
                    <li key={index} className="flex items-start">
                      <div className={`w-8 h-8 rounded-full ${getElementColor(el.element).bg} text-white flex items-center justify-center mr-3 flex-shrink-0`}>
                        {getElementIcon(el.element)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">{el.element} Element:</span> Balance your strong {el.element} energy by incorporating more {controllingElement} and focusing on {elementDetail?.weaknesses[0]}.
                        </p>
                      </div>
                    </li>
                  );
                });
              })()}
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
          <h4 className="font-medium text-gray-800 mb-3">Daily Practices for Balance</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-secondary/10 rounded-lg">
              <WoodIcon className="mx-auto text-secondary text-xl mb-2 h-6 w-6" />
              <p className="text-sm text-gray-700">Morning stretching to stimulate Wood</p>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <FireIcon className="mx-auto text-primary text-xl mb-2 h-6 w-6" />
              <p className="text-sm text-gray-700">Midday activity for Fire energy</p>
            </div>
            <div className="text-center p-3 bg-accent/10 rounded-lg">
              <EarthIcon className="mx-auto text-accent text-xl mb-2 h-6 w-6" />
              <p className="text-sm text-gray-700">Mindful eating for Earth balance</p>
            </div>
            <div className="text-center p-3 bg-water/10 rounded-lg">
              <WaterIcon className="mx-auto text-water text-xl mb-2 h-6 w-6" />
              <p className="text-sm text-gray-700">Evening reflection for Water</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
