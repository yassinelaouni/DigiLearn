import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Clock, 
  BarChart, 
  Users, 
  Monitor, 
  Megaphone, 
  Database, 
  Palette, 
  Bitcoin,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Course category interface
interface CategoryProps {
  name: string;
  slug: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

// Course categories data
const categories: CategoryProps[] = [
  {
    name: "Web Development",
    slug: "web-development",
    icon: <Monitor className="h-5 w-5" />,
    count: 8,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    icon: <Megaphone className="h-5 w-5" />,
    count: 6,
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "Data Science",
    slug: "data-science",
    icon: <Database className="h-5 w-5" />,
    count: 5,
    color: "bg-green-50 text-green-600",
  },
  {
    name: "UX/UI Design",
    slug: "ux-ui-design",
    icon: <Palette className="h-5 w-5" />,
    count: 4,
    color: "bg-orange-50 text-orange-600",
  },
  {
    name: "Blockchain",
    slug: "blockchain",
    icon: <Bitcoin className="h-5 w-5" />,
    count: 2,
    color: "bg-yellow-50 text-yellow-600",
  },
];

// Course interface
interface CourseProps {
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
}

// Featured courses data - modified to remove pricing information
const featuredCourses: CourseProps[] = [
  {
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
    featured: true,
  },
  {
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
    featured: true,
  },
  {
    id: "3",
    title: "Data Science Fundamentals with Python",
    slug: "data-science-fundamentals",
    category: "Data Science",
    instructor: "Dr. Emily Rodriguez",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 276,
    duration: "12 weeks",
    level: "Intermediate",
    students: 2134,
    featured: true,
  },
  {
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
    featured: true,
  },
  {
    id: "5",
    title: "Blockchain Technology & Cryptocurrency",
    slug: "blockchain-technology",
    category: "Blockchain",
    instructor: "Dr. James Thompson",
    instructorAvatar: "https://i.pravatar.cc/150?img=67",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 152,
    duration: "10 weeks",
    level: "Intermediate to Advanced",
    students: 1243,
    featured: true,
  },
  {
    id: "6",
    title: "Social Media Marketing for Business Growth",
    slug: "social-media-marketing",
    category: "Digital Marketing",
    instructor: "Prof. Jessica Martinez",
    instructorAvatar: "https://i.pravatar.cc/150?img=25",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviewCount: 187,
    duration: "6 weeks",
    level: "Beginner",
    students: 2356,
    featured: true,
  },
];

// Course card component - modified to show free tag instead of price
const CourseCard = ({ course }: { course: CourseProps }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group animated-card"
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
            <div className="bg-brand-yellow/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full text-black">
              Featured
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 leading-tight">
          <Link to={`/courses/${course.slug}`} className="hover:text-brand-purple transition-colors">
            {course.title}
          </Link>
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <img 
            src={course.instructorAvatar} 
            alt={course.instructor}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{course.instructor}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <div className="text-brand-yellow">★</div>
            <div className="text-sm font-medium">{course.rating}</div>
            <div className="text-sm text-muted-foreground">({course.reviewCount})</div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BarChart className="h-3.5 w-3.5" />
            <span>{course.level}</span>
          </div>
        </div>
        
        <div className="border-t pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
              <GraduationCap className="h-3.5 w-3.5 mr-1" />
              Free for Students
            </span>
          </div>
          
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link to={`/courses/${course.slug}`}>
              Details
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
  
  // Fix replaceAll issue by using replace with regular expression
  const filteredCourses = activeCategory === "all" ? 
    featuredCourses : 
    featuredCourses.filter(course => course.category.toLowerCase().replace(/ /g, "-") === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Discover Our Featured Digital Culture Courses
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive, up-to-date courses taught by expert university instructors to help you master digital skills
          </p>
        </div>
        
        <div className="mb-8 flex items-center justify-start md:justify-center overflow-x-auto pb-4 scrollbar-hide gap-2">
          <Button
            variant="ghost"
            className={cn(
              "rounded-full text-sm whitespace-nowrap",
              activeCategory === "all" && "bg-black text-white hover:bg-black/90 hover:text-white"
            )}
            onClick={() => setActiveCategory("all")}
          >
            All Categories
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.slug}
              variant="ghost"
              className={cn(
                "rounded-full text-sm gap-2 whitespace-nowrap",
                activeCategory === category.slug && "bg-black text-white hover:bg-black/90 hover:text-white"
              )}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.icon}
              {category.name}
              <span className="bg-muted text-muted-foreground rounded-full text-xs px-2 py-0.5">
                {category.count}
              </span>
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <p className="text-muted-foreground">No courses found for this category. Check back soon!</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 transition-opacity">
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
