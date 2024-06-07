"use client";

import Header from "../Header";
import HeaderCategories from "../HeaderCategories";
import { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "@/store";

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

export default function GroupedHeader() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeLink, setActiveLink] = useState<ICategory>(initialValue);

  const { data, error, isSuccess, isLoading, isError } = useGetAllCategoryQuery(
    {}
  );

  useEffect(() => {
    if (isSuccess) {
      setCategories(data);
      setActiveLink(categories[0]);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Header categories={categories} />
      <HeaderCategories categories={categories} />
    </>
  );
}
