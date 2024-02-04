import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  checkAllFollowers,
  checkAllFollowing,
  getPublicMemeImage,
  getUserInfo
} from "@/features/user/api";
import { useScrollTo } from "@/hooks";

const Public = () => {
  const { id } = useParams();
  const userData = useSelector((state) => state.userData);

  const [userInfo, setUserInfo] = useState({});
  const [publicMemeImg, setPublicMemeImg] = useState();
  const [allFollowing, setAllFollowing] = useState();
  const [allFollowers, setAllFollowers] = useState();
  const [allFollowingSelf, setAllFollowingSelf] = useState([]);
  const [status, setStatus] = useState('allPublicMeme');

  useScrollTo();

  useEffect(() => {
    const unsubscribe = getUserInfo({
      id,
      callback: setUserInfo
    });
    return () => unsubscribe();
  }, [id])

  useEffect(() => {
    const unsubscribe = checkAllFollowers(id, setAllFollowers);
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const unsubscribe = checkAllFollowing(id, setAllFollowing);
    return () => unsubscribe();
  }, [id])

  useEffect(() => {
    const unsubscribe = getPublicMemeImage({
      id,
      callback: setPublicMemeImg
    });
    return () => unsubscribe();
  }, [id])

  useEffect(() => {
    if (userData === null || Object.keys(userData).length === 0) {
      return;
    }
    const  unsubscribe = checkAllFollowing(userData.user_id, setAllFollowingSelf);
    return () => unsubscribe();
  }, [userData])

  useEffect(() => {
    setStatus('allPublicMeme');
  }, [id])
};

export default Public;
