import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import api from "./middleware/api";
// import logger from "./middleware/logger";
// import toast from "./middleware/toast";
import { rootReducer } from "./reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function () {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: [
      ...getDefaultMiddleware(),
      // logger({ destination: "console" }),
      // toast,
      api,
    ],
  });
  let persistor = persistStore(store);

  return { store, persistor };
}
