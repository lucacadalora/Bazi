import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-mobile";

// Testimonial data
const testimonials = [
  {
    quote: "My BaZi reading provided incredible insights that helped me understand why I've been drawn to certain career paths. The recommendations were spot-on and helped me make important decisions.",
    name: "Sarah J.",
    title: "Marketing Executive",
  },
  {
    quote: "I was skeptical at first, but the accuracy of my BaZi analysis was uncanny. The element breakdown explained patterns I've seen throughout my life. I refer back to it regularly for guidance.",
    name: "Michael T.",
    title: "Software Engineer",
  },
  {
    quote: "The recommendations for balancing my elements helped me create a more harmonious home environment and improve my relationships. It's been transformative for my family.",
    name: "Priya K.",
    title: "Healthcare Professional",
  },
];

export default function Testimonials() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <section className="bg-gradient-to-b from-paper to-white py-10 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2 sm:mb-3">What Our Clients Say</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Discover how BaZi Insight has helped people around the world understand their cosmic blueprint and transform their lives.
          </p>
        </div>
        
        {isMobile ? (
          <div className="mt-6 px-1">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-1 pr-4">
                    <div className="p-1">
                      <Card className="relative h-full">
                        <div className="absolute -top-4 left-4 text-4xl text-primary opacity-20">"</div>
                        <CardContent className="p-5 sm:p-6 relative z-10 h-full flex flex-col justify-between">
                          <p className="text-gray-700 mb-4 text-sm sm:text-base">
                            {testimonial.quote}
                          </p>
                          <div className="flex items-center mt-auto pt-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="font-medium text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-500">{testimonial.title}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static translate-y-0 mr-2" />
                <CarouselNext className="relative static translate-y-0" />
              </div>
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <div className="absolute -top-4 left-6 text-4xl text-primary opacity-20">"</div>
                <CardContent className="p-6 relative z-10">
                  <p className="text-gray-700 mb-4">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
