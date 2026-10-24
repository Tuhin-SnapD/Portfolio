"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { initEmailJS, sendEmail, getEmailJsErrorMessage, EMAILJS_CONFIG } from '@/lib/emailjs'

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
    icon: Phone,
    title: 'Phone',
    value: '+91 81416 97841',
    link: 'tel:+918141697841'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Bengaluru, India',
    link: 'https://maps.google.com/?q=Bengaluru,India'
  }
]

const socialLinks = [
  {
    icon: Github,
    name: 'GitHub',
    url: 'https://github.com/Tuhin-SnapD',
    color: 'hover:text-primary'
  },
  {
    icon: Linkedin,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tuhin-chakrabarty-1074aa19b/',
    color: 'hover:text-primary'
  },
  {
    icon: HackerRankIcon,
    name: 'HackerRank',
    url: 'https://www.hackerrank.com/profile/tuhinchakrabart1',
    color: 'hover:text-primary'
  }
]

export function ContactSection() {
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
        // Show the real reason (e.g. an expired Gmail grant) instead of a generic error,
        // and always offer a direct email fallback so the message is not lost.
        const reason = getEmailJsErrorMessage(result.error)
        toast.error(
          ({ id }) => (
            <span>
              Couldn&apos;t send the message{reason ? ` — ${reason}` : ''}. Please email me directly at{' '}
              <a
                href={`mailto:${EMAILJS_CONFIG.TO_EMAIL}`}
                className="underline font-medium"
                onClick={() => toast.dismiss(id)}
              >
                {EMAILJS_CONFIG.TO_EMAIL}
              </a>
              .
            </span>
          ),
          { duration: 10000 }
        )
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error(
        `Something went wrong. Please email me directly at ${EMAILJS_CONFIG.TO_EMAIL}.`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="editorial-rule py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="mb-12 max-w-2xl"
        >
          <h2 className="section-heading mb-5">
            Contact <span className="gradient-text">Tuhin</span>
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            For engineering roles, backend projects, or a good technical conversation, email is the easiest way to reach me.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div
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
                        className={errors.name ? 'border-primary' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-primary">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your.email@example.com"
                        className={errors.email ? 'border-primary' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-primary">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      {...register('subject')}
                      placeholder="What's this about?"
                      className={errors.subject ? 'border-primary' : ''}
                    />
                    {errors.subject && (
                      <p className="text-sm text-primary">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className={errors.message ? 'border-primary' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-primary">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-foreground"
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
          </div>

          {/* Contact Information */}
          <div
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                >
                  <Card className="glass-effect transition-shadow">
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
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-12 min-w-12 items-center justify-center border border-border transition-colors duration-300 ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold">What I am open to</h3>
              <Card className="glass-effect">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <span className="font-semibold text-primary">Backend engineering, fintech systems, and thoughtful collaboration</span>
                  </div>
                  <p className="text-muted-foreground">
                    I&apos;m currently a Software Engineer 2 at PayU, building secure, multi-tenant financial platforms.
                    I welcome conversations about backend engineering, distributed systems, and fintech software.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
