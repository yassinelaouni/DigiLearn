
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

const benefits = [
  {
    title: "Interactive Learning Experience",
    description: "Engage with dynamic content, hands-on exercises, and interactive quizzes designed to reinforce learning",
    icon: <Lightbulb className="h-6 w-6 text-brand-purple" />,
    color: "bg-brand-purple",
  },
  {
    title: "Expert University Instructors",
    description: "Learn from experienced professors and industry professionals with real-world expertise",
    icon: <Medal className="h-6 w-6 text-brand-blue" />,
    color: "bg-brand-blue",
  },
  {
    title: "Vibrant Learning Community",
    description: "Connect with fellow students through discussion forums, group projects, and peer reviews",
    icon: <Users className="h-6 w-6 text-brand-green" />,
    color: "bg-brand-green",
  },
  {
    title: "Industry-Relevant Curriculum",
    description: "Stay current with cutting-edge digital skills that align with industry demands and trends",
    icon: <Globe className="h-6 w-6 text-brand-orange" />,
    color: "bg-brand-orange",
  },
  {
    title: "Flexible Learning Schedule",
    description: "Study at your own pace with 24/7 access to course materials and recorded lectures",
    icon: <Clock className="h-6 w-6 text-brand-pink" />,
    color: "bg-brand-pink",
  },
  {
    title: "Cutting-Edge Digital Topics",
    description: "Explore emerging technologies and digital trends shaping the future of various industries",
    icon: <Cpu className="h-6 w-6 text-brand-yellow" />,
    color: "bg-brand-yellow",
  },
];

const subjects = [
  {
    title: "Web Development",
    description: "HTML, CSS, JavaScript, React, Node.js, and more",
    icon: <Monitor className="h-12 w-12" />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Data Science",
    description: "Python, R, Machine Learning, Data Visualization",
    icon: <Database className="h-12 w-12" />,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Design Thinking",
    description: "UX/UI, Prototyping, Visual Design, User Research",
    icon: <Palette className="h-12 w-12" />,
    color: "from-orange-500 to-amber-600",
  },
  {
    title: "Digital Strategy",
    description: "Marketing, Analytics, SEO, Content Creation",
    icon: <Layers className="h-12 w-12" />,
    color: "from-purple-500 to-fuchsia-600",
  },
];

const Benefits = () => {
  return (
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
            Why Choose Our Digital Culture Courses
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Gain valuable digital literacy skills with our comprehensive approach to e-learning
          </motion.p>
        </div>
        
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
        
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold font-display mb-4"
            >
              Explore Digital Culture Subjects
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Discover diverse topics essential for thriving in the digital age
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-75 transition-opacity group-hover:opacity-100 animate-pulse-soft"
                  style={{ 
                    background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` 
                  }}
                ></div>
                <div className="relative z-10 rounded-2xl overflow-hidden">
                  <div className="text-white p-8 flex flex-col items-center text-center">
                    <div className="mb-4">
                      {subject.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{subject.title}</h3>
                    <p className="text-sm text-white/80">{subject.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
