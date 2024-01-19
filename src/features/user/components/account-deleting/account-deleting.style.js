import styled from "styled-components";
import { Button } from "@/components/button";

export const StyledWrapper = styled.section`
  flex: 1;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    padding-left: 0px;
    padding-top: 50px;
    width: calc(100% - 50px);
  }
`;

export const StyledH1 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 5px solid #056;
  margin-bottom: 20px;
`;

export const StyledButton = styled(Button)`
  margin-top: 20px;
`;
