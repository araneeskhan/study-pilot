// Form data types for admin
export interface CountryFormData {
  name: string;
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
  featured: boolean;
  meta: {
    title: string;
    description: string;
  };
}

export interface UniversityFormData {
  name: string;
  country: string;
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
    deadline: string;
  }>;
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
}