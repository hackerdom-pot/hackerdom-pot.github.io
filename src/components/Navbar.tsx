import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Shield, Hexagon, Network, Code2, Server, Lock, ShieldCheck, ShipWheelIcon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import logo from '/src/images/CUBeeSEC Only Logo.png';

const navItems = {
  Corporate: [
    { name: 'About Us', icon: <ShieldCheck className="w-5 h-5 text-purple-400" />, description: 'Discover our mission and values' },
    { name: 'Why CUBeeSEC', icon: <Hexagon className="w-5 h-5 text-purple-400" />, description: 'Check out our accomplishments' },
  ],
  Services: [{ name: 'Web Application Penetration Testing', icon: <ShieldCheck className="w-5 h-5 text-purple-400" />, description: 'Discover our mission and values' },
    { name: 'API Penetration Testing', icon: <Code2 className="w-5 h-5 text-purple-400" />, description: 'Latest security insights and news' },
    { name: 'Mobile Application Penetration Testing', icon: <Network className="w-5 h-5 text-purple-400" />, description: 'Meet our cybersecurity experts' },
    { name: 'Network Penetration Testing', icon: <Hexagon className="w-5 h-5 text-purple-400" />, description: 'Check out our accomplishments' },
    { name: 'Active Directory Penetration Testing', icon: <Hexagon className="w-5 h-5 text-purple-400" />, description: 'Check out our accomplishments' },
    { name: 'Physical Security Testing', icon: <Hexagon className="w-5 h-5 text-purple-400" />, description: 'Check out our accomplishments' },
  ], // Empty array means no dropdown
  Training: [
    { name: 'Webinars', icon: <Lock className="w-5 h-5 text-purple-400" />, description: 'Learn virtually' },
    { name: 'Workshops', icon: <Server className="w-5 h-5 text-purple-400" />, description: 'Hands-on training sessions' }
  ],
  'Contact Us': []
};

const categoryIcons = {
  Corporate: <Network className="w-6 h-6 text-purple-400" />,
  Services: <Code2 className="w-6 h-6 text-purple-400" />,
  'Why CUBeeSEC?': <ShieldCheck className="w-6 h-6 text-purple-400" />,
  'Contact Us': <Hexagon className="w-6 h-6 text-purple-400" />,
  Training: <ShipWheelIcon className="w-6 h-6 text-purple-400" />,
  Audits: <ShieldCheck className="w-6 h-6 text-purple-400" />,
};

