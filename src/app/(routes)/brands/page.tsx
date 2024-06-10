"use client";

import { ProductCard } from "@/components";
import { useGetAllBrandsQuery } from "@/store"
import { IProduct } from "@/utils/types";
import { Image, Paper, SimpleGrid, Skeleton, Text } from "@mantine/core";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Page() {
  const [brands, setBrands] = useState<IProduct[]>([]);

  const { isLoading, isSuccess, isError, data, error } =
    useGetAllBrandsQuery({});

  useEffect(() => {
    if (isSuccess) {
      setBrands(data);
    }
  }, [isSuccess, isError, data]);


  return (
    <div>
      <Head>
        <title>Все бренды</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Text className="text-[1.75rem] text-[#212121] my-[30px]">
        Бренды
      </Text>
      {brands?.length == 0 && (
        <SimpleGrid cols={{ base: 2, lg: 4, md: 3, sm: 2 }} spacing={"xl"}>
          {Array.from({ length: 20 }, (_, i) => (
            <Skeleton key={i} className="w-full h-[190px] md:h-[298px]" />
          ))}
        </SimpleGrid>
      )}
      <SimpleGrid cols={{ base: 2, lg: 4, md: 3, sm: 2 }} spacing={"xl"}>
        {brands?.map((brand: any, i) => (
          <Paper shadow="md" withBorder className="p-3" key={i}>
            <Image className="h-[80px] object-contain mb-4" src={'https://api.chistayaliniya.tj' + brand?.imagePath} alt={brand?.name} />
            <Text className="text-center font-bold text-[1.2rem]">
              {brand.name}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    </div>
  );
}
