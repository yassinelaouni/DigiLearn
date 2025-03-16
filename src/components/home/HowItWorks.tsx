
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Browse Courses",
    description: "Explore our catalog of digital culture courses and find the ones that match your interests and academic needs."
  },
  {
    number: "02",
    title: "Enroll & Access",
    description: "Complete the enrollment process and gain immediate access to course materials, lectures, and resources."
  },
  {
    number: "03",
    title: "Learn Interactively",
    description: "Engage with dynamic content, complete interactive assignments, and participate in discussions."
  },
  {
    number: "04",
    title: "Get Certified",
    description: "Complete your course requirements, pass assessments, and earn a recognized university certification."
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container relative">
        {/* Background decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-brand-purple border border-brand-purple/20 shadow-sm mb-4"
            >
              Simple & Intuitive
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold font-display mb-4"
            >
              How Our E-Learning Platform Works
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Follow these simple steps to start your digital learning journey
            </motion.p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-16 left-[50%] w-0.5 h-[calc(100%-4rem)] bg-gradient-to-b from-brand-purple to-brand-blue hidden lg:block"></div>
            
            <div className="grid gap-12 lg:gap-24">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative grid lg:grid-cols-2 gap-6 items-center ${
                    index % 2 === 1 ? "lg:rtl" : ""
                  }`}
                >
                  <div className={`text-center lg:text-left ${index % 2 === 1 ? "lg:pl-16" : "lg:pr-16"}`}>
                    <div className="inline-block text-4xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <div className="relative">
                    {/* Step number indicator (for large screens) */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-brand-purple flex items-center justify-center font-bold text-brand-purple z-10 hidden lg:flex">
                      {index + 1}
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <div className="rounded-lg overflow-hidden h-48 bg-gray-100 animate-pulse">
                        {/* Image placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          Step {index + 1} Illustration
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 md:mt-24 text-center"
          >
            <p className="text-lg mb-6">Ready to start your digital learning journey?</p>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 transition-opacity">
              <Link to="/courses">
                Explore Our Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
