import productsData from '../data/products.json';
// import cardsData from '../data/cards.json';

const fetchProducts = () => {
    const response = {
        status: 200,
        message: "Products fetched successfully",
        body: productsData.products
    }

    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(response);
        }, 500)
    })
}

const fetchProductById = (id) => {
    const productId = Number(id)

    const response = {
        status: 200,
        message: "Product fetched successfully",
        body: productsData.products.find((product) => product.id === productId)
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(response);
        }, 500)
    }
    )
}

const createPayment = (payment) => {
    const response = {
        status: 200,
        message: "Payment Successful",
        body: {
            product: payment.product.name,
            basePrice: Number(payment.product.price) * 0.81,
            iva: Number(payment.product.price) * 0.19,
            total: Number(payment.product.price),
        }
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(response);
        }, 2000)
    })
}

//Logic of fake payment

export default {
    fetchProducts,
    fetchProductById,
    createPayment
}