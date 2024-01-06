import { combineReducers } from "redux";
import productReducer from "../features/ProductPage/reducers/productPageReducer";

const rootReducer = combineReducers({
    productReducer: productReducer
})

export default rootReducer;