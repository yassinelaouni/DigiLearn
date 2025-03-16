
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
                Transforming Education for the{" "}
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                  Digital Age
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform bridges the gap between traditional university education and the fast-evolving 
                digital landscape. We prepare students with essential digital literacy skills through expert-led courses 
                designed specifically for university environments.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link to="/courses">
                  Explore Our Courses
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
                alt="Students collaborating in digital learning" 
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
              Our Mission & Vision
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              We're dedicated to empowering university students with the digital competencies they need to thrive
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
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-4">
                To provide accessible, high-quality digital literacy education that equips university students 
                with the skills and knowledge needed to navigate, contribute to, and lead in an increasingly 
                digital world.
              </p>
              <p className="text-muted-foreground">
                We strive to bridge the gap between traditional academic learning and the rapidly evolving 
                digital landscape by offering courses that are academically rigorous, practically relevant, 
                and designed to foster critical thinking about technology's role in society.
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
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground mb-4">
                We envision a world where every university student graduates with the digital competencies 
                necessary for success in their chosen field and the ability to adapt to future technological changes.
              </p>
              <p className="text-muted-foreground">
                Our platform aims to be the leading provider of digital culture education that is integrated 
                with traditional university curricula, creating a new standard for higher education that 
                embraces both academic excellence and practical digital skills development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-purple mb-2">25+</div>
              <p className="text-muted-foreground">Digital Courses</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">18+</div>
              <p className="text-muted-foreground">Expert Instructors</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-green mb-2">5K+</div>
              <p className="text-muted-foreground">Active Students</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">12+</div>
              <p className="text-muted-foreground">Partner Universities</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
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
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Our platform is built by educators, technologists, and digital culture experts committed to educational excellence
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Director of Education",
                image: "https://i.pravatar.cc/300?img=32",
                bio: "Former university professor with expertise in digital literacy and educational technology."
              },
              {
                name: "Michael Chen",
                role: "Head of Technology",
                image: "https://i.pravatar.cc/300?img=12",
                bio: "Tech industry veteran focused on creating accessible learning platforms."
              },
              {
                name: "Dr. Emily Rodriguez",
                role: "Curriculum Designer",
                image: "https://i.pravatar.cc/300?img=5",
                bio: "Specializes in designing courses that bridge academic theory and practical skills."
              },
              {
                name: "David Wilson",
                role: "University Partnerships",
                image: "https://i.pravatar.cc/300?img=15",
                bio: "Works with universities to integrate digital culture courses into traditional curricula."
              }
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
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold font-display mb-4"
            >
              Our University Partners
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              We collaborate with leading institutions to deliver high-quality digital education
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 flex items-center justify-center"
              >
                <div className="w-full h-16 bg-gray-100 rounded flex items-center justify-center animate-pulse">
                  <Building className="h-8 w-8 text-gray-400" />
                </div>
              </motion.div>
            ))}
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
                Ready to Transform Your Digital Literacy?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/90 text-lg mb-8"
              >
                Join thousands of university students already benefiting from our digital culture courses
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" variant="secondary" className="rounded-full">
                  <Link to="/courses">
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
