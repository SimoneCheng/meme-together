import { useState } from 'react';
import { SettingListGroup, PersonalSetting } from '@/features/user';
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
    </StyledWrapper>
  );
};

export default PersonalSettings;
