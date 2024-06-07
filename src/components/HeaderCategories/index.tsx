"use client";

import {
  Container,
  Divider,
  Flex,
  Group,
  Menu,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { ICategory } from "../GroupedHeader";
import { NavLink } from "@mantine/core";
import { useState } from "react";

interface IProps {
  categories: ICategory[];
}

const initialValue: ICategory = {
  id: "",
  name: "",
  iconPath: "",
  imagePath: "",
  subCategories: [],
};

export default function HeaderCategories({ categories }: IProps) {
  const [activeLink, setActiveLink] = useState<ICategory>(initialValue);

  return (
    <div className="p-4 bg-blue-600 mt-[90px] w-full">
      <Container
        visibleFrom="md"
        size={"xxl"}
        className="flex items-center justify-center"
      >
        <Flex gap={"xl"}>
          <Menu classNames={{ dropdown: "border-none" }} width={"100%"}>
            <Menu.Target>
              <Flex align={"center"} gap={"sm"}>
                <Text className="text-[0.825rem] font-medium text-white cursor-pointer select-none">
                  Все категории
                </Text>
              </Flex>
            </Menu.Target>
            <Menu.Dropdown>
              <Container size={"xl"} className="py-4">
                <Flex gap={"sm"}>
                  <div className="!w-[300px]">
                    {categories?.map((category, index) => (
                      <NavLink
                        onMouseOver={() => setActiveLink(category)}
                        active={category?.id === activeLink?.id}
                        c={"black"}
                        color="gray.2"
                        key={index}
                        variant="filled"
                        label={category?.name}
                        className="rounded-lg text-[0.875rem] no-underline font-semibold text-[#212121s]"
                        href={`/category/${category?.id}`}
                      />
                    ))}
                  </div>
                  <Divider orientation="vertical" />
                  <Group className="border w-full items-start px-[30px] py-[20px] flex-col">
                    <Text className="text-[1.45rem] font-bold text-[#212121]">
                      {activeLink?.name}
                    </Text>
                    <SimpleGrid
                      className="w-full"
                      cols={{ sm: 2, lg: 4 }}
                      spacing={{ base: 10, sm: "xl" }}
                      verticalSpacing={{ base: "md", sm: "xl" }}
                    >
                      {activeLink?.subCategories?.map((subCategory, index) => (
                        <Flex direction={"column"} key={index}>
                          <NavLink
                            className="text-[1rem] no-underline font-bold text-[#212121] hover:text-[#2A5FFE]"
                            color="none"
                            label={subCategory?.name}
                            href={`/category/${subCategory?.id}`}
                          />
                          {subCategory?.subCategories?.map((sub, index) => (
                            <NavLink
                              unstyled
                              key={index}
                              className="text-[1rem] no-underline text-[#212121] hover:text-[#2A5FFE] pl-[10px] cursor-pointer m-[10px_0px_0px]"
                              color="none"
                              label={sub?.name}
                              href={`/category/${sub?.id}`}
                            />
                          ))}
                        </Flex>
                      ))}
                    </SimpleGrid>
                  </Group>
                </Flex>
              </Container>
            </Menu.Dropdown>
          </Menu>
          {categories?.slice(0, 6)?.map((category, index: number) => (
            <Menu
              classNames={{ dropdown: "border-none" }}
              width={"100%"}
              key={index}
            >
              <Menu.Target>
                <Flex align={"center"} gap={"sm"}>
                  <Text className="text-[0.825rem] font-medium text-white cursor-pointer">
                    {category?.name}
                  </Text>
                </Flex>
              </Menu.Target>
              <Menu.Dropdown>
                <Container size={"xl"} className="py-4">
                  <Group className="border w-full items-start px-[30px] py-[20px] flex-col">
                    <Text className="text-[1.45rem] font-bold text-[#212121]">
                      {category?.name}
                    </Text>
                    <SimpleGrid
                      className="w-full"
                      cols={{ sm: 2, lg: 4 }}
                      spacing={{ base: 10, sm: "xl" }}
                      verticalSpacing={{ base: "md", sm: "xl" }}
                    >
                      {category?.subCategories?.map((subCategory, index) => (
                        <Flex direction={"column"} key={index}>
                          <NavLink
                            className="text-[1rem] no-underline font-bold text-[#212121] hover:text-[#2A5FFE]"
                            color="none"
                            label={subCategory?.name}
                            href={`/category/${subCategory?.id}`}
                          />
                          {subCategory?.subCategories?.map((sub, index) => (
                            <NavLink
                              unstyled
                              key={index}
                              className="text-[1rem] no-underline text-[#212121] hover:text-[#2A5FFE] pl-[10px] cursor-pointer m-[10px_0px_0px]"
                              color="none"
                              label={sub?.name}
                              href={`/category/${sub?.id}`}
                            />
                          ))}
                        </Flex>
                      ))}
                    </SimpleGrid>
                  </Group>
                </Container>
              </Menu.Dropdown>
            </Menu>
          ))}
        </Flex>
      </Container>
    </div>
  );
}
