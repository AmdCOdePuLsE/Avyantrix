# Team Avyantrix

**Innovation Through Excellence** - Official website for Team Avyantrix, a collective of passionate engineers building the future through cutting-edge technology.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS v4
- **Smooth Animations**: Framer Motion + GSAP
- **Member Application System**: Comprehensive form with email notifications
- **Responsive Design**: Mobile-first approach with elegant UI
- **Email Integration**: Multiple email service options (EmailJS, Resend, Nodemailer)
- **Image Optimization**: Next.js Image component with optimizations

## 🏗️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 8.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AmdCOdePuLsE/Avyantrix.git
cd Avyantrix
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your actual values
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## 📧 Email Configuration

The application supports multiple email services for handling contact forms and member applications:

### Option 1: EmailJS (Recommended)
1. Follow the setup guide in `EMAILJS_SETUP_GUIDE.md`
2. Add your EmailJS credentials to `.env.local`

### Option 2: Resend API
1. Sign up at [resend.com](https://resend.com)
2. Add your API key to `.env.local`

### Option 3: Nodemailer (Gmail)
1. Enable 2FA on your Gmail account
2. Generate an app password
3. Add credentials to `.env.local`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

The project is optimized for Vercel deployment. See `VERCEL_DEPLOYMENT.md` for detailed instructions.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AmdCOdePuLsE/Avyantrix)

### Quick Deployment Steps:

1. **Push to GitHub**: Ensure your code is committed and pushed
2. **Connect to Vercel**: Import your repository in Vercel dashboard
3. **Set Environment Variables**: Add required environment variables
4. **Deploy**: Vercel will automatically build and deploy

### Environment Variables for Production:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_confirmation_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes for email handling
│   ├── member/            # Member application page
│   ├── layout.tsx         # Root layout with fonts and styles
│   └── page.tsx          # Homepage with all sections
├── components/            # Reusable UI components
│   ├── Navbar.tsx        # Navigation component
│   ├── Footer.tsx        # Footer component
│   ├── CustomCursor.tsx  # Custom cursor implementation
│   └── AnimatedBackground.tsx
├── sections/             # Homepage sections
│   ├── Hero.tsx          # Hero section with team logo
│   ├── About.tsx         # Team description and mission
│   ├── Events.tsx        # Upcoming events and hackathons
│   ├── Team.tsx          # Team member profiles
│   ├── Gallery.tsx       # Photo gallery
│   ├── Projects.tsx      # Project showcase
│   └── Contact.tsx       # Contact form and information
├── data/                 # Static data and configuration
│   └── index.ts          # Team data, members, projects, events
└── utils/                # Utility functions
    └── emailService.ts   # Email handling logic
```

## 🎨 Design System

- **Colors**: Black, Deep Red (#8B0000), Golden (#FFD700)
- **Typography**: Inter (sans), Playfair Display (serif)
- **Animations**: Framer Motion for interactions, GSAP for complex animations
- **Responsive**: Mobile-first design with Tailwind CSS v4

## 🧪 Technologies Used

- **Frontend**: React 19, Next.js 15, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion, GSAP
- **Forms**: Formik, Yup validation
- **Email**: EmailJS, Resend, Nodemailer
- **Icons**: React Icons
- **Deployment**: Vercel optimized

## 🛠️ Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # Check TypeScript types
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Inter](https://fonts.google.com/specimen/Inter) and [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) fonts.

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - production-ready motion library for React
- [TypeScript](https://www.typescriptlang.org/docs/) - typed superset of JavaScript

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team Avyantrix

**"We don't wait for the future—we build it."**

- Innovation Through Excellence
- Hackathon Champions
- Engineering Solutions for Tomorrow

---

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
