"use client";

import { Flex, Image, SimpleGrid, Skeleton, Text } from "@mantine/core";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ProductCard } from "@/components";
import { useGetAllBannersQuery, useGetProductByFilterQuery } from "@/store";
import { ObjectToQuery } from "@/utils/query";
import { IProduct } from "@/utils/types";
import { Pagination } from "@/components/Pagination";
import { redirect } from "@/utils";

interface IBanner {
  id: string;
  href: string;
  imagePath: string;
}

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [banners, setBanners] = useState([]);

  const autoplay = useRef(Autoplay({ delay: 4000 }));

  const { isLoading, isSuccess, isError, data, error, refetch } =
    useGetProductByFilterQuery(ObjectToQuery({ pageNumber, pageSize }));

  const { data: dataBanner, isSuccess: isSuccessBanner } =
    useGetAllBannersQuery({});

  useEffect(() => {
    if (isSuccess) {
      setProducts(data?.data);
      setTotalPages(data?.totalPages);
    }
  }, [isSuccess, isError, data?.data]);

  useEffect(() => {
    refetch();
  }, [pageNumber, pageSize]);

  useEffect(() => {
    if(isSuccessBanner) {
      setBanners(dataBanner);
    }
  }, [isSuccessBanner])

  return (
    <div>
      <Head>
        <title>Чистая линия</title>
        <meta
          name="description"
          content="- это онлайн платформа, соединяющая товары и покупателей в одном месте! У нас вы найдете тысячи товаров. Мы быстро и бережно доставим ваш заказ до дверей вашего дома. Бесплатная доставка доступна при заказе от 49 сомони. Покупка товаров в рассрочку, возврат товара, гарантия от продавца."
        />
      </Head>
      {!!banners?.length && (
        <Carousel
          withControls={false}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          className="mb-[60px]"
        >
          {banners?.map((banner: IBanner, index: number) => (
            <Carousel.Slide key={index}>
              <Image
                src={'https://api.chistayaliniya.tj/' + banner?.imagePath}
                className="rounded-[20px] md:rounded-[50px]  object-cover select-none cursor-pointer"
                alt=""
                onClick={() => redirect(banner?.href)}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
      <div>
        <Text className="text-center text-[1.75rem] text-[#212121] mb-[30px]">
          Популярные категории
        </Text>
      </div>
      {products?.length == 0 && (
        <SimpleGrid cols={{ base: 2, lg: 4, md: 3, sm: 2 }} spacing={"xl"}>
          {Array.from({ length: pageSize }, (_, i) => (
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
            imagePath={product?.images[0]}
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
