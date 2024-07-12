import { Button } from "@/components/button";

const DownloadWithJpgButton = ({ canvas }) => {
  const handleClick = () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = `meme-generator-${new Date().getTime()}.jpg`;
    link.click();
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
    >
      下載圖片（jpg）
    </Button>
  );
};

export default DownloadWithJpgButton;
