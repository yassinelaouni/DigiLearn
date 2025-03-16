
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Book, Lightbulb, Users, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden hero-gradient pb-16 pt-24 md:pt-32 md:pb-24">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-brand-purple border border-brand-purple/20 shadow-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-purple"></span>
              </span>
              New courses added every month
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight"
            >
              Master Digital Culture for the{" "}
              <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                Modern University
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
            >
              Unlock the power of digital literacy with our specialized university courses. Learn web development, digital marketing, data science, and more.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 transition-opacity">
                <Link to="/courses">
                  Explore Courses
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-4"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-brand-purple">25+</span>
                <span className="text-sm text-muted-foreground">Courses</span>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-brand-blue">18+</span>
                <span className="text-sm text-muted-foreground">Expert Instructors</span>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-brand-green">5k+</span>
                <span className="text-sm text-muted-foreground">Students</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <img 
                src="/public/landing.png" 
                alt="Digital learning illustration" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full"></div>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute top-10 -left-12 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 z-20 hidden md:flex items-center gap-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <div className="bg-brand-purple/10 p-3 rounded-full">
                <Book className="h-6 w-6 text-brand-purple" />
              </div>
              <div>
                <p className="font-medium">25+ Courses</p>
                <p className="text-sm text-muted-foreground">Curated for university</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 z-20 hidden md:flex items-center gap-3"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <div className="bg-brand-yellow/10 p-3 rounded-full">
                <Lightbulb className="h-6 w-6 text-brand-yellow" />
              </div>
              <div>
                <p className="font-medium">Interactive Learning</p>
                <p className="text-sm text-muted-foreground">Hands-on projects</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-32 -left-10 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 z-20 hidden md:flex items-center gap-3"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="bg-brand-blue/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-brand-blue" />
              </div>
              <div>
                <p className="font-medium">Community Support</p>
                <p className="text-sm text-muted-foreground">Connect with peers</p>
              </div>
            </motion.div>
            
            {/* Background decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-5 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Scrolling marquee of partners */}
      <div className="mt-20 md:mt-28">
        <div className="container">
          <div className="text-center mb-6">
            <p className="text-muted-foreground text-sm font-medium">TRUSTED BY LEADING UNIVERSITIES AND COMPANIES</p>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-12 animate-marquee">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="bg-white/80 h-12 w-28 rounded-md flex items-center justify-center">
                  <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call-to-action banner */}
      <div className="container mt-16 md:mt-24">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-purple to-brand-blue p-8 md:p-10">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Start Your Digital Journey Today</h3>
              <p className="text-white/80 max-w-xl">Join thousands of university students mastering digital skills</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="rounded-full group">
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
