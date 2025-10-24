import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { Scholarship } from "@/types";
import { ScholarshipFormData } from "@/lib/validation/scholarship";

export const scholarshipService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    country?: string;
    type?: string;
    degreeLevel?: string;
  }) {
    return apiClient.get<{ data: Scholarship[]; pagination: any }>(
      API_ENDPOINTS.SCHOLARSHIPS.LIST,
      { params }
    );
  },

  async getBySlug(slug: string) {
    return apiClient.get<{ data: Scholarship }>(
      API_ENDPOINTS.SCHOLARSHIPS.DETAIL(slug)
    );
  },

  async getFeatured() {
    return apiClient.get<{ data: Scholarship[] }>(
      API_ENDPOINTS.SCHOLARSHIPS.FEATURED
    );
  },

  async getByCountry(countryId: string) {
    return apiClient.get<{ data: Scholarship[] }>(
      API_ENDPOINTS.SCHOLARSHIPS.BY_COUNTRY(countryId)
    );
  },

  async create(data: ScholarshipFormData) {
    return apiClient.post<{ data: Scholarship }>(
      API_ENDPOINTS.SCHOLARSHIPS.CREATE,
      data
    );
  },

  async update(id: string, data: Partial<ScholarshipFormData>) {
    return apiClient.put<{ data: Scholarship }>(
      API_ENDPOINTS.SCHOLARSHIPS.UPDATE(id),
      data
    );
  },

  async delete(id: string) {
    return apiClient.delete(API_ENDPOINTS.SCHOLARSHIPS.DELETE(id));
  },
};