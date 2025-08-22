// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      team_members: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          email: string;
          role: string;
          bio: string | null;
          avatar_url: string | null;
          skills: string[] | null;
          github_url: string | null;
          linkedin_url: string | null;
          instagram_url: string | null;
          twitter_url: string | null;
          portfolio_url: string | null;
          joined_date: string;
          is_active: boolean;
          is_public: boolean;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          email: string;
          role: string;
          bio?: string | null;
          avatar_url?: string | null;
          skills?: string[] | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          portfolio_url?: string | null;
          joined_date?: string;
          is_active?: boolean;
          is_public?: boolean;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          email?: string;
          role?: string;
          bio?: string | null;
          avatar_url?: string | null;
          skills?: string[] | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          portfolio_url?: string | null;
          joined_date?: string;
          is_active?: boolean;
          is_public?: boolean;
          user_id?: string;
        };
      };
      team_projects: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string;
          image_url: string | null;
          github_url: string | null;
          demo_url: string | null;
          technologies: string[] | null;
          status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
          is_featured: boolean;
          created_by: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description: string;
          image_url?: string | null;
          github_url?: string | null;
          demo_url?: string | null;
          technologies?: string[] | null;
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold';
          is_featured?: boolean;
          created_by: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string;
          image_url?: string | null;
          github_url?: string | null;
          demo_url?: string | null;
          technologies?: string[] | null;
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold';
          is_featured?: boolean;
          created_by?: string;
        };
      };
      project_members: {
        Row: {
          id: string;
          project_id: string;
          member_id: string;
          role: string;
          joined_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          member_id: string;
          role: string;
          joined_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          member_id?: string;
          role?: string;
          joined_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Application Types
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
  skills?: string[];
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    portfolio?: string;
  };
  joinedDate: string;
  isActive: boolean;
  isPublic: boolean;
  userId: string;
}

export interface TeamProject {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  technologies?: string[];
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  isFeatured: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  members?: TeamMember[];
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

// Form Types
export interface TeamMemberFormData {
  name: string;
  email: string;
  role: string;
  bio?: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  portfolio?: string;
  isPublic: boolean;
}

export interface ProjectFormData {
  title: string;
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  technologies: string[];
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  isFeatured: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