export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const handleDropdownClick = (key: string) => {
    if (activeDropdown === key) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(key);
    }
  };

  const getDropdownPath = (category: string, item: string) => {
    return `/${category.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, '-')}`;
  };

  // Check if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path || 
           location.pathname.startsWith(`${path}/`) ||
           location.pathname === `/${path.toLowerCase().replace(/\s+/g, '-')}`;
  };

  // Check if a dropdown item is active
  const isDropdownItemActive = (category: string, item: string) => {
    const itemPath = getDropdownPath(category, item);
    return location.pathname === itemPath || 
           location.pathname.startsWith(`${itemPath}/`);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'backdrop-blur-md bg-gray-900/80 border-b border-purple-500/20' : 'bg-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="p-1 rounded-full bg-black"
            >
              <img src={logo} className="w-6 h-6 text-white" />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              CUBeeSEC
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {Object.entries(navItems).map(([key, items]) => (
              <div key={key} className="relative">
                {items.length > 0 ? (
                  <>
                    <button
                      onClick={() => handleDropdownClick(key)}
                      onMouseEnter={() => setActiveDropdown(key)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${isScrolled ? 'text-white hover:text-cyan-300' : 'text-white hover:text-cyan-300'} group relative`}
                    >
                      <span className="flex items-center gap-2">
                        {categoryIcons[key as keyof typeof categoryIcons]}
                        <span>{key}</span>
                      </span>
                      {navItems[key as keyof typeof navItems].some(item => 
                        isDropdownItemActive(key, item.name)
                      ) && (
                        <motion.span 
                          layoutId="desktopNavUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
                          className="absolute left-0 mt-2 w-64 lg:w-72 rounded-lg bg-gray-900/95 backdrop-blur-lg border border-purple-400/50 shadow-xl shadow-purple-500/20"
                          style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 90% 100%, 85% 95%, 0 95%)'
                          }}
                          onMouseEnter={() => setActiveDropdown(key)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="p-4 grid grid-cols-1 gap-2">
                            {items.map(({name, icon, description}) => (
                              <Link
                                key={name}
                                to={getDropdownPath(key, name)}
                                onClick={() => setActiveDropdown(null)}
                                className={`group flex items-start gap-3 px-4 py-3 rounded-md hover:bg-purple-900/40 transition-all duration-200 relative ${
                                  isDropdownItemActive(key, name) ? 'bg-purple-900/30' : ''
                                }`}
                                onMouseEnter={() => setHoveredItem(name)}
                                onMouseLeave={() => setHoveredItem(null)}
                              >
                                <motion.div 
                                  whileHover={{ scale: 1.1 }}
                                  className={`p-1.5 rounded-md ${
                                    isDropdownItemActive(key, name) 
                                      ? 'bg-cyan-400/20' 
                                      : 'bg-purple-900/50'
                                  }`}
                                >
                                  {icon}
                                </motion.div>
                                <div>
                                  <span className={`${
                                    isDropdownItemActive(key, name)
                                      ? 'text-cyan-300'
                                      : 'text-white group-hover:text-cyan-300'
                                  } transition-colors font-medium`}>
                                    {name}
                                  </span>
                                  <AnimatePresence>
                                    {hoveredItem === name && (
                                      <motion.p 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-xs lg:text-sm text-gray-300 mt-1"
                                      >
                                        {description}
                                      </motion.p>
                                    )}
                                  </AnimatePresence>
                                </div>
                                {isDropdownItemActive(key, name) && (
                                  <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan-400"></div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={`/${key.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                      isScrolled ? 'text-white hover:text-cyan-300' : 'text-white hover:text-cyan-300'
                    } group relative`}
                  >
                    <span className="flex items-center gap-2">
                      {categoryIcons[key as keyof typeof categoryIcons]}
                      <span>{key}</span>
                    </span>
                    {isActive(`/${key.toLowerCase().replace(/\s+/g, '-')}`) && (
                      <motion.span 
                        layoutId="desktopNavUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-purple-400 hover:text-white' : 'text-white hover:text-cyan-300'
              } hover:bg-purple-900/30 focus:outline-none transition-all`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className={`px-4 pt-2 pb-4 space-y-2 bg-gray-900/95 backdrop-blur-lg border-t border-purple-400/50`}>
              {Object.entries(navItems).map(([key, items]) => (
                <div key={key} className="space-y-1">
                  {items.length > 0 ? (
                    <>
                      <button
                        className={`w-full text-left px-3 py-3 text-base font-medium flex items-center justify-between rounded-lg ${
                          isActive(`/${key.toLowerCase().replace(/\s+/g, '-')}`)
                            ? 'text-cyan-300 bg-purple-900/40'
                            : 'text-white hover:bg-purple-900/40'
                        } transition-all`}
                        onClick={() => handleDropdownClick(key)}
                      >
                        <div className="flex items-center gap-3">
                          {categoryIcons[key as keyof typeof categoryIcons]}
                          <span>{key}</span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transform transition-transform ${
                            activeDropdown === key ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === key && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-10 space-y-2"
                          >
                            {items.map(({name, icon, description}) => (
                              <Link
                                key={name}
                                to={getDropdownPath(key, name)}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`block px-3 py-2.5 rounded-md flex items-center gap-3 ${
                                  isDropdownItemActive(key, name)
                                    ? 'text-cyan-300 bg-purple-900/40'
                                    : 'text-gray-300 hover:text-cyan-300 hover:bg-purple-900/40'
                                } transition-all`}
                              >
                                <div className={`p-1 rounded-md ${
                                  isDropdownItemActive(key, name)
                                    ? 'bg-cyan-400/20'
                                    : 'bg-purple-900/50'
                                }`}>
                                  {icon}
                                </div>
                                <div>
                                  <span className="block">{name}</span>
                                  <p className="text-xs text-gray-400 mt-1">{description}</p>
                                </div>
                                {isDropdownItemActive(key, name) && (
                                  <div className="ml-auto w-1 h-6 bg-cyan-400 rounded-full"></div>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={`/${key.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`w-full text-left px-3 py-3 text-base font-medium flex items-center gap-3 rounded-lg ${
                        isActive(`/${key.toLowerCase().replace(/\s+/g, '-')}`)
                          ? 'text-cyan-300 bg-purple-900/40'
                          : 'text-white hover:bg-purple-900/40'
                      } transition-all`}
                    >
                      {categoryIcons[key as keyof typeof categoryIcons]}
                      <span>{key}</span>
                      {isActive(`/${key.toLowerCase().replace(/\s+/g, '-')}`) && (
                        <div className="ml-auto w-1 h-6 bg-cyan-400 rounded-full"></div>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
