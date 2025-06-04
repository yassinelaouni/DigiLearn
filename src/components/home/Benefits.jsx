import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Users, 
  Medal, 
  Globe, 
  Clock, 
  Cpu, 
  Layers, 
  Monitor, 
  Database, 
  Palette
} from "lucide-react";

// Mock Image URL
const mockImageURL = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80";

// Benefits Data
const benefits = [
  {
    title: "Expérience d'Apprentissage Interactive",
    description: "Interagissez avec du contenu dynamique, des exercices pratiques et des quiz interactifs conçus pour renforcer l'apprentissage.",
    icon: <Lightbulb className="h-6 w-6 text-brand-purple" />,
    color: "bg-brand-purple",
  },
  {
    title: "Instructeurs Universitaires Experts",
    description: "Apprenez auprès de professeurs expérimentés et de professionnels du secteur avec une expertise pratique.",
    icon: <Medal className="h-6 w-6 text-brand-blue" />,
    color: "bg-brand-blue",
  },
  {
    title: "Communauté d'Apprentissage Dynamique",
    description: "Connectez-vous avec d'autres étudiants via des forums de discussion, des projets de groupe et des évaluations par les pairs.",
    icon: <Users className="h-6 w-6 text-brand-green" />,
    color: "bg-brand-green",
  },
  {
    title: "Programme Adapté à l'Industrie",
    description: "Restez à jour avec les compétences numériques de pointe qui correspondent aux exigences et tendances de l'industrie.",
    icon: <Globe className="h-6 w-6 text-brand-orange" />,
    color: "bg-brand-orange",
  },
  {
    title: "Horaires d'Apprentissage Flexibles",
    description: "Étudiez à votre rythme avec un accès 24/7 aux supports de cours et aux conférences enregistrées.",
    icon: <Clock className="h-6 w-6 text-brand-pink" />,
    color: "bg-brand-pink",
  },
  {
    title: "Sujets Numériques de Pointe",
    description: "Explorez les technologies émergentes et les tendances numériques qui façonnent l'avenir de diverses industries.",
    icon: <Cpu className="h-6 w-6 text-brand-yellow" />,
    color: "bg-brand-yellow",
  },
];

// Subjects Data
const subjects = [
  {
    title: "Développement Web",
    description: "HTML, CSS, JavaScript, React, Node.js, et plus encore.",
    icon: <Monitor className="h-12 w-12" />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Science des Données",
    description: "Python, R, Apprentissage Automatique, Visualisation de Données.",
    icon: <Database className="h-12 w-12" />,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Design Thinking",
    description: "UX/UI, Prototypage, Design Visuel, Recherche Utilisateur.",
    icon: <Palette className="h-12 w-12" />,
    color: "from-orange-500 to-amber-600",
  },
  {
    title: "Stratégie Numérique",
    description: "Marketing, Analytique, SEO, Création de Contenu.",
    icon: <Layers className="h-12 w-12" />,
    color: "from-purple-500 to-fuchsia-600",
  },
];

const Benefits = () => {
  return (
    <section className="py-1 md:py-2">
      <div className="container">
        
        {/* Mock Image */}
        <div className="w-full mb-12">
          <img 
            src={mockImageURL} 
            alt="Learning and Technology" 
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold font-display mb-4"
          >
            Pourquoi Choisir Nos Cours de Culture Numérique
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Acquérez des compétences précieuses en littératie numérique grâce à notre approche complète de l'apprentissage en ligne.
          </motion.p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full ${benefit.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
