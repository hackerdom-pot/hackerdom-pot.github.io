import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Video, Award, Shield, Lock, Code, Globe, BookOpen, GraduationCap, Network, ShieldCheck, Handshake, Rocket } from 'lucide-react';

// Type definitions
interface Webinar {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  speakerTitle: string;
  description: string;
  category: string;
  recordingAvailable: boolean;
  attendees: number;
  image: string;
  topics: string[];
}
const mobileNumber = '+919876543210';
interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

interface WebinarCardProps {
  webinar: Webinar;
  expanded: boolean;
  onClick: () => void;
}

interface MissionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

// Custom font style
const fontStyle = {
  fontFamily: '"Rajdhani", "Arial Narrow", sans-serif',
  fontWeight: 700,
  letterSpacing: '0.05em'
};

// Webinar data
const webinars: Webinar[] = [
  {
    id: 1,
    title: "Zero-Day Exploits: Defense Strategies",
    date: "2023-11-15",
    time: "18:00",
    duration: "90 mins",
    speaker: "Dr. Sarah Chen",
    speakerTitle: "Chief Security Architect, FortiGuard",
    description: "Learn advanced techniques to protect against unknown vulnerabilities with real-world case studies from recent attacks.",
    category: "advanced",
    recordingAvailable: true,
    attendees: 1245,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
    topics: ["Zero-day vulnerabilities", "Patch management", "Threat intelligence", "Incident response"]
  },
  {
    id: 2,
    title: "Ethical Hacking 101",
    date: "2023-11-22",
    time: "16:00",
    duration: "120 mins",
    speaker: "James Rodriguez",
    speakerTitle: "Senior Penetration Tester, Bugcrowd",
    description: "Introduction to ethical hacking methodologies and hands-on exercises with our virtual lab environment.",
    category: "beginner",
    recordingAvailable: false,
    attendees: 0,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
    topics: ["Penetration testing", "Vulnerability assessment", "Security tools", "Legal considerations"]
  },
  {
    id: 3,
    title: "Cloud Security Masterclass",
    date: "2023-12-05",
    time: "14:00",
    duration: "150 mins",
    speaker: "Priya Patel",
    speakerTitle: "AWS Security Lead",
    description: "Comprehensive guide to securing cloud infrastructure across AWS, Azure and GCP platforms.",
    category: "intermediate",
    recordingAvailable: false,
    attendees: 0,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
    topics: ["Cloud architecture", "IAM policies", "Data encryption", "Compliance frameworks"]
  },
  {
    id: 4,
    title: "Career Pathways in Cybersecurity",
    date: "2023-12-12",
    time: "17:30",
    duration: "60 mins",
    speaker: "Michael Johnson",
    speakerTitle: "CISO, Global Bank Corp",
    description: "Panel discussion with industry leaders about building successful careers in cybersecurity.",
    category: "all-levels",
    recordingAvailable: false,
    attendees: 0,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    topics: ["Career growth", "Certifications", "Industry trends", "Networking strategies"]
  }
];

const categories: Category[] = [
  { id: 'all', name: 'All Webinars', icon: Video },
  { id: 'beginner', name: 'Beginner', icon: Shield },
  { id: 'intermediate', name: 'Intermediate', icon: Lock },
  { id: 'advanced', name: 'Advanced', icon: Code },
  { id: 'all-levels', name: 'All Levels', icon: Globe }
];

const MissionCard: React.FC<MissionCardProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)" }}
  >
    <div className="bg-purple-600/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-7 h-7 text-purple-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role, avatar }) => (
  <motion.div 
    className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 backdrop-blur-sm"
    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)" }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h4 className="text-white font-semibold">{name}</h4>
        <p className="text-purple-400 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-gray-300 italic">"{quote}"</p>
  </motion.div>
);

