import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface CareerFormProps {
  onCareerCreated: (careerId: number) => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dreamJob: z.object({
    jobTitle: z.string().min(1, "Dream job title is required"),
    industry: z.string().min(1, "Industry is required"),
    appeal: z.string().min(1, "Job appeal is required"),
  }),
  currentProfile: z.object({
    currentJob: z.string().min(1, "Current job is required"),
    topSkills: z.string().min(1, "Top skills are required"),
    yearsExperience: z.string().min(1, "Years of experience is required"),
  }),
  preferences: z.object({
    timeline: z.string().min(1, "Timeline is required"),
    learningPreference: z.string().min(1, "Learning preference is required"),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CareerForm({ onCareerCreated }: CareerFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "My Career Roadmap",
      dreamJob: {
        jobTitle: "",
        industry: "",
        appeal: "",
      },
      currentProfile: {
        currentJob: "",
        topSkills: "",
        yearsExperience: "",
      },
      preferences: {
        timeline: "",
        learningPreference: "",
      },
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/career", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Career roadmap generated successfully!",
        description: "Your career path has been created.",
      });
      onCareerCreated(data.id);
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      console.error("Error generating career roadmap:", error);
      
      // Check if this is an API key error
      if (error.response && error.response.json) {
        error.response.json().then((data: any) => {
          if (data && data.missingApiKey) {
            toast({
              title: "API Key Missing",
              description: "The application requires a Google API key to function. Please check the server configuration.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Failed to generate career roadmap",
              description: "Please try again later.",
              variant: "destructive",
            });
          }
        }).catch(() => {
          toast({
            title: "Failed to generate career roadmap",
            description: "Please try again later.",
            variant: "destructive",
          });
        });
      } else {
        toast({
          title: "Failed to generate career roadmap",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Reverse Career Search</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Dream Job Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="bg-secondary text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                  1
                </span>
                <span>Dream Job Details</span>
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="dreamJob.jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dream Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Chief Technology Officer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dreamJob.industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dreamJob.appeal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What appeals to you about this role?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what attracts you to this position"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Current Profile Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="bg-secondary text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                  2
                </span>
                <span>Your Current Profile</span>
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentProfile.currentJob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Role/Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Junior Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentProfile.topSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Top Skills (up to 5)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., JavaScript, Project Management, Communication"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentProfile.yearsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Preferences Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="bg-secondary text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                  3
                </span>
                <span>Preferences</span>
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="preferences.timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeline to Achieve Goal</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferences.learningPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Learning Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select learning preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="formal">Formal Education (Degree/Certification)</SelectItem>
                          <SelectItem value="self">Self-Directed Learning</SelectItem>
                          <SelectItem value="mentorship">Mentorship & Experience</SelectItem>
                          <SelectItem value="mixed">Mixed Approach</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                disabled={isSubmitting}
              >
                <i className="fas fa-map-marked-alt mr-2"></i>
                {isSubmitting ? "Generating..." : "Generate Career Roadmap"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
