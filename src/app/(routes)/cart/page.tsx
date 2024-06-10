"use client";

import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import {
  decreaseProductCount,
  increaseProductCount,
  removeFromCart,
} from "@/store";
import {
  decreaseProductCountService,
  increaseProductCountService,
  removeFromCartService,
} from "@/store/actions/cart.actions";
import { RootState, useAppDispatch } from "@/store/store";
import { redirect } from "@/utils";
import { IProduct } from "@/utils/types";
import {
  Button,
  Divider,
  Flex,
  Group,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import Head from "next/head";
import { useCallback } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Page() {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state?.cart?.cart);
  const user = useSelector((state: RootState) => state?.user?.user);

  const handleIncreaseCount = useCallback(
    async (product: IProduct) => {
      const existingItem = cart?.find((item: IProduct) => item.id === product?.id);
      if (user.isAuth)
        dispatch(
          increaseProductCountService({
            id: product?.id,
            count: existingItem?.count + 1,
          })
        );
      else dispatch(increaseProductCount({ id: product?.id }));
    },
    [cart, dispatch, user.isAuth]
  );

  const handleDecreaseCount = useCallback(
    async (product: IProduct) => {
      const existingItem = cart?.find((item: IProduct) => item.id === product?.id);

      if (existingItem?.count === 1)
        if (user.isAuth) dispatch(removeFromCartService({ id: product?.id }));
        else dispatch(removeFromCart({ id: product?.id }));
      else if (user.isAuth)
        dispatch(
          decreaseProductCountService({
            id: product?.id,
            count: existingItem?.count - 1,
          })
        );
      else dispatch(decreaseProductCount({ id: product?.id }));
    },
    [cart, user.isAuth, dispatch]
  );

  const handleRemoveProduct = (product: IProduct) => {
    if (user.isAuth) dispatch(removeFromCartService({ id: product?.id }));
    else dispatch(removeFromCart({ id: product?.id }));
  };

  
  const calculateTotalPrice = (cart: IProduct[]) => {
    return cart?.reduce((total: any, item: IProduct) => {
      return total + Number(Number(item?.price) * ((100 - Number(item?.discount)) / 100)) * Number(item?.count);
    }, 0);
  };

  return (
    <div>
      <Head>
        <title>Корзина</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text className="text-[1.75rem] text-[#212121] my-[30px]">Корзина</Text>
      {cart?.length === 0 && <EmptyPlaceholder label="Корзина пусто" />}
      {cart.length !== 0 && (
        <Flex gap={"sm"} direction={"column"}>
          {cart?.map((item: IProduct, i: number) => (
            <Paper key={i} className="rounded-lg hover:shadow-md" withBorder>
              <Flex
                justify={"space-between"}
                className="w-full flex-col md:flex-row"
              >
                <Flex className="w-full" align="center">
                  <Image
                    src={"https://api.chistayaliniya.tj" + item?.imagePath}
                    alt={item?.productName}
                    className="h-[130px] w-full object-contain"
                  />
                  <Text className="m-0 p-0 font-semibold text-[1.125rem]">
                    {item?.productName}
                  </Text>
                </Flex>
                <Flex justify={"space-between"} className="w-full p-2">
                  <Group>
                    <Flex gap={"sm"} align={"center"}>
                      <button
                        onClick={() => handleIncreaseCount(item)}
                        className="!w-[30px] !h-[30px] rounded-full flex items-center justify-center bg-[#d9d9d9] cursor-pointer outline-none border-none "
                      >
                        <FaPlus size={8} />
                      </button>
                      <Text className="text-[1rem]">{item?.count}</Text>
                      <button
                        onClick={() => handleDecreaseCount(item)}
                        className="!w-[30px] !h-[30px] rounded-full flex items-center justify-center bg-[#d9d9d9] cursor-pointer outline-none border-none "
                      >
                        <FaMinus size={8} />
                      </button>
                    </Flex>
                    <Text className="text-[0.875rem] text-[#888785]">
                      x {(Number(item?.price) * ((100 - Number(item?.discount)) / 100)).toFixed(2)} c.
                    </Text>
                  </Group>
                  <Group>
                    <Text>
                      {(Number(item?.count) * Number(item?.price) * ((100 - Number(item?.discount)) / 100)).toFixed(2)}
                      c.
                    </Text>
                    <Button
                      variant="filled"
                      color="red"
                      onClick={() => handleRemoveProduct(item)}
                    >
                      Удалить
                    </Button>
                  </Group>
                </Flex>
              </Flex>
            </Paper>
          ))}
          <Divider />
          <Flex className="w-full" align={"center"} justify={"end"}>
            <div>
              <Text className="font-semibold text-[1.75rem] text-[#212121] m-0 p-0">
                {Number(calculateTotalPrice(cart)).toFixed(2)} c.
              </Text>
              <Text className="text-[#888875] text-[0.875rem] m-0 p-0">
                Всего товаров: {cart?.length || 0} шт.
              </Text>
              <Button
                className="bg-[#2A5FFE] rounded-full px-[20px] py-[12px] mt-[20px] font-normal h-[43px]"
                onClick={() => redirect("/order")}
              >
                Перейти к оплате
              </Button>
            </div>
          </Flex>
        </Flex>
      )}
    </div>
  );
}
