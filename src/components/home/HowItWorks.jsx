import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Import your local images
import step1 from "/browse.png";
import step2 from "/enroll.png";
import step3 from "/learn.png";
import step4 from "/test.png";

const steps = [
  {
    number: "01",
    title: "Parcourir les Cours",
    description: "Explorez nos cours et trouvez celui qui vous convient.",
    image: step1,
  },
  {
    number: "02",
    title: "S'inscrire et Accéder",
    description: "Inscrivez-vous et commencez à apprendre immédiatement.",
    image: step2,
  },
  {
    number: "03",
    title: "Apprendre et Participer",
    description: "Interagissez avec le contenu, les discussions et les exercices.",
    image: step3,
  },
  {
    number: "04",
    title: "Tester vos Connaissances",
    description: "Évaluez votre apprentissage avec des quiz et des examens.",
    image: step4,
  },
];

const HowItWorks = () => {

    // Add state to track window width
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      // Function to check window size
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
      };
  
      // Initial check
      handleResize();
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container relative">
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Comment Fonctionne Notre Plateforme d'Apprentissage Numérique
            </motion.h2>
            <p className="text-muted-foreground text-lg">
              Suivez ces étapes simples pour commencer votre parcours d'apprentissage numérique.
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
                      className={`w-${isMobile ? "9/10" : "1/2"} h-full object-cover rounded-xl mx-auto`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-16 md:mt-24 text-center">
            <p className="text-lg mb-6">Prêt à commencer votre parcours d'apprentissage numérique ?</p>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 transition-opacity">
              <Link to="/courses">
                Commencer à Apprendre
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