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
    title: "Interactive Learning Experience",
    description: "Engage with dynamic content, hands-on exercises, and interactive quizzes designed to reinforce learning.",
    icon: <Lightbulb className="h-6 w-6 text-brand-purple" />,
    color: "bg-brand-purple",
  },
  {
    title: "Expert University Instructors",
    description: "Learn from experienced professors and industry professionals with real-world expertise.",
    icon: <Medal className="h-6 w-6 text-brand-blue" />,
    color: "bg-brand-blue",
  },
  {
    title: "Vibrant Learning Community",
    description: "Connect with fellow students through discussion forums, group projects, and peer reviews.",
    icon: <Users className="h-6 w-6 text-brand-green" />,
    color: "bg-brand-green",
  },
  {
    title: "Industry-Relevant Curriculum",
    description: "Stay current with cutting-edge digital skills that align with industry demands and trends.",
    icon: <Globe className="h-6 w-6 text-brand-orange" />,
    color: "bg-brand-orange",
  },
  {
    title: "Flexible Learning Schedule",
    description: "Study at your own pace with 24/7 access to course materials and recorded lectures.",
    icon: <Clock className="h-6 w-6 text-brand-pink" />,
    color: "bg-brand-pink",
  },
  {
    title: "Cutting-Edge Digital Topics",
    description: "Explore emerging technologies and digital trends shaping the future of various industries.",
    icon: <Cpu className="h-6 w-6 text-brand-yellow" />,
    color: "bg-brand-yellow",
  },
];

// Subjects Data
const subjects = [
  {
    title: "Web Development",
    description: "HTML, CSS, JavaScript, React, Node.js, and more.",
    icon: <Monitor className="h-12 w-12" />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Data Science",
    description: "Python, R, Machine Learning, Data Visualization.",
    icon: <Database className="h-12 w-12" />,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Design Thinking",
    description: "UX/UI, Prototyping, Visual Design, User Research.",
    icon: <Palette className="h-12 w-12" />,
    color: "from-orange-500 to-amber-600",
  },
  {
    title: "Digital Strategy",
    description: "Marketing, Analytics, SEO, Content Creation.",
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
            Why Choose Our Digital Culture Courses
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Gain valuable digital literacy skills with our comprehensive approach to e-learning.
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
