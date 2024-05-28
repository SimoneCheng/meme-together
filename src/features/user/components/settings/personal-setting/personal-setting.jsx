import { useCallback, useState } from 'react';
import Compressor from 'compressorjs';
// store
import { usePersonalInfo } from '@/features/user/store';
// apis
import {
  updateUserInfo,
  getProfileImg,
  uploadProfileImg
} from '@/features/user/api';
// components
import { Button } from '@/components/button';
import { LoadingWithWholePage } from '@/components/loading';
// utils
import { alertSuccess } from '@/utlis/alert';
// hooks
import { useWatchPersonalInfo } from '@/features/user/hooks';
// styles
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
  const [personalInfo] = usePersonalInfo();
  const [selfIntro, setSelfIntro] = useState('');

  const setDefaultSelfIntro = useCallback((data) => {
    setSelfIntro(data.self_intro);
  }, []);

  useWatchPersonalInfo(setDefaultSelfIntro);

  if (!personalInfo.userName) {
    return (
      <StyledWrapper>
        <LoadingWithWholePage
          type="spinningBubbles"
          color="#056"
          width={50}
          height={50}
        />
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
          id: personalInfo.userId,
          file: compressedResult
        });
        const url = await getProfileImg(personalInfo.userId);
        await updateUserInfo({
          id: personalInfo.userId,
          data: { user_img: url }
        });
        alertSuccess('成功更換頭像！');
      },
    });
  };

  const handleDefaultProfileImgUsing = () => {
    const data = { user_img: process.env.REACT_APP_defaultProfileImg };
    updateUserInfo({
      id: personalInfo.userId,
      data
    })
      .then(() => alertSuccess('已更換成預設頭像！'));
  };

  const handleSelfIntroUpdating = () => {
    const data = { self_intro: selfIntro };
    updateUserInfo({
      id: personalInfo.userId,
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
          src={personalInfo.userImg}
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
