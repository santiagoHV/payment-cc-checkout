import { expect, it, describe } from "vitest";
import productReducer from "../../../../src/features/ProductPage/reducers/productPageReducer";

describe("ProductPage reducer", () => {
    it("should return the initial state", () => {
        expect(productReducer(undefined, {})).toEqual({
            product: {},
            loading: false,
            error: null,
        });
    });

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
        });
    });
});
