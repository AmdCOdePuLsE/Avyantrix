import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Resend API key not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: 'Avyantrix Team <onboarding@resend.dev>', // Use your verified domain
      to: [process.env.ADMIN_EMAIL || 'admin@yourcompany.com'],
      subject: `New Team Application - ${formData.name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Team Application</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Applicant Information</h2>
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Education:</strong> ${formData.education}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Technical Details</h2>
              <p><strong>Skills:</strong> ${formData.skills}</p>
              <p><strong>Experience:</strong> ${formData.experience}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Motivation</h2>
              <p style="line-height: 1.6;">${formData.motivation}</p>
            </div>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626;">
              <p><strong>Resume:</strong> ${formData.resume?.name || 'No resume uploaded'}</p>
              <p><strong>Applied:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
    });

    // Send confirmation email to applicant
    const confirmationEmail = await resend.emails.send({
      from: 'Avyantrix Team <onboarding@resend.dev>',
      to: [formData.email],
      subject: 'Application Received - Welcome to Avyantrix!',
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Avyantrix!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your application has been received</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1f2937;">Hello ${formData.name},</h2>
            
            <p style="color: #4b5563; line-height: 1.7; font-size: 16px;">
              Thank you for your application to join Team Avyantrix! We're excited to learn more about you and your passion for innovation.
            </p>
            
            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #059669; margin-top: 0; margin-bottom: 15px;">🚀 What happens next?</h3>
              <ul style="color: #4b5563; line-height: 1.6; padding-left: 20px;">
                <li>Our team will carefully review your application</li>
                <li>We'll assess your skills and experience</li>
                <li>If there's a good match, we'll reach out for a detailed discussion</li>
                <li>The entire process typically takes 24-48 hours</li>
              </ul>
            </div>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #dc2626; margin-top: 0; margin-bottom: 15px;">📋 Your Application Summary</h3>
              <div style="display: grid; gap: 8px;">
                <p style="margin: 0; color: #4b5563;"><strong>Email:</strong> ${formData.email}</p>
                <p style="margin: 0; color: #4b5563;"><strong>Phone:</strong> ${formData.phone}</p>
                <p style="margin: 0; color: #4b5563;"><strong>Skills:</strong> ${formData.skills}</p>
                <p style="margin: 0; color: #4b5563;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="color: #1e40af; margin: 0; text-align: center; font-weight: 500;">
                💬 Have questions? Feel free to reach out to us directly!
              </p>
            </div>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #1f2937; margin: 0;">
                Best regards,<br>
                <strong style="color: #dc2626;">The Avyantrix Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully!',
      adminEmailId: adminEmail.data?.id,
      confirmationEmailId: confirmationEmail.data?.id,
    });

  } catch (error) {
    console.error('Resend API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
