import { useAuthId } from '@/features/auth';
import { Button } from '@/components/button';

const SavingStatusButton = ({ canvas }) => {
  const [authId] = useAuthId();

  if (!authId) {
    return null
  }


};

export default SavingStatusButton;
