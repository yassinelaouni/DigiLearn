
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Benefits from "@/components/home/Benefits";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsQuiz from "@/components/home/TestimonialsQuiz";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <FeaturedCourses />
      <Benefits />
      <HowItWorks />
      <TestimonialsQuiz />
    </Layout>
  );
};

export default Index;
