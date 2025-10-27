import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { Country } from "@/types";
import { CountryFormData } from "@/lib/validation/country";

export const countryService = {
  async getAll(params?: { page?: number; limit?: number; search?: string }) {
    return apiClient.get<{ data: Country[]; pagination: any }>(
      API_ENDPOINTS.COUNTRIES.LIST,
      { params }
    );
  },

  async getBySlug(slug: string) {
    return apiClient.get<{ data: Country }>(API_ENDPOINTS.COUNTRIES.DETAIL(slug));
  },

  async getFeatured() {
    return apiClient.get<{ data: Country[] }>(API_ENDPOINTS.COUNTRIES.FEATURED);
  },

  async create(data: CountryFormData) {
    console.log('Country service - Creating country with data:', data);
    return apiClient.post<{ data: Country }>(API_ENDPOINTS.COUNTRIES.CREATE, data);
  },

  async update(id: string, data: Partial<CountryFormData>) {
    return apiClient.put<{ data: Country }>(API_ENDPOINTS.COUNTRIES.UPDATE(id), data);
  },

  async delete(id: string) {
    return apiClient.delete(API_ENDPOINTS.COUNTRIES.DELETE(id));
  },
};