import { useEffect } from "react";
import { useActiveOption } from "@/features/user/store";
import {
  StyledWrapper,
  StyledH3,
  StyledUl,
  StyledButton
} from "./setting-list-group.style";

const SettingListGroup = () => {
  const [activeOption, setActiveOption] = useActiveOption();

  useEffect(() => {
    return () => setActiveOption('userInfo');
  }, [setActiveOption])

  return (
    <StyledWrapper>
      <StyledH3>
        <strong>個人設定</strong>
      </StyledH3>
      <StyledUl>
        <li>
          <StyledButton
            type="button"
            active={activeOption === 'userInfo'}
            onClick={() => setActiveOption('userInfo')}
          >
            修改個人資料
          </StyledButton>
        </li>
        <li>
          <StyledButton
            type="button"
            active={activeOption === 'password'}
            onClick={() => setActiveOption('password')}
          >
            修改密碼
          </StyledButton>
        </li>
        <li>
          <StyledButton
            type="button"
            active={activeOption === 'deleteAccount'}
            onClick={() => setActiveOption('deleteAccount')}
          >
            刪除帳戶
          </StyledButton>
        </li>
      </StyledUl>
    </StyledWrapper>
  );
};

export default SettingListGroup;
