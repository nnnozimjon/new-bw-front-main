"use client";

import { ProductCard } from "@/components";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { SimpleGrid, Text } from "@mantine/core";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Page() {
  const favorites = useSelector(
    (state: RootState) => state?.favorites?.favorites
  );

  return (
    <div>
      <Text className="text-[1.75rem] text-[#212121] my-[30px]">Избранное</Text>
      {favorites?.length === 0 && (
        <EmptyPlaceholder label="У вас пока нет избранных товаров" />
      )}

      <SimpleGrid cols={{ base: 2, lg: 4, md: 3, sm: 2 }} spacing={"xl"}>
        {favorites?.map((product: any, i: any) => (
          <ProductCard
            key={i}
            discount={product?.discount}
            id={product?.id}
            imagePath={product?.imagePath}
            price={product?.price}
            isNew={product?.isNew}
            productName={product?.name || product?.productName}
            rating={product?.rating}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
