import { useGetAllCategoryQuery } from "@/store";
import { ICategory } from ".";
import { useEffect, useState } from "react";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { data, error, isSuccess, isLoading, isError } = useGetAllCategoryQuery(
    {}
  );

  useEffect(() => {
    if (isSuccess) {
      setCategories(data?.toReversed());
    }
  }, [isSuccess, isError, data]);

  return { categories };
};
