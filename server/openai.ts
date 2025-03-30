import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key" });

export interface TimelinePrediction {
  present: {
    age: string;
    description: string;
  };
  fiveYears: {
    age: string;
    description: string;
  };
  tenYears: {
    age: string;
    description: string;
  };
  twentyYears: {
    age: string;
    description: string;
  };
  insights: {
    career: string;
    financial: string;
    health: string;
  };
}

export interface CareerRoadmap {
  targetPosition: string;
  timeframe: string;
  stages: Array<{
    title: string;
    timeframe: string;
    description: string;
    skills: string[];
    isCurrent?: boolean;
    isTarget?: boolean;
  }>;
  recommendations: {
    education: Array<{ icon: string; text: string }>;
    experience: Array<{ icon: string; text: string }>;
    network: Array<{ icon: string; text: string }>;
  };
}

export async function generateLifeTimeline(
  personalInfo: any,
  goals: any,
  habits: any
): Promise<TimelinePrediction> {
  try {
    const userAge = parseInt(personalInfo.age);
    
    const prompt = `
    You are an expert life coach and career advisor with deep knowledge of how habits and goals shape future outcomes.
    
    Create a detailed future life timeline prediction based on the following information about a person:
    
    Personal Information:
    - Age: ${personalInfo.age}
    - Highest Education: ${personalInfo.education}
    - Current Field: ${personalInfo.currentField}
    
    Goals:
    - Career Goals: ${goals.careerGoals}
    - Financial Goals: ${goals.financialGoals}
    - Personal Goals: ${goals.personalGoals}
    
    Current Habits:
    - Learning Habits: ${habits.learningHabits}
    - Health Habits: ${habits.healthHabits}
    - Financial Habits: ${habits.financialHabits}
    
    Based on this information, predict their life situation at present, +5 years, +10 years, and +20 years.
    Also provide three specific insights about their career trajectory, financial outlook, and health/wellbeing.
    
    Format your response as a JSON object with the following structure:
    {
      "present": {
        "age": "current age",
        "description": "detailed description of current situation"
      },
      "fiveYears": {
        "age": "age in 5 years",
        "description": "detailed prediction for 5 years from now"
      },
      "tenYears": {
        "age": "age in 10 years",
        "description": "detailed prediction for 10 years from now"
      },
      "twentyYears": {
        "age": "age in 20 years",
        "description": "detailed prediction for 20 years from now"
      },
      "insights": {
        "career": "specific insight about career trajectory",
        "financial": "specific insight about financial outlook",
        "health": "specific insight about health and wellbeing"
      }
    }
    
    Make your predictions realistic, balanced, and based on typical outcomes for someone with these characteristics.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result as TimelinePrediction;
  } catch (error) {
    console.error("Error generating life timeline:", error);
    throw new Error("Failed to generate life timeline prediction");
  }
}

export async function generateCareerRoadmap(
  dreamJob: any,
  currentProfile: any,
  preferences: any
): Promise<CareerRoadmap> {
  try {
    const prompt = `
    You are an expert career advisor and professional development coach with deep knowledge of career progression paths.
    
    Create a detailed career roadmap to help someone reach their dream job based on the following information:
    
    Dream Job:
    - Job Title: ${dreamJob.jobTitle}
    - Industry: ${dreamJob.industry}
    - What Appeals About This Role: ${dreamJob.appeal}
    
    Current Profile:
    - Current Role: ${currentProfile.currentJob}
    - Top Skills: ${currentProfile.topSkills}
    - Years of Experience: ${currentProfile.yearsExperience}
    
    Preferences:
    - Timeline to Achieve Goal: ${preferences.timeline}
    - Preferred Learning Method: ${preferences.learningPreference}
    
    Based on this information, create a step-by-step career roadmap with the roles/positions they would need to progress through, skills to acquire at each stage, and specific recommendations.
    
    Format your response as a JSON object with the following structure:
    {
      "targetPosition": "the dream job title",
      "timeframe": "overall timeframe to reach goal",
      "stages": [
        {
          "title": "role/position title",
          "timeframe": "time to reach or spend in this position",
          "description": "detailed description of this career stage",
          "skills": ["skill 1", "skill 2", "skill 3", "skill 4"],
          "isCurrent": true/false,
          "isTarget": true/false
        },
        ...more stages...
      ],
      "recommendations": {
        "education": [
          {"icon": "graduation-cap", "text": "educational recommendation 1"},
          {"icon": "certificate", "text": "educational recommendation 2"},
          {"icon": "laptop-code", "text": "educational recommendation 3"}
        ],
        "experience": [
          {"icon": "project-diagram", "text": "experience recommendation 1"},
          {"icon": "users-cog", "text": "experience recommendation 2"},
          {"icon": "chart-line", "text": "experience recommendation 3"}
        ],
        "network": [
          {"icon": "handshake", "text": "networking recommendation 1"},
          {"icon": "user-friends", "text": "networking recommendation 2"},
          {"icon": "chalkboard-teacher", "text": "networking recommendation 3"}
        ]
      }
    }
    
    Make your roadmap realistic, balanced, and based on typical career progression paths in the given industry.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result as CareerRoadmap;
  } catch (error) {
    console.error("Error generating career roadmap:", error);
    throw new Error("Failed to generate career roadmap");
  }
}
