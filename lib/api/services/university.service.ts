import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { University } from "@/types";
import { UniversityFormData } from "@/lib/validation/university";

export const universityService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    country?: string;
    type?: string;
  }) {
    return apiClient.get<{ data: University[]; pagination: any }>(
      API_ENDPOINTS.UNIVERSITIES.LIST,
      { params }
    );
  },

  async getBySlug(slug: string) {
    return apiClient.get<{ data: University }>(
      API_ENDPOINTS.UNIVERSITIES.DETAIL(slug)
    );
  },

  async getFeatured() {
    return apiClient.get<{ data: University[] }>(
      API_ENDPOINTS.UNIVERSITIES.FEATURED
    );
  },

  async getByCountry(countryId: string) {
    return apiClient.get<{ data: University[] }>(
      API_ENDPOINTS.UNIVERSITIES.BY_COUNTRY(countryId)
    );
  },

  async create(data: UniversityFormData) {
    return apiClient.post<{ data: University }>(
      API_ENDPOINTS.UNIVERSITIES.CREATE,
      data
    );
  },

  async update(id: string, data: Partial<UniversityFormData>) {
    return apiClient.put<{ data: University }>(
      API_ENDPOINTS.UNIVERSITIES.UPDATE(id),
      data
    );
  },

  async delete(id: string) {
    return apiClient.delete(API_ENDPOINTS.UNIVERSITIES.DELETE(id));
  },
};