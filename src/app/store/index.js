import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { documentReducer } from "./reducer/categoryFilterSlice";
import { authReducer} from "./reducer/authSlice";  
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const documentPersistConfig = {
  key: "documents",
  storage: storage,
  whitelist: ["categoryFilterState", "documentData", "documentPagination", "documentConfig", "empatyState"],
};

const authPersistConfig = {
  key: "authStorage",
  storage: storage,
  whitelist: ["authUser"]
};

const persistedReducerAuth = persistReducer(authPersistConfig, authReducer)
const persistedReducer = persistReducer(documentPersistConfig, documentReducer);

const rootReducer = combineReducers({
  documents: persistedReducer,
  authUserStorage:persistedReducerAuth
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;