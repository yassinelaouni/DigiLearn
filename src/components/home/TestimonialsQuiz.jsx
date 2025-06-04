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
    content: "Les cours de Culture Numérique ont complètement transformé ma compréhension du développement web. L'approche interactive et les projets pratiques m'ont aidé à construire un portfolio solide qui a impressionné mes employeurs.",
    author: "Alex Thompson",
    role: "Étudiant en Informatique",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
  },
  {
    id: 2,
    content: "En tant qu'étudiante en marketing, j'étais intimidée par les aspects techniques du marketing numérique. Cette plateforme a rendu les concepts complexes accessibles et m'a donné une expérience pratique des outils de l'industrie.",
    author: "Sophia Chen",
    role: "Étudiant en Marketing",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
  },
  {
    id: 3,
    content: "Le programme du cours de science des données est exceptionnel et pertinent pour les applications du monde réel. J'ai pu appliquer les concepts d'apprentissage automatique à mon projet de recherche en toute confiance.",
    author: "Marcus Johnson",
    role: "Étudiant diplômé, Statistiques",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 4,
  },
  {
    id: 4,
    content: "Les principes de conception UX/UI que j'ai appris ont été inestimables pour mes projets. Les commentaires de l'instructeur étaient détaillés et m'ont aidé à améliorer considérablement mon processus de réflexion en matière de conception.",
    author: "Olivia Williams",
    role: "Étudiant en Design",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
];

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "Quel est le but des cours de littératie numérique offerts ?",
    options: [
      "Remplacer l'éducation universitaire traditionnelle",
      "Améliorer les compétences techniques et la pensée critique des étudiants pour le monde numérique",
      "Enseigner uniquement les langages de programmation",
      "Fournir du contenu de divertissement aux étudiants",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Lequel des éléments suivants n'est PAS une composante essentielle de la littératie numérique ?",
    options: [
      "Pensée critique concernant les informations en ligne",
      "Maîtrise technique des outils numériques",
      "Éviter toutes les formes de médias sociaux",
      "Comprendre l'éthique numérique et la confidentialité",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "Quel est le but principal du CSS dans le développement web ?",
    options: [
      "Fournir une fonctionnalité de base de données",
      "Créer des éléments web interactifs",
      "Styliser et mettre en page des pages web",
      "Sécuriser les applications web",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "En marketing numérique, que signifie SEO ?",
    options: [
      "Optimisation de l'Engagement Social",
      "Optimisation pour les Moteurs de Recherche",
      "Opérations de messagerie systématiques",
      "Sensibilisation à l'expérience sociale",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Quel est le principal avantage d'apprendre la culture numérique pour les étudiants universitaires ?",
    options: [
      "Cela remplace le besoin d'un diplôme universitaire",
      "Cela améliore les perspectives de carrière et la préparation au lieu de travail numérique",
      "Cela permet aux étudiants de sauter les cours traditionnels",
      "Ce n'est utile que pour les étudiants en informatique",
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
        title: "Correct !",
        description: "Excellent travail ! Vous avez sélectionné la bonne réponse.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `La bonne réponse était : ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correctAnswer]}`,
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
            {/* Testimonial Cards (implementation not fully shown in read) */}
            {/* Example structure based on typical usage: */}
            {testimonials.map((testimonial, index) => (
              index === activeTestimonial && (
                <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <img src={testimonial.avatar} alt={`Avatar of ${testimonial.author}`} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <p className="font-bold text-lg">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-5 w-5", i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
                    ))}
                  </div>
                </div>
              )
            ))}

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={prevTestimonial} aria-label="Previous testimonial">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextTestimonial} aria-label="Next testimonial">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Quiz Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-8">Testez vos connaissances en littératie numérique</h2>

            {!quizActive ? (
                <div className="text-center">
                    <p className="text-lg text-gray-700 mb-6">Mettez vos compétences à l'épreuve avec un court quiz.</p>
                    <Button size="lg" className="rounded-full" onClick={() => setQuizActive(true)}>
                        Commencer le quiz <ArrowRight className="ml-2 h-5 w-5"/>
                    </Button>
                </div>
            ) : (

            !quizCompleted ? (
              <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
                <h3 className="text-xl font-bold">Question {currentQuestion + 1}/{quizQuestions.length}</h3>
                <p className="text-lg font-medium">{quizQuestions[currentQuestion].question}</p>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-full text-left px-4 py-3 border rounded-md transition-colors duration-200",
                        "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        isAnswered && index === quizQuestions[currentQuestion].correctAnswer && "border-green-500 bg-green-50 text-green-800",
                        isAnswered && index === selectedOption && index !== quizQuestions[currentQuestion].correctAnswer && "border-red-500 bg-red-50 text-red-800",
                        !isAnswered && selectedOption === index && "bg-blue-50"
                      )}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <div className="flex justify-end">
                    <Button onClick={handleNextQuestion} className="rounded-full">
                      {currentQuestion < quizQuestions.length - 1 ? "Question suivante" : "Voir les résultats"} <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center space-y-4">
                <h3 className="text-2xl font-bold">Quiz terminé !</h3>
                <p className="text-xl">Votre score : {score} / {quizQuestions.length}</p>
                <Button onClick={resetQuiz} className="rounded-full">
                  Recommencer le quiz <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
              </div>
            ))}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsQuiz;
