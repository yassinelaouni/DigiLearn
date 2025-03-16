
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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
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
  const handleOptionSelect = (optionIndex: number) => {
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
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                What Our Students Say
              </h2>
              <p className="text-muted-foreground text-lg">
                Hear from students who have transformed their digital skills with our courses
              </p>
            </div>
            
            <div className="relative bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={cn(
                    "transition-opacity duration-500 absolute inset-0 p-6 md:p-8 flex flex-col",
                    activeTestimonial === index ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  <div className="flex-1">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-5 w-5", 
                            i < testimonial.rating ? "text-brand-yellow fill-brand-yellow" : "text-gray-300"
                          )} 
                        />
                      ))}
                    </div>
                    <p className="text-lg italic mb-6">"{testimonial.content}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="relative h-64"></div> {/* Spacer to maintain height */}
              
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  onClick={prevTestimonial}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  onClick={nextTestimonial}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Quiz Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Test Your Digital Knowledge
              </h2>
              <p className="text-muted-foreground text-lg">
                Take this quick quiz to see how your digital literacy skills measure up
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
              {!quizActive && !quizCompleted ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-bold mb-6">Ready to test your digital culture knowledge?</h3>
                  <img 
                    src="/lovable-uploads/450df0f0-3fc2-4bb4-beec-a9dc58d5a99a.png" 
                    alt="Digital Culture Quiz" 
                    className="mx-auto max-w-[220px] rounded-lg mb-8" 
                  />
                  <Button 
                    onClick={() => setQuizActive(true)} 
                    className="rounded-full" 
                    size="lg"
                  >
                    Start Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : !quizCompleted ? (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium bg-brand-purple/10 text-brand-purple px-3 py-1 rounded-full">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                      <span className="text-sm font-medium">
                        Score: {score}/{quizQuestions.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-brand-purple to-brand-blue h-2 rounded-full"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">
                      {quizQuestions[currentQuestion].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          className={cn(
                            "w-full px-5 py-4 rounded-lg transition-colors flex items-center justify-between",
                            selectedOption === index
                              ? index === quizQuestions[currentQuestion].correctAnswer
                                ? "bg-green-50 border-2 border-green-500 text-green-800"
                                : "bg-red-50 border-2 border-red-300 text-red-800"
                              : isAnswered 
                                ? "border-2 border-gray-100"
                                : "border-2 border-gray-100 hover:border-brand-purple/50 hover:bg-brand-purple/5",
                            isAnswered && "cursor-default"
                          )}
                          onClick={() => handleOptionSelect(index)}
                          disabled={isAnswered}
                        >
                          <div className="flex items-center">
                            <div className={cn(
                              "w-6 h-6 rounded-full mr-3 flex items-center justify-center",
                              selectedOption === index
                                ? index === quizQuestions[currentQuestion].correctAnswer
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                                : "border-2 border-gray-300"
                            )}>
                              {selectedOption === index && (
                                index === quizQuestions[currentQuestion].correctAnswer
                                  ? <Check className="h-4 w-4" />
                                  : <XCircle className="h-4 w-4" />
                              )}
                            </div>
                            <span className="text-left">{option}</span>
                          </div>
                          {isAnswered && index === quizQuestions[currentQuestion].correctAnswer && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {isAnswered && (
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleNextQuestion} 
                        className="rounded-full"
                        size="lg"
                      >
                        {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-purple/10 mb-6">
                      <span className="text-3xl font-bold text-brand-purple">
                        {score}/{quizQuestions.length}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      {score === quizQuestions.length 
                        ? "Perfect Score!" 
                        : score >= quizQuestions.length / 2 
                          ? "Good Job!" 
                          : "Keep Learning!"}
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      {score === quizQuestions.length 
                        ? "You've mastered these digital concepts! You're ready to excel in our courses." 
                        : score >= quizQuestions.length / 2 
                          ? "You have a solid foundation in digital literacy. Our courses will help you build on this knowledge." 
                          : "There's room to improve your digital knowledge. Our courses are designed to help you build these essential skills."}
                    </p>
                  </div>
                  
                  <div className="space-y-4 max-w-xs mx-auto">
                    <Button 
                      onClick={resetQuiz} 
                      variant="default" 
                      className="w-full rounded-full"
                      size="lg"
                    >
                      Try Again
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-full"
                      size="lg"
                    >
                      Explore Free Courses
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsQuiz;
