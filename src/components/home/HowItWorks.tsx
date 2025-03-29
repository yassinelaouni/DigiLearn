import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import your local images
import step1 from "../../../public/browse.png";
import step2 from "../../../public/enroll.png";
import step3 from "../../../public/learn.png";
import step4 from "../../../public/test.png";

const steps = [
  {
    number: "01",
    title: "Browse Courses",
    description: "Explore our courses and find what suits you.",
    image: step1,
  },
  {
    number: "02",
    title: "Enroll & Access",
    description: "Sign up and start learning immediately.",
    image: step2,
  },
  {
    number: "03",
    title: "Learn & Engage",
    description: "Interact with content, discussions, and assignments.",
    image: step3,
  },
  {
    number: "04",
    title: "Test Your Knowledge",
    description: "Assess your learning with quizzes and exams.",
    image: step4,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container relative">
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              How Our Digital Learning Platform Works
            </motion.h2>
            <p className="text-muted-foreground text-lg">
              Follow these simple steps to start your digital learning journey.
            </p>
          </div>

        <div className="grid gap-12 lg:gap-24">
            {steps.map((step, index) => (
              <motion.div key={index} className="relative grid lg:grid-cols-2 gap-6 items-center">
                <div className={`text-center lg:text-left ${index % 2 === 1 ? "lg:pl-16" : "lg:pr-16"}`}>
                  <div className="inline-block text-4xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                <div className={`flex items-center justify-center`}>
                  <div className={`w-full h-64 bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center ${index % 2 === 0 ? "lg:mr-16" : "lg:ml-16"}`}>
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-1/2 h-full object-cover rounded-xl mx-auto"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-16 md:mt-24 text-center">
            <p className="text-lg mb-6">Ready to start your digital learning journey?</p>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 transition-opacity">
              <Link to="/courses">
                Start Learning Now
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