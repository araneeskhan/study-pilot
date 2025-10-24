export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  // Countries
  COUNTRIES: {
    LIST: "/countries",
    DETAIL: (slug: string) => `/countries/${slug}`,
    CREATE: "/countries",
    UPDATE: (id: string) => `/countries/${id}`,
    DELETE: (id: string) => `/countries/${id}`,
    FEATURED: "/countries/featured",
  },

  // Universities
  UNIVERSITIES: {
    LIST: "/universities",
    DETAIL: (slug: string) => `/universities/${slug}`,
    CREATE: "/universities",
    UPDATE: (id: string) => `/universities/${id}`,
    DELETE: (id: string) => `/universities/${id}`,
    FEATURED: "/universities/featured",
    BY_COUNTRY: (countryId: string) => `/universities?country=${countryId}`,
  },

  // Scholarships
  SCHOLARSHIPS: {
    LIST: "/scholarships",
    DETAIL: (slug: string) => `/scholarships/${slug}`,
    CREATE: "/scholarships",
    UPDATE: (id: string) => `/scholarships/${id}`,
    DELETE: (id: string) => `/scholarships/${id}`,
    FEATURED: "/scholarships/featured",
    BY_COUNTRY: (countryId: string) => `/scholarships?country=${countryId}`,
  },

  // Programs
  PROGRAMS: {
    LIST: "/programs",
    DETAIL: (slug: string) => `/programs/${slug}`,
    CREATE: "/programs",
    UPDATE: (id: string) => `/programs/${id}`,
    DELETE: (id: string) => `/programs/${id}`,
    BY_UNIVERSITY: (universityId: string) => `/programs?university=${universityId}`,
    BY_FIELD: (field: string) => `/programs?field=${field}`,
  },

  // Blog
  BLOG: {
    LIST: "/blog",
    DETAIL: (slug: string) => `/blog/${slug}`,
    CREATE: "/blog",
    UPDATE: (id: string) => `/blog/${id}`,
    DELETE: (id: string) => `/blog/${id}`,
    CATEGORIES: "/blog/categories",
    BY_CATEGORY: (category: string) => `/blog?category=${category}`,
  },

  // User
  USER: {
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    CHANGE_PASSWORD: "/user/change-password",
    FAVORITES: "/user/favorites",
    ADD_FAVORITE: "/user/favorites",
    REMOVE_FAVORITE: (id: string) => `/user/favorites/${id}`,
  },

  // Consultation
  CONSULTATION: {
    REQUEST: "/consultation",
    LIST: "/consultation",
    DETAIL: (id: string) => `/consultation/${id}`,
    UPDATE: (id: string) => `/consultation/${id}`,
    CANCEL: (id: string) => `/consultation/${id}/cancel`,
  },

  // Contact
  CONTACT: {
    SEND: "/contact",
  },

  // Newsletter
  NEWSLETTER: {
    SUBSCRIBE: "/newsletter/subscribe",
    UNSUBSCRIBE: "/newsletter/unsubscribe",
  },

  // Admin
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: {
      LIST: "/admin/users",
      DETAIL: (id: string) => `/admin/users/${id}`,
      UPDATE: (id: string) => `/admin/users/${id}`,
      DELETE: (id: string) => `/admin/users/${id}`,
    },
    STATS: "/admin/stats",
  },

  // Upload
  UPLOAD: {
    IMAGE: "/upload/image",
    FILE: "/upload/file",
  },
};

// Create an index file to export everything
export * from './client';
export * from './endpoints';