"use client";

import { ProductCard } from "@/components";
import { useGetProductByHideQuery } from "@/store";
import { ObjectToQuery } from "@/utils/query";
import { IProduct } from "@/utils/types";
import { SimpleGrid, Skeleton, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const { isLoading, isSuccess, isError, data, error } =
    useGetProductByHideQuery(ObjectToQuery({ tag: 2 }));

  useEffect(() => {
    if (isSuccess) {
      setProducts(data?.data);
    }
  }, [isSuccess, isError, data?.data]);

  return (
    <div>
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
        {products?.map((product: IProduct, i) => (
          <ProductCard
            key={i}
            discount={product?.discount}
            id={product?.id}
            imagePath={product?.imagePath}
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
