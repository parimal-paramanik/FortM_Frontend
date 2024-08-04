import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig= {
  key:"root",
  version:1,
  storage,
}
const reducer = combineReducers({
  auth:authReducer
})
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});
export default store;
