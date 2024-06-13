import api from "../config";

class ListItemsService {
  create = async (data, listId) => {
    try {
      const response = await api.post(`/list/${listId}/item`, {
        name: data.name,
        quantity: data.quantity,
        status: data.status,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  update = async (data, listId, id) => {
    try {

      const response = await api.put(`/list/${listId}/item/${id}`, {
        name: data.name,
        quantity: data.quantity,
        status: data.status,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  getMany = async (listId) => {
    try {
      const response = await api.get(`/list/${listId}/items`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  delete = async (listId, id) => {
    try {
      const response = await api.delete(`/list/${listId}/item/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };
}

export default new ListItemsService();
