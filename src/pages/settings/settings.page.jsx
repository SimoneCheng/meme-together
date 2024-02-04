import { useScrollTo } from '@/hooks';
import {
  SettingListGroup,
  PersonalSetting,
  PasswordChanging,
  AccountDeleting,
  useActiveOption
} from '@/features/user';
import { StyledWrapper } from './settings.style';

const PersonalSettings = () => {
  const [activeOption] = useActiveOption();

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
