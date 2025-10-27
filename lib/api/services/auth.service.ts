import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { LoginFormData, RegisterFormData } from "@/lib/validation/auth";
import { AdminSignupFormData } from "@/lib/validation/admin";
import { User } from "@/types";

export const authService = {
  async login(data: LoginFormData) {
    return apiClient.post<{ data: { user: User; token: string } }>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
  },

  async register(data: RegisterFormData) {
    return apiClient.post<{ data: { user: User; token: string } }>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
  },

  async logout() {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  async getMe() {
    return apiClient.get<{ user: User }>(API_ENDPOINTS.AUTH.ME);
  },

  async forgotPassword(email: string) {
    return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token: string, password: string) {
    return apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password });
  },

  async verifyEmail(token: string) {
    return apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  },

  async adminSignup(data: AdminSignupFormData) {
    return apiClient.post<{ data: { user: User; token: string } }>("/admin/setup", data);
  },
};