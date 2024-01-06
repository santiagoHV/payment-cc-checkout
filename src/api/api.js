import productsData from '../data/products.json';
// import cardsData from '../data/cards.json';

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

//Logic of fake payment

export default {
    fetchProducts,
    fetchProductById
}