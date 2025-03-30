import { useState } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Register form schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Check if URL has tab=register query parameter
  const isRegisterTab = location.includes("?tab=register");
  const [authTab, setAuthTab] = useState<string>(isRegisterTab ? "register" : "login");
  
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onLoginSubmit = (data: LoginFormValues) => {
    // For now, just show a success message and redirect
    toast({
      title: "Login Successful",
      description: "Welcome back! (Authentication to be implemented)",
    });
    
    setTimeout(() => {
      setLocation("/");
    }, 1500);
  };
  
  const onRegisterSubmit = (data: RegisterFormValues) => {
    // For now, just show a success message and redirect
    toast({
      title: "Registration Successful",
      description: "Welcome to LifeMapAI! (Account creation to be implemented)",
    });
    
    setTimeout(() => {
      setLocation("/");
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-white rounded-md shadow-minimal border-minimal overflow-hidden max-w-5xl mx-auto">
            {/* Left column: Auth forms */}
            <div className="w-full md:w-1/2 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">
                  {authTab === "login" ? "Welcome Back" : "Join LifeMapAI"}
                </h2>
                <p className="text-gray-600">
                  {authTab === "login" 
                    ? "Sign in to access your personalized life and career roadmaps."
                    : "Create an account to start mapping your future today."}
                </p>
              </div>
              
              <Tabs defaultValue="login" value={authTab} onValueChange={setAuthTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="login">Log In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                      >
                        Log In
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="mt-4 text-center">
                    <button 
                      className="text-sm text-gray-600 hover:text-gray-800"
                      onClick={() => alert("Password recovery coming soon!")}
                    >
                      Forgot your password?
                    </button>
                  </div>
                </TabsContent>
                
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                      >
                        Sign Up
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600 text-sm">
                  By signing up, you agree to our{" "}
                  <button 
                    className="text-gray-800 hover:underline"
                    onClick={() => alert("Terms & Privacy Policy coming soon!")}
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button 
                    className="text-gray-800 hover:underline"
                    onClick={() => alert("Terms & Privacy Policy coming soon!")}
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>
            
            {/* Right column: Hero/info section */}
            <div className="w-full md:w-1/2 bg-gray-800 p-8 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6">Map Your Future with AI</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gray-700 p-2 rounded-md mr-4">
                    <i className="fas fa-chart-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Life Timeline Predictions</h4>
                    <p className="text-gray-300 text-sm">
                      See where your current habits and decisions might lead you in 5, 10, or 20 years.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-700 p-2 rounded-md mr-4">
                    <i className="fas fa-route text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Career Roadmaps</h4>
                    <p className="text-gray-300 text-sm">
                      Get step-by-step guidance on how to reach your dream career, no matter where you're starting from.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-700 p-2 rounded-md mr-4">
                    <i className="fas fa-lightbulb text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Personalized Insights</h4>
                    <p className="text-gray-300 text-sm">
                      Receive tailored recommendations for improving your health, finances, and career based on your goals.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <i className="fas fa-quote-left text-white"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 italic text-sm">
                      "LifeMapAI completely changed how I approached my career transition. The roadmap was spot on!"
                    </p>
                    <p className="text-white font-medium mt-2">- Amanda K., Software Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}