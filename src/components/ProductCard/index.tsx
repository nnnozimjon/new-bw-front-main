import {
  addToCart,
  addToFavorites,
  decreaseProductCount,
  increaseProductCount,
  removeFromCart,
  removeFromFavorites,
} from "@/store";
import {
  addToCartService,
  decreaseProductCountService,
  increaseProductCountService,
  pushCart,
  removeFromCartService,
} from "@/store/actions/cart.actions";
import { RootState, useAppDispatch } from "@/store/store";
import { redirect } from "@/utils";
import { IProduct } from "@/utils/types";
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Rating,
  Text,
} from "@mantine/core";
import { useCallback } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ProductCard({
  id,
  discount,
  imagePath,
  isNew,
  productName = "",
  price,
  rating,
}: Omit<IProduct, "hideProduct" | "productDate" | "images" | 'mainImagePath'>) {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state?.user?.user);

  const favorites: any[] = useSelector(
    (state: RootState) => state?.favorites?.favorites
  );

  const cart: any[] = useSelector((state: RootState) => state?.cart?.cart);
  const existingItem = cart?.find((item: any) => item.id === id);

  const isLiked = favorites?.find((item) => item?.id === id);
  const isAdded = cart?.find((item) => item?.id === id);

  const handleAddToFavorites = () => {
    dispatch(
      addToFavorites({
        id,
        discount,
        isNew,
        productName,
        price,
        rating,
        imagePath,
      })
    );
  };

  const handleRemoveFromFavorites = () => {
    dispatch(
      removeFromFavorites({
        id,
        discount,
        isNew,
        productName,
        price,
        rating,
        imagePath,
      })
    );
  };

  const handleAddToCart = useCallback(async () => {
    if (user.isAuth)
      dispatch(
        addToCartService({
          id,
          discount,
          isNew,
          productName,
          price,
          rating,
          imagePath,
        })
      );
    else
      dispatch(
        addToCart({
          id,
          discount,
          isNew,
          productName,
          price,
          rating,
          imagePath,
        })
      );
  }, [dispatch, user.isAuth]);

  const handleIncreaseCount = useCallback(async () => {
    if (user.isAuth)
      dispatch(
        increaseProductCountService({ id, count: existingItem?.count + 1 })
      );
    else dispatch(increaseProductCount({ id }));
  }, [dispatch, existingItem?.count, id, user.isAuth]);

  const handleDecreaseCount = useCallback(async () => {
    if (existingItem?.count === 1)
      if (user.isAuth) dispatch(removeFromCartService({ id }));
      else dispatch(removeFromCart({ id }));
    else if (user.isAuth)
      dispatch(
        decreaseProductCountService({ id, count: existingItem?.count - 1 })
      );
    else dispatch(decreaseProductCount({ id }));
  }, [existingItem, user.isAuth, dispatch, id]);

  const discountedPrice = Number(price) * ((100 - Number(discount)) / 100);

  return (
    <Card className="hover:shadow-2xl hover:scale-105 cursor-pointer">
      <Card.Section>
        <Image
          src={`https://api.chistayaliniya.tj/${imagePath}`}
          onClick={() => redirect("/product/" + id)}
          alt=""
          className="object-contain h-[190px] md:h-[298px]"
        />
      </Card.Section>
      {isNew && (
        <Badge color="pink" className="absolute right-[20px]">
          Новинка
        </Badge>
      )}

      <Group justify="space-between" mt="md">
        <Grid>
          <Grid.Col span={9}>
            <Text
              size="0.8rem"
              fw={600}
              onClick={() => redirect("/product/" + id)}
              className="cursor-pointer"
            >
              {productName?.length < 30
                ? productName
                : productName?.substring(0, 30) + "..."}
            </Text>
          </Grid.Col>
          <Grid.Col className="justify-end flex" span={3}>
            {!isLiked ? (
              <FaRegHeart
                color="#888785"
                size={24}
                onClick={handleAddToFavorites}
              />
            ) : (
              <FaHeart
                color="#da4f4f"
                size={24}
                onClick={handleRemoveFromFavorites}
              />
            )}
          </Grid.Col>
        </Grid>
      </Group>
      <div>
        <Flex align={"center"} justify={"space-between"}>
          {discount === 0 ? (
            <Text className="text-[#4b4b4b] text-[1rem] m-0 p-0">
              {price?.toFixed(2)} c.
            </Text>
          ) : (
            <Text className="text-[#4b4b4b] text-[1rem] m-0 p-0">
              {discountedPrice?.toFixed(2)} c.{" "}
              <sup className="line-through">{price?.toFixed(2)} c.</sup>
            </Text>
          )}

          {discount !== 0 && (
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "grape", to: "red", deg: 90 }}
            >
              -{discount}%
            </Badge>
          )}
        </Flex>
        <div className="-z-10">
          <Rating readOnly size={"15"} value={rating} />
        </div>
      </div>
      {isAdded && (
        <Flex
          className="w-full mt-2"
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
          <Text>{existingItem?.count}</Text>
          <Button
            variant="outline"
            className="font-semibold text-[1rem]"
            onClick={handleIncreaseCount}
          >
            +
          </Button>
        </Flex>
      )}
      {!isAdded && (
        <Button
          color="#2A5FFE"
          fullWidth
          mt="md"
          className="rounded-[3px]"
          onClick={handleAddToCart}
        >
          В корзину
        </Button>
      )}
    </Card>
  );
}
