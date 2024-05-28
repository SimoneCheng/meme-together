import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  z-index: 10;
  background-color: #fff;
  @media screen and (max-width: 768px) {
    height: 60px;
  }
`;

export const StyledDesktopNav = styled.nav`
  margin: 0 auto;
  display: flex;
  max-width: 1440px;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const StyledLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-size: 1rem;
  font-weight: bolder;
`;

export const StyledDesktopUl = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  margin-left: 20px;
  height: 100%;
  &:last-child {
    margin-left: auto;
  }
  li {
    list-style: none;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
`;

export const StyledButtonLink = styled(Link)`
  border: 1px #056 solid;
  border-radius: 5px;
  color: #056;
  background-color: #fff;
  font-size: 1rem;
  padding: 5px 15px;
  cursor: pointer;
  :visited {
    color: #056;
  }
  :hover {
    background-color: #056;
    color: #fff;
  }
`;

export const StyledIconButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: inherit;
`;

export const StyledMobileNav = styled.nav`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
`;

export const StyledSpan = styled.span`
  font-size: 2rem;
`;

export const StyledMobileUl = styled.ul`
  position: fixed;
  top: 60px;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 0;
  padding: 0;
  width: 100%;
  li {
    list-style: none;
  }
`;

export const StyledMobileLink = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  padding: 12px 0;
`;

export const StyledMobileButton = styled.button`
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 12px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
`;
