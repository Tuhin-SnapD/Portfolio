"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { initEmailJS, sendEmail } from '@/lib/emailjs'

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

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'tuhinchakrabarty14@gmail.com',
    link: 'mailto:tuhinchakrabarty14@gmail.com'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'GIFT City, India',
    link: '#'
  },
  {
    icon: MapPin,
    title: 'Portfolio-Simplified',
    value: 'tuhin-dev.lovable.app',
    link: 'https://tuhin-dev.lovable.app/'
  }
]

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

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS()
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      const result = await sendEmail(data)
      
      if (result.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.')
        reset()
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let&apos;s work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Send me a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Your name"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your.email@example.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      {...register('subject')}
                      placeholder="What's this about?"
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="glass-effect hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <a
                        href={info.link}
                        className="flex items-center gap-4 group"
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{info.title}</h4>
                          <p className="text-muted-foreground">{info.value}</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-3 rounded-lg glass-effect transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold">Availability</h3>
              <Card className="glass-effect">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-semibold text-green-600">Available for new projects</span>
                  </div>
                  <p className="text-muted-foreground">
                    I&apos;m currently working at Bank of America but open to interesting project collaborations, 
                    open source contributions, and networking opportunities. Let&apos;s connect!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 