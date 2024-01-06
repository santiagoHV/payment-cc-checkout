import { combineReducers } from "redux";
import productReducer from "../features/ProductPage/reducers/productPageReducer";
import paymentReducer from "../features/ProductPage/reducers/paymentReducer";

const rootReducer = combineReducers({
    productReducer: productReducer,
    paymentReducer: paymentReducer
})

export default rootReducer;