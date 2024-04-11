import { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useIsAuthenticated, useAuthId } from "@/features/auth";
import {
  checkFavoriteList,
  addToFavorite,
  deleteFromFavorite
} from "../../api";
import { Button } from "@/components/button";
import { alertSuccess } from "@/utlis/alert";

const AddToFavoriteIconButton = (props) => {
  const {
    img_name,
    img_url,
    owner_user_id
  } = props;
  const [isAuthenticated] = useIsAuthenticated();
  const [authId] = useAuthId();
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    if (!authId) return;
    const unsubscribe = checkFavoriteList({
      id: authId,
      imgName: img_name,
      callback: setFavoriteList
    });
    return unsubscribe;
  }, [authId, img_name])

  const handleAddToFavorite = () => {
    const data = {
      img_url,
      img_name,
      created_time: new Date(),
      owner_user_id
    };
    addToFavorite({
      id: authId,
      docId: img_name,
      data
    }).then(() => {
      alertSuccess('收藏成功！');
    });
  };

  const handleDeleteFromFavorite = () => {
    deleteFromFavorite({
      id: authId,
      docId: img_name
    }).then(() => {
      alertSuccess('已取消收藏！');
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  if (favoriteList.length === 0) {
    return (
      <Button variant="unstyled" onClick={handleAddToFavorite}>
        <MdFavoriteBorder
          style={{
            'fontSize': '2rem',
            'cursor': 'pointer'
          }}
        />
      </Button>
    );
  }

  return (
    <Button variant="unstyled" onClick={handleDeleteFromFavorite}>
      <MdFavorite
        style={{
          'color': '#EA0000',
          'fontSize': '2rem',
          'cursor': 'pointer'
        }}
      />
    </Button>
  )
};

export default AddToFavoriteIconButton;
