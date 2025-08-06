'use client';

import { motion } from 'framer-motion';
import { Github, Heart, Zap, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    {
      title: 'Project',
      items: [
        { name: 'GitHub Repository', href: siteConfig.github, external: true },
        { name: 'Documentation', href: '#', external: false },
        { name: 'API Reference', href: '#', external: false },
      ],
    },
    {
      title: 'Resources',
      items: [
        { name: 'GitHub API', href: 'https://docs.github.com/en/rest', external: true },
        { name: 'Next.js', href: 'https://nextjs.org', external: true },
        { name: 'Tailwind CSS', href: 'https://tailwindcss.com', external: true },
      ],
    },
    {
      title: 'Connect',
      items: [
        { name: 'GitHub', href: 'https://github.com', external: true },
        { name: 'Twitter', href: 'https://twitter.com', external: true },
        { name: 'LinkedIn', href: 'https://linkedin.com', external: true },
      ],
    },
  ];

  return (
    <footer className="bg-black/50 border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center shadow-glow">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Shadow Stats</h3>
                <p className="text-sm text-purple-400">GitHub Analytics</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {siteConfig.description}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart size={14} className="text-red-400 animate-pulse" />
              <span>by {siteConfig.author}</span>
            </div>
          </motion.div>

          {/* Links Sections */}
          {links.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <motion.a
                        whileHover={{ x: 5 }}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          text-gray-400 hover:text-purple-400 
                          text-sm transition-colors duration-200
                          flex items-center space-x-1 group
                        "
                      >
                        <span>{item.name}</span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    ) : (
                      <Link
                        href={item.href}
                        className="
                          text-gray-400 hover:text-purple-400 
                          text-sm transition-colors duration-200
                          block hover:translate-x-1 transform transition-transform
                        "
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>&copy; {currentYear} {siteConfig.author}. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-gray-400 hover:text-white
                p-2 rounded-lg hover:bg-gray-800/50
                transition-all duration-200
              "
            >
              <Github size={20} />
            </motion.a>
            
            <div className="text-xs text-gray-500 flex items-center space-x-2">
              <span>Powered by</span>
              <span className="text-purple-400 font-medium">GitHub API</span>
              <span>&</span>
              <span className="text-blue-400 font-medium">Vercel</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-32 -right-32 w-48 h-48 bg-blue-500 rounded-full blur-3xl"
        />
      </div>
    </footer>
  );
};

export default Footer;