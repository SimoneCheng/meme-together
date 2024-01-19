import { useState } from 'react';
import {
  SettingListGroup,
  PersonalSetting,
  PasswordChanging
} from '@/features/user';
import { StyledWrapper } from './settings.style';

const PersonalSettings = () => {
  const [activeOption, setActiveOption] = useState('userInfo');

  return (
    <StyledWrapper>
      <SettingListGroup
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />
      {activeOption === 'userInfo' && <PersonalSetting />}
      {activeOption === 'password' && <PasswordChanging />}
    </StyledWrapper>
  );
};

export default PersonalSettings;
