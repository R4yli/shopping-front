import api from "../config";
import tokenService from "./tokenService";

class AuthService {
  login = async (data) => {
    try {
      const response = await api.post("/login", data);
      if (response.data.accessToken) {
        tokenService.setUser(response.data);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  register = async (data) => {
    try {
      const response = await api.post("/register", data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  logout() {
    tokenService.removeUser();
  }

  getCurrentUser() {
    return tokenService.getUser();
  }
}

export default new AuthService();
