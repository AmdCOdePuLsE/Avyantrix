// EmailJS configuration utility
import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
export const initEmailJS = () => {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  } else {
    console.warn('EmailJS public key not found in environment variables');
  }
};

// Send application email to admin via EmailJS
export const sendApplicationEmail = async (formData: any) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    throw new Error('EmailJS configuration missing');
  }

  const templateParams = {
    to_name: "Avyantrix Team",
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    education: formData.education,
    skills: formData.skills,
    experience: formData.experience,
    motivation: formData.motivation,
    reply_to: formData.email,
    resume_name: formData.resume?.name || 'No resume uploaded',
    application_date: new Date().toLocaleDateString(),
    application_time: new Date().toLocaleTimeString()
  };

  return emailjs.send(serviceId, templateId, templateParams);
};

// Send confirmation email to applicant via EmailJS
export const sendConfirmationEmail = async (formData: any) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    throw new Error('EmailJS confirmation configuration missing');
  }

  const templateParams = {
    to_name: formData.name,
    to_email: formData.email,
    from_name: "Avyantrix Team",
    applicant_name: formData.name,
    message: `Thank you for your application to join Team Avyantrix! 

We have successfully received your application with the following details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Education: ${formData.education}
- Skills: ${formData.skills}

Our team will carefully review your application and get back to you within 48 hours. 

Best regards,
The Avyantrix Team`
  };

  return emailjs.send(serviceId, templateId, templateParams);
};

// Alternative: Send email via Resend API
export const sendApplicationViaResend = async (formData: any) => {
  const response = await fetch('/api/submit-application-resend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to send application via Resend API');
  }

  return response.json();
};

// Alternative: Send email via API route (using Nodemailer)
export const sendApplicationViaAPI = async (formData: any) => {
  const response = await fetch('/api/submit-application', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to send application via API');
  }

  return response.json();
};

// Check if EmailJS is properly configured
export const isEmailJSConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
};

// Check if Nodemailer API is configured
export const isNodemailerConfigured = () => {
  // This would need to be checked on the server side
  // For now, we'll assume it's available if EmailJS isn't configured
  return true;
};
