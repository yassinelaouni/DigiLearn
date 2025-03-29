import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronRight,
  Monitor,
  Megaphone,
  Database,
  Palette,
  Bitcoin,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock categories data
const categories = [
  { name: "Web Development", slug: "web-development", icon: <Monitor className="h-4 w-4" />, count: 8 },
  { name: "Digital Marketing", slug: "digital-marketing", icon: <Megaphone className="h-4 w-4" />, count: 6 },
  { name: "Data Science", slug: "data-science", icon: <Database className="h-4 w-4" />, count: 5 },
  { name: "UX/UI Design", slug: "ux-ui-design", icon: <Palette className="h-4 w-4" />, count: 4 },
  { name: "Blockchain", slug: "blockchain", icon: <Bitcoin className="h-4 w-4" />, count: 2 },
];

// Mock levels data
const levels = [
  { name: "Beginner", value: "beginner", count: 12 },
  { name: "Intermediate", value: "intermediate", count: 8 },
  { name: "Advanced", value: "advanced", count: 5 },
  { name: "All Levels", value: "all-levels", count: 3 },
];

// Mock durations data
const durations = [
  { name: "Less than 6 weeks", value: "0-5", count: 7 },
  { name: "6-10 weeks", value: "6-10", count: 14 },
  { name: "10+ weeks", value: "10+", count: 7 },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Toggle category selection
  const toggleCategory = (slug) => {
    setSelectedCategories(prev => 
      prev.includes(slug) 
        ? prev.filter(item => item !== slug) 
        : [...prev, slug]
    );
  };

  // Toggle level selection
  const toggleLevel = (value) => {
    setSelectedLevels(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  // Toggle duration selection
  const toggleDuration = (value) => {
    setSelectedDurations(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

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
              Explore our comprehensive selection of free digital culture courses for university students
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            {/* Filters Section - Mobile Toggle */}
            <div className="md:hidden w-full">
              <Button 
                variant="outline" 
                onClick={() => setFiltersVisible(!filtersVisible)}
                className="w-full flex items-center justify-between"
              >
                <span className="flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  filtersVisible ? "transform rotate-180" : ""
                )} />
              </Button>
            </div>

            {/* Filters Sidebar */}
            <motion.div 
              className={cn(
                "w-full md:w-64 lg:w-72 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden",
                !filtersVisible && "hidden md:block"
              )}
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
                      {categories.map((category) => (
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
                              ({category.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />
                  

                  {/* Level Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Level</h3>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <div key={level.value} className="flex items-center gap-2">
                          <Checkbox
                            id={`level-${level.value}`}
                            checked={selectedLevels.includes(level.value)}
                            onCheckedChange={() => toggleLevel(level.value)}
                          />
                          <label 
                            htmlFor={`level-${level.value}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {level.name}
                            <span className="ml-auto float-right text-xs text-muted-foreground">
                              ({level.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />
                  

                  {/* Duration Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Duration</h3>
                    <div className="space-y-2">
                      {durations.map((duration) => (
                        <div key={duration.value} className="flex items-center gap-2">
                          <Checkbox
                            id={`duration-${duration.value}`}
                            checked={selectedDurations.includes(duration.value)}
                            onCheckedChange={() => toggleDuration(duration.value)}
                          />
                          <label 
                            htmlFor={`duration-${duration.value}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {duration.name}
                            <span className="ml-auto float-right text-xs text-muted-foreground">
                              ({duration.count})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />
                  

                  {/* Reset Filters */}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategories([]);
                      setSelectedLevels([]);
                      setSelectedDurations([]);
                    }}
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
                  <h2 className="font-bold">28 Free Courses</h2>
                  <select
                    className="bg-white border border-gray-200 rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="duration-short">Duration: Shortest</option>
                    <option value="duration-long">Duration: Longest</option>
                  </select>
                </div>
                
                {/* Placeholder for course list */}
                <div className="space-y-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div 
                      key={index}
                      className="flex flex-col md:flex-row gap-6 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="md:w-1/4 h-48 md:h-auto bg-gray-100 rounded-lg animate-pulse">
                        {/* Course thumbnail placeholder */}
                      </div>
                      <div className="md:w-3/4 flex flex-col">
                        <h3 className="text-xl font-bold mb-2">Course Title Placeholder</h3>
                        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                          <span>Instructor Name</span>
                          <span>•</span>
                          <span>Category</span>
                          <span>•</span>
                          <span>8 weeks</span>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          This is a placeholder for the course description. It would contain details about what
                          the student will learn and the benefits of taking this course.
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <GraduationCap className="h-3.5 w-3.5 mr-1" />
                            Free for Students
                          </span>
                          <Button
                            variant="default"
                            size="sm"
                            className="rounded-full"
                          >
                            View Course
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-lg">
                      <ChevronRight className="rotate-180 h-4 w-4" />
                    </Button>
                    <Button variant="default" size="sm" className="rounded-lg">1</Button>
                    <Button variant="outline" size="sm" className="rounded-lg">2</Button>
                    <Button variant="outline" size="sm" className="rounded-lg">3</Button>
                    <span className="flex items-center px-3">...</span>
                    <Button variant="outline" size="sm" className="rounded-lg">10</Button>
                    <Button variant="outline" size="icon" className="rounded-lg">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;