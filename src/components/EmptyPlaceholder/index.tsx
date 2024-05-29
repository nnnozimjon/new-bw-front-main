import { Text } from "@mantine/core";

interface IProps {
  label: string;
}

export default function EmptyPlaceholder({ label }: IProps) {
  return (
    <div className="bg-[#f5f5f5] h-[84px] md:h-[180px] rounded-[12px] flex items-center justify-center">
      <Text className="text-center text-[1.25rem] md:text-[2rem] font-light text-[#888785]">
        {label}
      </Text>
    </div>
  );
}
