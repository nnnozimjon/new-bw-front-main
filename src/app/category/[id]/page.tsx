"use client";

import { ProductCard } from "@/components";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { useGetAllCategoryQuery, useGetProductByHideQuery } from "@/store";
import { ObjectToQuery } from "@/utils/query";
import { IProduct } from "@/utils/types";
import {
  Accordion,
  Flex,
  Grid,
  Paper,
  Select,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { ICategory } from "@/components/Header";

export default function Page() {
  const params = useParams();
  const categoryId = params.id;

  const { data: dataCategories, isSuccess: isSuccessCategories } =
    useGetAllCategoryQuery({});

  const [categories, setCategories] = useState([]);

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState(1);

  const [products, setProducts] = useState<IProduct[]>([]);

  const { data, error, isSuccess, isError, isLoading, refetch } =
    useGetProductByHideQuery(
      ObjectToQuery({ categoryId, pageSize, pageNumber, sort })
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

  useEffect(() => {
    if (isSuccessCategories) {
      setCategories(dataCategories);
    }
  }, [isSuccessCategories]);

  function flattenCategories(categories: ICategory[]) {
    const flattenedCategories: Omit<ICategory, "subCategories">[] = [];

    function flatten(category: ICategory) {
      const categoryWithoutSubcategories = { ...category };

      flattenedCategories.push(categoryWithoutSubcategories);
      if (category.subCategories && category.subCategories.length > 0) {
        category.subCategories.forEach((subCategory) => flatten(subCategory));
      }
    }

    categories?.forEach((category) => flatten(category));

    return flattenedCategories;
  }

  const subs: any = flattenCategories(categories)?.find(
    (item) => item?.id === categoryId
  );

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
      <Text className="text-[1.75rem] text-[#212121] my-[30px] text-center">
        {subs?.name}
      </Text>
      <Flex
        gap={"md"}
        className="w-full"
        align={"center"}
        justify={"center"}
        wrap={"wrap"}
      >
        {subs?.subCategories?.map((cat: any, index: number) => (
          <div
            key={index}
            className="rounded-full p-2 shadow-md select-none cursor-pointer w-fit text-center shrink-0"
          >
            <a
              href={"/category/" + cat?.id}
              className="no-underline text-black hover:text-blue-500"
            >
              {cat?.name}
            </a>
          </div>
        ))}
      </Flex>
      <br />
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

      <Grid>
        <Grid.Col span={{ md: 2.5, sm: 12 }}>
          <Paper shadow="sm" withBorder className="p-2">
            <Text className="text-[#212121] text-[1.125rem] font-semibold">
              Подкатегории
            </Text>

            <Accordion>
              {subs?.subCategories?.map((cat: any, index: number) => (
                <Accordion.Item key={index} value={cat?.name}>
                  <Accordion.Control>
                    <a
                      key={index}
                      href={"/category/" + cat?.id}
                      className="no-underline text-black hover:text-blue-500"
                    >
                      {cat?.name}
                    </a>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Flex gap={"sm"} direction={"column"}>
                      {cat?.subCategories?.map((item: any, index: number) => (
                        <a
                          key={index}
                          href={"/category/" + item?.id}
                          className="no-underline text-black hover:text-blue-500"
                        >
                          {item?.name}
                        </a>
                      ))}
                    </Flex>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ md: 9.5, sm: 12 }}>
          <SimpleGrid cols={{ base: 2, lg: 5, md: 4, sm: 2 }} spacing={"xl"}>
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
        </Grid.Col>
      </Grid>
      <br />
      <Flex className="w-full" align={"center"} justify={"center"}>
        <Pagination total={totalPages} onChange={(e) => setPageNumber(e)} />
      </Flex>
    </div>
  );
}
