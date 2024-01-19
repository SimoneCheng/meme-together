import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Compressor from 'compressorjs';
import {
  getUserInfo,
  updateUserInfo,
  getProfileImg,
  uploadProfileImg
} from '../../api';
import { Button } from '@/components/button';
import { wholePageLoading } from '@/utlis/loading';
import { alertSuccess } from '@/utlis/alert';
import {
  StyledWrapper,
  StyledH1,
  StyledH2,
  StyledImg,
  StyledLabel,
  StyledButtonGroup,
  StyledProfileImgWrapper,
  StyledTextarea
} from './personal-setting.style';

const PersonalSetting = () => {
  const userData = useSelector((state) => state.userData);
  const [personalInfo, setPersonalInfo] = useState();
  const [selfIntro, setSelfIntro] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (!userData) return;
    const unsubscribe = getUserInfo({
      id: userData.user_id,
      callback: (data) => {
        setPersonalInfo(data);
        setSelfIntro(data.self_intro);
      },
    });
    return () => unsubscribe();
  }, [userData])

  if (!personalInfo) {
    return (
      <StyledWrapper>
        {wholePageLoading('spinningBubbles', '#056', 50, 50)}
      </StyledWrapper>
    );
  }

  const handleProfileImgUploading = (e) => {
    const image = e.target.files[0];
    if (!image) return;
    new Compressor(image, {
      quality: 1,
      width: 400,
      success: async (compressedResult) => {
        await uploadProfileImg({
          id: userData.user_id,
          file: compressedResult
        });
        const url = await getProfileImg(userData.user_id);
        await updateUserInfo({
          id: userData.user_id,
          data: { user_img: url }
        });
        alertSuccess('成功更換頭像！');
      },
    });
  };

  const handleDefaultProfileImgUsing = () => {
    const data = { user_img: process.env.REACT_APP_defaultProfileImg };
    updateUserInfo({
      id: userData.user_id,
      data
    })
      .then(() => alertSuccess('已更換成預設頭像！'));
  };

  const handleSelfIntroUpdating = () => {
    const data = { self_intro: selfIntro }
    updateUserInfo({
      id: userData.user_id,
      data
    })
      .then(() => alertSuccess('個人簡介更新成功！'));
  };

  const handleChange = (e) => {
    setSelfIntro(e.target.value);
  };

  return (
    <StyledWrapper>
      <StyledH1>修改個人資料</StyledH1>
      <StyledH2>頭像</StyledH2>
      <StyledProfileImgWrapper>
        <StyledImg
          alt="profile-img"
          src={personalInfo.user_img}
        />
        <StyledButtonGroup>
          <StyledLabel htmlFor="image">
            上傳新頭像
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleProfileImgUploading}
            />
          </StyledLabel>
          <Button
            colorScheme="yellow"
            variant="solid"
            onClick={handleDefaultProfileImgUsing}
          >
            使用預設頭像
          </Button>
        </StyledButtonGroup>
      </StyledProfileImgWrapper>
      <StyledH2>個人簡介</StyledH2>
      <StyledTextarea
        cols="20"
        rows="5"
        value={selfIntro}
        onChange={handleChange}
      />
      <Button
        colorScheme="yellow"
        variant="solid"
        onClick={handleSelfIntroUpdating}
      >
        儲存
      </Button>
    </StyledWrapper>
  );
};

export default PersonalSetting;
