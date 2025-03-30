import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Import images
import heroPattern from "../assets/hero-pattern.svg";
import timelineFeature from "../assets/timeline-feature.svg";
import careerFeature from "../assets/career-feature.svg";
import skillsFeature from "../assets/skills-feature.svg";
import aboutImage from "../assets/about-image.svg";

export default function Features() {
  const [location] = useLocation();
  const featureType = location.split('/').pop();
  
  // Scroll to relevant section based on the URL
  useEffect(() => {
    if (featureType && featureType !== "features") {
      setTimeout(() => {
        const element = document.getElementById(featureType);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [featureType]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative border-b border-gray-200 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={heroPattern} alt="Background Pattern" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-16 md:py-20">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                  Our <span className="text-gradient">Features</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Explore the powerful tools that make LifeMapAI the ultimate platform for planning your future
                </p>
                <div className="flex justify-center gap-8 mt-12">
                  <img src={timelineFeature} alt="Timeline Feature" className="w-24 h-24" />
                  <img src={careerFeature} alt="Career Feature" className="w-24 h-24" />
                  <img src={skillsFeature} alt="Skills Feature" className="w-24 h-24" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Life Timeline Section */}
        <section id="life-timeline" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Life Timeline Predictions</h2>
                  <p className="text-gray-600 mb-6">
                    Our AI-powered Life Timeline feature analyzes your current habits, goals, and decisions to predict where you might be in 5, 10, and 20 years from now.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-chart-line text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Realistic Projections</h4>
                        <p className="text-gray-600 text-sm">
                          Get scientifically-based predictions based on research in habit formation, career progression, and lifestyle outcomes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-lightbulb text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Actionable Insights</h4>
                        <p className="text-gray-600 text-sm">
                          Receive personalized recommendations on how to adjust your current habits to achieve your desired future outcomes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-sync-alt text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Multiple Scenarios</h4>
                        <p className="text-gray-600 text-sm">
                          Compare different possible futures based on alternative life choices to make better decisions today.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/">
                    <Button className="bg-gray-800 hover:bg-gray-700 text-white shadow-minimal hover:shadow-minimal-hover">
                      Try Life Timeline
                    </Button>
                  </Link>
                </div>
                
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="bg-gray-100 rounded-md p-8 shadow-minimal">
                    <div className="space-y-6">
                      <div className="bg-white p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">Present</h5>
                          <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-full">Age: 28</span>
                        </div>
                        <p className="text-gray-600 text-sm">Working as a marketing associate at a mid-sized company. Living in a rented apartment. Starting to build savings.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">5 Years</h5>
                          <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-full">Age: 33</span>
                        </div>
                        <p className="text-gray-600 text-sm">Promoted to marketing manager. Purchased first home. Started investment portfolio. Considering starting a family.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">10 Years</h5>
                          <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-full">Age: 38</span>
                        </div>
                        <p className="text-gray-600 text-sm">Director of Marketing. Expanded investment portfolio. Child in elementary school. Considering career pivot to consultancy.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">20 Years</h5>
                          <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded-full">Age: 48</span>
                        </div>
                        <p className="text-gray-600 text-sm">Established marketing consultancy. Significant retirement savings. Child in college. Planning early retirement strategy.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Career Roadmap Section */}
        <section id="career-roadmap" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-md p-8 shadow-minimal">
                    <h4 className="font-bold text-gray-800 mb-6 text-center">Roadmap to: <span className="text-gradient">Product Management Director</span></h4>
                    
                    <div className="relative">
                      <div className="absolute top-0 bottom-0 left-6 w-1 bg-gray-200"></div>
                      
                      <div className="relative z-10 mb-8">
                        <div className="flex items-center">
                          <div className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-minimal font-bold">
                            Now
                          </div>
                          <div className="ml-6">
                            <h5 className="font-bold text-gray-800">Junior Product Manager</h5>
                            <p className="text-gray-600 text-sm">1-2 years</p>
                          </div>
                        </div>
                        <div className="ml-12 mt-2">
                          <div className="bg-gray-50 p-3 rounded-md shadow-minimal">
                            <p className="text-gray-600 text-sm mb-2">Learn product development processes and basic analytics.</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Agile</span>
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">User Stories</span>
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Basic Data Analysis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative z-10 mb-8">
                        <div className="flex items-center">
                          <div className="bg-gray-200 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-minimal font-bold">
                            +2
                          </div>
                          <div className="ml-6">
                            <h5 className="font-bold text-gray-800">Product Manager</h5>
                            <p className="text-gray-600 text-sm">2-3 years</p>
                          </div>
                        </div>
                        <div className="ml-12 mt-2">
                          <div className="bg-gray-50 p-3 rounded-md shadow-minimal">
                            <p className="text-gray-600 text-sm mb-2">Lead product features and coordinate with multiple teams.</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Stakeholder Management</span>
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Product Strategy</span>
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Technical Communication</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative z-10 mb-8">
                        <div className="flex items-center">
                          <div className="bg-gray-200 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-minimal font-bold">
                            +4
                          </div>
                          <div className="ml-6">
                            <h5 className="font-bold text-gray-800">Senior Product Manager</h5>
                            <p className="text-gray-600 text-sm">3-4 years</p>
                          </div>
                        </div>
                        <div className="ml-12 mt-2">
                          <div className="bg-gray-50 p-3 rounded-md shadow-minimal">
                            <p className="text-gray-600 text-sm mb-2">Define product vision and manage complex product lines.</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Product Vision</span>
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Strategic Planning</span>
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Business Impact Analysis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg font-bold">
                            +7
                          </div>
                          <div className="ml-6">
                            <h5 className="font-bold text-gray-800">Product Management Director</h5>
                            <p className="text-gradient font-medium">Goal Position</p>
                          </div>
                        </div>
                        <div className="ml-12 mt-2">
                          <div className="bg-gray-50 p-3 rounded-md shadow-minimal border border-blue-100">
                            <p className="text-gray-600 text-sm mb-2">Lead product organization and set company-wide strategy.</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Executive Leadership</span>
                              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Cross-functional Strategy</span>
                              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Product Organization</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Career Roadmap Planning</h2>
                  <p className="text-gray-600 mb-6">
                    Our Career Roadmap feature creates personalized, step-by-step guides to help you reach your dream job, no matter where you're starting from.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-map-marked-alt text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Custom Career Paths</h4>
                        <p className="text-gray-600 text-sm">
                          Specify your target role, and we'll generate a customized roadmap with specific milestones and timeframes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-brain text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Skill Development Plans</h4>
                        <p className="text-gray-600 text-sm">
                          Get detailed skill recommendations for each career stage, including technical, soft, and industry-specific skills.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-graduation-cap text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Education & Resource Guidance</h4>
                        <p className="text-gray-600 text-sm">
                          Receive recommendations for courses, certifications, and resources to help you advance to each new level.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/">
                    <Button className="bg-gray-800 hover:bg-gray-700 text-white shadow-minimal hover:shadow-minimal-hover">
                      Map Your Career
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Habit Analyzer Section */}
        <section id="habit-analyzer" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Habit Analysis & Tracking</h2>
                  <p className="text-gray-600 mb-6">
                    Our Habit Analyzer uses behavioral science to identify which daily habits have the biggest impact on your long-term goals.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-analytics text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Impact Assessment</h4>
                        <p className="text-gray-600 text-sm">
                          Understand which habits have the biggest influence on your health, wealth, and career trajectories.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-calendar-check text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Habit Formation Support</h4>
                        <p className="text-gray-600 text-sm">
                          Get personalized strategies for building positive habits and breaking negative ones, based on proven science.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-chart-pie text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Progress Visualization</h4>
                        <p className="text-gray-600 text-sm">
                          Track your consistency with intuitive charts and see how your habits influence your projected future timeline.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-gray-800 hover:bg-gray-700 text-white shadow-minimal hover:shadow-minimal-hover"
                    onClick={() => alert('Habit Analyzer coming soon!')}>
                    Coming Soon
                  </Button>
                </div>
                
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="bg-white rounded-md p-6 shadow-minimal border-minimal">
                    <h4 className="font-bold text-gray-800 mb-4 text-center">Habit Impact Analysis</h4>
                    
                    <div className="space-y-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">Morning Routine</h5>
                          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">High Impact</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-gray-600 text-sm">Your consistent morning routine provides structure and enhances productivity throughout the day.</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">Skill Learning</h5>
                          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">High Impact</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <p className="text-gray-600 text-sm">Your dedication to learning new skills positively impacts your career trajectory and earning potential.</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">Exercise Habit</h5>
                          <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Medium Impact</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <p className="text-gray-600 text-sm">Your inconsistent exercise routine may lead to health challenges that could impact long-term career growth.</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">Late Night Screen Time</h5>
                          <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">Negative Impact</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-gray-600 text-sm">Your evening screen time is affecting sleep quality, which impacts cognitive performance and stress levels.</p>
                      </div>
                    </div>
                    
                    <div className="text-center text-gray-600 text-sm">
                      <p><span className="font-medium">Recommendation:</span> Reduce screen time by 30 minutes and replace with reading to improve sleep quality.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Skill Planner Section */}
        <section id="skill-planner" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-md p-8 shadow-minimal border-minimal">
                    <h4 className="font-bold text-gray-800 mb-4 text-center">Skill Development Plan</h4>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">Data Analysis</h5>
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">High Priority</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Gain proficiency in analyzing data to drive business decisions.</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">SQL</span>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Excel Advanced</span>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Tableau</span>
                        </div>
                        <div className="text-xs text-gray-500">Estimated completion: 3 months</div>
                      </div>
                      
                      <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">Project Management</h5>
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">High Priority</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Develop skills to lead cross-functional projects effectively.</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Agile Methodology</span>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Scrum</span>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Jira</span>
                        </div>
                        <div className="text-xs text-gray-500">Estimated completion: 4 months</div>
                      </div>
                      
                      <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">Leadership</h5>
                          <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Medium Priority</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Build capabilities to influence and lead teams without authority.</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Delegation</span>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Coaching</span>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Conflict Resolution</span>
                        </div>
                        <div className="text-xs text-gray-500">Estimated completion: 6 months</div>
                      </div>
                      
                      <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-md shadow-minimal">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800">Strategic Thinking</h5>
                          <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Future Focus</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Develop strategic mindset for higher level roles.</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Business Acumen</span>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Industry Analysis</span>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">Competitive Strategy</span>
                        </div>
                        <div className="text-xs text-gray-500">Target timeframe: Next year</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Skill Planning</h2>
                  <p className="text-gray-600 mb-6">
                    Our Skill Planner creates personalized learning roadmaps based on your career goals, current skills, and industry trends.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-puzzle-piece text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Gap Analysis</h4>
                        <p className="text-gray-600 text-sm">
                          Identify the specific skills you need to develop to reach your next career milestone or transition to a new field.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-chart-bar text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Industry Trends</h4>
                        <p className="text-gray-600 text-sm">
                          Stay ahead with skill recommendations based on real-time industry trends and emerging technologies in your field.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-tasks text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Learning Pathways</h4>
                        <p className="text-gray-600 text-sm">
                          Get structured learning plans with recommended courses, books, and resources for each skill you need to develop.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-gray-800 hover:bg-gray-700 text-white shadow-minimal hover:shadow-minimal-hover"
                    onClick={() => alert('Skill Planner coming soon!')}>
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Goal Setting Section */}
        <section id="goal-setting" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Smart Goal Setting</h2>
                  <p className="text-gray-600 mb-6">
                    Our Goal Setting system uses AI to help you create achievable, meaningful goals aligned with your long-term vision.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-bullseye text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">SMART Framework</h4>
                        <p className="text-gray-600 text-sm">
                          Create specific, measurable, achievable, relevant, and time-bound goals with intelligent guidance.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-balance-scale text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Life Balance</h4>
                        <p className="text-gray-600 text-sm">
                          Set harmonious goals across career, financial, health, relationships, and personal growth domains.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-4 shadow-minimal">
                        <i className="fas fa-trophy text-gray-700"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Progress Tracking</h4>
                        <p className="text-gray-600 text-sm">
                          Monitor your progress with visual dashboards and receive adaptive recommendations as you advance.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-gray-800 hover:bg-gray-700 text-white shadow-minimal hover:shadow-minimal-hover"
                    onClick={() => alert('Goal Setting feature coming soon!')}>
                    Coming Soon
                  </Button>
                </div>
                
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="bg-white rounded-md p-8 shadow-minimal border-minimal">
                    <h4 className="font-bold text-gray-800 mb-6 text-center">2023 Goals Dashboard</h4>
                    
                    <div className="space-y-5">
                      <div>
                        <h5 className="font-bold text-gray-800 mb-2">Career Goals</h5>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Complete Product Management Certification</span>
                              <span className="text-sm font-medium text-gray-700">75%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Lead Two Major Product Initiatives</span>
                              <span className="text-sm font-medium text-gray-700">50%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-bold text-gray-800 mb-2">Financial Goals</h5>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Build Emergency Fund (6 Months)</span>
                              <span className="text-sm font-medium text-gray-700">90%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Increase Retirement Contributions</span>
                              <span className="text-sm font-medium text-gray-700">100%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-bold text-gray-800 mb-2">Health Goals</h5>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Exercise 3x Per Week</span>
                              <span className="text-sm font-medium text-gray-700">60%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Improve Sleep Schedule</span>
                              <span className="text-sm font-medium text-gray-700">30%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-bold text-gray-800 mb-2">Personal Growth</h5>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Read 20 Books</span>
                              <span className="text-sm font-medium text-gray-700">45%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Learn Basic Spanish</span>
                              <span className="text-sm font-medium text-gray-700">25%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-16 bg-gray-800 text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src={heroPattern} alt="Background Pattern" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <img src={aboutImage} alt="About LifeMapAI" className="w-40 h-40 mx-auto mb-8" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Map Your Future?</h2>
              <p className="text-gray-300 mb-8">
                Start planning your life and career journey with our powerful AI tools. Your first timeline is free!
              </p>
              
              <Link href="/">
                <Button className="bg-white text-gray-800 hover:bg-gray-100 shadow-minimal hover:shadow-minimal-hover">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}