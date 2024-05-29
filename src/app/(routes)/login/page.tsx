"use client";

import { useLoginByEmailMutation } from "@/store";
import { pullCart, pushCart } from "@/store/actions/cart.actions";
import { loginSuccess } from "@/store/slices/userSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { Button, Grid, InputBase, Paper, Text } from "@mantine/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart?.cart);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isSuccess: isSuccessLogin, data: dataLogin }] =
    useLoginByEmailMutation();

  const handleLogin = () => {
    if (!email.includes("@")) {
      setError("Введите корректную почту");
      return () => {};
    }

    login({ email, password });
  };

  useEffect(() => {
    if (isSuccessLogin) {
      dispatch(
        loginSuccess({
          phoneNumber: dataLogin?.phoneNumber,
          token: dataLogin?.token,
          isAuth: true,
        })
      );

      const pullCartFunc = async () => {
        if (cart.length)
          await dispatch(
            pushCart(
              cart.map((item: any) => ({
                productId: item.productId,
                count: item.count,
              }))
            )
          );

        await dispatch(pullCart());
      };

      pullCartFunc();

      window.location.replace("/");
    }
  }, [isSuccessLogin]);

  return (
    <div>
      <Head>
        <title>Вход</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text className="text-[1.75rem] text-[#212121] my-[30px]">
        Авторизация
      </Text>
      <Grid>
        <Grid.Col span={{ md: 6, sm: 12 }}>
          <Paper withBorder shadow="xs" className="px-[12px] py-[10px]">
            <InputBase
              value={email}
              label={"Введите эл.почту"}
              placeholder={"name@company.example"}
              error={error}
              classNames={{
                label: "mb-[7px] text-[0.875rem] text-[#888785] font-normal",
                input: "px-[12px] py-[10px] h-[45px]",
              }}
              type={"text"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBase
              value={password}
              label={"Введите пароль"}
              placeholder={"******"}
              classNames={{
                label: "mb-[7px] text-[0.875rem] text-[#888785] font-normal",
                input: "px-[12px] py-[10px] h-[45px]",
              }}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button
              variant="filled"
              color="blue"
              className="w-full h-[40px]"
              onClick={handleLogin}
            >
              Войти
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
