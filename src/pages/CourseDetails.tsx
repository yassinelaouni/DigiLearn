
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { 
  ArrowLeft, 
  Clock, 
  BarChart, 
  Users, 
  GraduationCap,
  CheckCircle2,
  Play,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { CourseProps, CourseModule, CourseLesson } from "@/types/course";

// Mock course data
const courseData: Record<string, CourseProps> = {
  "modern-web-development": {
    id: "1",
    title: "Modern Web Development with React & Node.js",
    slug: "modern-web-development",
    category: "Web Development",
    instructor: "Dr. Sarah Johnson",
    instructorAvatar: "https://i.pravatar.cc/150?img=32",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 342,
    duration: "10 weeks",
    level: "Intermediate",
    students: 2845,
    description: "Master the most in-demand web development technologies using React for front-end and Node.js for back-end development. This comprehensive course will teach you how to build modern, responsive, and scalable web applications from scratch.",
    learningOutcomes: [
      "Build full-stack web applications using React and Node.js",
      "Implement responsive UI designs with modern CSS techniques",
      "Create RESTful APIs and integrate them with front-end applications",
      "Understand and implement authentication and authorization",
      "Deploy applications to cloud platforms",
      "Use modern development workflows and tools"
    ],
    modules: [
      {
        id: "m1",
        title: "Getting Started with Modern Web Development",
        description: "Introduction to the course, setup, and web development fundamentals",
        lessons: [
          { id: "l1", title: "Course Introduction", duration: "15 min", type: "video" },
          { id: "l2", title: "Setting Up Your Development Environment", duration: "25 min", type: "video" },
          { id: "l3", title: "Web Development Overview", duration: "20 min", type: "video" },
          { id: "l4", title: "Introduction to HTML, CSS, and JavaScript", duration: "35 min", type: "video" },
          { id: "l5", title: "Module Quiz", duration: "15 min", type: "quiz" }
        ]
      },
      {
        id: "m2",
        title: "React Fundamentals",
        description: "Learn the core concepts of React and build your first components",
        lessons: [
          { id: "l6", title: "Introduction to React", duration: "30 min", type: "video" },
          { id: "l7", title: "Components and Props", duration: "40 min", type: "video" },
          { id: "l8", title: "State and Lifecycle", duration: "45 min", type: "video" },
          { id: "l9", title: "Handling Events and Forms", duration: "35 min", type: "video" },
          { id: "l10", title: "Building a Mini-Project", duration: "60 min", type: "project" },
          { id: "l11", title: "Module Quiz", duration: "20 min", type: "quiz" }
        ]
      },
      {
        id: "m3",
        title: "Node.js and Express",
        description: "Build server-side applications with Node.js and Express",
        lessons: [
          { id: "l12", title: "Introduction to Node.js", duration: "30 min", type: "video" },
          { id: "l13", title: "Express.js Fundamentals", duration: "40 min", type: "video" },
          { id: "l14", title: "Building RESTful APIs", duration: "50 min", type: "video" },
          { id: "l15", title: "Database Integration", duration: "45 min", type: "video" },
          { id: "l16", title: "Server-Side Project", duration: "60 min", type: "project" },
          { id: "l17", title: "Module Quiz", duration: "20 min", type: "quiz" }
        ]
      },
      {
        id: "m4",
        title: "Full-Stack Integration",
        description: "Connect your React front-end with your Node.js back-end",
        lessons: [
          { id: "l18", title: "API Integration with React", duration: "40 min", type: "video" },
          { id: "l19", title: "Authentication and Authorization", duration: "50 min", type: "video" },
          { id: "l20", title: "State Management with Redux", duration: "60 min", type: "video" },
          { id: "l21", title: "Testing and Debugging", duration: "45 min", type: "video" },
          { id: "l22", title: "Full-Stack Project", duration: "90 min", type: "project" },
          { id: "l23", title: "Final Quiz", duration: "30 min", type: "quiz" }
        ]
      }
    ]
  },
  "digital-marketing-strategies": {
    id: "2",
    title: "Digital Marketing Strategies for Success",
    slug: "digital-marketing-strategies",
    category: "Digital Marketing",
    instructor: "Prof. Michael Chen",
    instructorAvatar: "https://i.pravatar.cc/150?img=12",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 218,
    duration: "8 weeks",
    level: "Beginner to Intermediate",
    students: 1932,
    description: "Learn how to create and implement effective digital marketing strategies across various platforms. This course covers social media marketing, content marketing, SEO, email marketing, and analytics to help you drive engagement and conversions.",
    learningOutcomes: [
      "Create comprehensive digital marketing strategies",
      "Build and manage effective social media campaigns",
      "Optimize websites and content for search engines",
      "Develop engaging content marketing materials",
      "Create and analyze email marketing campaigns",
      "Measure and report on marketing performance using analytics tools"
    ],
    modules: [
      {
        id: "m1",
        title: "Digital Marketing Fundamentals",
        description: "Introduction to digital marketing concepts and channels",
        lessons: [
          { id: "l1", title: "Introduction to Digital Marketing", duration: "25 min", type: "video" },
          { id: "l2", title: "Understanding Your Target Audience", duration: "30 min", type: "video" },
          { id: "l3", title: "Digital Marketing Channels Overview", duration: "35 min", type: "video" },
          { id: "l4", title: "Building Your Marketing Strategy", duration: "40 min", type: "video" },
          { id: "l5", title: "Module Assignment", duration: "30 min", type: "project" }
        ]
      },
      {
        id: "m2",
        title: "Social Media Marketing",
        description: "Learn to create engaging social media marketing campaigns",
        lessons: [
          { id: "l6", title: "Social Media Platform Deep Dive", duration: "45 min", type: "video" },
          { id: "l7", title: "Content Creation for Social Media", duration: "40 min", type: "video" },
          { id: "l8", title: "Community Management", duration: "30 min", type: "video" },
          { id: "l9", title: "Social Media Advertising", duration: "50 min", type: "video" },
          { id: "l10", title: "Social Campaign Project", duration: "60 min", type: "project" }
        ]
      }
    ]
  },
  "ux-ui-design-principles": {
    id: "4",
    title: "UX/UI Design Principles & Prototyping",
    slug: "ux-ui-design-principles",
    category: "UX/UI Design",
    instructor: "Prof. David Wilson",
    instructorAvatar: "https://i.pravatar.cc/150?img=15",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewCount: 198,
    duration: "9 weeks",
    level: "All Levels",
    students: 1756,
    description: "Discover the principles of effective user experience and interface design. Learn to create intuitive, aesthetically pleasing digital products that users love. This course covers design thinking, wireframing, prototyping, and usability testing.",
    learningOutcomes: [
      "Apply UX/UI design principles to create user-centered designs",
      "Conduct effective user research and usability testing",
      "Create wireframes and prototypes using industry-standard tools",
      "Design responsive interfaces for multiple devices",
      "Understand visual design principles for digital products",
      "Present and communicate design decisions effectively"
    ],
    modules: [
      {
        id: "m1",
        title: "Introduction to UX/UI Design",
        description: "Understand the foundations of user experience and interface design",
        lessons: [
          { id: "l1", title: "UX vs UI: Understanding the Difference", duration: "20 min", type: "video" },
          { id: "l2", title: "Design Thinking Process", duration: "35 min", type: "video" },
          { id: "l3", title: "User-Centered Design Principles", duration: "30 min", type: "video" },
          { id: "l4", title: "Design Psychology", duration: "40 min", type: "video" },
          { id: "l5", title: "Intro Project: User Analysis", duration: "45 min", type: "project" }
        ]
      },
      {
        id: "m2",
        title: "User Research and Analysis",
        description: "Learn techniques for understanding user needs and behaviors",
        lessons: [
          { id: "l6", title: "User Research Methods", duration: "45 min", type: "video" },
          { id: "l7", title: "Creating User Personas", duration: "35 min", type: "video" },
          { id: "l8", title: "User Journey Mapping", duration: "40 min", type: "video" },
          { id: "l9", title: "Information Architecture", duration: "35 min", type: "video" },
          { id: "l10", title: "User Research Project", duration: "60 min", type: "project" }
        ]
      },
      {
        id: "m3",
        title: "Wireframing and Prototyping",
        description: "Create low and high-fidelity prototypes for digital products",
        lessons: [
          { id: "l11", title: "Sketching and Ideation", duration: "30 min", type: "video" },
          { id: "l12", title: "Low-Fidelity Wireframing", duration: "45 min", type: "video" },
          { id: "l13", title: "Prototyping Tools: Figma", duration: "60 min", type: "video" },
          { id: "l14", title: "Interactive Prototyping", duration: "50 min", type: "video" },
          { id: "l15", title: "Wireframing Project", duration: "75 min", type: "project" }
        ]
      }
    ]
  }
};

// Helper function to calculate total course duration
const calculateTotalDuration = (modules: CourseModule[]): string => {
  let totalMinutes = 0;
  modules.forEach(module => {
    module.lessons.forEach(lesson => {
      const minutes = parseInt(lesson.duration.split(" ")[0]);
      totalMinutes += minutes;
    });
  });
  
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  
  return `${hours}h ${remainingMinutes}m`;
};

const CourseDetails = () => {
  const { slug } = useParams<{ slug?: string }>();
  const safeSlug = slug ?? "modern-web-development"; 
  const course = courseData[safeSlug];
  
  if (!course) {
    return (
      <Layout>
        <div className="container py-20">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <p className="mt-4">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="mt-6">
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const totalDuration = calculateTotalDuration(course.modules);
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Courses
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Information */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {course.category}
                  </span>
                  <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <GraduationCap className="h-3.5 w-3.5 mr-1" />
                    Free for Students
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
                  {course.title}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="text-brand-yellow mr-1">★</div>
                    <div className="font-medium">{course.rating}</div>
                    <div className="text-muted-foreground">({course.reviewCount} reviews)</div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <BarChart className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <img 
                    src={course.instructorAvatar} 
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-sm text-muted-foreground">Course Instructor</p>
                  </div>
                </div>
                
                <div className="flex gap-4 mb-6">
                  <Button size="lg" className="rounded-full bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 transition-opacity">
                    Enroll Now for Free
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full">
                    Add to Wishlist
                  </Button>
                </div>
              </div>
              
              {/* Course Preview Image */}
              <div className="rounded-xl overflow-hidden h-80 lg:h-auto">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Course Content */}
      <section className="py-10 md:py-16">
        <div className="container">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-bold">Course Content</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.modules.length} modules
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        {totalLessons} lessons
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {totalDuration} total
                      </div>
                    </div>
                  </div>
                </div>
                
                {course.modules.map((module, index) => (
                  <div key={module.id} className="border-b last:border-b-0">
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-2">
                        Module {index + 1}: {module.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{module.description}</p>
                      
                      <div className="space-y-4 mt-4">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              {lesson.type === 'video' && <Play className="h-4 w-4 text-brand-purple" />}
                              {lesson.type === 'quiz' && <BookOpen className="h-4 w-4 text-brand-blue" />}
                              {lesson.type === 'project' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="overview">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">What You'll Learn</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-8" />
                
                <h2 className="text-xl font-bold mb-6">Course Description</h2>
                <p className="text-muted-foreground whitespace-pre-line mb-4">
                  {course.description}
                </p>
                <p className="text-muted-foreground mb-4">
                  This comprehensive course is designed for university students who want to gain practical skills in {course.category.toLowerCase()}. Whether you're looking to enhance your resume, prepare for a career in this field, or simply expand your knowledge, this course offers valuable insights and hands-on experience.
                </p>
                <p className="text-muted-foreground">
                  By the end of this {course.duration.toLowerCase()} course, you'll have completed several projects for your portfolio and gained the confidence to apply your skills in real-world scenarios.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="instructor">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start gap-6">
                  <img 
                    src={course.instructorAvatar} 
                    alt={course.instructor}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold mb-2">{course.instructor}</h2>
                    <p className="text-muted-foreground mb-4">Expert in {course.category}</p>
                    <p className="text-muted-foreground mb-6">
                      {course.instructor} is a passionate educator with over 10 years of experience in {course.category.toLowerCase()}. They have worked with leading organizations and universities to develop cutting-edge curricula that blend theoretical knowledge with practical skills. Their teaching approach focuses on interactive learning and real-world applications.
                    </p>
                    <div className="flex gap-4">
                      <div>
                        <div className="font-bold text-xl">{(Math.floor(Math.random() * 15) + 5)}</div>
                        <div className="text-sm text-muted-foreground">Courses</div>
                      </div>
                      <div>
                        <div className="font-bold text-xl">{(Math.floor(Math.random() * 9000) + 1000).toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Students</div>
                      </div>
                      <div>
                        <div className="font-bold text-xl">{(Math.random() * (5 - 4.5) + 4.5).toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Student Reviews</h2>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold">{course.rating}</div>
                    <div>
                      <div className="flex text-brand-yellow mb-1">
                        {"★".repeat(Math.floor(course.rating))}
                        {course.rating % 1 >= 0.5 ? "★" : ""}
                        {"☆".repeat(5 - Math.ceil(course.rating))}
                      </div>
                      <div className="text-sm text-muted-foreground">{course.reviewCount} reviews</div>
                    </div>
                  </div>
                  
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                {/* Mock reviews */}
                <div className="space-y-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`} 
                          alt="Reviewer"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">Student {index + 1}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex text-brand-yellow mb-2">
                        {"★".repeat(5 - index)}
                        {"☆".repeat(index)}
                      </div>
                      
                      <p className="text-muted-foreground">
                        {index === 0 && "This course exceeded my expectations! The instructor explains complex concepts clearly and the projects helped me apply what I learned. Highly recommended for anyone interested in this field."}
                        {index === 1 && "Great content and well-structured lessons. I appreciate how the course covers both theory and practical applications. The instructor is knowledgeable and responsive to questions."}
                        {index === 2 && "Solid course with useful information. Some sections could be more in-depth, but overall it provided a good foundation for beginners. The projects were particularly helpful."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetails;
