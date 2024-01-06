import { combineReducers } from "redux";
import productReducer from "../features/ProductPage/reducer";

const rootReducer = combineReducers({
    productReducer: productReducer
})

export default rootReducer;