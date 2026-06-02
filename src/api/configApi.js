import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9999",
});

// Category
export const getCategories = () => API.get("/Category");

// Product
export const getProducts = () => API.get("/Product");
export const deleteProduct = (id) => API.delete(`/Product/${id}`);
export const addProduct = (data) => API.post("/Product", data);
export const getProductById = (id) => API.get(`/Product/${id}`);
export const updateProduct = (id, data) => API.put(`/Product/${id}`, data);

// Pages Text
export const getPagesText = () => API.get("/pagesText");

// Info Shop
export const getInfoShop = () => API.get("/infoshop");

// Payment
export const getPayments = () => API.get("/Payment");
export const getPaymentById = (id) => API.get(`/Payment/${id}`);
export const addPayment = (data) => API.post("/Payment", data);
export const updatePayment = (id, data) => API.put(`/Payment/${id}`, data);
export const deletePayment = (id) => API.delete(`/Payment/${id}`);
