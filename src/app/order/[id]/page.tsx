"use client";

import { IOrder, IType } from "@/app/(routes)/order-list/page";
import { useGetOrderByIdQuery } from "@/store";
import { Container, Grid, Paper, Text, Textarea } from "@mantine/core";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState<IOrder | null>(null);

  const { data, isSuccess } = useGetOrderByIdQuery({ id: orderId });

  useEffect(() => {
    if (isSuccess) {
      setOrder(data);
    }
  }, [isSuccess]);

  return (
    <div>
      <Head>
        <title>Заказ {orderId}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container size={"md"}>
        <Paper withBorder shadow="md" className="p-4">
          <Grid>
            <Grid.Col
              span={{ sm: 12, md: 6 }}
              className="text-[1.125rem] font-semibold"
            >
              Статус заказа:
            </Grid.Col>
            <Grid.Col
              span={{ sm: 12, md: 6 }}
              className="text-start md:text-end text-[1rem] font-semibold text-[#da4f4f]"
            >
              {order?.orderStatus}
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>Фамилия заказчика:</Grid.Col>
            <Grid.Col
              span={{ sm: 12, md: 6 }}
              className="text-start md:text-end"
            >
              {order?.lastName}
            </Grid.Col>{" "}
            <Grid.Col span={{ sm: 12, md: 6 }}>Имя заказчика:</Grid.Col>
            <Grid.Col
              span={{ sm: 12, md: 6 }}
              className="text-start md:text-end"
            >
              {order?.firstName}
            </Grid.Col>{" "}
            <Grid.Col span={{ sm: 12, md: 6 }}>Дата заказ:</Grid.Col>
            <Grid.Col
              span={{ sm: 12, md: 6 }}
              className="text-start md:text-end"
            >
              {new Date((order as IOrder)?.orderAt).toLocaleDateString()}
            </Grid.Col>{" "}
            <Grid.Col span={{ sm: 12, md: 6 }}>Способ доставки:</Grid.Col>
            <Grid.Col
              span={{ sm: 12, md: 6 }}
              className="text-start md:text-end"
            >
              {order?.deliveryType}
            </Grid.Col>{" "}
            <Grid.Col span={{ sm: 12, md: 6 }}>Способ оплаты:</Grid.Col>
            <Grid.Col
              span={{ sm: 12, md: 6 }}
              className="text-start md:text-end"
            >
              {order?.paymentType}
            </Grid.Col>
          </Grid>
          <Text className="text-[1.125rem] font-semibold my-4">
            Комментарий к заказу:
          </Text>
          <Textarea
            className="border border-solid rounded-md"
            classNames={{ input: "border-none" }}
            readOnly
            value={order?.description}
          />
          <Text className="text-[1.125rem] font-semibold my-4">
            Список товаров:
          </Text>
          {order?.type?.map((order: IType, index: number) => (
            <div
              className="border border-solid rounded-md p-4 mt-3"
              key={index}
            >
              <Grid>
                <Grid.Col span={{ sm: 12, md: 6 }}>
                  Наименование товара:
                </Grid.Col>
                <Grid.Col span={{ sm: 12, md: 6 }}>{order?.name}</Grid.Col>
                <Grid.Col span={{ sm: 12, md: 6 }}>
                  Стоимость товара за единицу:
                </Grid.Col>
                <Grid.Col span={{ sm: 12, md: 6 }}>{order?.price}</Grid.Col>
                <Grid.Col span={{ sm: 12, md: 6 }}>Количество товара:</Grid.Col>
                <Grid.Col span={{ sm: 12, md: 6 }}>{order?.count}</Grid.Col>
              </Grid>
            </div>
          ))}
        </Paper>
      </Container>
    </div>
  );
}
