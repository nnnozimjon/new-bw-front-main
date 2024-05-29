"use client";

import { ProductCard } from "@/components";
import { pushCart } from "@/store/actions/cart.actions";
// import {  } from "@/store/slices";
import { SimpleGrid, Text } from "@mantine/core";
import { useDispatch } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();

  return (
    <div>
      <Text className="text-[1.75rem] text-[#212121] my-[30px]">Success</Text>
      {/* <button onClick={() => dispatch(pushCart(product))}>Test</button> */}
      <SimpleGrid cols={{ base: 2, lg: 4, md: 3, sm: 2 }} spacing={"xl"}>
        {/* {Array.from({ length: 30 }, (_, i) => (
          <ProductCard key={i} />
        ))} */}
      </SimpleGrid>
    </div>
  );
}
