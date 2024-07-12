import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Flex,
  Grid,
  Indicator,
} from "@mantine/core";
import classes from "./footerStyle.module.css";
import Logo from "../logo";
import {
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaPhoneAlt,
  FaHome,
  FaRegHeart,
  FaRegUser,
} from "react-icons/fa";
import { IoHomeOutline, IoMail } from "react-icons/io5";
import { MdLogin, MdOutlineShoppingCart } from "react-icons/md";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { LoginModal } from "@/modals/login-modal";
import { useDisclosure } from "@mantine/hooks";
import { useGetContactsQuery } from "@/store";

export default function Footer() {
  const redirect = (href: string) => window.location.replace(href);
  const favorites = useSelector(
    (state: RootState) => state?.favorites?.favorites
  );

  const { data: contacts } = useGetContactsQuery({});

  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const cart: any[] = useSelector((state: RootState) => state?.cart?.cart);

  const isAuthorized = useSelector(
    (state: RootState) => state?.user.user.isAuth
  );

  const goToLink = (href: string) => {
    let url = href;
    if (url && !/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    window.open(url, "_blank");
  };

  return (
    <footer className={classes.footer}>
      <Container className={""}>
        <div>
          <Text className="text-[1.5rem] font-bold mb-[20px]">
            Онлайн магазин «Чистая линия»
          </Text>
          <Flex align={"center"} gap={"sm"} className="mb-3">
            <FaPhoneAlt size={24} />
            <a href={"tel:" + String(contacts?.phone)} className="no-underline">
              {contacts?.phone}
            </a>
          </Flex>
          <Flex align={"center"} gap={"sm"} className="mt-3 mb-3">
            <IoMail size={24} />
            <a href={"mailto:" + contacts?.email} className="no-underline">
              {contacts?.email}
            </a>
          </Flex>
          <div className={""}>
            <Text className="text-[1.5rem] font-bold mb-[20px] text-center md:text-start">
              О нас
            </Text>
            <Text size="xs" c="dimmed" className={classes.description}>
              {contacts?.about}
            </Text>
          </div>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} Чистая линия. Все права защищены.
        </Text>

        <Group
          gap={"lg"}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            onClick={() => goToLink(contacts?.facebook)}
          >
            <FaFacebook size={45} className="text-black hover:text-[#2A5FFE]" />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            onClick={() => goToLink(contacts?.instagram)}
          >
            <FaInstagram
              size={45}
              className="text-black hover:text-[#2A5FFE]"
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            onClick={() => goToLink(contacts?.telegram)}
          >
            <FaTelegram size={45} className="text-black hover:text-[#2A5FFE]" />
          </ActionIcon>
        </Group>
      </Container>
      <div className="p-4 bg-black w-full">
        <Text className="text-white text-center">
          ООО «Алиф Технология» © {new Date().getFullYear()}
        </Text>
      </div>

      <Group className="bg-[#ddd] w-full fixed bottom-0" hiddenFrom="md">
        <Grid className="w-full px-[14px] py-[10px]" justify="center">
          <Grid.Col
            span={3}
            className="flex items-center justify-center flex-col !cursor-pointer"
            onClick={() => redirect("/")}
          >
            <IoHomeOutline size={24} className="cursor-pointer" />
            <label className="text-[#212121] text-[0.75rem] cursor-pointer select-none">
              Главная
            </label>
          </Grid.Col>
          <Grid.Col
            span={3}
            className="flex items-center justify-center flex-col !cursor-pointer"
            onClick={() => redirect("/favorites")}
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
            >
              <FaRegHeart size={24} className="cursor-pointer" />
            </Indicator>
            <label className="text-[#212121] text-[0.75rem] cursor-pointer select-none">
              Избранные
            </label>
          </Grid.Col>
          <Grid.Col
            span={3}
            className="flex items-center justify-center flex-col !cursor-pointer"
            onClick={() => redirect("/cart")}
          >
            <Indicator
              disabled={cart?.length === 0}
              processing
              radius={"lg"}
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
            >
              <MdOutlineShoppingCart size={24} className="cursor-pointer" />
            </Indicator>
            <label className="text-[#212121] text-[0.75rem] cursor-pointer select-none">
              Корзина
            </label>
          </Grid.Col>
          {isAuthorized ? (
            <Grid.Col
              span={3}
              className="flex items-center justify-center flex-col !cursor-pointer"
              onClick={() => redirect("/cabinet")}
            >
              <FaRegUser size={24} className="cursor-pointer" />
              <label className="text-[#212121] text-[0.75rem] cursor-pointer select-none">
                Профиль
              </label>
            </Grid.Col>
          ) : (
            <Grid.Col
              span={3}
              className="flex items-center justify-center flex-col !cursor-pointer"
              onClick={openModal}
            >
              <MdLogin size={24} className="cursor-pointer" />
              <label className="text-[#212121] text-[0.75rem] cursor-pointer select-none">
                Вход
              </label>
            </Grid.Col>
          )}
        </Grid>
      </Group>
      <LoginModal onClose={closeModal} opened={openedModal} />
    </footer>
  );
}
