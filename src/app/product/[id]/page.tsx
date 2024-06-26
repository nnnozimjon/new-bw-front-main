"use client";

import { EmptyPlaceholder } from "@/components";
import { ICategory } from "@/components/GroupedHeader";
import { useGetCategories } from "@/components/GroupedHeader/GetCategories";
import { CommentModal } from "@/modals/comment-modal";
import {
  addToCart,
  addToFavorites,
  decreaseProductCount,
  increaseProductCount,
  removeFromCart,
  removeFromFavorites,
  useGetProductByIdQuery,
} from "@/store";
import {
  addToCartService,
  decreaseProductCountService,
  increaseProductCountService,
  removeFromCartService,
} from "@/store/actions/cart.actions";
import { RootState, useAppDispatch } from "@/store/store";
import { redirect } from "@/utils";
import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Rating,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnyMxRecord } from "dns";
import Autoplay from "embla-carousel-autoplay";
import Head from "next/head";
import { useParams } from "next/navigation";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

interface Characteristic {
  id: number;
  name: string;
  value: any;
}

function groupCharacteristicsByNames(
  characteristics: Characteristic[]
): Characteristic[][] {
  const groupedCharacteristicsArrays: Characteristic[][] = [];

  characteristics?.forEach((characteristic: Characteristic) => {
    const index = groupedCharacteristicsArrays.findIndex(
      (array: Characteristic[]) =>
        array.length > 0 && array[0].name === characteristic.name
    );

    if (index !== -1) {
      groupedCharacteristicsArrays[index].push(characteristic);
    } else {
      groupedCharacteristicsArrays.push([characteristic]);
    }
  });

  return groupedCharacteristicsArrays;
}

