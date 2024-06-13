import api from "../config";

class UserService {
  shareList = async (data) => {
    try {
      const response = await api.post("/users/share-list", {
        listId: data.listId,
        email: data.email,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };
}

export default new UserService();
