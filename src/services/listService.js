import api from "../config";

class ListService {
  create = async (data) => {
    try {
      const response = await api.post("/list", {
        title: data.title,
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

  update = async (data, id) => {
    try {

      const response = await api.put(`/list/${id}`, { title: data.title, status: data.status }, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  findById = async (id) => {
    try {
      const response = await api.get(`/list/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  getMany = async () => {
    try {
      const response = await api.get("/list");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  getPaginated = async (page, perPage) => {
    try {
      const response = await api.get(`/list-paginated?page=${page}&perPage=${perPage}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };

  delete = async (id) => {
    try {
      const response = await api.delete(`/list/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || "Error desconocido.");
    }
  };
}

export default new ListService();
