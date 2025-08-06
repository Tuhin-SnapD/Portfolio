import emailjs from '@emailjs/browser'

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'JDUGSQcbmEEb6nl2H',
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_gxre8sg',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_lbd9lbe',
  TO_EMAIL: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL || 'tuhinchakrabarty14@gmail.com'
}

/*
IMPROVED EMAIL TEMPLATE FOR EMAILJS:

Subject: New Contact Message from {{from_name}} - {{subject}}

Hello {{to_name}},

You have received a new contact message through your portfolio website.

📧 **Contact Details:**
- **Name:** {{from_name}}
- **Email:** {{from_email}}
- **Subject:** {{subject}}

⏰ **Received:** {{time}}

💬 **Message:**
{{message}}

---
This message was sent from your portfolio contact form at {{site_url}}.
Please respond to {{from_email}} at your earliest convenience.

Best regards,
Your Portfolio Contact System
*/

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
}

  // Send email using EmailJS
export const sendEmail = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  try {
    const templateParams = {
      to_email: EMAILJS_CONFIG.TO_EMAIL,
      to_name: 'Tuhin', // Recipient name
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email,
      time: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),
      site_url: typeof window !== 'undefined' ? window.location.origin : 'Portfolio Website'
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    )

    return { success: true, data: response }
  } catch (error) {
    console.error('EmailJS Error:', error)
    return { success: false, error }
  }
} 