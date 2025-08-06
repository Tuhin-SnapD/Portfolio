"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Heart } from 'lucide-react'

// HackerRank icon component
const HackerRankIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c1.285 0 9.75.119 11.479.149.378.006.521.186.521 1.351v20.999c0 1.166-.143 1.345-.521 1.351C21.75 23.881 13.285 24 12 24s-9.75-.119-11.479-.149C.143 23.845 0 23.665 0 22.5V1.5C0 .334.143 .155.521.149C2.25.119 10.715 0 12 0zm5.098 8.267c-.129-.018-.195-.018-.195-.018s-.066 0-.195.018c-.129.018-.195.129-.195.195v7.076c0 .066.066.129.195.195.129.018.195.018.195.018s.066 0 .195-.018c.129-.066.195-.129.195-.195V8.462c0-.066-.066-.177-.195-.195zM7.902 8.267c-.129-.018-.195-.018-.195-.018s-.066 0-.195.018c-.129.018-.195.129-.195.195v7.076c0 .066.066.129.195.195.129.018.195.018.195.018s.066 0 .195-.018c.129-.066.195-.129.195-.195V8.462c0-.066-.066-.177-.195-.195z"/>
  </svg>
)

const socialLinks = [
  {
    icon: Github,
    name: 'GitHub',
    url: 'https://github.com/Tuhin-SnapD',
    color: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    icon: Linkedin,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tuhin-chakrabarty-1074aa19b/',
    color: 'hover:text-blue-600'
  },
  {
    icon: HackerRankIcon,
    name: 'HackerRank',
    url: 'https://www.hackerrank.com/profile/tuhinchakrabart1',
    color: 'hover:text-green-600'
  }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text">Tuhin Chakrabarty</h3>
            <p className="text-muted-foreground max-w-md">
              Full-Stack Developer | AI/ML Engineer | Software Engineer at Bank of America. 
              Passionate about modern web technologies, machine learning, and scalable applications.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`p-2 rounded-lg glass-effect transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Tuhin Chakrabarty. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> using Next.js & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 