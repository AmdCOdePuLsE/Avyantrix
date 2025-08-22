# 🗄️ Supabase Integration Guide for Team Management

This guide will help you set up Supabase as the backend database for dynamic team member management in the Avyantrix website.

## 📋 Overview

With Supabase integration, your team members will be able to:
- ✅ **Sign up and authenticate** securely
- ✅ **Create and update their profiles** with personal information
- ✅ **Upload profile pictures** using Supabase Storage
- ✅ **Manage their visibility** (public/private profiles)
- ✅ **Add project information** and collaborate
- ✅ **Real-time updates** across the platform

---

## 🚀 Step 1: Create Supabase Project

### 1.1 Sign Up for Supabase
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended)

### 1.2 Create New Project
1. Click "New Project"
2. Choose your organization
3. Fill in project details:
   - **Name**: `avyantrix-team`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for setup to complete (~2 minutes)

---

## 🛠️ Step 2: Install Dependencies

```bash
cd /path/to/your/avyantrix/project
npm install @supabase/supabase-js
```

---

## 🔧 Step 3: Environment Configuration

### 3.1 Get Supabase Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**
   - **Public anon key**

### 3.2 Update Environment Variables
Add to your `.env.local` file:

```env
# Existing variables...
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
# ... other existing vars ...

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3.3 Update .env.local.example
Add the Supabase variables to your template file for other developers.

---

## 🗃️ Step 4: Database Schema Setup

### 4.1 Create Tables
In your Supabase dashboard, go to **SQL Editor** and run these SQL commands:

```sql
-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create team_members table
CREATE TABLE team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(100) NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    skills TEXT[],
    github_url TEXT,
    linkedin_url TEXT,
    instagram_url TEXT,
    twitter_url TEXT,
    portfolio_url TEXT,
    joined_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT true,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create team_projects table
CREATE TABLE team_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    github_url TEXT,
    demo_url TEXT,
    technologies TEXT[],
    status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'on_hold')),
    is_featured BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create project_members junction table
CREATE TABLE project_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES team_projects(id) ON DELETE CASCADE,
    member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
    role VARCHAR(100) NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, member_id)
);

-- Create indexes for better performance
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_team_members_is_public ON team_members(is_public);
CREATE INDEX idx_team_members_is_active ON team_members(is_active);
CREATE INDEX idx_team_projects_created_by ON team_projects(created_by);
CREATE INDEX idx_team_projects_status ON team_projects(status);
CREATE INDEX idx_project_members_project_id ON project_members(project_id);
CREATE INDEX idx_project_members_member_id ON project_members(member_id);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
```

### 4.2 Create RLS Policies

```sql
-- Team Members Policies
CREATE POLICY "Public team members are viewable by everyone" 
ON team_members FOR SELECT 
USING (is_public = true AND is_active = true);

CREATE POLICY "Users can view their own profile" 
ON team_members FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON team_members FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON team_members FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Team Projects Policies
CREATE POLICY "Featured projects are viewable by everyone" 
ON team_projects FOR SELECT 
USING (is_featured = true);

CREATE POLICY "Users can view their own projects" 
ON team_projects FOR SELECT 
USING (auth.uid() = created_by);

CREATE POLICY "Users can update their own projects" 
ON team_projects FOR UPDATE 
USING (auth.uid() = created_by);

CREATE POLICY "Authenticated users can create projects" 
ON team_projects FOR INSERT 
WITH CHECK (auth.uid() = created_by);

-- Project Members Policies
CREATE POLICY "Project members are viewable by everyone" 
ON project_members FOR SELECT 
USING (true);

CREATE POLICY "Project creators can manage members" 
ON project_members FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM team_projects 
        WHERE id = project_id AND created_by = auth.uid()
    )
);
```

---

## 📦 Step 5: Storage Setup

### 5.1 Create Storage Bucket
1. In Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Name: `avatars`
4. Make it **Public**
5. Click "Create bucket"

### 5.2 Set Storage Policies
Go to **Storage** → **Policies** and create:

```sql
-- Allow authenticated users to upload avatars
CREATE POLICY "Authenticated users can upload avatars" 
ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatars
CREATE POLICY "Users can update their own avatars" 
ON storage.objects FOR UPDATE 
USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public access to view avatars
CREATE POLICY "Public can view avatars" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');
```

---

## 🔗 Step 6: Update Application Code

### 6.1 Enable Supabase in the app
Uncomment the Supabase code in `/src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### 6.2 Update Team Page
The team page is already prepared for Supabase integration. Once you enable Supabase, it will automatically start using the database instead of mock data.

