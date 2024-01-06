import productsData from '../data/products.json';

const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData.products);
    }, 500)
  })
}

const fetchProductById = (id) => {
    const productId = Number(id)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productsData.products.find((product) => product.id === productId));
        }, 500)
    }
    )
}

export default {
    fetchProducts,
    fetchProductById
}