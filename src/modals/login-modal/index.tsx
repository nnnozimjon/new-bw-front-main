import { useLoginMutation, useRegistrationMutation } from "@/store";
import { pullCart, pushCart } from "@/store/actions/cart.actions";
import { loginSuccess } from "@/store/slices/userSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { Button, Flex, InputBase, Modal, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  onClose: () => void;
  opened: boolean;
}

type view = "login" | "register" | "alert";

export const LoginModal = ({ onClose, opened }: IProps) => {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart?.cart);

  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [view, setView] = useState<view>("login");

  const [register, { isSuccess }] = useRegistrationMutation();

  const [login, { isSuccess: isSuccessLogin, data: dataLogin }] =
    useLoginMutation();

  const handleRegister = () => {
    let cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    if (cleanedPhoneNumber.length < 10) {
      setError("Введите корректный номер");
      return () => {};
    }
    register({ phoneNumber });
  };

  const handleLogin = () => {
    let cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    if (cleanedPhoneNumber.length < 10) {
      setError("Введите корректный номер");
      return () => {};
    }

    login({ phoneNumber });
  };

  useEffect(() => {
    if (isSuccess) {
      setView("alert");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessLogin) {
      dispatch(loginSuccess(dataLogin));
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

      window.location.reload();
    }
  }, [isSuccessLogin]);

  return (
    <Modal
      onClose={onClose}
      opened={opened}
      centered
      className="z-[1000] fixed w-screen h-screen"
      withCloseButton={false}
    >
      {view === "login" && (
        <div>
          <Text className="text-[1.75rem] font-bold text-[#2a5ffe] text-center mb-[30px]">
            Авторизация
          </Text>
          <InputBase
            // type="number"
            value={phoneNumber}
            placeholder="+992xxxxxxxxx"
            label="Введите номер телефона"
            classNames={{ input: "h-[40px] text-[1rem] font-bold" }}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />
          <Flex gap={"md"} direction={"column"}>
            <Button className="h-[40px] w-full" onClick={handleLogin}>
              Войти
            </Button>
            <Button
              className="h-[40px] w-full"
              variant="outline"
              onClick={() => {
                setPhoneNumber("");
                setView("register");
              }}
            >
              Регистрация
            </Button>
          </Flex>
        </div>
      )}
      {view === "register" && (
        <div>
          <Text className="text-[1.75rem] font-bold text-[#2a5ffe] text-center mb-[30px]">
            Регистрация
          </Text>
          <InputBase
            type="number"
            value={phoneNumber}
            placeholder="+992xxxxxxxxx"
            label="Введите номер телефона"
            error={error}
            classNames={{ input: "h-[40px] text-[1rem] font-bold" }}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />
          <Flex gap={"md"} direction={"column"}>
            <Button className="h-[40px] w-full" onClick={handleRegister}>
              Зарегистрироваться
            </Button>
            <Button
              className="h-[40px] w-full"
              variant="outline"
              onClick={() => {
                setPhoneNumber("");
                setView("login");
              }}
            >
              Войти
            </Button>
          </Flex>
        </div>
      )}

      {view === "alert" && (
        <div>
          <Text className="text-[1.75rem] font-bold text-[#2a5ffe] text-center mb-[30px]">
            Вы успешно зарегистрировались!
          </Text>
          <Button
            className="h-[40px] w-full"
            onClick={() => {
              setPhoneNumber("");
              setView("login");
            }}
          >
            Войти
          </Button>
        </div>
      )}
    </Modal>
  );
};
