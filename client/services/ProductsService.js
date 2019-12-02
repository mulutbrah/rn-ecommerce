import api from "./index";
const myToken = localStorage.getItem("token");

export default {
  createProduct(payload) {
    api.defaults.headers.common["Authorization"] = myToken;

    return api.post("/products", payload);
  },
  getProductCatalog() {
    return api.get(`/products`);
  },
  getProduct(id) {
    return api.get(`/products/${id}`);
  },
  getProductsByType(type) {
    return api.get(`/products?type=${type}`);
  },
  getSimilarProducts(id) {
    return api.get(`/products/${id}/similar`);
  },
  createOrUpdateWishlist(productId, status) {
    const access_token = localStorage.getItem("access_token");
    let config = {
      headers: {
        Authorization: access_token
      }
    };

    return api.post(
      `/products/${productId}/wishlist?status=${status}`,
      {},
      config
    );
  },
  getWishlist() {
    const access_token = localStorage.getItem("access_token");

    return api.get("/products/wishlist", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  },
  getProductReviews() {
    return mockReviews.get();
    // return api.get(`/products/${id}/reviews`);
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
