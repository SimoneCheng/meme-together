import { Button } from "@/components/button";
import { useDisclosure } from "@/hooks";
import MemePublishInfoFormDialog from "./meme-publish-info-form-dialog";

const FinishPublishButton = ({ canvas }) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        onClick={onOpen}
      >
        完成並發布圖片
      </Button>
      <MemePublishInfoFormDialog
        isOpen={isOpen}
        onClose={onClose}
        canvas={canvas}
      />
    </>
  );
};

export default FinishPublishButton;
