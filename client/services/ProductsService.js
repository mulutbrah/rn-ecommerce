import api from "./index";

export default {
  createProduct(payload) {
    api.defaults.headers.common["Authorization"] = myToken;

    return api.post("/products", payload);
  },
  getProducts() {
    return api.get(`/products`);
  },
  getProductsByType(type) {
    return api.get(`/products?type=${type}`);
  },
  getSimilarProducts(id) {
    return api.get(`/products/${id}/similar`);
  },
  getProductReviews() {
    return mockReviews.get();
  },
  getProductRatingCount(id) {
    return api.get(`/products/${id}/rating_count`);
  },
  searchProduct(productName) {
    return api.get(`/products?q=${productName}`);
  },
  editProduct(payload) {
    api.defaults.headers.common["Authorization"] = myToken;

    return api.put(`/products/${payload._id}`, payload);
  },
  removeProduct(id) {
    return api.delete(`/products/${id}`);
  },
  searchFilterAndSortProductsBy(queryParams) {
    return api.get(`/products?${queryParams}`);
  }
};
