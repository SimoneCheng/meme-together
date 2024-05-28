import { useIsAuthenticated } from "@/features/auth";
import { Button } from "@/components/button";
import { useDisclosure } from "@/hooks";
import MemePublishInfoFormDialog from "./meme-publish-info-form-dialog";

const TemplatePublishButton = ({ canvas }) => {
  const [isAuthenticated] = useIsAuthenticated();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Button
        type="button"
        onClick={onOpen}
      >
        發布圖片
      </Button>
      <MemePublishInfoFormDialog
        isOpen={isOpen}
        onClose={onClose}
        canvas={canvas}
      />
    </>
  );
};

export default TemplatePublishButton;
