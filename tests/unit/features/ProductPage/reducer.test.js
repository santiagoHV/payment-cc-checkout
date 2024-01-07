import { expect, it, describe } from "vitest";
import productReducer from "../../../../src/features/ProductPage/reducers/productPageReducer";
import paymentReducer from "../../../../src/features/ProductPage/reducers/paymentReducer";

const expectedInitialState = {
    paymentStatus: null,
    cardData: {
        cardNumber: "",
        cardHolder: "",
        expirationMonth: 1,
        expirationYear: 2025,
        cvc: "",
        indentificationType: "CC",
        identificationNumber: "",
        cuoteNumber: "",
    },
    userData: {
        fullName: "",
        email: "",
        phone: "",
        country: "",
    },
    paymentResponse: {},
    loading: false,
    error: null
}

describe("ProductPage reducer", () => {
    // it("should return the initial state", () => {
    //     expect(productReducer(undefined, {})).toEqual({
    //         ...expectedInitialState,
    //     })
    // });

    it("should handle FETCH_PRODUCT_PENDING", () => {
        expect(
            productReducer(undefined, {
                type: "FETCH_PRODUCT_PENDING",
            })
        ).toEqual({
            product: {},
            loading: true,
            error: null,
        });
    });

    it("should handle FETCH_PRODUCT_SUCCESS", () => {
        expect(
            productReducer(undefined, {
                type: "FETCH_PRODUCT_SUCCESS",
                payload: { id: 1, name: "Product 1" },
            })
        ).toEqual({
            product: { id: 1, name: "Product 1" },
            loading: false,
            error: null,
        });
    });

    it("should handle FETCH_PRODUCT_ERROR", () => {
        expect(
            productReducer(undefined, {
                type: "FETCH_PRODUCT_ERROR",
                payload: "Error",
            })
        ).toEqual({
            product: {},
            loading: false,
            error: "Error",
        })
    })
})

describe("Payment reducer", () => {
    // it("should return the initial state", () => {
    //     expect(paymentReducer(undefined, {})).toEqual({
    //         ...expectedInitialState,
    //     })
    // })

    it("should handle UPDATE_CARD_DATA", () => {
        expect(
            paymentReducer(undefined, {
                type: "UPDATE_CARD_DATA",
                payload: { cardNumber: "1234123412341234" },
            })
        ).toEqual({
            ...expectedInitialState,
            cardData: { cardNumber: "1234123412341234" },
        })
    })

    it("should handle UPDATE_USER_DATA", () => {
        expect(
            paymentReducer(undefined, {
                type: "UPDATE_USER_DATA",
                payload: { name: "Test User" },
            })
        ).toEqual({
            ...expectedInitialState,
            userData: { name: "Test User" },
        })
    })

    it("should handle SUBMIT_PAYMENT_SUCCESS", () => {
        const payload = {
            product: "Product 1",
            basePrice: 81,
            iva: 19,
            total: 100,
        }

        expect(
            paymentReducer(undefined, {
                type: "SUBMIT_PAYMENT_SUCCESS",
                payload,
            })
        ).toEqual({
            ...expectedInitialState,
            paymentResponse: payload,
            paymentStatus: "success",
        })
    })
})
