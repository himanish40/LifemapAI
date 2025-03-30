import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Legal() {
  const [location] = useLocation();
  const defaultTab = location.includes("privacy") ? "privacy" : 
                    location.includes("terms") ? "terms" : 
                    location.includes("cookies") ? "cookies" : "privacy";
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Legal Information
              </h1>
              <p className="text-gray-600">
                Our policies on privacy, terms of service, and data usage
              </p>
            </div>
          </div>
        </section>

        {/* Legal Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                  <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                  <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
                </TabsList>
                
                {/* Privacy Policy */}
                <TabsContent value="privacy">
                  <div className="bg-white rounded-md shadow-minimal border-minimal p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Privacy Policy</h2>
                    
                    <div className="prose max-w-none text-gray-600">
                      <p className="font-medium text-gray-800">Last Updated: March 2023</p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">1. Introduction</h3>
                      <p>
                        At LifeMapAI ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">2. Information We Collect</h3>
                      <p>We collect the following types of information:</p>
                      <ul className="list-disc ml-6 mt-2 mb-4">
                        <li>Personal Information: Name, email address, and demographic information you provide.</li>
                        <li>Career Information: Current job, skills, education, and career goals.</li>
                        <li>Lifestyle Data: Information about your habits, goals, and life circumstances that you share.</li>
                        <li>Usage Data: Information about how you use our website and services.</li>
                        <li>Technical Data: IP address, browser type, device information, and cookies.</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">3. How We Use Your Information</h3>
                      <p>We use your information to:</p>
                      <ul className="list-disc ml-6 mt-2 mb-4">
                        <li>Provide our services, including generating personalized timelines and career roadmaps.</li>
                        <li>Improve and develop our services based on user feedback and usage patterns.</li>
                        <li>Communicate with you about your account, updates to our services, and promotional offers.</li>
                        <li>Ensure the security and proper functioning of our platform.</li>
                        <li>Comply with legal obligations and enforce our terms.</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">4. Data Sharing and Disclosure</h3>
                      <p>We may share your information with:</p>
                      <ul className="list-disc ml-6 mt-2 mb-4">
                        <li>Service Providers: Companies that help us deliver our services (e.g., hosting, analytics).</li>
                        <li>Business Partners: With your consent, we may share data with partners who offer complementary services.</li>
                        <li>Legal Requirements: When required by law or to protect our rights.</li>
                      </ul>
                      <p>We do not sell your personal information to third parties.</p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">5. Data Security</h3>
                      <p>
                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">6. Your Rights</h3>
                      <p>Depending on your location, you may have the following rights:</p>
                      <ul className="list-disc ml-6 mt-2 mb-4">
                        <li>Access: Request access to your personal data.</li>
                        <li>Correction: Request correction of inaccurate data.</li>
                        <li>Deletion: Request deletion of your data under certain circumstances.</li>
                        <li>Restriction: Request restriction of processing of your data.</li>
                        <li>Data Portability: Request the transfer of your data to you or a third party.</li>
                        <li>Objection: Object to processing of your personal data.</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">7. Contact Us</h3>
                      <p>
                        If you have questions about this Privacy Policy or our data practices, please contact us at privacy@lifemapai.com.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Terms of Service */}
                <TabsContent value="terms">
                  <div className="bg-white rounded-md shadow-minimal border-minimal p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Terms of Service</h2>
                    
                    <div className="prose max-w-none text-gray-600">
                      <p className="font-medium text-gray-800">Last Updated: March 2023</p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">1. Acceptance of Terms</h3>
                      <p>
                        By accessing or using the LifeMapAI website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">2. Services Description</h3>
                      <p>
                        LifeMapAI provides AI-powered life planning tools, including future timeline predictions and career roadmap planning. Our services use artificial intelligence to analyze the information you provide and generate personalized recommendations and projections.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">3. Account Registration</h3>
                      <p>
                        To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating an account and to update your information as needed.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">4. User Responsibilities</h3>
                      <p>You agree to use our services in compliance with these terms and applicable laws. You agree not to:</p>
                      <ul className="list-disc ml-6 mt-2 mb-4">
                        <li>Use our services for illegal purposes.</li>
                        <li>Attempt to gain unauthorized access to any part of our services.</li>
                        <li>Interfere with or disrupt the operation of our services.</li>
                        <li>Impersonate any person or entity or misrepresent your affiliation.</li>
                        <li>Use our services to transmit harmful code or material.</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">5. Intellectual Property</h3>
                      <p>
                        All content, features, and functionality of our services, including text, graphics, logos, and software, are owned by LifeMapAI or our licensors and are protected by copyright, trademark, and other intellectual property laws.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">6. Subscription and Payments</h3>
                      <p>
                        Some features of our services require a paid subscription. By subscribing, you agree to pay the fees as described at the time of purchase. Subscription fees are non-refundable except as required by law or as expressly stated in these terms.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">7. Disclaimer of Warranties</h3>
                      <p>
                        Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free. The projections and recommendations provided by our AI tools are based on the information you provide and available research, but we do not guarantee their accuracy or reliability.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">8. Limitation of Liability</h3>
                      <p>
                        To the maximum extent permitted by law, LifeMapAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">9. Termination</h3>
                      <p>
                        We may terminate or suspend your access to our services at any time, without prior notice or liability, for any reason, including if you breach these Terms of Service.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">10. Changes to Terms</h3>
                      <p>
                        We may update these Terms of Service from time to time. We will notify you of any material changes by posting the new terms on our website or by email. Your continued use of our services after such changes constitutes your acceptance of the new terms.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">11. Contact Us</h3>
                      <p>
                        If you have questions about these Terms of Service, please contact us at legal@lifemapai.com.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Cookie Policy */}
                <TabsContent value="cookies">
                  <div className="bg-white rounded-md shadow-minimal border-minimal p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Cookie Policy</h2>
                    
                    <div className="prose max-w-none text-gray-600">
                      <p className="font-medium text-gray-800">Last Updated: March 2023</p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">1. What Are Cookies</h3>
                      <p>
                        Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">2. How We Use Cookies</h3>
                      <p>We use cookies for the following purposes:</p>
                      <ul className="list-disc ml-6 mt-2 mb-4">
                        <li>Essential Cookies: These are necessary for the website to function properly.</li>
                        <li>Preference Cookies: These remember your preferences and settings.</li>
                        <li>Analytics Cookies: These help us understand how visitors interact with our website.</li>
                        <li>Marketing Cookies: These track your online activity to help deliver relevant advertisements.</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">3. Types of Cookies We Use</h3>
                      <p>We use both session and persistent cookies:</p>
                      <ul className="list-disc ml-6 mt-2 mb-4">
                        <li>Session Cookies: These are temporary and are deleted when you close your browser.</li>
                        <li>Persistent Cookies: These remain on your device until they expire or you delete them.</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">4. Third-Party Cookies</h3>
                      <p>
                        We also use cookies from third parties, such as Google Analytics, to help us analyze how our website is used and to provide marketing services. These third parties may use cookies for their own purposes, including to collect information about your online activities over time and across different websites.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">5. Managing Cookies</h3>
                      <p>
                        Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. You can also delete cookies that have already been set.
                      </p>
                      <p>
                        Please note that disabling certain cookies may affect the functionality of our website and limit your ability to use certain features.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">6. Cookie Consent</h3>
                      <p>
                        When you first visit our website, you will be asked to consent to our use of cookies. You can change your cookie preferences at any time by accessing the cookie settings in your browser.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">7. Changes to Our Cookie Policy</h3>
                      <p>
                        We may update our Cookie Policy from time to time. Any changes will be posted on this page, and if the changes are significant, we will provide a more prominent notice.
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">8. Contact Us</h3>
                      <p>
                        If you have questions about our Cookie Policy, please contact us at privacy@lifemapai.com.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}