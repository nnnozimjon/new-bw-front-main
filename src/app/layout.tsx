"use client";

import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";
import { Button, Container, createTheme, Group, MantineProvider, rem } from "@mantine/core";
import { Header, Footer } from "@/components";
import { MdDiscount } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { cn } from "@/utils/cn";
import { Provider } from "react-redux";
import { store } from "@/store";

const inter = Inter({ subsets: ["latin"] });

interface primeLinks {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const primeLinks: primeLinks[] = [
  {
    label: "Скидки",
    href: "/discounts",
    icon: <MdDiscount />,
  },
  {
    label: " Новые товары",
    href: "/new",
    icon: <FaSquarePlus />,
  },
  {
    label: "Хит продаж",
    href: "/bestsellers",
    icon: <FaStar />,
  },
];


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const CONTAINER_SIZES: Record<string, string> = {
    xxs: rem(300),
    xs: rem(400),
    sm: rem(500),
    md: rem(600),
    lg: rem(700),
    xl: rem(1200),
    xxl: rem(1480),
  };

  const theme = createTheme({
    components: {
      Container: Container.extend({
        vars: (_, { size, fluid }) => ({
          root: {
            "--container-size": fluid
              ? "100%"
              : size !== undefined && size in CONTAINER_SIZES
              ? CONTAINER_SIZES[size]
              : rem(size),
          },
        }),
      }),
    },
  });

  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-white")}>
        <Provider store={store}>
          <MantineProvider theme={theme} defaultColorScheme="light">
            <Header />
            <Container size={"xxl"} className="mt-[150px] md:mt-[80px]">
              <Group visibleFrom="md" className="my-[20px]">
                {primeLinks?.map((link, index) => (
                  <Button
                    key={index}
                    color="black"
                    radius={"xl"}
                    leftSection={link?.icon}
                    variant="transparent"
                    classNames={{
                      root: "hover:shadow-[-4px_-4px_30px_-6px_rgba(0,0,0,0.5)] hover:text-[blue] font-light",
                    }}
                    onClick={() => window.location.replace(link?.href)}
                  >
                    {link?.label}
                  </Button>
                ))}
              </Group>
              {children}
            </Container>
            <Footer />
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
