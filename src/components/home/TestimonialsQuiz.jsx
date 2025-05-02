
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Testimonials data
const testimonials = [
  {
    id: 1,
    content: "The Digital Culture courses have completely transformed my understanding of web development. The interactive approach and practical projects helped me build a strong portfolio that impressed my employers.",
    author: "Alex Thompson",
    role: "Computer Science Student",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
  },
  {
    id: 2,
    content: "As a marketing major, I was intimidated by the technical aspects of digital marketing. This platform made complex concepts approachable and gave me hands-on experience with industry tools.",
    author: "Sophia Chen",
    role: "Marketing Student",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
  },
  {
    id: 3,
    content: "The data science course curriculum is exceptional and relevant to real-world applications. I was able to apply machine learning concepts to my research project with confidence.",
    author: "Marcus Johnson",
    role: "Graduate Student, Statistics",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 4,
  },
  {
    id: 4,
    content: "The UX/UI design principles I learned have been invaluable for my projects. The instructor's feedback was detailed and helped me improve my design thinking process immensely.",
    author: "Olivia Williams",
    role: "Design Student",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
];

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of the digital literacy courses offered?",
    options: [
      "To replace traditional university education",
      "To enhance students' technical and critical thinking skills for the digital world",
      "To teach only programming languages",
      "To provide entertainment content for students",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which of the following is NOT a core component of digital literacy?",
    options: [
      "Critical thinking about online information",
      "Technical proficiency with digital tools",
      "Avoiding all forms of social media",
      "Understanding digital ethics and privacy",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "What is a primary purpose of CSS in web development?",
    options: [
      "To provide database functionality",
      "To create interactive web elements",
      "To style and layout web pages",
      "To secure web applications",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "In digital marketing, what does SEO stand for?",
    options: [
      "Social Engagement Optimization",
      "Search Engine Optimization",
      "Systematic Email Operations",
      "Social Experience Outreach",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What is the major benefit of learning digital culture for university students?",
    options: [
      "It replaces the need for a university degree",
      "It improves career prospects and digital workplace readiness",
      "It allows students to skip traditional classes",
      "It's only useful for Computer Science students",
    ],
    correctAnswer: 1,
  },
];

const TestimonialsQuiz = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const { toast } = useToast();

  // Handle testimonial navigation
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Handle quiz option selection
  const handleOptionSelect = (optionIndex ) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
      toast({
        title: "Correct!",
        description: "Great job! You selected the right answer.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correctAnswer]}`,
        variant: "destructive",
      });
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <section className="py-16 md:py-24 md:pt-0">
      <div className="container">
        <div className="grid items-center px-4">
          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8 w-full max-w-4xl mx-auto"
          >
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsQuiz;
