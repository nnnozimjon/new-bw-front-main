"use client";

import { ProductCard } from "@/components";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/store";
import { RootState } from "@/store/store";
import { redirect } from "@/utils";
import {
  Button,
  Container,
  Flex,
  Grid,
  InputBase,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface formMapProps {
  label: string;
  placeholder: string;
  id: string;
  type: string;
}

const formDataInput: formMapProps[] = [
  {
    label: "Имя",
    placeholder: "Имя",
    id: "name",
    type: "text",
  },
  {
    label: "Фамилия",
    placeholder: "Фамилия",
    id: "lastName",
    type: "text",
  },
  {
    label: "Номер телефона",
    placeholder: "Номер телефона",
    id: "phoneNumber",
    type: "text",
  },
  {
    label: "Почта",
    placeholder: "Почта",
    id: "email",
    type: "text",
  },
  {
    label: "Адрес",
    placeholder: "Адрес",
    id: "address",
    type: "text",
  },
  {
    label: "Старый пароль",
    placeholder: "Старый пароль",
    id: "oldPassword",
    type: "password",
  },
  {
    label: "Новый пароль",
    placeholder: "Новый пароль",
    id: "newPassword",
    type: "password",
  },
  {
    label: "Повторите новый пароль",
    placeholder: "Повторите новый пароль",
    id: "confirmPassword",
    type: "password",
  },
];

const initialFormValue = {
  name: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  newPassword: "",
  confirmPassword: "",
  oldPassword: "",
  address: "",
} as const;

type FormField = keyof typeof initialFormValue;
type FormState = Record<FormField, string>;

export default function Page() {
  const { data, isError, isSuccess, isLoading, refetch } = useGetProfileQuery(
    {}
  );

  const [form, setForm] = useState<FormState>(initialFormValue);
  const [
    updateProfile,
    { data: dataUpdateProfile, isSuccess: isSuccessUpdateProfile },
  ] = useUpdateProfileMutation();

  const changeFormValue = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (isSuccess) {
      setForm({
        name: data?.name,
        confirmPassword: "",
        email: data?.email,
        newPassword: "",
        phoneNumber: data?.phone,
        lastName: data?.lastName,
        address: data?.address,
        oldPassword: "",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdateProfile) {
      refetch();
    }
  }, [isSuccessUpdateProfile]);



  return (
    <div>
      <Container>
        <Paper shadow="xs" p="xl" withBorder>
          <Text className="text-[#212121] font-semibold text-[1.5rem]">
            Личный кабинет
          </Text>
          <Grid className="mt-[30px]">
            {formDataInput?.map((input, index) => (
              <Grid.Col key={index} span={{ md: 6, sm: 12 }}>
                <InputBase
                  label={input?.label}
                  placeholder={input?.placeholder}
                  classNames={{
                    label:
                      "mb-[7px] text-[0.875rem] text-[#888785] font-normal",
                    input: "px-[12px] py-[10px] h-[45px]",
                  }}
                  type={input?.type}
                  value={(form as any)[input?.id]}
                  onChange={(e) => changeFormValue(input?.id, e.target.value)}
                />
              </Grid.Col>
            ))}
            <Grid.Col>
              <Flex gap={"lg"} className="md:flex-row flex-col">
                <Button
                  variant="outline"
                  color="red"
                  className="w-full h-[50px]"
                  onClick={() => redirect("/")}
                >
                  Отменить
                </Button>
                <Button
                  variant="filled"
                  color="blue"
                  className="w-full h-[50px]"
                  onClick={() => updateProfile(form)}
                >
                  Изменить профиль
                </Button>
              </Flex>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
