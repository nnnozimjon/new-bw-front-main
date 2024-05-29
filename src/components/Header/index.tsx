"use client";

import {
  Container,
  Divider,
  Flex,
  Group,
  Menu,
  Text,
  NavLink,
  SimpleGrid,
  Box,
  Drawer,
  Indicator,
} from "@mantine/core";
import { Logo } from "..";
import { FaList, FaRegHeart, FaRegUser, FaStar } from "react-icons/fa";
import { MdDiscount, MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { Fragment, ReactNode, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { CgMenuLeft } from "react-icons/cg";
import { useDisclosure } from "@mantine/hooks";
import { useGetAllCategoryQuery } from "@/store";
import { FaSquarePlus } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";
import { LoginModal } from "@/modals/login-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { logout } from "@/store/slices/userSlice";

export interface ICategory {
  id: string;
  name: string;
  iconPath?: string | null;
  imagePath?: string | null;
  subCategories: ICategory[];
}

const initialValue: ICategory = {
  id: "",
  name: "",
  iconPath: "",
  imagePath: "",
  subCategories: [],
};

interface IDrawerLinks {
  group: string;
  links: {
    label: string;
    icon: ReactNode;
    href: string;
  }[];
}

const drawerLinks: IDrawerLinks[] = [
  {
    group: "Пользователь",
    links: [
      {
        label: "Профиль",
        icon: <FaRegUser size={"18px"} />,
        href: "/cabinet",
      },
      {
        label: "Корзина",
        icon: <MdOutlineShoppingCart size={"18px"} />,
        href: "/cart",
      },
      {
        label: "Избранные",
        icon: <FaRegHeart size={"18px"} />,
        href: "/favorites",
      },
      {
        label: "Список заказов",
        icon: <GoChecklist size={"18px"} />,
        href: "/order-list",
      },
    ],
  },
  {
    group: "Магазин",
    links: [
      {
        label: "Категории",
        icon: <FaList size={"18px"} />,
        href: "",
      },
      {
        label: "Новые товары",
        icon: <FaSquarePlus size={"18px"} />,
        href: "/new",
      },
      {
        label: "Хит продаж",
        icon: <FaStar size={"18px"} />,
        href: "/bestsellers",
      },
      {
        label: "Скидки",
        icon: <MdDiscount size={"18px"} />,
        href: "/discounts",
      },
    ],
  },
];

export default function Header() {
  const dispatch = useAppDispatch();

  const favorites = useSelector(
    (state: RootState) => state?.favorites?.favorites
  );

  const cart: any[] = useSelector((state: RootState) => state?.cart?.cart);

  const isAuthorized = useSelector(
    (state: RootState) => state?.user.user.isAuth
  );

  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const [opened, { open, close }] = useDisclosure(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeLink, setActiveLink] = useState<ICategory>(initialValue);

  const { data, error, isSuccess, isLoading, isError } = useGetAllCategoryQuery(
    {}
  );

  const redirect = (href: string) => window.location.replace(href);
  const logoutFunc = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (isSuccess) {
      setCategories(data);
      setActiveLink(categories[0]);
    }
  }, [isSuccess, isError]);

  return (
    <header className="p-[20px] fixed w-full z-[900] bg-white top-0">
      <Container size={"xxl"}>
        <Group hiddenFrom="md" className="w-full items-center justify-center">
          <Logo className="text-[2rem]" />
        </Group>
        <Flex gap={"lg"} align={"center"} className="w-full" wrap={"nowrap"}>
          <Box
            visibleFrom="md"
            className="w-fit shrink-0 flex items-center gap-[30px]"
          >
            <Logo />
            <Menu classNames={{ dropdown: "border-none" }} width={"100%"}>
              <Menu.Target>
                <button className="!bg-transparent border-none cursor-pointer">
                  Категории
                </button>
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
                        {activeLink?.subCategories?.map(
                          (subCategory, index) => (
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
                          )
                        )}
                      </SimpleGrid>
                    </Group>
                  </Flex>
                </Container>
              </Menu.Dropdown>
            </Menu>
          </Box>
          <Box hiddenFrom="md" className="flex items-center">
            <CgMenuLeft size={24} className="cursor-pointer" onClick={open} />
          </Box>
          <SearchBar categories={categories} />
          <Box
            visibleFrom="md"
            className="w-fit shrink-0 flex items-center gap-[20px]"
          >
            <Indicator
              disabled={favorites?.length === 0}
              processing
              radius={"lg"}
              label={favorites?.length}
              inline
              size={16}
              offset={3}
              position="top-end"
              color="red"
              withBorder
              className="text-[0.625rem]"
              classNames={{
                indicator:
                  "min-w-[20px] h-[20px] flex items-center justify-center text-[0.625rem] mt-1 cursor-pointer select-none",
              }}
              onClick={() => redirect("/favorites")}
            >
              <FaRegHeart
                size={30}
                className="cursor-pointer"
                onClick={() => redirect("/favorites")}
              />
            </Indicator>
            <Indicator
              processing
              radius={"lg"}
              disabled={cart?.length === 0}
              label={cart?.length}
              inline
              size={16}
              offset={3}
              position="top-end"
              color="red"
              withBorder
              className="text-[0.625rem]"
              classNames={{
                indicator:
                  "min-w-[20px] h-[20px] flex items-center justify-center text-[0.625rem] mt-1 cursor-pointer select-none",
              }}
              onClick={() => redirect("/cart")}
            >
              <MdOutlineShoppingCart
                size={30}
                className="cursor-pointer"
                onClick={() => redirect("/cart")}
              />
            </Indicator>
            {!isAuthorized ? (
              <MdLogin
                size={30}
                className="cursor-pointer"
                onClick={openModal}
              />
            ) : (
              <Menu width={200}>
                <Menu.Target>
                  <div>
                    <FaRegUser size={25} className="cursor-pointer" />
                  </div>
                </Menu.Target>
                <Menu.Dropdown className="absolute right-0 pt-4">
                  <Menu.Item
                    className="text-[#212121] text-[0.875rem] text-light hover:text-[#228be6]"
                    color="blue"
                    onClick={() => redirect("/cabinet")}
                  >
                    Профиль
                  </Menu.Item>
                  <Menu.Item
                    className="text-[#212121] text-[0.875rem] text-light hover:text-[#228be6]"
                    color="blue"
                    onClick={() => redirect("/order-list")}
                  >
                    Заказы
                  </Menu.Item>
                  <Menu.Item
                    className="text-[#212121] text-[0.875rem] text-light hover:text-[#FA5252]"
                    color="red"
                    onClick={logoutFunc}
                  >
                    Выйти из аккаунта
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Box>
        </Flex>
      </Container>
      <Drawer
        size={"xs"}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        className="z-[1000] fixed w-screen h-screen"
        classNames={{ content: "bg-[#5D85FE]" }}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Drawer.Body className="p-0 bg-[#5D85FE]">
          {drawerLinks?.map((group, index) => (
            <Fragment key={index}>
              <Text className="text-[1.125rem] font-semibold text-white">
                {group?.group}
              </Text>
              {group?.links?.map((link, index) => (
                <NavLink
                  key={index}
                  variant="filled"
                  bg={"white"}
                  href={link?.href}
                  label={
                    <Flex align={"center"} justify={"center"} gap={"sm"}>
                      {link?.icon}
                      <Text className="text-[1.125rem] text-[#212121]">
                        {link?.label}
                      </Text>
                    </Flex>
                  }
                  className="rounded-lg text-center h-[50px] mb-4"
                />
              ))}
              <br />
              <br />
            </Fragment>
          ))}

          <Text className="text-[1.125rem] font-semibold text-white">
            Выход
          </Text>
          <NavLink
            variant="filled"
            bg={"white"}
            onClick={logoutFunc}
            label={
              <Flex align={"center"} justify={"center"} gap={"sm"}>
                <TbLogout size={"18px"} />
                <Text className="text-[1.125rem] text-[#212121]">
                  Выйти из аккаунта
                </Text>
              </Flex>
            }
            className="rounded-lg text-center h-[50px] mb-4"
          />
        </Drawer.Body>
      </Drawer>

      <LoginModal onClose={closeModal} opened={openedModal} />
    </header>
  );
}
