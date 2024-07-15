import { useLoginMutation, useRegistrationMutation } from "@/store";
import { pullCart, pushCart } from "@/store/actions/cart.actions";
import { loginSuccess } from "@/store/slices/userSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { formatPhoneNumber } from "@/utils/phoneNumberFormatter";
import {
  Button,
  Flex,
  InputBase,
  LoadingOverlay,
  Modal,
  Text,
} from "@mantine/core";
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

  const [register, { isSuccess, isLoading: isLoadingRegister }] =
    useRegistrationMutation();

  const [
    login,
    {
      isSuccess: isSuccessLogin,
      data: dataLogin,
      isLoading: isLoadingLogin,
      isError: isErrorLogin,
    },
  ] = useLoginMutation();

  const handleRegister = () => {
    let cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    if (cleanedPhoneNumber.length < 10) {
      setError("Введите корректный номер");
      return () => {};
    }
    register({ phoneNumber: cleanedPhoneNumber });
  };

  const handleLogin = () => {
    let cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    if (cleanedPhoneNumber.length < 10) {
      setError("Введите корректный номер");
      return () => {};
    }

    login({ phoneNumber: cleanedPhoneNumber });
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
        if (cart?.length !== 0) {
          await dispatch(
            pushCart(
              cart.map((item: any) => ({
                productId: item?.id || item?.productId,
                count: item.count,
              }))
            )
          );
        }

        await dispatch(pullCart());
      };

      pullCartFunc();
      onClose()
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
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
          />
          <br />
          <Text className="text-[0.875rem] text-[red] mb-2">
            {isErrorLogin &&
              "Что-то пошло не так. Пользователь может быть не зарегистрирован"}
          </Text>
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
            // type="number"
            value={phoneNumber}
            placeholder="+992xxxxxxxxx"
            label="Введите номер телефона"
            error={error}
            classNames={{ input: "h-[40px] text-[1rem] font-bold" }}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
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

      <LoadingOverlay
        visible={isLoadingLogin}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <LoadingOverlay
        visible={isLoadingRegister}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Modal>
  );
};
