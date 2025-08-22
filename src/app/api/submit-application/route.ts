import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Create transporter using Gmail (you can use other services)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_APP_PASSWORD, // Your Gmail app password
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Team Application - ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Team Member Application</h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Applicant Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Education:</strong> ${formData.education}</p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Technical Details</h3>
            <p><strong>Skills:</strong> ${formData.skills}</p>
            <p><strong>Experience:</strong> ${formData.experience}</p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Motivation</h3>
            <p>${formData.motivation}</p>
          </div>
          
          <div style="background: #fef3f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Resume:</strong> ${formData.resume?.name || 'No resume uploaded'}</p>
            <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Application Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      `,
    };

    // Email to applicant
    const applicantMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Application Received - Welcome to Avyantrix!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #dc2626, #ef4444); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Avyantrix!</h1>
          </div>
          
          <div style="padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #374151;">Hello ${formData.name},</h2>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Thank you for your application to join Team Avyantrix! We have successfully received your application and are excited to learn more about you.
            </p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">What's Next?</h3>
              <ul style="color: #6b7280; line-height: 1.6;">
                <li>Our team will carefully review your application</li>
                <li>We'll assess your skills and experience against our current needs</li>
                <li>If there's a match, we'll reach out for a detailed discussion</li>
                <li>The entire process typically takes 24-48 hours</li>
              </ul>
            </div>
            
            <div style="background: #fef3f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #dc2626; margin-top: 0;">Your Application Summary</h3>
              <p style="color: #6b7280; margin: 0;"><strong>Email:</strong> ${formData.email}</p>
              <p style="color: #6b7280; margin: 5px 0;"><strong>Phone:</strong> ${formData.phone}</p>
              <p style="color: #6b7280; margin: 5px 0;"><strong>Skills:</strong> ${formData.skills}</p>
              <p style="color: #6b7280; margin: 5px 0 0 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6;">
              If you have any questions in the meantime, feel free to reach out to us directly.
            </p>
            
            <p style="color: #374151; margin-top: 30px;">
              Best regards,<br>
              <strong>The Avyantrix Team</strong>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(applicantMailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
