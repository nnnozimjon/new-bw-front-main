import { usingBearerToken } from "@/hooks";
import {
  addToCart,
  decreaseProductCount,
  increaseProductCount,
  removeFromCart,
  updateCart,
} from "../slices/cartSlice";
import { logout } from "../slices/userSlice";

export const pushCart = (cart: any) => async (dispatch: any) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/basket/addrange";

  const response: any = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: usingBearerToken(),
    },
    body: JSON.stringify(cart),
  });

  if (response.status === 401 || response.status === 403) {
    window.location.href = "/";
    dispatch(logout());
  }
};

export const pullCart = () => async (dispatch: any) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/basket";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: usingBearerToken(),
    },
  });
  if (response.status === 401 || response.status === 403) {
    window.location.href = "/";
    dispatch(logout());
  }

  const newCart = await response.json();

  dispatch(updateCart(newCart));
};

export const addToCartService = (product: any) => async (dispatch: any) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/basket";
  dispatch(addToCart(product));

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: usingBearerToken(),
    },
    body: JSON.stringify({ productId: product?.id, count: 1 }),
  });
};

export const removeFromCartService =
  (product: any) => async (dispatch: any) => {
    const url = process.env.NEXT_PUBLIC_HOST + "/basket/" + product?.id;

    dispatch(removeFromCart(product));

    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: usingBearerToken(),
      },
    });
  };

export const increaseProductCountService =
  (product: any) => async (dispatch: any) => {
    const url = process.env.NEXT_PUBLIC_HOST + "/basket";
    dispatch(increaseProductCount(product));

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: usingBearerToken(),
      },
      body: JSON.stringify({ productId: product?.id, count: product?.count }),
    });
  };

export const decreaseProductCountService =
  (product: any) => async (dispatch: any) => {
    const url = process.env.NEXT_PUBLIC_HOST + "/basket";

    dispatch(decreaseProductCount(product));
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: usingBearerToken(),
      },
      body: JSON.stringify({ productId: product?.id, count: product?.count }),
    });
  };
