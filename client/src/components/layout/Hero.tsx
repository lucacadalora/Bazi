import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById("information");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative">
      {/* A mystical Chinese landscape with mountains and traditional elements */}
      <div className="bg-hero-gradient h-[400px] sm:h-[450px] md:h-[500px] relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}></div>
        
        <div className="container mx-auto px-4 pt-12 sm:pt-16 md:pt-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-4 sm:mb-6 leading-tight">
              Discover Your Destiny Through Ancient Wisdom
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-ink/80 mb-6 sm:mb-8 px-2">
              Unlock the secrets of BaZi, the traditional Chinese system of astrology,
              to gain profound insights into your life path, personality, and future potential.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button 
                className="bg-primary hover:bg-primary-dark text-white font-medium px-6 sm:px-8 py-5 sm:py-7 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
                onClick={scrollToForm}
              >
                Start Your Analysis
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary/10 font-medium px-6 sm:px-8 py-5 sm:py-7 rounded-lg transition duration-300 text-sm sm:text-base mt-2 sm:mt-0"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
