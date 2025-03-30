import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initScrollAnimations } from "./lib/animation";
import { initParallaxEffects, initScrollParallax } from "./lib/parallax";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Pricing from "@/pages/pricing";
import AuthPage from "@/pages/auth-page";
import Features from "@/pages/features";
import Contact from "@/pages/contact";
import Legal from "@/pages/legal";
import FAQ from "@/pages/faq";

function Router() {
  // Get current location for routing
  const [location] = useLocation();
  
  // Re-initialize animations when route changes
  useEffect(() => {
    // Small delay to ensure DOM is updated after route change
    const timer = setTimeout(() => {
      // Reinitialize all animation and parallax systems
      initScrollAnimations();
      initParallaxEffects();
      initScrollParallax();
      
      // Scroll to top on route change
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Main Navigation Links */}
      <Route path="/about" component={About} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/login" component={AuthPage} />
      <Route path="/signup" component={AuthPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/contact" component={Contact} />
      
      {/* Features pages */}
      <Route path="/features" component={Features} />
      <Route path="/features/life-timeline" component={Features} />
      <Route path="/features/career-roadmap" component={Features} />
      <Route path="/features/habit-analyzer" component={Features} />
      <Route path="/features/skill-planner" component={Features} />
      <Route path="/features/goal-setting" component={Features} />
      
      {/* Company pages */}
      <Route path="/team" component={About} />
      <Route path="/careers" component={About} /> 
      <Route path="/press" component={About} />
      
      {/* Support pages */}
      <Route path="/help" component={FAQ} />
      <Route path="/faq" component={FAQ} />
      
      {/* Legal pages */}
      <Route path="/legal" component={Legal} />
      <Route path="/privacy" component={Legal} />
      <Route path="/terms" component={Legal} />
      <Route path="/cookies" component={Legal} />
      
      {/* Misc Footer Links */}
      <Route path="/sitemap" component={NotFound} />
      <Route path="/accessibility" component={NotFound} />
      
      {/* Catch All Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize animations and effects when app loads
  useEffect(() => {
    // Initialize main animation systems
    initScrollAnimations();
    initParallaxEffects();
    initScrollParallax();
    
    // Add a class to body for animation readiness
    document.body.classList.add('animation-ready');
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
