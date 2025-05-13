
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { Heart, Brain, Watch, Quote, Mail, Phone, MapPin } from "lucide-react";
import HopeLinkLogo from "@/components/HopeLinkLogo";

const Index = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="w-full py-4 px-4 md:px-8 bg-gradient-to-r from-[#007D6E]/90 to-[#5EB47C]/90">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <HopeLinkLogo className="h-10 w-10 text-white" />
            <span className="ml-2 text-2xl font-bold text-white">HopeLink</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0">
            <nav className="flex items-center space-x-6 mr-6 text-white">
              <a href="#why" className="hover:text-white/80 transition-colors">Why?</a>
              <a href="#services" className="hover:text-white/80 transition-colors">Services</a>
              <a href="#contact" className="hover:text-white/80 transition-colors">Contact Us</a>
            </nav>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Login
              </Button>
              <Button className="bg-[#EC744A] hover:bg-[#EC744A]/90 text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 px-4 bg-gradient-to-b from-[#007D6E]/10 to-transparent">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              Transform Mental Health Care with AI & IoT Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Personalized therapeutic progress tracking at your fingertips
            </p>
            <div>
              <Button className="bg-[#EC744A] hover:bg-[#EC744A]/90 text-white text-lg px-8 py-6">
                Get Started
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex justify-center"
          >
            <img 
              src="/placeholder.svg" 
              alt="Doctor with heart icons illustration" 
              className="max-h-96 object-contain"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="container mx-auto mt-12 md:mt-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            {[
              { value: "5,000+", label: "Patients Monitored" },
              { value: "1,200+", label: "Doctors Onboarded" },
              { value: "3,800+", label: "Active Patients" },
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-lg bg-white shadow-md hover-scale">
                <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose HopeLink */}
      <section id="why" className="w-full py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose HopeLink?
            </h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Real-Time Mental Health Progress",
                description: "Track and visualize therapeutic progress with continuous monitoring and feedback.",
                icon: <Heart className="h-12 w-12" />
              },
              {
                title: "AI-Powered Personalization",
                description: "Experience customized therapeutic programs adapted to your unique mental health journey.",
                icon: <Brain className="h-12 w-12" />
              },
              {
                title: "IoT Integration",
                description: "Connect with wearable devices for comprehensive health insights and tracking.",
                icon: <Watch className="h-12 w-12" />
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className={`p-6 hover:shadow-lg transition-all duration-300 hover-scale ${
                  index === 1 ? "transform translate-y-[-8px] shadow-lg border-accent" : ""
                }`}
              >
                <CardContent className="flex flex-col items-center text-center pt-6">
                  <div className={`mb-6 text-${index === 1 ? "accent" : "primary"}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full py-16 md:py-20 px-4 bg-gradient-to-r from-[#007D6E]/10 to-[#5EB47C]/10">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative max-w-4xl mx-auto text-center px-6 py-10"
          >
            <Quote className="absolute top-0 left-0 h-10 w-10 text-accent/50 transform -translate-x-3 -translate-y-3" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700 italic">
              "Self-care is not a luxury. It's a necessity. Without it, we cannot be our best selves, mentally, emotionally, or physically."
            </h2>
            <Quote className="absolute bottom-0 right-0 h-10 w-10 text-accent/50 transform translate-x-3 translate-y-3" />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="services" className="w-full py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              See what doctors and patients are saying about Hopelink's impact
            </h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Psychiatrist",
                image: "/placeholder.svg",
                quote: "HopeLink has transformed how I track patient progress. The real-time data allows me to adjust treatment plans proactively."
              },
              {
                name: "Michael Roberts",
                role: "Patient",
                image: "/placeholder.svg",
                quote: "Being able to see my progress visualized has been motivational. The activities in my program feel personalized to my needs."
              },
              {
                name: "Dr. James Wilson",
                role: "Therapist",
                image: "/placeholder.svg",
                quote: "The IoT integration provides invaluable insights that were previously impossible to collect between sessions."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </Avatar>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                  <Button variant="outline" className="text-primary hover:text-white hover:bg-primary">
                    See Detail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How HopeLink Helps */}
      <section className="w-full py-16 md:py-24 px-4 bg-gradient-to-r from-[#007D6E]/5 to-[#5EB47C]/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex justify-center"
            >
              <img 
                src="/placeholder.svg" 
                alt="Mental health care conversation" 
                className="rounded-lg max-h-96 object-contain"
              />
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                How HopeLink Consultants Can Help...
              </h2>
              <p className="text-gray-700 mb-6">
                HopeLink combines cutting-edge AI technology with IoT devices to deliver personalized therapeutic experiences. Our platform creates a seamless connection between patients and healthcare professionals.
              </p>
              <ul className="space-y-3">
                {[
                  "Personalized therapeutic programs tailored to individual needs",
                  "Real-time insights with smart tracking technology",
                  "Bridging the gap between patients and professionals",
                  "Privacy & security built into every aspect of the platform"
                ].map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent mr-2 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smartwatch + Features */}
      <section className="w-full py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              M5StickC Plus2 Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamless connectivity between wearable technology and your therapeutic journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex justify-center"
            >
              <img 
                src="/placeholder.svg" 
                alt="M5StickC Plus2 smartwatch" 
                className="max-h-96 object-contain"
              />
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="space-y-8">
                {[
                  {
                    title: "Track your health in real-time",
                    description: "Monitor vital signs, activity levels, and stress indicators throughout your day"
                  },
                  {
                    title: "AI-powered health insights",
                    description: "Receive personalized reports and suggestions based on your tracked data"
                  },
                  {
                    title: "Node-based program assignment",
                    description: "Experience a visually guided therapeutic journey with clear milestones"
                  },
                  {
                    title: "Instant synchronization",
                    description: "Updates synced instantly between watch & dashboard for seamless monitoring"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 p-2 bg-accent/10 rounded-full text-accent h-min">
                      <span className="flex items-center justify-center h-8 w-8 text-lg font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="w-full py-16 md:py-24 px-4 bg-gradient-to-b from-[#007D6E]/10 to-transparent">
        <div className="container mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center"
          >
            Contact Us
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-8">
                Have questions about HopeLink? Our team is here to help you navigate the future of mental health care.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-4 text-primary" />
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-4 text-primary" />
                  <span>contact@hopelink.health</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-4 text-primary" />
                  <span>123 Wellness Avenue, San Francisco, CA 94103</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                  <Input id="phone" placeholder="(123) 456-7890" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    className="min-h-[120px]"
                  />
                </div>
                <Button className="w-full bg-[#EC744A] hover:bg-[#EC744A]/90 text-white">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-4 bg-gradient-to-r from-[#007D6E] to-[#5EB47C] text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <HopeLinkLogo className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold">HopeLink</span>
              </div>
              <p className="text-sm text-white/80 mb-4">
                Transforming mental health care through technology, personalization, and continuous support.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Psychotherapy</li>
                <li>Mental Counseling</li>
                <li>Support Groups</li>
                <li>Case Management</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (800) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@hopelink.health
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Wellness Avenue, SF
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['instagram', 'facebook', 'linkedin', 'twitter', 'youtube'].map(social => (
                  <a 
                    href={`#${social}`} 
                    key={social}
                    className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
            <p>Copyright © 2023 @mindfulcare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
