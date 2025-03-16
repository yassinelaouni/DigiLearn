
export interface CourseProps {
  id: string;
  title: string;
  slug: string;
  category: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  duration: string;
  level: string;
  students: number;
  featured?: boolean;
  description: string;
  learningOutcomes: string[];
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz" | "project";
}
