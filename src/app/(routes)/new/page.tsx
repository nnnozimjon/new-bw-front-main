"use client";

import { ProductCard } from "@/components";
import { useGetProductByFilterQuery } from "@/store";
import { ObjectToQuery } from "@/utils/query";
import { IProduct } from "@/utils/types";
import { SimpleGrid, Skeleton, Text } from "@mantine/core";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const { isLoading, isSuccess, isError, data, error } =
    useGetProductByFilterQuery(ObjectToQuery({ tag: 2 }));

  useEffect(() => {
    if (isSuccess) {
      setProducts(data?.data);
    }
  }, [isSuccess, isError, data?.data]);

  return (
    <div>
      <Head>
        <title>Новые товары в большой стирке</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text className="text-[1.75rem] text-[#212121] my-[30px]">
        Новые товары
      </Text>
      {products?.length == 0 && (
        <SimpleGrid cols={{ base: 2, lg: 4, md: 3, sm: 2 }} spacing={"xl"}>
          {Array.from({ length: 20 }, (_, i) => (
            <Skeleton key={i} className="w-full h-[190px] md:h-[298px]" />
          ))}
        </SimpleGrid>
      )}
      <SimpleGrid cols={{ base: 2, lg: 4, md: 3, sm: 2 }} spacing={"xl"}>
        {products?.map((product: any, i) => (
          <ProductCard
            key={i}
            discount={product?.discount}
            id={product?.id}
            imagePath={product?.images[0]}
            price={product?.price}
            isNew={product?.isNew}
            productName={product?.name}
            rating={product?.rating}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
