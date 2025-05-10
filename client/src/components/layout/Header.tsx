import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About BaZi", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];
  
  function handleLogin() {
    window.location.href = "/api/login";
  }
  
  function handleLogout() {
    window.location.href = "/api/logout";
  }
  
  // Get profile initials safely
  const getInitials = () => {
    if (user?.firstName) return user.firstName.charAt(0);
    if (user?.email) return user.email.charAt(0);
    return "U";
  };

  return (
    <header className="bg-gradient-to-r from-water-dark to-primary-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="text-accent-light text-xl sm:text-2xl transition-transform duration-300 group-hover:rotate-180">☯</div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold">BaZi Insight</h1>
            <p className="text-xs text-metal-light opacity-80 hidden xs:block">Professional Chinese Astrology</p>
          </div>
        </Link>
        
        {isMobile ? (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-b from-water-dark to-primary-dark text-white w-[80vw] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="text-white text-left flex items-center">
                  <div className="mr-2 text-xl text-accent-light">☯</div>
                  <span>BaZi Insight</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-accent-light transition duration-300 py-2 border-b border-white/10 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {item.label}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2 mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profileImageUrl || undefined} />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{user?.firstName || user?.email || "User"}</span>
                    </div>
                    <Link 
                      href="/dashboard" 
                      className="text-white hover:text-accent-light transition py-2 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      My Readings
                    </Link>
                    <Button 
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 mt-2 w-full justify-start"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="bg-accent hover:bg-accent-dark text-ink font-medium mt-6 w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogin();
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Log In
                  </Button>
                )}
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
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarImage src={user?.profileImageUrl || undefined} />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.firstName || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">My Readings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button className="bg-accent hover:bg-accent-dark text-ink font-medium" onClick={handleLogin}>
                  Log In
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}