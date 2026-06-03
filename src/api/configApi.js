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
export const getPayments = () => API.get("/Payments");
export const getPaymentById = (id) => API.get(`/Payments/${id}`);
export const addPayment = (data) => API.post("/Payments", data);
export const updatePayment = (id, data) => API.put(`/Payments/${id}`, data);
export const deletePayment = (id) => API.delete(`/Payments/${id}`);

// Cart
export const getCart = () => API.get("/Cart");
export const addToCartApi = (data) => API.post("/Cart", data);
export const updateCartItem = (id, data) => API.patch(`/Cart/${id}`, data);
export const deleteCartItem = (id) => API.delete(`/Cart/${id}`);
