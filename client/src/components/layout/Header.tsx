import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About BaZi", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-gradient-to-r from-water-dark to-primary-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-accent-light text-2xl">☯</div>
          <div>
            <h1 className="font-display text-2xl font-bold">BaZi Insight</h1>
            <p className="text-xs text-metal-light opacity-80">Professional Chinese Astrology Analysis</p>
          </div>
        </div>
        
        {isMobile ? (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-b from-water-dark to-primary-dark text-white">
              <SheetHeader>
                <SheetTitle className="text-white text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-6 mt-8">
                {navItems.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-accent-light transition duration-300 py-2 border-b border-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button 
                  className="bg-accent hover:bg-accent-dark text-ink font-medium mt-4"
                  onClick={() => {
                    setIsMenuOpen(false);
                    // Handle sign in logic
                  }}
                >
                  Sign In
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <nav className="hidden md:flex space-x-8 items-center">
              {navItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  className="text-white hover:text-accent-light transition duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="hidden md:block">
              <Button className="bg-accent hover:bg-accent-dark text-ink font-medium">
                Sign In
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