const WebinarCard: React.FC<WebinarCardProps> = ({ webinar, expanded, onClick } ) => (
  <motion.div
    className={`overflow-hidden rounded-xl border ${expanded ? 'border-purple-500' : 'border-gray-800'} bg-gray-900/50 backdrop-blur-sm`}
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative">
      <img 
        src={webinar.image} 
        alt={webinar.title} 
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-xl font-bold text-white">{webinar.title}</h3>
        <div className="flex items-center text-sm text-purple-300 mt-1">
          <Users className="w-4 h-4 mr-1" />
          <span>{webinar.attendees} attendees</span>
        </div>
      </div>
      {webinar.recordingAvailable && (
        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">

        </div>
      )}
    </div>

    <motion.div
      className="p-4"
      layout
      animate={{ height: expanded ? 'auto' : 'auto' }}
    >
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-300">
          <Calendar className="w-5 h-5 mr-2 text-purple-400" />
          <span>{new Date(webinar.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Clock className="w-5 h-5 mr-2 text-purple-400" />
          <span>{webinar.time} ({webinar.duration})</span>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{webinar.description}</p>

      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h4 className="text-white font-medium">{webinar.speaker}</h4>
          <p className="text-purple-300 text-sm">{webinar.speakerTitle}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button 
          className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          onClick={onClick}
        >
          {expanded ? 'Show Less' : 'Learn More'}
        </button>
        
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-800"
        >
          <h4 className="text-white font-medium mb-2">Key Topics Covered:</h4>
          <ul className="text-gray-300 space-y-2">
            {webinar.topics.map((topic, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-400 mr-2">✓</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  </motion.div>
);

const Whychooseus: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedWebinar, setExpandedWebinar] = useState<number | null>(null);

  const filteredWebinars = selectedCategory === 'all' 
    ? webinars 
    : webinars.filter(webinar => webinar.category === selectedCategory);

  const toggleWebinar = (id: number) => {
    setExpandedWebinar(expandedWebinar === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden bg-gradient-to-b from-purple-900/10 to-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="inline-block mb-6"
            >
              <div className="bg-purple-600/20 px-4 py-2 rounded-full border border-purple-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-purple-300" />
                <span className="text-purple-300 font-medium">Security is not anymore A Option</span>
              </div>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              style={fontStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We Break. We Play. <span className="text-purple-400">We Fix.</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Shaping the future of cybersecurity by empowering professionals through hands-on learning real-world challenges, and community-driven growth
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center gap-4"
            >
              
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-4"
              style={fontStyle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              OUR <span className="text-purple-400">MISSION</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              At CUBeeSEC, we’re not just another cybersecurity group—we’re a movement. A place where curious minds come to learn, share, and challenge the limits of security.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MissionCard 
              icon={BookOpen} 
              title="Community First" 
              description="Join a thriving network of hackers, learners, and professionals who believe in growing together."
              delay={0}
            />
            <MissionCard 
              icon={Network} 
              title="Knowledge Without Barriers" 
              description="Webinars, live sessions, and real-world case studies designed to keep you ahead of threats."
              delay={1}
            />
            <MissionCard 
              icon={GraduationCap} 
              title="Mentorship That Matters" 
              description="Direct guidance from industry experts bridging the gap between learning and doing."
              delay={2}
            />
            <MissionCard 
              icon={Handshake} 
              title="Collaboration at Scale" 
              description="Team up with like-minded individuals to solve real-world cybersecurity challenges."
              delay={3}
            />
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-4"
              style={fontStyle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              WHAT WE <span className="text-purple-400">Focus</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our entire cybersecurity spectrum, from fundamentals to cutting-edge research.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Vulnerability Assessment", "Penetration Testing", "Web Application Security", 
              "Mobile Application Security", "IoT Security", "Network Security",
              "Wireless Security", "Compliance Audits", "Red Teaming Assessments", "Career Growth"
            ].map((topic, index) => (
              <motion.div
                key={topic}
                className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(168, 85, 247, 0.2)" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="bg-purple-600/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-white font-medium">{topic}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Whychooseus;