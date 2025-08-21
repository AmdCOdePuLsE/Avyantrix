# EmailJS Setup Guide for Avyantrix Member Application Form

This guide will help you set up EmailJS to handle form submissions and send emails for the member application form.

## 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Set Up Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (something like `service_abc123`)

## 3. Create Email Templates

### Template 1: Admin Notification (for receiving applications)

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Template ID: `template_admin_notificat` (or your choice)
4. Subject: `New Team Application - {{from_name}}`
5. Content:
```
New team member application received!

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Education: {{education}}
Skills: {{skills}}
Experience: {{experience}}
Motivation: {{motivation}}
Resume: {{resume_name}}

Application submitted on: {{application_date}} at {{application_time}}

Please review and respond to the applicant.
```

### Template 2: Confirmation Email (for applicants)

1. Create another template
2. Template ID: `template_confirmation`
3. Subject: `Application Received - Welcome to Avyantrix!`
4. Content:
```
Hello {{applicant_name}},

{{message}}

Best regards,
{{from_name}}
```

## 4. Configure Environment Variables

1. Copy the `.env.local.example` to `.env.local` in your project root
2. Fill in your EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_admin_notification
NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_confirmation
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

To find your Public Key:
1. Go to "Account" in your EmailJS dashboard
2. Find "Public Key" in the API Keys section
3. Copy the key (it looks like: `abcd1234efgh5678`)

## 5. Test the Setup

1. Save your environment variables
2. Restart your development server: `npm run dev`
3. Navigate to `/member` page
4. If configured correctly, you should see no warning message
5. Fill out the form and submit to test

## 6. Email Template Variables Reference

### Available variables for admin notification template:
- `{{from_name}}` - Applicant's name
- `{{from_email}}` - Applicant's email
- `{{phone}}` - Applicant's phone
- `{{education}}` - Education details
- `{{skills}}` - Technical skills
- `{{experience}}` - Work experience
- `{{motivation}}` - Why they want to join
- `{{resume_name}}` - Uploaded resume filename
- `{{application_date}}` - Date of application
- `{{application_time}}` - Time of application

### Available variables for confirmation template:
- `{{applicant_name}}` - Applicant's name
- `{{to_email}}` - Where to send the confirmation
- `{{from_name}}` - Your team name
- `{{message}}` - Confirmation message

## 7. Customization

You can customize the email templates and form behavior by modifying:
- `/src/utils/emailService.ts` - Email sending logic
- `/src/app/member/page.tsx` - Form component
- Email templates in your EmailJS dashboard

## 8. Troubleshooting

### Common Issues:
1. **"Email service not configured"**: Check your environment variables
2. **Emails not sending**: Verify your service ID and template IDs
3. **Template not found**: Make sure template IDs match exactly
4. **CORS errors**: Ensure you're using the correct public key

### Testing:
- Check browser console for error messages
- Verify environment variables are loaded correctly
- Test with a simple form first before adding complex features

## 9. Production Deployment

1. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Make sure `.env.local` is in your `.gitignore`
3. Test the form in production environment

## 10. Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 1 email template per service

For higher volume, consider upgrading to a paid plan.

---

**Need Help?**
- Check the EmailJS documentation: https://www.emailjs.com/docs/
- Review the console for error messages
- Ensure all template variables are properly set
