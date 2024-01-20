import { useState } from 'react';
import { useScrollTo } from '@/hooks';
import {
  SettingListGroup,
  PersonalSetting,
  PasswordChanging,
  AccountDeleting
} from '@/features/user';
import { StyledWrapper } from './settings.style';

const PersonalSettings = () => {
  const [activeOption, setActiveOption] = useState('userInfo');

  useScrollTo();

  return (
    <StyledWrapper>
      <SettingListGroup
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />
      {activeOption === 'userInfo' && <PersonalSetting />}
      {activeOption === 'password' && <PasswordChanging />}
      {activeOption === 'deleteAccount' && <AccountDeleting />}
    </StyledWrapper>
  );
};

export default PersonalSettings;
