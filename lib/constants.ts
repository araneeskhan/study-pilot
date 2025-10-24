// Degree Levels
export const DEGREE_LEVELS = [
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "phd", label: "PhD/Doctorate" },
  { value: "diploma", label: "Diploma" },
  { value: "certificate", label: "Certificate" },
] as const;

// University Types
export const UNIVERSITY_TYPES = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
] as const;

// Scholarship Types
export const SCHOLARSHIP_TYPES = [
  { value: "government", label: "Government" },
  { value: "university", label: "University" },
  { value: "private", label: "Private Organization" },
] as const;

// Scholarship Coverage
export const SCHOLARSHIP_COVERAGE = [
  { value: "full", label: "Full Scholarship" },
  { value: "partial", label: "Partial Scholarship" },
] as const;

// Program Modes
export const PROGRAM_MODES = [
  { value: "on-campus", label: "On Campus" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
] as const;

// Language Tests
export const LANGUAGE_TESTS = [
  { value: "IELTS", label: "IELTS", maxScore: 9 },
  { value: "TOEFL", label: "TOEFL", maxScore: 120 },
  { value: "PTE", label: "PTE Academic", maxScore: 90 },
  { value: "Duolingo", label: "Duolingo English Test", maxScore: 160 },
  { value: "Cambridge", label: "Cambridge English", maxScore: 230 },
  { value: "TestDaF", label: "TestDaF (German)", maxScore: 5 },
  { value: "DELF", label: "DELF (French)", maxScore: 100 },
  { value: "JLPT", label: "JLPT (Japanese)", maxScore: 180 },
] as const;

// Currencies
export const CURRENCIES = [
  { value: "USD", label: "US Dollar", symbol: "$" },
  { value: "EUR", label: "Euro", symbol: "€" },
  { value: "GBP", label: "British Pound", symbol: "£" },
  { value: "CAD", label: "Canadian Dollar", symbol: "C$" },
  { value: "AUD", label: "Australian Dollar", symbol: "A$" },
  { value: "INR", label: "Indian Rupee", symbol: "₹" },
  { value: "CNY", label: "Chinese Yuan", symbol: "¥" },
  { value: "JPY", label: "Japanese Yen", symbol: "¥" },
] as const;

// Popular Study Destinations
export const POPULAR_COUNTRIES = [
  { value: "USA", label: "United States", flag: "🇺🇸" },
  { value: "UK", label: "United Kingdom", flag: "🇬🇧" },
  { value: "Canada", label: "Canada", flag: "🇨🇦" },
  { value: "Australia", label: "Australia", flag: "🇦🇺" },
  { value: "Germany", label: "Germany", flag: "🇩🇪" },
  { value: "France", label: "France", flag: "🇫🇷" },
  { value: "Netherlands", label: "Netherlands", flag: "🇳🇱" },
  { value: "Sweden", label: "Sweden", flag: "🇸🇪" },
  { value: "Switzerland", label: "Switzerland", flag: "🇨🇭" },
  { value: "Italy", label: "Italy", flag: "🇮🇹" },
  { value: "Spain", label: "Spain", flag: "🇪🇸" },
  { value: "Japan", label: "Japan", flag: "🇯🇵" },
  { value: "Singapore", label: "Singapore", flag: "🇸🇬" },
  { value: "New Zealand", label: "New Zealand", flag: "🇳🇿" },
  { value: "Ireland", label: "Ireland", flag: "🇮🇪" },
] as const;

// Fields of Study
export const FIELDS_OF_STUDY = [
  { value: "computer-science", label: "Computer Science" },
  { value: "engineering", label: "Engineering" },
  { value: "business", label: "Business & Management" },
  { value: "medicine", label: "Medicine & Healthcare" },
  { value: "law", label: "Law" },
  { value: "arts", label: "Arts & Humanities" },
  { value: "sciences", label: "Natural Sciences" },
  { value: "social-sciences", label: "Social Sciences" },
  { value: "education", label: "Education" },
  { value: "architecture", label: "Architecture" },
  { value: "psychology", label: "Psychology" },
  { value: "economics", label: "Economics" },
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "environmental", label: "Environmental Studies" },
  { value: "agriculture", label: "Agriculture" },
] as const;

// Intakes
export const INTAKES = [
  { value: "fall", label: "Fall (September/October)" },
  { value: "spring", label: "Spring (January/February)" },
  { value: "summer", label: "Summer (May/June)" },
] as const;

// User Roles
export const USER_ROLES = [
  { value: "user", label: "User" },
  { value: "admin", label: "Administrator" },
] as const;

// Consultation Types
export const CONSULTATION_TYPES = [
  { value: "free", label: "Free Consultation" },
  { value: "paid", label: "Paid Consultation" },
] as const;

// Consultation Services
export const CONSULTATION_SERVICES = [
  { value: "general", label: "General Guidance" },
  { value: "country-selection", label: "Country Selection" },
  { value: "university-selection", label: "University Selection" },
  { value: "application-review", label: "Application Review" },
  { value: "sop-review", label: "SOP/Essay Review" },
  { value: "visa-guidance", label: "Visa Guidance" },
  { value: "scholarship-guidance", label: "Scholarship Guidance" },
] as const;

// Consultation Status
export const CONSULTATION_STATUS = [
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "confirmed", label: "Confirmed", color: "blue" },
  { value: "completed", label: "Completed", color: "green" },
  { value: "cancelled", label: "Cancelled", color: "red" },
] as const;

// Payment Status
export const PAYMENT_STATUS = [
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "paid", label: "Paid", color: "green" },
  { value: "refunded", label: "Refunded", color: "gray" },
] as const;

// Blog Categories
export const BLOG_CATEGORIES = [
  { value: "guides", label: "Application Guides" },
  { value: "scholarships", label: "Scholarship Updates" },
  { value: "destinations", label: "Study Destinations" },
  { value: "visa", label: "Visa Information" },
  { value: "student-life", label: "Student Life" },
  { value: "success-stories", label: "Success Stories" },
  { value: "news", label: "Education News" },
] as const;

// Notification Types
export const NOTIFICATION_TYPES = [
  { value: "success", label: "Success", icon: "CheckCircle" },
  { value: "error", label: "Error", icon: "XCircle" },
  { value: "warning", label: "Warning", icon: "AlertTriangle" },
  { value: "info", label: "Information", icon: "Info" },
] as const;

// Admin View Modes
export const ADMIN_VIEW_MODES = [
  { value: "table", label: "Table View", icon: "Table" },
  { value: "grid", label: "Grid View", icon: "Grid" },
] as const;

// Content Status
export const CONTENT_STATUS = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
] as const;