export default function Page() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state?.user?.user);

  const { categories } = useGetCategories();

  const autoplay = useRef(Autoplay({ delay: 4000 }));

  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState(0);

  const favorites: any[] = useSelector(
    (state: RootState) => state?.favorites?.favorites
  );

  const cart: any[] = useSelector((state: RootState) => state?.cart?.cart);
  const existingItem = cart?.find((item: any) => item.id === product?.id);

  const isLiked = favorites?.find((item) => item?.id === product?.id);
  const isAdded = cart?.find((item) => item?.id === product?.id);

  const { data, isSuccess, refetch } = useGetProductByIdQuery({
    id: productId,
  });

  useEffect(() => {
    if (isSuccess) {
      setProduct(data);
    }
  }, [isSuccess]);

  const handleAddToCart = useCallback(async () => {
    if (user.isAuth)
      dispatch(
        addToCartService({
          ...product,
          productName: product?.name,
          imagePath: product?.images[0]?.imagePath,
        })
      );
    else
      dispatch(
        addToCart({
          ...product,
          productName: product?.name,
          imagePath: product?.images[0]?.imagePath,
        })
      );
  }, [dispatch, product, user.isAuth]);

  const handleIncreaseCount = useCallback(async () => {
    if (user.isAuth)
      dispatch(
        increaseProductCountService({
          id: product?.id,
          count: existingItem?.count + 1,
        })
      );
    else dispatch(increaseProductCount({ id: product?.id }));
  }, [dispatch, existingItem?.count, product?.id, user.isAuth]);

  const handleDecreaseCount = useCallback(async () => {
    if (existingItem?.count === 1)
      if (user.isAuth) dispatch(removeFromCartService({ id: product?.id }));
      else dispatch(removeFromCart({ id: product?.id }));
    else if (user.isAuth)
      dispatch(
        decreaseProductCountService({
          id: product?.id,
          count: existingItem?.count - 1,
        })
      );
    else dispatch(decreaseProductCount({ id: product?.id }));
  }, [existingItem?.count, user.isAuth, dispatch, product?.id]);

  const handleAddToFavorites = () => {
    dispatch(
      addToFavorites({ ...product, imagePath: product?.images[0]?.imagePath })
    );
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(product));
  };

  const groupedCharacteristics = groupCharacteristicsByNames(
    data?.characteristics
  );

  const characteristicElements = groupedCharacteristics?.map(
    (characteristicArray: Characteristic[], index: number) => {
      const name = characteristicArray[0]?.name;
      const values = characteristicArray
        .map((characteristic) => characteristic?.value)
        .join(", ");

      return (
        <Flex key={index} gap="lg">
          <Text className="text-[#212121] text-[1rem]">{name}: </Text>
          <Text className="text-[#515151]">{values}</Text>
        </Flex>
      );
    }
  );

  const breadCrumb = useMemo(() => {
    function flattenCategories(
      categories: ICategory[],
      parentId: null | string = null
    ) {
      let result: ICategory[] = [];

      categories?.forEach((category: ICategory) => {
        let newCategory = { ...category, parentId: parentId };
        // @ts-ignore
        delete newCategory.subCategories;
        result.push(newCategory);

        if (category.subCategories && category.subCategories.length > 0) {
          result = result.concat(
            flattenCategories(category.subCategories, category.id)
          );
        }
      });

      return result;
    }

    const flattenedCategories = flattenCategories(categories);

    const getCat = (id: string, data: any[]) => {
      const child = data?.find((item: any) => item?.id === id);
      const parentId = child?.parentId;
      const parent = data?.find((item: any) => item?.id === parentId);

      return { parent: parent?.id !== undefined ? parent : null, child };
    };

    const breadCrumb = getCat(product?.categoryId, flattenedCategories);

    return breadCrumb;
  }, [product, categories]);

  const items = [
    { title: "Главная", href: "/" },
    ...(breadCrumb?.parent !== null
      ? [
          {
            title: breadCrumb?.parent?.name,
            href: "/category/" + breadCrumb?.parent?.id,
          },
        ]
      : []),
    {
      title: breadCrumb?.child?.name,
      href: "/category/" + breadCrumb?.child?.id,
    },
  ].map((item, index) => (
    <Anchor
      href={item.href}
      className={`${
        !item?.href &&
        "text-[gray] no-underline hover:no-underline cursor-default"
      }`}
      key={index}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <div>
      <Head>
        <title>{product?.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid>
        <Grid.Col span={{ md: 8, sm: 12 }}>
          <Breadcrumbs>{items}</Breadcrumbs>
          <Text className="text-[1.2rem] md:text-[2rem] font-semibold text-[#212121]">
            {product?.name}
          </Text>
          <Rating size={30} value={product?.rating} />
          <Flex gap={"lg"} mb={10}>
            <Text className="text-[#888875]">
              {product?.comment?.length} отзывов
            </Text>
            <Text className="text-[#888875]">
              Артикуль {product?.vendorCode}
            </Text>
          </Flex>
          <Grid align="flex-start" justify="center">
            <Carousel
              // withControls={false}
              slideSize={{ base: "100%", sm: "100%", md: "100%" }}
              slidesToScroll={1}
              slideGap={"md"}
              align={"start"}
              initialSlide={selectedImage}
            >
              {product?.images?.map((image: any, index: number) => (
                <Carousel.Slide key={index}>
                  <Image
                    src={"https://api.chistayaliniya.tj" + image?.imagePath}
                    alt=""
                    className="mt-4 mb-4 rounded-xl h-[300px] md:h-[500px] object-contain"
                  />
                </Carousel.Slide>
              ))}
            </Carousel>

            <SimpleGrid
              className="m-0 p-0 gap-0"
              cols={{ base: 6, sm: 6, lg: 12, md: 6 }}
            >
              {product?.images?.map((image: any, index: number) => (
                <Image
                  key={index}
                  src={"https://api.chistayaliniya.tj" + image?.imagePath}
                  alt="Preview"
                  onClick={() => setSelectedImage(index)}
                  className={`w-full mb-2 rounded-lg cursor-pointer border-3 p-1 border-red-400 border-solid}`}
                />
              ))}
            </SimpleGrid>
          </Grid>
          <Text className="text-[2rem] font-semibold text-[#212121]">
            Характеристики
          </Text>
          {characteristicElements}
          <br />
          <Text className="text-[2rem] font-semibold text-[#212121]">
            Отзывы
          </Text>
          <Button
            variant="outline"
            className="h-[50px] w-full mt-[20px]"
            onClick={openModal}
          >
            Оставить отзыв
          </Button>
          <br />
          <br />
          {product?.comment?.length === 0 && (
            <EmptyPlaceholder label="У продукта нет отзывов, оставьте его первым!" />
          )}

          <br />
          {product?.comment?.length !== 0 && (
            <Flex direction={"column"} gap={"md"}>
              {product?.comment?.map((comment: any, index: number) => (
                <div key={index}>
                  <Flex gap={"md"}>
                    <Text className="text-[1rem] font-semibold">
                      {comment?.author}
                    </Text>
                    <Rating value={5} />
                  </Flex>
                  <Text className="text-[1rem] font-medium">
                    {comment?.message}
                  </Text>
                  <Text className="text-[0.85rem] font-medium text-[#888875] mt-[9px]">
                    {new Date(comment?.date).toLocaleDateString()}
                  </Text>
                </div>
              ))}
            </Flex>
          )}
        </Grid.Col>

        <Grid.Col span={{ md: 4, sm: 12 }}>
          <Paper withBorder shadow="sm" className="w-full p-4">
            <Text className="text-[2rem] font-semibold text-[#212121] text-center">
              {Number(product?.price).toFixed(2) || 0} c.
            </Text>
            <br />
            <Group>
              {!isAdded && (
                <Button
                  leftSection={<></>}
                  className="w-full h-[50px]"
                  onClick={handleAddToCart}
                >
                  Добавить в корзину
                </Button>
              )}

              {isAdded && (
                <Fragment>
                  <Flex
                    className="w-full mt-2 border border-solid rounded-md p-2 border-[#215FFE]"
                    align={"center"}
                    justify={"space-between"}
                  >
                    <Button
                      variant="outline"
                      className="font-semibold text-[1rem]"
                      onClick={handleDecreaseCount}
                    >
                      -
                    </Button>
                    <Text>{existingItem?.count || 1}</Text>
                    <Button
                      variant="outline"
                      className="font-semibold text-[1rem]"
                      onClick={handleIncreaseCount}
                    >
                      +
                    </Button>
                  </Flex>
                  <Text className="text-[0.875rem] font-semibold">
                    Итого:{" "}
                    {(
                      Number(product?.price) * Number(existingItem?.count)
                    )?.toFixed(2)}
                  </Text>
                </Fragment>
              )}

              {isAdded && (
                <Button
                  className="w-full h-[50px]"
                  variant="outline"
                  onClick={() => redirect("/order")}
                >
                  Перейти к оплате
                </Button>
              )}

              {!isLiked && (
                <Button
                  color="red"
                  className="w-full h-[50px]"
                  leftSection={<FaRegHeart color="white" size={24} />}
                  onClick={handleAddToFavorites}
                >
                  Добавить в избранное
                </Button>
              )}

              {isLiked && (
                <Button
                  color="red"
                  className="w-full h-[50px]"
                  variant="outline"
                  leftSection={<FaHeart color="#da4f4f" size={24} />}
                  c={"red"}
                  onClick={handleRemoveFromFavorites}
                >
                  Убрать из избранного
                </Button>
              )}
            </Group>
            <Text className="text-[1rem] font-light mt-[20px]">
              {product?.description}
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      <CommentModal
        onClose={closeModal}
        opened={openedModal}
        refetch={refetch}
        productId={product?.id}
      />
    </div>
  );
}
