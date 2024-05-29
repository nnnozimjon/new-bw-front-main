"use client";

import {
  clearCart,
  useCreateOrderMutation,
  useGetAllDeliveryTypesQuery,
  useGetAllPaymentTypesQuery,
} from "@/store";
import { RootState, useAppDispatch } from "@/store/store";
import { redirect } from "@/utils";
import {
  Button,
  Divider,
  Flex,
  Grid,
  Image,
  Paper,
  Radio,
  SimpleGrid,
  Text,
  Textarea,
} from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state?.cart?.cart);

  const [text, setText] = useState("");

  const [selectedPayment, setSelectedPayment] = useState<any>({});
  const [selectedDelivery, setSelectedDelivery] = useState<any>({});

  const [paymentTypes, setPaymentTypes] = useState<any>([]);
  const [deliveryTypes, setDeliveryTypes] = useState<any>([]);

  const { data: dataPayment, isSuccess: isSuccessPayment } =
    useGetAllPaymentTypesQuery({});
  const { data: dataDelivery, isSuccess: isSuccessDelivery } =
    useGetAllDeliveryTypesQuery({});

  useEffect(() => {
    if (isSuccessPayment) {
      setPaymentTypes(dataPayment);
      setSelectedPayment(dataPayment[0]);
    }
  }, [isSuccessPayment]);

  useEffect(() => {
    if (isSuccessDelivery) {
      setDeliveryTypes(dataDelivery);
      setSelectedDelivery(dataDelivery[0]);
    }
  }, [isSuccessDelivery]);

  const calculateTotalPrice = (cart: any) => {
    return cart?.reduce((total: any, item: any) => {
      return total + Number(item?.price) * Number(item?.count);
    }, 0);
  };

  const [createOrder, { isSuccess }] = useCreateOrderMutation();

  useEffect(() => {
    if(isSuccess) {
      dispatch(clearCart())
      redirect('/order-list')
    }
  }, [isSuccess]);

  const handleCreateOrder = () => {
    createOrder({
      DeliveryTypeId: selectedDelivery?.id,
      PaymentTypeId: selectedPayment?.id,
      Description: text,
    });
  };

  return (
    <div>
      <Text className="text-[1.75rem] text-[#212121] my-[30px] text-center">
        Оформить заказ
      </Text>
      <Grid>
        <Grid.Col span={{ md: 4, sm: 12 }}>
          <Paper shadow="sm" withBorder className="p-4">
            <Text className="text-[#212121] text-[1.125rem] font-semibold">
              Выбранные товары:
            </Text>
            {cart?.map((item: any, index: number) => (
              <Fragment key={index}>
                <Flex gap={"sm"}>
                  <Image
                    src={"https://api.chistayaliniya.tj/" + item?.imagePath}
                    className="h-[80px] object-contain"
                    alt=""
                  />
                  <Text>{item?.name}</Text>
                  <Text>
                    {item?.count} шт. ({item?.price}) c.
                  </Text>
                </Flex>
                <Divider variant="dotted" my={"sm"} />
              </Fragment>
            ))}
            <Text className="text-[#212121] text-[1.125rem] font-semibold mt-[20px]">
              Итого:
            </Text>
            <Flex align={"center"} justify={"space-between"} className="">
              <Text>Сумма заказа</Text>
              <Text>
                {(
                  Number(selectedDelivery?.price) +
                  Number(calculateTotalPrice(cart))
                )?.toFixed(2)}{" "}
                с.
              </Text>
            </Flex>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ md: 8, sm: 12 }}>
          <Textarea
            placeholder="Примечание к заказу"
            spellCheck={false}
            className="border border-solid rounded-md h-[300px]"
            classNames={{
              input: "border-none text-[1.225rem] placeholder:text-[1.225rem]",
            }}
            onChange={(e) => setText(e?.target?.value)}
            value={text}
          />
          <br />

          <SimpleGrid cols={{ base: 1, lg: 3, sm: 1 }}>
            {paymentTypes?.map((pay: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedPayment(pay)}
                className={`p-[30px] rounded-md cursor-pointer ${
                  pay?.id !== selectedPayment?.id
                    ? "bg-[#f3f3f3]"
                    : "bg-[#2a5ffe]"
                }`}
              >
                <Image
                  src={"https://api.chistayaliniya.tj/" + pay?.imagePath}
                  className="h-[110px] object-contain"
                  alt={pay?.name}
                />
                <Text
                  className={`text-center text-[1.125rem] font-medium select-none ${
                    pay?.id !== selectedPayment?.id
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {pay?.name}
                </Text>
              </div>
            ))}
          </SimpleGrid>
          <br />
          <Text className="border border-solid rounded-md p-3 w-full bg-[#f3f3f3]">
            {selectedPayment?.description}
          </Text>
          <br />
          <Text className="text-[1.125rem] font-semibold">Доставка</Text>

          {deliveryTypes?.map((delivery: any, index: number) => (
            <Flex
              key={index}
              align={"center"}
              justify={"space-between"}
              className={`p-4 border border-solid rounded-md mt-3 cursor-pointer ${
                delivery?.id === selectedDelivery?.id
                  ? "bg-[#e5d015] text-[white]"
                  : "bg-[#f3f3f3] text-[black]"
              }`}
            >
              <Flex align={"center"} gap={"md"}>
                <Radio checked={delivery?.id == selectedDelivery?.id} />
                <Text className={`font-bold select-none`}>
                  {delivery?.name}
                </Text>
              </Flex>
              <Text className={`font-bold select-none`}>
                {delivery?.price} c.
              </Text>
            </Flex>
          ))}

          <br />

          <Button className="w-full h-[50px]" onClick={handleCreateOrder}>
            Оформить заказ
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}
