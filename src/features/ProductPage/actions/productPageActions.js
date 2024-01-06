import service from "../../../services/fakeApi/productsService"

export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_PENDING = "FETCH_PRODUCT_PENDING";
export const FETCH_PRODUCT_ERROR = "FETCH_PRODUCT_ERROR";

export const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product
})  

export const fetchProductError = (error) => ({
    type: FETCH_PRODUCT_ERROR,
    payload: error
})

export const fetchProductPending = () => ({
    type: FETCH_PRODUCT_PENDING
})


export const fetchProduct = (productId) => {
    return async (dispatch) => {
        dispatch(fetchProductPending());

        try{
            const product = await service.fetchProductById(productId);
            dispatch(fetchProductSuccess(product));
        } catch (error) {
            console.error(error);
            dispatch(fetchProductError(error));
        }
    }
}
