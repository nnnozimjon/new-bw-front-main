import { useAddCommentMutation } from "@/store";
import {
  Button,
  InputBase,
  Modal,
  Rating,
  Text,
  Textarea,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
  opened: boolean;
  refetch: (args?: any) => void;
  productId: number;
}
export const CommentModal = ({
  onClose,
  opened,
  refetch,
  productId,
}: Props) => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const [nameError, setNameError] = useState("");
  const [textError, setTextError] = useState("");

  const [addComment, { isSuccess: isSuccessComment }] = useAddCommentMutation();

  useEffect(() => {
    if (isSuccessComment) {
      refetch();
      onClose();
    }
  }, [isSuccessComment]);

  const handleAddComment = () => {
    if (name?.length == 0) {
      setNameError("Имя не должно быть пустым!");
      return () => {};
    }

    if (text?.length == 0) {
      setTextError("Комментарий не должен быть пустым!");
      return () => {};
    }
    addComment({ productId, userName: name, text, rating });
  };

  return (
    <Modal
      onClose={onClose}
      opened={opened}
      centered
      className="z-[1000] fixed w-screen h-screen"
      withCloseButton={false}
    >
      <Text className="text-[1.75rem] font-bold text-[#2a5ffe] text-center mb-[30px]">
        Добавить комментарий
      </Text>

      <InputBase
        placeholder=""
        label="Имя"
        classNames={{ input: "h-[45px]", label: "text-[1rem]" }}
        className="mb-[20px]"
        onChange={(e) => setName(e.target.value)}
        error={nameError}
      />
      <Textarea
        placeholder=""
        label="Комментарий"
        classNames={{ input: "h-[130px]", label: "text-[1rem]" }}
        className="mb-[20px]"
        onChange={(e) => setText(e.target.value)}
        error={textError}
      />
      <Text>Ваша оценка</Text>
      <Rating
        size={45}
        value={rating}
        title="Ваша оценка"
        className="mb-[20px]"
        onChange={(e) => setRating(e)}
      />

      <Button className="w-full h-[45px]" onClick={handleAddComment}>
        Добавить
      </Button>
    </Modal>
  );
};
