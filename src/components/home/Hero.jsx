import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Book, Lightbulb, Users, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";


const Hero = () => {

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
              Nouveaux cours ajoutés chaque mois
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight"
            >
              Maîtrisez la culture numérique pour l'{" "}
              <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                université moderne
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
            >
              Débloquez le pouvoir de la littératie numérique avec nos cours universitaires spécialisés. Apprenez le développement web, le marketing numérique, la science des données, et plus encore.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 transition-opacity">
                <Link to="/courses">
                  Explorer les cours
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/about">
                  En savoir plus
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {!isMobile && (<div className="relative">
              <img
                src="/landing.png"
                alt="Illustration d'apprentissage numérique"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full"></div>
            </div>)}

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
                <p className="font-medium">Plus de 25 cours</p>
                <p className="text-sm text-muted-foreground">Conçus pour l'université</p>
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
                <p className="font-medium">Apprentissage interactif</p>
                <p className="text-sm text-muted-foreground">Projets pratiques</p>
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
                <p className="font-medium">Soutien communautaire</p>
                <p className="text-sm text-muted-foreground">Connectez-vous avec vos pairs</p>
              </div>
            </motion.div>

            {/* Background decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-5 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>


      <div className={`container ${isMobile ? 'mt-2' : 'mt-16 md:mt-24'}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-purple to-brand-blue p-8 md:p-10">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Commencez votre parcours numérique aujourd'hui</h3>
              <p className="text-white/80 max-w-xl">Rejoignez des milliers d'étudiants universitaires maîtrisant les compétences numériques</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="rounded-full group">
              <Link to="/signup">
                Commencer
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
