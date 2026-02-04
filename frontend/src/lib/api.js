import api from "./axios";

// user api
export const syncUser = async () => {
    const { data } = await api.post("/users/sync", userData);
    return data;
};

// product api
export const getAllProducts = async () => {
    const { data } = await api.get("/products");
    return data;
};

// single product api
export const getProductById = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

// my products api
export const getMyProducts = async () => {
    const { data } = await api.get("/products/my");
    return data;
};

// create product api
export const createProduct = async (productData) => {
    const { data } = await api.post("/products", productData);
    return data;
};

// udate product api
export const updateProduct = async ({ id, ...productData }) => {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
};

//delete product api
export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
};

//create comment api
export const createComment = async ({ productId, content }) => {
    const { data } = await api.post(`/products/${productId}`, { content });
    return data;
};

// delete comment api
export const deleteComment = async ({ commentId }) => {
    const { data } = await api.delete(`/comments/${commentId}`);
    return data;
}