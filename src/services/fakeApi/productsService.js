import api from "../../api/api";

const fetchProducts = async () => {
    try {
        const products = await api.fetchProducts();
        return products;
    } catch (error) {
        console.error(error);
        return {error: error.message};
    }
}

const fetchProductById = async (id) => {
    try {
        const product = await api.fetchProductById(id);
        return product;
    } catch (error) {
        console.error(error);
        return {error: error.message};
    }
}

export default {
    fetchProductById,
    fetchProducts
};