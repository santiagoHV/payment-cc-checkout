import { expect, describe, it, vi, beforeAll } from "vitest";
import { fetchProduct, FETCH_PRODUCT_ERROR, FETCH_PRODUCT_PENDING, FETCH_PRODUCT_SUCCESS } from "../../../../src/features/ProductPage/actions/productPageActions";
import { UPDATE_CARD_DATA, updateCardData, updateUserData, submitPayment } from "../../../../src/features/ProductPage/actions/paymentActions";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../../../src/store/rootReducer";

let store

beforeAll(() => {
    store = configureStore({
        reducer: rootReducer
    })
})

describe("ProductPage actions", () => {
    it("Should create an action to fetch product", async() => {
        const productId = 1

        const expectedProduct = {
            "id": 1,
            "name": "Monitor special",
            "subname": "Referencia 1234",
            "price": 1000,
            "image": "https://http2.mlstatic.com/D_NQ_NP_992802-MLU72746216408_112023-O.webp",
            "overview": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            "details": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        }

        const fetchProductById = vi.fn(() => Promise.resolve({
            status: 200,
            message: "Product fetched successfully",
            body: expectedProduct
        }))

        await store.dispatch(fetchProduct(productId, fetchProductById))

        expect(store.getState().productReducer.product).toEqual(expectedProduct)
    })
});

describe('Payment Actions', () => {
    it('Should create an action to update card data', async() => {
        const cardData = {
            cardNumber: "1234123412341234",
            cardHolder: "Test User",
            expirationMonth: 1,
            expirationYear: 2025,
            cvc: "123",
            indentificationType: "CC",
            identificationNumber: "123456789",
            cuoteNumber: "1",
        }

        await store.dispatch(updateCardData(cardData))

        expect(store.getState().paymentReducer.cardData).toEqual(cardData)
    })

    it('Should create an action to update user data', async() => {
        const userData = {
            name: "Test User",
            email: "test@mail.com"
        }

        await store.dispatch(updateUserData(userData))

        expect(store.getState().paymentReducer.userData).toEqual(userData)
    })

    it('Should create an action to submit payment', async() => {
        const paymentData = {
            paymentCardData: {
                cardNumber: "1234123412341234",
                cardHolder: "Test User",
                expirationMonth: 1,
                expirationYear: 2025,
                cvc: "123",
                indentificationType: "CC",
                identificationNumber: "123456789",
                cuoteNumber: "1",
            },
            paymentUserData: {
                name: "Test User",
                email: "test@mail.com"
            },
            product: {
                id: 1,
                name: "Product 1",
                price: 100
            }
        }

        const expectedPaymentStatus = 'success'
        const expectedPaymentResponse = {
            product: paymentData.product.name,
            basePrice: Number(paymentData.product.price) * 0.81,
            iva: Number(paymentData.product.price) * 0.19,
            total: Number(paymentData.product.price),
        }

        await store.dispatch(submitPayment(paymentData))

        expect(store.getState().paymentReducer.paymentStatus).toEqual(expectedPaymentStatus)
        expect(store.getState().paymentReducer.paymentResponse).toEqual(expectedPaymentResponse)
    })
})
