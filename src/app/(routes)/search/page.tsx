"use client";

import { EmptyPlaceholder, ProductCard } from "@/components";
import { Pagination } from "@/components/Pagination";
import { useGetProductByFilterQuery, useGetProductByHideQuery } from "@/store";
import { ObjectToQuery } from "@/utils/query";
import { IProduct } from "@/utils/types";
import { Flex, Select, SimpleGrid, Skeleton, Text } from "@mantine/core";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();

  const searchText = searchParams.get("q");
  const categoryId = searchParams.get("categoryId");
  const brandId = searchParams.get("brandId");

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [sort, setSort] = useState(1);

  const [products, setProducts] = useState<IProduct[]>([]);

  const { data, error, isSuccess, isError, isLoading, refetch } =
    useGetProductByFilterQuery(
      ObjectToQuery({
        query: searchText,
        categoryId,
        pageSize,
        pageNumber,
        sort,
        brandId
      })
    );

  useEffect(() => {
    if (isSuccess) {
      setProducts(data?.data);
      setTotalPages(data?.totalPages);
    }
  }, [isSuccess, isError, data?.data]);

  useEffect(() => {
    refetch();
  }, [pageSize, pageNumber, sort, refetch]);

  const perPage = [
    {
      label: "20 на страницу",
      value: "20",
    },
    {
      label: "30 на страницу",
      value: "30",
    },
    {
      label: "40 на страницу",
      value: "40",
    },
    {
      label: "50 на страницу",
      value: "50",
    },
  ];

  const sortProducts = [
    {
      label: "Сортировать по времени: новинки выше",
      value: "1",
    },
    {
      label: "Сортировать по цене: дешевые выше",
      value: "2",
    },
    {
      label: "Сортировать по цене: дешевые ниже",
      value: "3",
    },
    {
      label: "Сортировать по покупаемости",
      value: "4",
    },
    {
      label: "Сортировать по размеру скидки: высокие скидки в начале",
      value: "5",
    },
    {
      label: "Случайные",
      value: "6",
    },
  ];

  return (
    <div>
      <Head>
        <title>{searchText || '""'} – купить в большой стирке</title>
      </Head>
      <Text className="text-[1.75rem] text-[#212121] my-[30px] text-center">
        Результаты поиска {products?.length}
      </Text>
      <Flex gap={"md"} className="w-full justify-between">
        <Select
          data={perPage}
          defaultValue={"20"}
          onChange={(value) => setPageSize(Number(value))}
        />
        <Select
          data={sortProducts}
          defaultValue={"1"}
          className="w-[350px]"
          onChange={(value) => setSort(Number(value))}
        />
      </Flex>
      <br />

      {!isLoading && products.length === 0 && (
        <EmptyPlaceholder label="Ничего не найдено по запросу!" />
      )}

      {isLoading && (
        <SimpleGrid cols={{ base: 2, lg: 4, md: 3, sm: 2 }} spacing={"xl"}>
          {Array.from({ length: pageSize }, (_, i) => (
            <Skeleton key={i} className="w-full h-[190px] md:h-[298px]" />
          ))}
        </SimpleGrid>
      )}

      <SimpleGrid cols={{ base: 2, lg: 5, md: 4, sm: 2 }} spacing={"xl"}>
        {products?.map((product: IProduct, i) => (
          <ProductCard
            key={i}
            discount={product?.discount}
            id={product?.id}
            imagePath={product?.mainImagePath}
            price={product?.price}
            isNew={product?.isNew}
            productName={product?.name}
            rating={product?.rating}
          />
        ))}
      </SimpleGrid>

      <br />
      <Flex className="w-full" align={"center"} justify={"center"}>
        <Pagination total={totalPages} onChange={(e) => setPageNumber(e)} />
      </Flex>
    </div>
  );
}
