import { Pagination as MantinePagination } from "@mantine/core";

interface IProps {
  total: number;
  onChange: (e: any) => void;
}

export const Pagination = ({ total, onChange }: IProps) => {
  return (
    <MantinePagination
      classNames={{
        control: "md:h-[50px] md:w-[50px] sm:h-[30px] sm:w-[30px]",
      }}
      total={total}
      onChange={onChange}
    />
  );
};
