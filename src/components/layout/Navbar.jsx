'use client';

import { motion } from 'framer-motion';
import { Github, Home, Search, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center shadow-glow">
                <Zap size={20} className="text-white" />
              </div>
              <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">Shadow Stats</h1>
              <p className="text-xs text-purple-400">GitHub Analytics</p>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg
                    transition-all duration-300 relative group
                    ${isActive 
                      ? 'text-purple-400 bg-purple-500/10' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-purple-500/10 rounded-lg border border-purple-500/30"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* GitHub Link */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center space-x-2 px-4 py-2 
              bg-gray-800 hover:bg-gray-700 
              text-gray-300 hover:text-white
              rounded-lg border border-gray-700
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-purple-500/50
            "
          >
            <Github size={18} />
            <span className="hidden sm:inline font-medium">GitHub</span>
          </motion.a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-center space-x-6 pb-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center space-y-1 p-2 rounded-lg
                  transition-all duration-300
                  ${isActive 
                    ? 'text-purple-400' 
                    : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                <item.icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Animated border */}
      <motion.div
        animate={{
          scaleX: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />
    </motion.nav>
  );
};

export default Navbar;