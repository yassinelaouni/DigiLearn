import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { 
  Search,  
  SlidersHorizontal, 
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  Monitor,
  Megaphone,
  Database,
  Palette,
  Bitcoin,
  Clock,
  BarChart,
  ArrowRight,
  Shield,
  FileText,
  Globe,
  Briefcase,
  Code,
  Keyboard,
  MessageSquareWarning
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("popular");
  const coursesPerPage = 5;

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses/featured');
        const data = await response.json();
        
        if (data.success) {
          setCourses(data.courses || []);
        } else {
          setError(data.errorMessage || 'Failed to fetch courses');
        }
      } catch (err) {
        setError('Failed to connect to the server');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter and sort courses with null checks
  const filteredCourses = courses
    .filter(course => {
      if (!course) return false;
      
      const searchMatch = 
        (course.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) || 
         course.description?.toLowerCase()?.includes(searchQuery.toLowerCase())) ?? false;
      
      const categoryMatch = selectedCategories.length === 0 || 
        (course.category && selectedCategories.includes(course.category.toLowerCase().replace(/ /g, '-')));
      
      return searchMatch && categoryMatch;
    })
    .sort((a, b) => {
      if (!a || !b) return 0;
      
      switch (sortOption) {
        case "newest":
          return (new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        case "alphabetical":
          return (a.title || '').localeCompare(b.title || '');
        case "popular":
        default:
          return (b.rating || 0) - (a.rating || 0);
      }
    });

  // Helper function to parse duration
  const parseDuration = (duration) => {
    return parseInt(duration) || 0;
  };

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, sortOption]);

  // Toggle category selection
  const toggleCategory = (slug) => {
    setSelectedCategories(prev => 
      prev.includes(slug) 
        ? prev.filter(item => item !== slug) 
        : [...prev, slug]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSortOption("popular");
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-12 md:py-16">
          <div className="text-center">
            <p>Loading courses...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container py-12 md:py-16">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              University Digital Culture Courses
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive selection of digital culture courses
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            {/* Filters Sidebar */}
            <motion.div 
              className="w-full md:w-64 lg:w-72 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-5">
                <h2 className="font-bold text-lg mb-4">Filter Courses</h2>
                
                <div className="space-y-6">
                  {/* Search Filter */}
                  <div>
                    <label htmlFor="search" className="font-medium mb-2 block">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        type="search"
                        placeholder="Course name or keyword..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />
                  
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {[
                       {
                        name: "Digital Literacy",
                        slug: "digital-literacy",
                        icon: <Monitor className="h-5 w-5" />,
                      },
                      {
                        name: "Online Safety",
                        slug: "online-safety",
                        icon: <Shield className="h-5 w-5" />,
                      },
                      {
                        name: "Productivity Tools",
                        slug: "productivity-tools",
                        icon: <FileText className="h-5 w-5" />,
                      },
                      {
                        name: "Web Essentials",
                        slug: "web-essentials",
                        icon: <Globe className="h-5 w-5" />,
                      },
                      {
                        name: "Career Skills",
                        slug: "career-skills",
                        icon: <Briefcase className="h-5 w-5" />,
                      },
                      {
                        name: "Web Development",
                        slug: "web-development",
                        icon: <Code className="h-5 w-5" />,
                      },
                      {
                        name: "Digital Marketing",
                        slug: "digital-marketing",
                        icon: <Megaphone className="h-5 w-5" />,
                      },
                      {
                        name: "Data Science",
                        slug: "data-science",
                        icon: <Database className="h-5 w-5" />,
                      },
                      {
                        name: "UX/UI Design",
                        slug: "ux-ui-design",
                        icon: <Palette className="h-5 w-5" />,
                      },
                      {
                        name: "Blockchain",
                        slug: "blockchain",
                        icon: <Bitcoin className="h-5 w-5" />,
                      }
                      ].map((category) => {
                        const count = courses.filter(c => 
                          c?.category?.toLowerCase() === category.name.toLowerCase()).length;
                        
                        return (
                          <div key={category.slug} className="flex items-center gap-2">
                            <Checkbox
                              id={`category-${category.slug}`}
                              checked={selectedCategories.includes(category.slug)}
                              onCheckedChange={() => toggleCategory(category.slug)}
                            />
                            <label 
                              htmlFor={`category-${category.slug}`}
                              className="flex items-center text-sm cursor-pointer flex-1"
                            >
                              <span className="mr-1.5">{category.icon}</span>
                              {category.name}
                              <span className="ml-auto text-xs text-muted-foreground">
                                ({count})
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />
                  
                  {/* Reset Filters */}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Course Listing */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="font-bold">{filteredCourses.length} Courses</h2>
                  <select
                    className="bg-white border border-gray-200 rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
                
                {/* Course list */}
                <div className="space-y-6">
                  {currentCourses.length > 0 ? (
                    currentCourses.map((course) => (
                      <div 
                        key={course.id}
                        className="flex flex-col md:flex-row gap-6 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="md:w-1/4 h-48 md:h-auto rounded-lg overflow-hidden">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-3/4 flex flex-col">
                          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                            <span>{course.category}</span>
                            <span>•</span>
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                            <span>•</span>
                            <BarChart className="h-4 w-4" />
                            <span>{course.level}</span>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {course.description || 'No description available'}
                          </p>
                          <div className="mt-auto flex justify-end">
                            <Button
                              asChild
                              variant="default"
                              size="sm"
                              className="rounded-full"
                            >
                              <Link to={`/courses/${course.slug}`}>
                                View Course
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p>No courses match your filters</p>
                      <Button 
                        variant="link"
                        onClick={resetFilters}
                      >
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Pagination */}
                {filteredCourses.length > coursesPerPage && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-lg"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className="rounded-lg"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-lg"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;