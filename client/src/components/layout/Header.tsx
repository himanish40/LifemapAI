import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#d2d2d7]" 
        : "bg-[rgba(255,255,255,0.9)]"
    }`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <i className="fas fa-route text-[#0071e3] text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                LifeMap<span className="text-gradient">AI</span>
              </h1>
              <div className="text-xs text-[#86868b] -mt-1">by M. Himanish Reddy</div>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center">
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-[#1d1d1f] hover:text-[#0071e3] transition-colors text-sm font-normal">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#1d1d1f] hover:text-[#0071e3] transition-colors text-sm font-normal">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-[#1d1d1f] hover:text-[#0071e3] transition-colors text-sm font-normal">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#1d1d1f] hover:text-[#0071e3] transition-colors text-sm font-normal">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#1d1d1f] hover:text-[#0071e3] transition-colors text-sm font-normal">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center ml-8">
            <Link href="/auth">
              <button className="text-[#0071e3] text-sm font-normal hover:underline transition-colors">
                Log in
              </button>
            </Link>
            <Link href="/">
              <button 
                className="apple-button ml-6 text-sm"
                onClick={() => {
                  // Scroll to the form section
                  setTimeout(() => {
                    const mainContent = document.querySelector('.tab-contents');
                    if (mainContent) {
                      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 w-10 p-0 border-[#d2d2d7] bg-white rounded-full">
                <i className="fas fa-bars text-[#0071e3] text-sm"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border-[#d2d2d7] shadow-lg rounded-xl mt-2">
              <DropdownMenuItem className="cursor-pointer text-[#1d1d1f] hover:text-[#0071e3] hover:bg-[#f5f5f7] py-2.5 rounded-md">
                <Link href="/" className="w-full">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-[#1d1d1f] hover:text-[#0071e3] hover:bg-[#f5f5f7] py-2.5 rounded-md">
                <Link href="/about" className="w-full">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-[#1d1d1f] hover:text-[#0071e3] hover:bg-[#f5f5f7] py-2.5 rounded-md">
                <Link href="/features" className="w-full">Features</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-[#1d1d1f] hover:text-[#0071e3] hover:bg-[#f5f5f7] py-2.5 rounded-md">
                <Link href="/pricing" className="w-full">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-[#1d1d1f] hover:text-[#0071e3] hover:bg-[#f5f5f7] py-2.5 rounded-md">
                <Link href="/contact" className="w-full">Contact</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-[#1d1d1f] hover:text-[#0071e3] hover:bg-[#f5f5f7] py-2.5 rounded-md">
                <Link href="/auth" className="w-full">Log in</Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-[#1d1d1f] hover:text-[#0071e3] hover:bg-[#f5f5f7] py-2.5 rounded-md"
                onClick={() => {
                  // Scroll to the form section
                  setTimeout(() => {
                    const mainContent = document.querySelector('.tab-contents');
                    if (mainContent) {
                      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <div className="w-full">Get Started</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
