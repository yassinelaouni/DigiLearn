import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Monitor,
  Shield,
  FileText,
  Globe,
  Briefcase,
  Code,
  Megaphone,
  Database,
  Palette,
  Bitcoin,
  Keyboard,
  MessageSquareWarning
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const featuredCourses = [
  // Digital Literacy
  {
    id: "1",
    title: "Essential Computer Skills for Beginners",
    slug: "essential-computer-skills",
    category: "Digital Literacy",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    duration: "45 mins",
    level: "Beginner",
    featured: true,
  },
  {
    id: "7",
    title: "Mobile Device Basics",
    slug: "mobile-device-basics",
    category: "Digital Literacy",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    duration: "40 mins",
    level: "Beginner",
    featured: true,
  },
  {
    id: "15",
    title: "Typing & Keyboard Mastery",
    slug: "typing-keyboard",
    category: "Digital Literacy",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    duration: "60 mins",
    level: "Beginner",
    featured: true,
  },

  // Online Safety
  {
    id: "2",
    title: "Internet Safety & Privacy Fundamentals",
    slug: "internet-safety",
    category: "Online Safety",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    duration: "60 mins",
    level: "Beginner",
    featured: true,
  },
  {
    id: "16",
    title: "Protecting Your Digital Identity",
    slug: "digital-identity",
    category: "Online Safety",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    duration: "50 mins",
    level: "Beginner",
    featured: true,
  },

  // Productivity Tools
  {
    id: "3",
    title: "Mastering Microsoft Office Essentials",
    slug: "microsoft-office",
    category: "Productivity Tools",
    thumbnail: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    duration: "90 mins",
    level: "Beginner to Intermediate",
    featured: true,
  },
  {
    id: "5",
    title: "Creating Professional Documents",
    slug: "professional-documents",
    category: "Productivity Tools",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    duration: "75 mins",
    level: "Beginner",
    featured: true,
  },
  {
    id: "9",
    title: "Cloud Storage & File Management",
    slug: "cloud-storage",
    category: "Productivity Tools",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    duration: "50 mins",
    level: "Beginner",
    featured: true,
  },

  // Web Essentials
  {
    id: "4",
    title: "Effective Online Communication",
    slug: "online-communication",
    category: "Web Essentials",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    duration: "50 mins",
    level: "Beginner",
    featured: true,
  },

  // Career Skills
  {
    id: "6",
    title: "Job Search Strategies for Digital Age",
    slug: "job-search-strategies",
    category: "Career Skills",
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    duration: "65 mins",
    level: "All Levels",
    featured: true,
  },
  {
    id: "8",
    title: "Social Media for Professional Use",
    slug: "social-media-professional",
    category: "Career Skills",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    duration: "55 mins",
    level: "Beginner",
    featured: true,
  },

  // Technical Courses
  {
    id: "10",
    title: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    category: "Web Development",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    duration: "120 mins",
    level: "Beginner",
    featured: true,
  },
  {
    id: "11",
    title: "Digital Marketing Essentials",
    slug: "digital-marketing-essentials",
    category: "Digital Marketing",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    duration: "90 mins",
    level: "Beginner",
    featured: true,
  },
  {
    id: "12",
    title: "Introduction to Data Science",
    slug: "introduction-data-science",
    category: "Data Science",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    duration: "150 mins",
    level: "Beginner to Intermediate",
    featured: true,
  },
  {
    id: "13",
    title: "UX/UI Design Principles",
    slug: "ux-ui-design-principles",
    category: "UX/UI Design",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    duration: "110 mins",
    level: "Beginner",
    featured: true,
  },
  {
    id: "14",
    title: "Blockchain Basics",
    slug: "blockchain-basics",
    category: "Blockchain",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    duration: "100 mins",
    level: "Intermediate",
    featured: true,
  }
];

// Updated categories with all filters
const categories = [
  {
    name: "All Categories",
    slug: "all",
    icon: null,
    count: featuredCourses.length,
    color: "bg-gray-100 text-gray-800",
  },
  {
    name: "Digital Literacy",
    slug: "digital-literacy",
    icon: <Monitor className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "Digital Literacy").length,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Online Safety",
    slug: "online-safety",
    icon: <Shield className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "Online Safety").length,
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "Productivity Tools",
    slug: "productivity-tools",
    icon: <FileText className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "Productivity Tools").length,
    color: "bg-green-50 text-green-600",
  },
  {
    name: "Web Essentials",
    slug: "web-essentials",
    icon: <Globe className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "Web Essentials").length,
    color: "bg-orange-50 text-orange-600",
  },
  {
    name: "Career Skills",
    slug: "career-skills",
    icon: <Briefcase className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "Career Skills").length,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    name: "Web Development",
    slug: "web-development",
    icon: <Code className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "Web Development").length,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    icon: <Megaphone className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "Digital Marketing").length,
    color: "bg-pink-50 text-pink-600",
  },
  {
    name: "Data Science",
    slug: "data-science",
    icon: <Database className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "Data Science").length,
    color: "bg-teal-50 text-teal-600",
  },
  {
    name: "UX/UI Design",
    slug: "ux-ui-design",
    icon: <Palette className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "UX/UI Design").length,
    color: "bg-red-50 text-red-600",
  },
  {
    name: "Blockchain",
    slug: "blockchain",
    icon: <Bitcoin className="h-5 w-5" />,
    count: featuredCourses.filter(c => c.category === "Blockchain").length,
    color: "bg-amber-50 text-amber-600",
  },
];

// Updated CourseCard component
const CourseCard = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full">
            {course.category}
          </div>
        </div>
        {course.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
              Featured
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-3 leading-tight">
          <Link to={`/courses/${course.slug}`} className="hover:text-purple-600 transition-colors">
            {course.title}
          </Link>
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <div className="text-yellow-400">★</div>
            <div className="text-sm font-medium">{course.rating}</div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <Button asChild variant="outline" size="sm" className="rounded-full w-full">
            <Link to={`/courses/${course.slug}`}>
              View Course
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCourses = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCourses = activeCategory === "all"
    ? featuredCourses
    : featuredCourses.filter(course =>
      course.category.toLowerCase().replace(/ /g, "-") === activeCategory
    );

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Digital Literacy Learning Paths
          </h2>
          <p className="text-gray-600 text-lg">
            Essential digital skills courses for university students
          </p>
        </div>

        {/* Improved category filter with scrollable navigation */}
        <div className="mb-8">
          <div className="flex items-center overflow-x-auto pb-4 scrollbar-hide gap-2 px-4">
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant="ghost"
                className={cn(
                  "rounded-full text-sm gap-2 whitespace-nowrap flex-shrink-0 transition-colors",
                  activeCategory === category.slug
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-white hover:bg-[#F0C441] border border-gray-200"
                )}
                onClick={() => setActiveCategory(category.slug)}
              >
                {category.icon && (
                  <span className={activeCategory === category.slug ? "text-white" : "text-gray-700"}>
                    {category.icon}
                  </span>
                )}
                <span className={activeCategory === category.slug ? "text-white" : "text-gray-700"}>
                  {category.name}
                </span>
                {category.count > 0 && (
                  <span className={cn(
                    "rounded-full text-xs px-2 py-0.5",
                    activeCategory === category.slug
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-700"
                  )}>
                    {category.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <div className="flex flex-col items-center justify-center gap-3">
                <MessageSquareWarning className="h-12 w-12 text-gray-400" />
                <p className="text-muted-foreground text-lg">No courses found for this category. Check back soon!</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90">
            <Link to="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;