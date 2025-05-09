import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <section className="bg-gradient-to-b from-paper to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-ink mb-3">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how BaZi Insight has helped people around the world understand their cosmic blueprint and transform their lives.
          </p>
        </div>
        
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
      </div>
    </section>
  );
}
