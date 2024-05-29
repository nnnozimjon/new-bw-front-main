"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuth: boolean;
  phoneNumber?: string;
  token?: string;
}

interface RootState {
  user: UserState;
}

const getInitialState = (): RootState => {
  let storedState;

  if (typeof window !== "undefined") {
    storedState = localStorage?.getItem("bw-states");
  }

  if (storedState) {
    const parsedState = JSON.parse(storedState);
    return {
      user: {
        token: parsedState.token,
        phoneNumber: parsedState.phoneNumber,
        isAuth: true,
      },
    };
  }

  return {
    user: {
      isAuth: false,
    },
  };
};

const initialState: RootState = getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.user.token = action.payload.token;
      state.user.phoneNumber = action.payload.phoneNumber;
      state.user.isAuth = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("bw-states", JSON.stringify(state));
      }
    },
    logout: (state) => {
      state.user.isAuth = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("bw-states");
        localStorage.clear()
      }
      window.location.reload();
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
