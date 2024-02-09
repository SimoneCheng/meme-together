import { usePublicActiveOption } from "@/features/user/store";
import { AllPublicMemes } from "./all-public-memes";
import { AllFollowers } from "./all-followers";

const PublicActiveContent = () => {
  const [publicActiveOption] = usePublicActiveOption();
  if (publicActiveOption === 'allPublicMeme') return <AllPublicMemes />;
  if (publicActiveOption === 'followers') return <AllFollowers />;
  if (publicActiveOption === 'following') return null;
  return null;
};

export default PublicActiveContent;
