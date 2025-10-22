import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// add a new property
export const createProperty = async (propertyData) => {
  const response = await api.post("/add", propertyData);
  return response.data;
};

// get all properties
export const getProperties = async () => {
  const response = await api.get("/get");
  return response.data;
};

// delete a property by id
export const deletePropertyById = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};

// update a property by id
export const updatePropertyById = async (id, propertyData) => {
  const response = await api.put(`/update/${id}`, propertyData);
  return response.data;
};
