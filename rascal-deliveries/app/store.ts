import { combineReducers, configureStore, Slice } from "@reduxjs/toolkit"
import { usersApi } from "./api/users"
import { deliveriesApi } from "./api/deliveries"
import { productsApi } from "./api/products"
import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist"
import accountSlice from "./slices/account"
import AsyncStorage from "@react-native-async-storage/async-storage"

const getPersistReducer = <T extends Slice>(slice: T) =>
  persistReducer(
    {
      storage: AsyncStorage,
      version: 1,
      key: slice.name,
    },
    slice.reducer
  )

export const store = configureStore({
  reducer: combineReducers({
    [accountSlice.name]: getPersistReducer(accountSlice),
    [usersApi.reducerPath]: usersApi.reducer,
    [deliveriesApi.reducerPath]: deliveriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(usersApi.middleware)
      .concat(deliveriesApi.middleware)
      .concat(productsApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
