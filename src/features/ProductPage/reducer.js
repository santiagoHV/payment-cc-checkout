import { FETCH_PRODUCT_PENDING, FETCH_PRODUCT_ERROR, FETCH_PRODUCT_SUCCESS } from "./actions";

const initialState = {
    product: {},
    loading: false,
    error: null
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                loading: false,
            };
        case FETCH_PRODUCT_PENDING:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default productReducer