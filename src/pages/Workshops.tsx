import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Code, Terminal, Cpu, Shield, Lock, Server, Key, Bug, Network, Zap, Database, ShieldCheck, FlaskConical, Rocket, Laptop2, Binary, Fingerprint,Flag, Award } from 'lucide-react';

// Type definitions
interface Workshop {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  instructorTitle: string;
  description: string;
  level: string;
  recordingAvailable: boolean;
  attendees: number;
  image: string;
  topics: string[];
  requirements: string[];
  labEnvironment: string;
  certification: boolean;
}

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

interface WorkshopCardProps {
  workshop: Workshop;
  expanded: boolean;
  onClick: () => void;
}

interface ValueCardProps {
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

// Workshop data
const workshops: Workshop[] = [
  {
    id: 1,
    title: "Penetration Testing Bootcamp",
    date: "2023-11-18",
    time: "10:00",
    duration: "4 hours",
    instructor: "Gokul",
    instructorTitle: "CEO & Founder of CUBeeSEC",
    description: "Hands-on penetration testing workshop using Kali Linux. Perform real attacks in our controlled lab environment and learn defensive techniques.",
    level: "intermediate",
    recordingAvailable: false,
    attendees: 24,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
    topics: [
      "Network scanning with Nmap",
      "Exploiting vulnerabilities",
      "Privilege escalation",
      "Writing comprehensive reports"
    ],
    requirements: [
      "Basic Linux knowledge",
      "Laptop with 8GB+ RAM",
      "VirtualBox installed"
    ],
    labEnvironment: "Custom Kali Linux VM with vulnerable targets",
    certification: true
  },
  {
    id: 2,
    title: "Malware Analysis Fundamentals",
    date: "2023-11-25",
    time: "13:00",
    duration: "3 hours",
    instructor: "Gokul",
    instructorTitle: "CEO & Founder of CUBeeSEC",
    description: "Learn to analyze real malware samples safely in our isolated lab environment. Understand behavior analysis and reverse engineering basics.",
    level: "advanced",
    recordingAvailable: false,
    attendees: 18,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
    topics: [
      "Static vs dynamic analysis",
      "Using IDA Pro Free",
      "Sandbox environments",
      "Malware behavior patterns"
    ],
    requirements: [
      "Windows/Linux laptop",
      "Basic programming knowledge",
      "4GB+ RAM recommended"
    ],
    labEnvironment: "FLARE VM with analysis tools",
    certification: true
  },
  {
    id: 3,
    title: "Cloud Security Hands-on Lab",
    date: "2023-12-02",
    time: "09:30",
    duration: "5 hours",
    instructor: "Gokul",
    instructorTitle: "CEO & Founder of CUBeeSEC",
    description: "Practical workshop securing cloud infrastructure. Configure security groups, IAM policies, and monitor threats in real-time.",
    level: "intermediate",
    recordingAvailable: false,
    attendees: 0,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
    topics: [
      "IAM policy creation",
      "Security Hub configuration",
      "GuardDuty implementation",
      "CloudTrail logging"
    ],
    requirements: [
      "AWS free tier account",
      "Basic cloud knowledge",
      "Laptop with modern browser"
    ],
    labEnvironment: "Live AWS environment with test resources",
    certification: false
  },
  {
    id: 4,
    title: "CTF Preparation Workshop",
    date: "2023-12-09",
    time: "14:00",
    duration: "6 hours",
    instructor: "Gokul",
    instructorTitle: "CEO & Founder of CUBeeSEC",
    description: "Intensive Capture The Flag preparation covering web exploits, forensics, cryptography, and binary reversing.",
    level: "all-levels",
    recordingAvailable: false,
    attendees: 0,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    topics: [
      "Web application vulnerabilities",
      "Steganography techniques",
      "Cryptography challenges",
      "Binary exploitation"
    ],
    requirements: [
      "Linux or Windows laptop",
      "Python basics",
      "Curiosity to learn"
    ],
    labEnvironment: "Custom CTF platform with challenges",
    certification: false
  }
];

const categories: Category[] = [
  { id: 'all', name: 'All Workshops', icon: Terminal },
  { id: 'beginner', name: 'Beginner', icon: Shield },
  { id: 'intermediate', name: 'Intermediate', icon: Lock },
  { id: 'advanced', name: 'Advanced', icon: Code },
  { id: 'all-levels', name: 'All Levels', icon: Server }
];

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description, delay }) => (
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

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, expanded, onClick }) => (
  <motion.div
    className={`overflow-hidden rounded-xl border ${expanded ? 'border-purple-500' : 'border-gray-800'} bg-gray-900/50 backdrop-blur-sm`}
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative">
      <img 
        src={workshop.image} 
        alt={workshop.title} 
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-xl font-bold text-white">{workshop.title}</h3>
        <div className="flex items-center text-sm text-purple-300 mt-1">
          <Users className="w-4 h-4 mr-1" />
          <span>{workshop.attendees} spots filled</span>
          {workshop.certification && (
            <span className="ml-3 flex items-center">
              <Award className="w-4 h-4 mr-1" />
              <span>Certificate</span>
            </span>
          )}
        </div>
      </div>
      {workshop.recordingAvailable && (
        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
          Recording Available
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
          <span>{new Date(workshop.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Clock className="w-5 h-5 mr-2 text-purple-400" />
          <span>{workshop.time} ({workshop.duration})</span>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{workshop.description}</p>

      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h4 className="text-white font-medium">{workshop.instructor}</h4>
          <p className="text-purple-300 text-sm">{workshop.instructorTitle}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button 
          className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          onClick={onClick}
        >
          {expanded ? 'Show Less' : 'Learn More'}
        </button>
        {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          {workshop.attendees > 0 ? 'Join Waitlist' : 'Register Now'}
        </button> */}
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-800 space-y-4"
        >
          <div>
            <h4 className="text-white font-medium mb-2">Key Topics Covered:</h4>
            <ul className="text-gray-300 space-y-2">
              {workshop.topics.map((topic, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Lab Environment:</h4>
            <p className="text-gray-300 flex items-start">
              <Laptop2 className="w-5 h-5 text-purple-400 mr-2 mt-0.5" />
              <span>{workshop.labEnvironment}</span>
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Requirements:</h4>
            <ul className="text-gray-300 space-y-2">
              {workshop.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  </motion.div>
);

const WorkshopsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedWorkshop, setExpandedWorkshop] = useState<number | null>(null);

  const filteredWorkshops = selectedCategory === 'all' 
    ? workshops 
    : workshops.filter(workshop => workshop.level === selectedCategory);

  const toggleWorkshop = (id: number) => {
    setExpandedWorkshop(expandedWorkshop === id ? null : id);
  };
  const handleExploreWorkshopsClick = () => {
    const workshopsSection = document.getElementById('workshops-grid');
    if (workshopsSection) {
      workshopsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden bg-gradient-to-b from-purple-900/10 to-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
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
                <Terminal className="w-5 h-5 mr-2 text-purple-300" />
                <span className="text-purple-300 font-medium">CUBeeSEC HANDS-ON LABS</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              style={fontStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Learn. <span className="text-purple-400">Practice.</span> Master.
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Gain real-world cybersecurity skills through immersive, hands-on workshops in our virtual labs
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center gap-4"
            >
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center" onClick={() => { window.location.href = 'https://www.linkedin.com/company/cubeesec-securities' ; }}>
                <Rocket className="w-5 h-5 mr-2" />
                Join Us
              </button>
              <button
      className="bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500/10 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
      onClick={handleExploreWorkshopsClick}
    >
      <FlaskConical className="w-5 h-5 mr-2" />
      Explore Workshops
    </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Workshops Section */}
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
              WHY <span className="text-purple-400">HANDS-ON WORKSHOPS?</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Cybersecurity is a practical discipline. At CUBeeSEC, we believe real skills come from doing, not just watching.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon={Zap} 
              title="Practical Experience" 
              description="Our workshops provide real-world scenarios you won't find in textbooks or lectures."
              delay={0}
            />
            <ValueCard 
              icon={Bug} 
              title="Safe Environment" 
              description="Practice offensive and defensive techniques in our controlled, isolated lab environments."
              delay={1}
            />
            <ValueCard 
              icon={Network} 
              title="Immediate Feedback" 
              description="Get instant feedback from instructors and peers as you work through challenges."
              delay={2}
            />
            <ValueCard 
              icon={Database} 
              title="Tool Proficiency" 
              description="Become fluent with industry-standard tools through guided practice."
              delay={3}
            />
            <ValueCard 
              icon={Fingerprint} 
              title="Problem Solving" 
              description="Develop critical thinking by troubleshooting real security issues."
              delay={4}
            />
            <ValueCard 
              icon={Binary} 
              title="Career Readiness" 
              description="Gain the practical skills employers actually look for in candidates."
              delay={5}
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
              WORKSHOP <span className="text-purple-400">CATEGORIES</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our workshops cover the full spectrum of cybersecurity disciplines with practical exercises.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Pen Testing", icon: Bug },
              { name: "Malware Analysis", icon: Cpu },
              { name: "Cloud Security", icon: Server },
              { name: "Forensics", icon: Fingerprint },
              { name: "Cryptography", icon: Key },
              { name: "Web Security", icon: Shield },
              { name: "Network Defense", icon: Network },
              { name: "Threat Hunting", icon: Zap },
              { name: "IoT Security", icon: Database },
              { name: "CTF Training", icon: Flag }
            ].map(({ name, icon: Icon }, index) => (
              <motion.div
                key={name}
                className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(168, 85, 247, 0.2)" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="bg-purple-600/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-white font-medium">{name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 bg-black sticky top-0 z-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section id="workshops-grid" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            style={fontStyle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ margin: "-100px" }}
          >
            {selectedCategory === 'all' 
              ? 'UPCOMING HANDS-ON WORKSHOPS' 
              : `${selectedCategory.toUpperCase()} LEVEL WORKSHOPS`}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredWorkshops.map((workshop) => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  expanded={expandedWorkshop === workshop.id}
                  onClick={() => toggleWorkshop(workshop.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            style={fontStyle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ margin: "-100px" }}
          >
            FROM OUR <span className="text-purple-400">PARTICIPANTS</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The malware analysis workshop gave me practical skills I used in my internship the very next week!"
              name="Emily Zhang"
              role="Security Intern"
              avatar="https://randomuser.me/api/portraits/women/65.jpg"
            />
            <TestimonialCard
              quote="I landed my first cybersecurity job after completing three CUBeeSEC workshops - the hands-on experience was crucial."
              name="David Wilson"
              role="Junior Security Analyst"
              avatar="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <TestimonialCard
              quote="As an instructor, I'm impressed by how quickly students progress when they have proper lab environments to practice in."
              name="Prof. Michael Johnson"
              role="Cybersecurity Program Director"
              avatar="https://randomuser.me/api/portraits/men/75.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ margin: "-100px" }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 3 
              }}
              className="inline-block mb-6"
            >
              <Terminal className="w-16 h-16 text-purple-400 mx-auto" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-6" style={fontStyle}>
              READY TO <span className="text-purple-400">GET YOUR HANDS DIRTY?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our hands-on workshops and gain the practical skills employers are looking for.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <FlaskConical className="w-5 h-5 mr-2" />
                VIEW WORKSHOP SCHEDULE
              </button>
              <button className="bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 mr-2" />
                ENTER PRACTICE LABS
              </button> */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;