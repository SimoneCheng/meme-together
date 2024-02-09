import { usePublicActiveOption } from "@/features/user/store";
import { AllPublicMemes } from "./all-public-memes";
import { AllFollowers } from "./all-followers";
import { AllFollowing } from "./all-following";

const PublicActiveContent = () => {
  const [publicActiveOption] = usePublicActiveOption();
  if (publicActiveOption === 'allPublicMeme') return <AllPublicMemes />;
  if (publicActiveOption === 'followers') return <AllFollowers />;
  if (publicActiveOption === 'following') return <AllFollowing />;
  return null;
};

export default PublicActiveContent;
