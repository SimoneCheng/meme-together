import { useState } from 'react';
import { useIsAuthenticated, useAuthId } from '@/features/auth';
import { saveEditingMeme, updateEditingMeme } from '../../api';
import { Button } from '@/components/button';
import { alertSuccess } from '@/utlis/alert';

const TemplateSaveCanvasStatusButton = ({ canvas }) => {
  const [isAuthenticated] = useIsAuthenticated();
  const [authId] = useAuthId();
  const [docId, setDocId] = useState('');

  if (!isAuthenticated) {
    return null;
  }

  const handleClick = () => {
    const status = JSON.stringify(canvas);
    const parsedStatus = JSON.parse(status);
    const data = {
      canvas_status: status,
      backgroundImage_src: parsedStatus.backgroundImage.src,
      canvas_width: parsedStatus.backgroundImage.width,
      canvas_height: parsedStatus.backgroundImage.height,
      created_time: new Date(),
      last_save_time: new Date()
    };
    if (!docId) {
      saveEditingMeme({ id: authId, data })
        .then((docRef) => {
          setDocId(docRef.id);
          alertSuccess('已儲存編輯狀態！可以到個人頁面看看喔！');
        });
    } else {
      updateEditingMeme({
        id: authId,
        docId,
        data: {
          canvas_status: status,
          last_save_time: new Date()
        }
      })
        .then(() => {
          alertSuccess('已更新編輯狀態！可以到個人頁面看看喔！');
        });
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
    >
      儲存編輯狀態到個人空間
    </Button>
  );
};

export default TemplateSaveCanvasStatusButton;
