import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer, userReducer } from "./productsReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  userInfo: userReducer,
});
export default reducers;
