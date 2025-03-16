
// Course data models and interfaces for the application

// Export as plain JavaScript objects without TypeScript type annotations
export const CoursePropsSample = {
  id: '',
  title: '',
  slug: '',
  category: '',
  instructor: '',
  instructorAvatar: '',
  thumbnail: '',
  rating: 0,
  reviewCount: 0,
  duration: '',
  level: '',
  students: 0,
  featured: false,
  description: '',
  learningOutcomes: [],
  modules: []
};

export const CourseModuleSample = {
  id: '',
  title: '',
  description: '',
  lessons: []
};

export const CourseLessonSample = {
  id: '',
  title: '',
  duration: '',
  type: '' // "video" | "quiz" | "project"
};

// These are not used as types anymore, just as reference
