import { expect, describe, it, vi } from "vitest";
import { fetchProduct, FETCH_PRODUCT_ERROR, FETCH_PRODUCT_PENDING, FETCH_PRODUCT_SUCCESS } from "../../../../src/features/ProductPage/actions";
import api from "../../../../src/api/api";

describe("ProductPage actions", () => {
    it("fetchProduct", async () => {
        const productId = "1";
        const product = { id: 1, name: "Product 1" };
        const dispatch = vi.fn();
        const fetchProductById = vi.fn(() => Promise.resolve(product));

        api.fetchProductById = fetchProductById;

        await fetchProduct(productId)(dispatch);

        expect(fetchProductById).toHaveBeenCalledWith(productId);
        expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_PRODUCT_PENDING,
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_PRODUCT_SUCCESS,
            payload: product,
        });
    });
});