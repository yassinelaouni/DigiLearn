import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Award, BookOpen, Globe, Building } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
                Transformer l'éducation pour l'{" "}
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                  ère numérique
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Notre plateforme comble le fossé entre l'éducation universitaire traditionnelle et le paysage numérique en évolution rapide.
                Nous préparons les étudiants aux compétences essentielles en littératie numérique grâce à des cours dirigés par des experts,
                conçus spécifiquement pour les environnements universitaires.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link to="/courses">
                  Explorer nos cours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80"
                alt="Étudiants collaborant dans l'apprentissage numérique"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold font-display mb-4"
            >
              Notre mission et vision
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Nous nous engageons à donner aux étudiants universitaires les compétences numériques dont ils ont besoin pour réussir
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Notre mission</h3>
              <p className="text-muted-foreground mb-4">
                Fournir une éducation à la littératie numérique accessible et de haute qualité qui dote les étudiants universitaires
                des compétences et des connaissances nécessaires pour naviguer, contribuer et diriger dans un monde de plus en plus
                numérique.
              </p>
              <p className="text-muted-foreground">
                Nous nous efforçons de combler le fossé entre l'apprentissage universitaire traditionnel et le paysage numérique
                en évolution rapide en offrant des cours académiquement rigoureux, pratiquement pertinents et conçus pour favoriser
                la pensée critique sur le rôle de la technologie dans la société.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Notre vision</h3>
              <p className="text-muted-foreground mb-4">
                Nous envisageons un monde où chaque étudiant universitaire obtient son diplôme avec les compétences numériques
                nécessaires pour réussir dans le domaine de son choix et la capacité de s'adapter aux futurs changements technologiques.
              </p>
              <p className="text-muted-foreground">
                Notre plateforme vise à être le principal fournisseur d'éducation à la culture numérique intégrée
                aux programmes universitaires traditionnels, créant ainsi une nouvelle norme pour l'enseignement supérieur qui
                englobe à la fois l'excellence académique et le développement de compétences numériques pratiques.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Centered */}
      <section className="py-1 md:py-1 bg-gray-50">
        <div className="container">
          <div className="flex flex-col items-center">
            {/* Team Section - Centered */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold font-display mb-4"
              >
                Rencontrez notre équipe
              </motion.h2>
              {/* <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Notre plateforme est construite par des technologues et des experts en culture numérique engagés envers l'excellence éducative
              </motion.p> */}
            </div>

            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-8 max-w-4xl w-1/2">
                {[
                  {
                    name: "Yassine EL AOUNI",
                    role: "Étudiant en génie logiciel et IA",
                    image: "/yassine.png",
                  },
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                      <p className="text-brand-purple font-medium text-sm mb-3">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-purple to-brand-blue p-8 md:p-12">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white font-display mb-6"
              >
                Prêt à transformer votre littératie numérique ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/90 text-lg mb-8"
              >
                Rejoignez des milliers d'étudiants universitaires qui bénéficient déjà de nos cours de culture numérique
              </motion.p>
            </div>
            {/* Button and decorative elements - not translated as they are covered by previous edits or are decorative */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
