import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  const [location] = useLocation();
  
  // Get the path that was attempted
  const path = location.substring(1); // Remove the leading slash
  const formattedPath = path.charAt(0).toUpperCase() + path.slice(1).replace(/[-\/]/g, ' ');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white border-minimal shadow-minimal rounded-md p-8 text-center max-w-lg">
          <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center mx-auto mb-6 shadow-minimal">
            <i className="fas fa-exclamation-triangle text-gray-500 text-2xl"></i>
          </div>
          
          <h1 className="text-5xl font-bold mb-3 text-gray-800">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">Page not found</h2>
          
          <p className="text-gray-600 mb-4">
            The <span className="font-medium">{formattedPath || 'page'}</span> you're looking for is currently under development or doesn't exist.
          </p>
          
          <p className="text-gray-500 text-sm mb-6">
            We're constantly improving our website and adding new features. Please check back later!
          </p>
          
          <Link href="/">
            <Button className="bg-gray-800 hover:bg-gray-700 text-white shadow-minimal hover:shadow-minimal-hover">
              <i className="fas fa-home mr-2"></i> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
