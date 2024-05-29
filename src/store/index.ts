export { store } from "./store";

export { useGetAllCategoryQuery } from "./api/category";

export { useGetProductByHideQuery, useGetProductByIdQuery, useAddCommentMutation } from "./api/product";

export {
  useLoginMutation,
  useRegistrationMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLoginByEmailMutation,
} from "./api/auth";

export { useGetAllBannersQuery } from "./api/banner";

export { useGetUserOrdersQuery, useGetOrderByIdQuery, useCreateOrderMutation } from "./api/order";

export { useGetAllDeliveryTypesQuery } from "./api/delivery-type";
export { useGetAllPaymentTypesQuery } from "./api/payment-type";

export {
  addToFavorites,
  clearFavorites,
  removeFromFavorites,
} from "./slices/favoritesSlice";

export {
  addToCart,
  clearCart,
  removeFromCart,
  decreaseProductCount,
  increaseProductCount,
} from "./slices/cartSlice";