---

## 🎨 Step 7: Authentication Setup

### 7.1 Configure Auth Settings
1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Configure **Site URL**: `http://localhost:3000` (development)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.vercel.app/auth/callback` (production)

### 7.2 Enable Social Providers (Optional)
- **GitHub**: For easy developer sign-up
- **Google**: For general users
- **Discord**: For community integration

---

## 🧪 Step 8: Testing

### 8.1 Test Database Connection
1. Start your development server: `npm run dev`
2. Navigate to `/team` page
3. Check browser console for any Supabase connection errors

### 8.2 Test Authentication
1. Click "Join Team" button
2. Try signing up with email/password
3. Verify email confirmation (check spam folder)
4. Test profile creation and updates

### 8.3 Test File Upload
1. Login as a team member
2. Try uploading a profile picture
3. Verify image appears correctly

---

## 📊 Step 9: Data Migration (Optional)

If you want to migrate existing team data:

```sql
-- Insert existing team members (update with your data)
INSERT INTO team_members (name, email, role, bio, skills, github_url, linkedin_url, joined_date, user_id)
VALUES 
('Debsmit Ghosh', 'debsmit@avyantrix.com', 'AI / ML Specialist', 'Tech visionary...', 
 ARRAY['Machine Learning', 'Python', 'TensorFlow'], 'https://github.com/debsmit', 
 'https://linkedin.com/in/debsmit', '2023-01-15', 'user-uuid-here'),
-- Add other members...
```

---

## 🚀 Step 10: Deployment

### 10.1 Add Supabase Environment Variables to Vercel
1. In Vercel dashboard, go to your project settings
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 10.2 Update Production URLs
1. In Supabase dashboard, update redirect URLs for production
2. Test authentication flow in production

---

## 🎯 Features Now Available

### ✅ **Team Member Features:**
- Secure authentication with email/password
- Profile creation and management
- Profile picture uploads
- Social links management
- Skills and bio updates
- Public/private profile toggle

### ✅ **Admin Features:**
- View all team members
- Project management
- Member role management
- Analytics and insights

### ✅ **Public Features:**
- Dynamic team page with real data
- Real-time updates
- Responsive design
- SEO-friendly profiles

---

## 🔧 Troubleshooting

### Common Issues:

1. **Connection Errors**
   - Verify environment variables
   - Check Supabase project status
   - Ensure correct URL and keys

2. **RLS Policy Errors**
   - Check if policies are properly created
   - Verify user authentication
   - Test policies in Supabase SQL editor

3. **Storage Upload Errors**
   - Check bucket permissions
   - Verify file size limits
   - Ensure proper file types

4. **Authentication Issues**
   - Check redirect URLs
   - Verify email templates
   - Test with different browsers

---

## 📚 Next Steps

1. **Set up Supabase project** following this guide
2. **Test authentication flow** with sample users
3. **Migrate existing team data** if needed
4. **Deploy to production** with environment variables
5. **Train team members** on profile management

---

## 🎉 Benefits After Integration

- ✅ **No more manual profile updates**
- ✅ **Real-time team information**
- ✅ **Secure user authentication**
- ✅ **Scalable database solution**
- ✅ **Professional team management**
- ✅ **SEO-friendly dynamic content**

Your Avyantrix team page will transform from static content to a dynamic, user-managed system! 🚀

---

## 💡 Advanced Features (Future)

- **Role-based permissions** (Admin, Member, Viewer)
- **Team analytics** and insights
- **Project collaboration** tools
- **Member onboarding** workflows
- **Integration with** GitHub, LinkedIn APIs
- **Team achievements** and badges system
