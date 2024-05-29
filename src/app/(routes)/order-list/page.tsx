"use client";

import { EmptyPlaceholder } from "@/components";
import { useGetUserOrdersQuery } from "@/store";
import { redirect } from "@/utils";
import { Accordion, Button, Grid, Paper, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState([]);

  const { data, isSuccess } = useGetUserOrdersQuery({});

  const rows = orders?.map((element: any) => (
    <Table.Tr
      key={element.orderStatus}
      className="cursor-pointer"
      onClick={() => redirect("/order/" + element?.orderId)}
    >
      <Table.Td className="text-[1rem]">{element.orderStatus}</Table.Td>
      <Table.Td className="text-[1rem]">{element.type?.length} шт.</Table.Td>
      <Table.Td className="text-[1rem]">{element.deliveryType}</Table.Td>
      <Table.Td className="text-[1rem]">{element.paymentType}</Table.Td>
      <Table.Td className="text-[1rem]">
        {element?.type
          ?.reduce(
            (acc: any, element: any) =>
              acc + (element.price ? element.price : 0),
            0
          )
          ?.toFixed(2)}{" "}
        c.
      </Table.Td>
      <Table.Td className="text-[1rem]">
        {new Date(element.orderAt)?.toLocaleDateString()}
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th className="font-semibold text-[1rem]">Статус</Table.Th>
      <Table.Th className="font-semibold text-[1rem]">Кол-во товаров</Table.Th>
      <Table.Th className="font-semibold text-[1rem]">Способ дотавки</Table.Th>
      <Table.Th className="font-semibold text-[1rem]">Способ оплаты</Table.Th>
      <Table.Th className="font-semibold text-[1rem]">Стоимость</Table.Th>
      <Table.Th className="font-semibold text-[1rem]">Дата заказа</Table.Th>
    </Table.Tr>
  );

  useEffect(() => {
    if (isSuccess) {
      setOrders(data);
    }
  }, [isSuccess]);

  return (
    <div>
      <Text className="text-[1.75rem] text-[#212121] my-[30px]">
        Список ваших заказов
      </Text>
      {orders.length === 0 && (
        <EmptyPlaceholder label="У вас пока нет заказов" />
      )}

      {orders.length !== 0 && (
        <Paper shadow="md" className="p-5" withBorder visibleFrom="md">
          <Table highlightOnHover withRowBorders={false} visibleFrom="md">
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
      )}

      {orders.length !== 0 && (
        <Accordion hiddenFrom="md">
          {orders?.map((element: any, key) => (
            <Accordion.Item key={key} value={String(key)}>
              <Accordion.Control>
                <Grid>
                  <Grid.Col span={6} className="text-[1rem] font-semibold">
                    Стоимость
                  </Grid.Col>
                  <Grid.Col span={6}>
                    {element?.type
                      ?.reduce(
                        (acc: any, element: any) =>
                          acc + (element.price ? element.price : 0),
                        0
                      )
                      ?.toFixed(2)}{" "}
                    c.
                  </Grid.Col>
                </Grid>
              </Accordion.Control>
              <Accordion.Panel>
                <Grid>
                  <Grid.Col span={6} className="text-[1rem] font-semibold">
                    Статус
                  </Grid.Col>
                  <Grid.Col
                    span={6}
                    className="text-[#da4f4f] text-[1rem] font-semibold"
                  >
                    {element.orderStatus}
                  </Grid.Col>
                  <Grid.Col span={6} className="text-[1rem] font-semibold">
                    Кол-во товаров
                  </Grid.Col>
                  <Grid.Col span={6}>{element.type?.length} шт.</Grid.Col>
                  <Grid.Col span={6} className="text-[1rem] font-semibold">
                    Способ дотавки
                  </Grid.Col>
                  <Grid.Col span={6}>{element.deliveryType}</Grid.Col>
                  <Grid.Col span={6} className="text-[1rem] font-semibold">
                    Способ оплаты
                  </Grid.Col>
                  <Grid.Col span={6}>{element.paymentType}</Grid.Col>
                  <Grid.Col span={6} className="text-[1rem] font-semibold">
                    Дата заказа
                  </Grid.Col>
                  <Grid.Col span={6}>
                    {new Date(element.orderAt)?.toLocaleDateString()}
                  </Grid.Col>
                </Grid>

                <Button
                  className="w-full mt-[20px]"
                  onClick={() => redirect("/order/" + element?.orderId)}
                >
                  Подробнее
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
}
