import { Button } from "@/components/ui/button";

export default function Cta() {
  const scrollToForm = () => {
    const formElement = document.getElementById("information");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-water-dark to-primary-dark text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Begin Your Journey to Self-Discovery</h2>
        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
          Unlock the ancient wisdom of BaZi and gain profound insights into your life path, relationships, and potential.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={scrollToForm}
            className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            Start Your Analysis
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 rounded-lg transition duration-300"
          >
            Learn More About BaZi
          </Button>
        </div>
      </div>
    </section>
  );
}
