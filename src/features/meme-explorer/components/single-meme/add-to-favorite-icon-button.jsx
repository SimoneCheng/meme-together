import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
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
  const userData = useSelector((state) => state.userData);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    if (!userData?.user_id) return;
    const unsubscribe = checkFavoriteList({
      id: userData.user_id,
      imgName: img_name,
      callback: setFavoriteList
    });
    return () => unsubscribe();
  }, [img_name, userData.user_id])

  const handleAddToFavorite = () => {
    const data = {
      img_url,
      img_name,
      created_time: new Date(),
      owner_user_id
    };
    addToFavorite({
      id: userData.user_id,
      docId: img_name,
      data
    }).then(() => {
      alertSuccess('收藏成功！');
    });
  };

  const handleDeleteFromFavorite = () => {
    deleteFromFavorite({
      id: userData.user_id,
      docId: img_name
    }).then(() => {
      alertSuccess('已取消收藏！');
    });
  };

  if (!userData?.user_id) {
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
