import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type SavedTab = "timelines" | "careers";

interface SavedMapsProps {
  onTimelineSelected: (timelineId: number) => void;
  onCareerSelected: (careerId: number) => void;
}

export default function SavedMaps({ onTimelineSelected, onCareerSelected }: SavedMapsProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SavedTab>("timelines");

  const { 
    data: timelines, 
    isLoading: timelinesLoading, 
    error: timelinesError 
  } = useQuery({
    queryKey: ["/api/timelines"],
    queryFn: async () => {
      const response = await fetch("/api/timelines");
      if (!response.ok) {
        throw new Error("Failed to fetch timelines");
      }
      return response.json();
    },
  });

  const { 
    data: careers, 
    isLoading: careersLoading, 
    error: careersError 
  } = useQuery({
    queryKey: ["/api/careers"],
    queryFn: async () => {
      const response = await fetch("/api/careers");
      if (!response.ok) {
        throw new Error("Failed to fetch careers");
      }
      return response.json();
    },
  });

  const handleTabClick = (tab: SavedTab) => {
    setActiveTab(tab);
  };

  const handleDeleteTimeline = async (id: number) => {
    try {
      await apiRequest("DELETE", `/api/timeline/${id}`);
      toast({
        title: "Timeline deleted",
        description: "Your timeline has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/timelines"] });
    } catch (error) {
      console.error("Error deleting timeline:", error);
      toast({
        title: "Failed to delete timeline",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCareer = async (id: number) => {
    try {
      await apiRequest("DELETE", `/api/career/${id}`);
      toast({
        title: "Career roadmap deleted",
        description: "Your career roadmap has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/careers"] });
    } catch (error) {
      console.error("Error deleting career roadmap:", error);
      toast({
        title: "Failed to delete career roadmap",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Your Saved Maps</h2>
        
        {/* Tabs for saved items */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "timelines"
                  ? "border-gray-800 text-gray-800"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
              onClick={() => handleTabClick("timelines")}
            >
              Life Timelines
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "careers"
                  ? "border-gray-800 text-gray-800"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
              onClick={() => handleTabClick("careers")}
            >
              Career Roadmaps
            </button>
          </nav>
        </div>
        
        {/* Saved Timelines */}
        {activeTab === "timelines" && (
          <div id="saved-timelines">
            {timelinesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="p-4">
                      <Skeleton className="h-16 w-full mb-4" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-16" />
                        <div>
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : timelinesError ? (
              <div className="text-center text-red-500">
                Error loading timelines. Please try again.
              </div>
            ) : timelines && timelines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timelines.map((timeline: any) => (
                  <div key={timeline.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">{timeline.title}</h3>
                        <span className="text-xs text-gray-500">Created {formatDate(timeline.createdAt)}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        {timeline.prediction.present.description.length > 100
                          ? timeline.prediction.present.description.substring(0, 100) + "..."
                          : timeline.prediction.present.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="ghost"
                          className="text-primary hover:text-indigo-700 text-sm font-medium"
                          onClick={() => onTimelineSelected(timeline.id)}
                        >
                          <i className="fas fa-eye mr-1"></i> View
                        </Button>
                        <div>
                          <Button
                            variant="ghost"
                            className="text-gray-500 hover:text-red-600 text-sm"
                            onClick={() => handleDeleteTimeline(timeline.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No timelines saved yet. Create your first life timeline!
              </div>
            )}
          </div>
        )}
        
        {/* Saved Career Roadmaps */}
        {activeTab === "careers" && (
          <div id="saved-careers">
            {careersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="p-4">
                      <Skeleton className="h-16 w-full mb-4" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-16" />
                        <div>
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : careersError ? (
              <div className="text-center text-red-500">
                Error loading career roadmaps. Please try again.
              </div>
            ) : careers && careers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {careers.map((career: any) => (
                  <div key={career.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">{career.title}</h3>
                        <span className="text-xs text-gray-500">Created {formatDate(career.createdAt)}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        {`Path to become a ${career.roadmap.targetPosition} in ${career.dreamJob.industry}.`}
                      </p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="ghost"
                          className="text-secondary hover:text-pink-600 text-sm font-medium"
                          onClick={() => onCareerSelected(career.id)}
                        >
                          <i className="fas fa-eye mr-1"></i> View
                        </Button>
                        <div>
                          <Button
                            variant="ghost"
                            className="text-gray-500 hover:text-red-600 text-sm"
                            onClick={() => handleDeleteCareer(career.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No career roadmaps saved yet. Create your first career roadmap!
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
