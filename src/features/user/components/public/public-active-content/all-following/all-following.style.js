import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

export const StyledNoContentWrapper = styled.div`
  color: #fff;
  font-size: 2rem;
  padding-top: 50px;
  text-align: center;
`;

export const StyledLink = styled(Link)`
  width: 800px;
  padding: 10px 10px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 850px) {
    width: calc(100% - 60px);
  }
`;

export const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 0px 5px #ccc;
  margin-right: 24px;
  margin-left: 32px;
`;

export const StyledButton = styled(Button)`
  margin-left: auto;
  margin-right: 12px;
`;

export const StyledP = styled.p`
  margin: 30px auto 0 auto;
  width: 800px;
  color: #fff;
  border-bottom: 2px solid #fff;
  font-size: 2rem;
  @media screen and (max-width: 850px) {
    width: calc(100% - 40px);
  }
`;
