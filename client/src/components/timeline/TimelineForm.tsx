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

interface TimelineFormProps {
  onTimelineCreated: (timelineId: number) => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  personalInfo: z.object({
    age: z.string().min(1, "Age is required"),
    education: z.string().min(1, "Education level is required"),
    currentField: z.string().min(1, "Current field is required"),
  }),
  goals: z.object({
    careerGoals: z.string().min(1, "Career goals are required"),
    financialGoals: z.string().min(1, "Financial goals are required"),
    personalGoals: z.string().min(1, "Personal goals are required"),
  }),
  habits: z.object({
    learningHabits: z.string().min(1, "Learning habits are required"),
    healthHabits: z.string().min(1, "Health habits are required"),
    financialHabits: z.string().min(1, "Financial habits are required"),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function TimelineForm({ onTimelineCreated }: TimelineFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "My Life Timeline",
      personalInfo: {
        age: "",
        education: "",
        currentField: "",
      },
      goals: {
        careerGoals: "",
        financialGoals: "",
        personalGoals: "",
      },
      habits: {
        learningHabits: "",
        healthHabits: "",
        financialHabits: "",
      },
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/timeline", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Timeline generated successfully!",
        description: "Your life timeline has been created.",
      });
      onTimelineCreated(data.id);
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      console.error("Error generating timeline:", error);
      
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
              title: "Failed to generate timeline",
              description: "Please try again later.",
              variant: "destructive",
            });
          }
        }).catch(() => {
          toast({
            title: "Failed to generate timeline",
            description: "Please try again later.",
            variant: "destructive",
          });
        });
      } else {
        toast({
          title: "Failed to generate timeline",
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
        <h2 className="text-2xl font-bold mb-6">Design Your Future</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Info Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="bg-primary text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                  1
                </span>
                <span>Personal Information</span>
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="personalInfo.age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 25"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalInfo.education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Highest Education Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="associates">Associate's Degree</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="phd">Ph.D. or Doctorate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalInfo.currentField"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Field</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Software Engineering"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Goals Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="bg-primary text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                  2
                </span>
                <span>Life Goals</span>
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="goals.careerGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Career Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What do you want to achieve professionally?"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goals.financialGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financial Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Saving targets, income goals, etc."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goals.personalGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Family, hobbies, lifestyle, health, etc."
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

            {/* Habits Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="bg-primary text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                  3
                </span>
                <span>Current Habits</span>
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="habits.learningHabits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learning Habits</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How often do you learn new skills?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="rarely">Rarely</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="habits.healthHabits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Health Habits</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How would you rate your health habits?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="habits.financialHabits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financial Habits</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How would you rate your saving/spending habits?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent Saver</SelectItem>
                          <SelectItem value="good">Good Saver</SelectItem>
                          <SelectItem value="average">Balanced</SelectItem>
                          <SelectItem value="poor">Frequent Spender</SelectItem>
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
                className="w-full bg-primary hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                disabled={isSubmitting}
              >
                <i className="fas fa-magic mr-2"></i>
                {isSubmitting ? "Generating..." : "Generate My Life Timeline"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
