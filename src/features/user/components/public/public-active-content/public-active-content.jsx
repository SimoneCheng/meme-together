import { usePublicActiveOption } from "@/features/user/store";
import { AllPublicMemes } from "./all-public-memes";

const PublicActiveContent = () => {
  const [publicActiveOption] = usePublicActiveOption();
  if (publicActiveOption === 'allPublicMeme') return <AllPublicMemes />;
  if (publicActiveOption === 'followers') return null;
  if (publicActiveOption === 'following') return null;
  return null;
};

export default PublicActiveContent;
