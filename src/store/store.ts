import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { cartReducer, favoritesReducer, userReducer } from "./slices";
import {
  authApi,
  bannerApi,
  brandsApi,
  categoryApi,
  deliverTypeApi,
  orderApi,
  paymentTypeApi,
  productApi,
} from "./api";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    favorites: favoritesReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [paymentTypeApi.reducerPath]: paymentTypeApi.reducer,
    [deliverTypeApi.reducerPath]: deliverTypeApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      bannerApi.middleware,
      orderApi.middleware,
      paymentTypeApi.middleware,
      deliverTypeApi.middleware,
      brandsApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // Export a hook that can be reused to resolve types

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
