import { Button } from "@/components/button";

const DownloadWithPngButton = ({ canvas }) => {
  const handleClick = () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = `meme-generator-${new Date().getTime()}.png`;
    link.click();
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
    >
      下載圖片（png）
    </Button>
  );
};

export default DownloadWithPngButton;
