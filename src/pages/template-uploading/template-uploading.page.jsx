import { useScrollTo } from "@/hooks";
import { TemplateUploading as TemplateUploadingComponent } from "@/features/meme-templates";

const TemplateUploading = () => {
  useScrollTo();
  return <TemplateUploadingComponent />;
};

export default TemplateUploading;
