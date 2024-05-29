import {
  Button,
  Divider,
  Flex,
  Group,
  Input,
  Menu,
  Select,
  Text,
} from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import { ICategory } from "../Header";
import { useEffect, useState } from "react";
import { redirect } from "@/utils";
import { useSearchParams } from "next/navigation";

interface IProps {
  categories: ICategory[];
}

function flattenCategories(categories: ICategory[]) {
  const flattenedCategories: Omit<ICategory, "subCategories">[] = [];

  function flatten(category: ICategory) {
    const categoryWithoutSubcategories = { ...category };
    // @ts-ignore
    delete categoryWithoutSubcategories?.subCategories;

    flattenedCategories.push(categoryWithoutSubcategories);
    if (category.subCategories && category.subCategories.length > 0) {
      category.subCategories.forEach((subCategory) => flatten(subCategory));
    }
  }

  categories?.forEach((category) => flatten(category));

  return flattenedCategories;
}

export default function SearchBar({ categories }: IProps) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>("");
  const [selectedSearchCategory, setSelectedSearchCategory] =
    useState<Omit<ICategory, "subCategories">>();

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const categoryId = searchParams.get("categoryId");

    const flattedCategories = flattenCategories(categories);
    const category = flattedCategories?.find((cat) => cat?.id == categoryId);

    setSelectedSearchCategory(category);
    setSearch(q);
  }, [categories, searchParams]);

  return (
    <div className="w-full">
      <Flex className="border-[2px] border-solid rounded-sm border-[#2A5FFE]">
        <Input
          className="w-full"
          placeholder="Найти нужный вам товар..."
          classNames={{
            input: "border-none",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Divider orientation="vertical" />
        <Group visibleFrom="md">
          <Menu width={250} shadow="sm">
            <Menu.Target>
              <Select
                readOnly
                placeholder="Все продукты"
                classNames={{
                  input: "border-none w-[250px]",
                }}
                data={[selectedSearchCategory?.name || ""]}
                value={selectedSearchCategory?.name}
              />
            </Menu.Target>
            <Menu.Dropdown className="h-[400px] overflow-y-scroll scrollbar-hide py-4">
              <Menu.Item
                className="font-semibold text-[0.875rem]"
                onClick={() =>
                  setSelectedSearchCategory({ id: "", name: "", iconPath: "" })
                }
              >
                Все продукты
              </Menu.Item>
              {categories?.map((category) => (
                <div key={category?.id}>
                  {/* Render Category */}
                  <Menu.Item
                    className="font-semibold text-[0.875rem]"
                    onClick={() => setSelectedSearchCategory(category)}
                  >
                    {category?.name}
                  </Menu.Item>

                  {/* Render Sub Categories */}
                  {category?.subCategories &&
                    category?.subCategories?.map((subCategory) => (
                      <div key={subCategory?.id}>
                        <Menu.Item
                          className="pl-[18px] font-medium text-[0.875rem]"
                          onClick={() => setSelectedSearchCategory(subCategory)}
                        >
                          {subCategory?.name}
                        </Menu.Item>

                        {/* Render Sub Sub Categories */}
                        {subCategory?.subCategories &&
                          subCategory?.subCategories?.map((subSubCategory) => (
                            <Menu.Item
                              key={subSubCategory?.id}
                              className="pl-[26px] text-[0.75rem] font-medium"
                              onClick={() =>
                                setSelectedSearchCategory(subSubCategory)
                              }
                            >
                              {subSubCategory?.name}
                            </Menu.Item>
                          ))}
                      </div>
                    ))}
                </div>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Button
          onClick={() =>
            redirect(
              `/search?q=${search}&categoryId=${
                selectedSearchCategory?.id != undefined || null
                  ? selectedSearchCategory?.id
                  : ""
              }`
            )
          }
          className="rounded-none w-[84px] p-1 bg-[#2A5FFE] !transform-none"
        >
          <FaSearch size={24} />
        </Button>
      </Flex>
    </div>
  );
}
