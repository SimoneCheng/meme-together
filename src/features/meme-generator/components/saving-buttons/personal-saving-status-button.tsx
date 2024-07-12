import { useParams } from 'react-router-dom';
import { updateEditingMeme } from '../../api';
import { useAuthId } from '@/features/auth';
import { Button } from '@/components/button';
import { alertSuccess } from '@/utlis/alert';

const PersonalSavingStatusButton = ({ canvas }) => {
  const { id } = useParams<{ id: string; }>();
  const [authId] = useAuthId();

  if (!authId) {
    return null;
  }

  const handleClick = () => {
    const status = JSON.stringify(canvas);
    const data = {
      canvas_status: status,
      last_save_time: new Date(),
    };
    updateEditingMeme({
      id: authId,
      docId: id,
      data,
    }).then(() => {
      alertSuccess('已更新編輯狀態！');
    });
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
    >
      儲存編輯狀態
    </Button>
  );
};

export default PersonalSavingStatusButton;
