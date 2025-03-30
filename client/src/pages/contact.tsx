import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  inquiryType: z.string().min(1, { message: "Please select an inquiry type" }),
  message: z.string().min(20, { message: "Message must be at least 20 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Contact form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      inquiryType: "",
      message: "",
    },
  });
  
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We've received your inquiry and will respond shortly.",
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Have questions or feedback? We're here to help you on your journey.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Contact Form */}
                <div className="w-full md:w-2/3">
                  <div className="bg-white rounded-md shadow-minimal border-minimal p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="your.email@example.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="What is this regarding?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="inquiryType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Inquiry Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select inquiry type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="general">General Question</SelectItem>
                                  <SelectItem value="support">Technical Support</SelectItem>
                                  <SelectItem value="feedback">Feedback</SelectItem>
                                  <SelectItem value="billing">Billing Inquiry</SelectItem>
                                  <SelectItem value="partnership">Partnership</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="How can we help you?" 
                                  className="min-h-[150px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full md:w-auto bg-gray-800 hover:bg-gray-700 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="w-full md:w-1/3">
                  <div className="bg-white rounded-md shadow-minimal border-minimal p-8 mb-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Info</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                          <i className="fas fa-envelope text-gray-700"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">Email Us</h4>
                          <p className="text-gray-600">
                            <button 
                              className="hover:underline"
                              onClick={() => alert('Email functionality coming soon!')}
                            >
                              support@lifemapai.com
                            </button>
                          </p>
                          <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                          <i className="fas fa-phone-alt text-gray-700"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">Call Us</h4>
                          <p className="text-gray-600">
                            <button 
                              className="hover:underline"
                              onClick={() => alert('Phone functionality coming soon!')}
                            >
                              (555) 123-4567
                            </button>
                          </p>
                          <p className="text-gray-500 text-sm">Mon-Fri, 9AM-5PM EST</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                          <i className="fas fa-map-marker-alt text-gray-700"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">Visit Us</h4>
                          <p className="text-gray-600">123 Innovation Way</p>
                          <p className="text-gray-600">San Francisco, CA 94103</p>
                          <p className="text-gray-500 text-sm">By appointment only</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-md shadow-minimal border-minimal p-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Follow Us</h2>
                    
                    <div className="flex space-x-4">
                      <button 
                        className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-minimal"
                        onClick={() => alert('Twitter link coming soon!')}
                      >
                        <i className="fab fa-twitter text-gray-700"></i>
                      </button>
                      <button 
                        className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-minimal"
                        onClick={() => alert('LinkedIn link coming soon!')}
                      >
                        <i className="fab fa-linkedin-in text-gray-700"></i>
                      </button>
                      <button 
                        className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-minimal"
                        onClick={() => alert('Instagram link coming soon!')}
                      >
                        <i className="fab fa-instagram text-gray-700"></i>
                      </button>
                      <button 
                        className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-minimal"
                        onClick={() => alert('Facebook link coming soon!')}
                      >
                        <i className="fab fa-facebook-f text-gray-700"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Frequently Asked Questions</h2>
              
              <div className="bg-white rounded-md shadow-minimal border-minimal p-8 space-y-6">
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">How accurate are the predictions?</h3>
                  <p className="text-gray-600">
                    Our AI predictions are based on current research in behavior, career progression, and life outcomes. While they provide valuable guidance, the future ultimately depends on your actions and external factors. We focus on providing actionable insights rather than guaranteeing specific outcomes.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">Is my data secure?</h3>
                  <p className="text-gray-600">
                    Absolutely. We take data privacy very seriously. All your personal information and responses are encrypted and stored securely. We never share your data with third parties without your explicit consent. You can review our full privacy policy for more details.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">Can I cancel my subscription?</h3>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time with no cancellation fees. Your subscription will remain active until the end of your current billing period, after which it will automatically stop.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">How can I get technical support?</h3>
                  <p className="text-gray-600">
                    For technical issues, you can contact our support team via the contact form on this page, email us at support@lifemapai.com, or check our help center for guides and troubleshooting tips. Premium subscribers receive priority support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}