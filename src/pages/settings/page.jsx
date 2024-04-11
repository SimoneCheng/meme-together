import { useScrollTo } from '@/hooks';
import {
  SettingListGroup,
  PersonalSetting,
  PasswordChanging,
  AccountDeleting,
  useSettingActiveOption
} from '@/features/user';
import { StyledWrapper } from './style';

const PersonalSettings = () => {
  const [activeOption] = useSettingActiveOption();

  useScrollTo();

  return (
    <StyledWrapper>
      <SettingListGroup />
      {activeOption === 'userInfo' && <PersonalSetting />}
      {activeOption === 'password' && <PasswordChanging />}
      {activeOption === 'deleteAccount' && <AccountDeleting />}
    </StyledWrapper>
  );
};

export default PersonalSettings;
