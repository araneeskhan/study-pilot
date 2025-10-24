// User types
export interface User {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  profile: {
    avatar?: string;
    phone?: string;
    country?: string;
    education_level?: string;
    field_of_interest?: string[];
  };
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

// Country types
export interface Country {
  _id: string;
  name: string;
  slug: string;
  flag: string;
  description: string;
  education_system: string;
  tuition_fees: {
    bachelor: { min: number; max: number; currency: string };
    master: { min: number; max: number; currency: string };
    phd: { min: number; max: number; currency: string };
  };
  language_requirements: Array<{
    test: string;
    min_score: number;
  }>;
  visa_info: string;
  part_time_work: boolean;
  post_study_work_visa: boolean;
  popular_cities: string[];
  cost_of_living: { min: number; max: number; currency: string };
  universities_count: number;
  scholarships_count: number;
  featured: boolean;
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

// University types
export interface University {
  _id: string;
  name: string;
  slug: string;
  country: string | Country;
  logo: string;
  banner: string;
  type: "public" | "private";
  ranking: {
    world: number;
    national: number;
  };
  website: string;
  location: {
    city: string;
    address: string;
  };
  description: string;
  founded_year: number;
  tuition_fees: Array<{
    degree_level: string;
    fee: number;
    currency: string;
  }>;
  admission_requirements: {
    min_gpa: number;
    language_tests: Array<{ test: string; min_score: number }>;
    documents: string[];
  };
  application_deadlines: Array<{
    intake: string;
    deadline: Date;
  }>;
  programs_count: number;
  featured: boolean;
  accreditations: string[];
  facilities: string[];
  contact: {
    email: string;
    phone: string;
  };
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

// Scholarship types
export interface Scholarship {
  _id: string;
  name: string;
  slug: string;
  country: string | Country;
  universities?: string[] | University[];
  type: "government" | "university" | "private";
  amount: {
    value: number;
    currency: string;
    type: "full" | "partial";
  };
  degree_levels: string[];
  fields_of_study: string[];
  eligibility: {
    nationality: string[];
    min_gpa: number;
    age_limit?: number;
    language_requirements: Array<{ test: string; min_score: number }>;
  };
  benefits: string[];
  application_deadline: Date;
  start_date: Date;
  duration: string;
  description: string;
  how_to_apply: string;
  official_link: string;
  featured: boolean;
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

// Program types
export interface Program {
  _id: string;
  name: string;
  slug: string;
  university: string | University;
  country: string | Country;
  degree_level: "bachelor" | "master" | "phd";
  field: string;
  duration: string;
  language: string[];
  tuition_fee: {
    amount: number;
    currency: string;
  };
  start_dates: Date[];
  description: string;
  curriculum: string;
  requirements: {
    min_gpa: number;
    language_tests: Array<{ test: string; min_score: number }>;
    work_experience: boolean;
  };
  career_prospects: string[];
  accreditation: string;
  mode: "on-campus" | "online" | "hybrid";
  official_link: string;
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

// Blog Post types
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: string | User;
  featured_image: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  published_at?: Date;
  views: number;
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

// Consultation types
export interface Consultation {
  _id: string;
  user: string | User;
  type: "free" | "paid";
  service: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  scheduled_date: Date;
  duration: number;
  amount: number;
  payment_status: "pending" | "paid" | "refunded";
  meeting_link?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

// Favorite types
export interface Favorite {
  _id: string;
  user: string;
  type: "country" | "university" | "scholarship" | "program";
  ref_id: string;
  created_at: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}