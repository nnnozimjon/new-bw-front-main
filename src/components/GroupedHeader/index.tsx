"use client";

import Header from "../Header";
import HeaderCategories from "../HeaderCategories";
import { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "@/store";
import { useGetCategories } from "./GetCategories";

export interface ICategory {
  id: string;
  name: string;
  iconPath?: string | null;
  imagePath?: string | null;
  subCategories: ICategory[];
  showIndex?: number;
}

const initialValue: ICategory = {
  id: "",
  name: "",
  iconPath: "",
  imagePath: "",
  subCategories: [],
};

export default function GroupedHeader() {
  const { categories } = useGetCategories();

  return (
    <>
      <Header categories={categories} />
      <HeaderCategories categories={categories} />
    </>
  );
}
