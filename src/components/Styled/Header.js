import styled from "styled-components";

const Menu = styled.header`
 position: fixed;
 top: 0;
 left: 0;
 z-index: 999;
 width: 100%;
 height: 65px;
 background-color: ${props => props.color.color3.colorCode};
 box-shadow: 5px 5px 5px gray;
 @media screen and (max-width: 768px) {
    height: 60px;
 }
`;

const AccountImage = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

// ===== Desktop Navbar Layout ===== //
const NavDesktop = styled.nav`
 display: flex;
 width: 100%;
 height: 65px;
 @media screen and (max-width: 768px) {
   display: none;
 }
`;

const LogoDesktop = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-size: 16px;
  font-weight: bolder;
`;

const LogoImage = styled.img`
  height: 30px;
  width: 35px;
`;

const Ul2 = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

const LiDesktop = styled.li`
  list-style: none;
  margin-right: 30px;
`;

const Button = styled.button`
  border: 1px ${props => props.color.color2.colorCode} solid;
  border-radius: 5px;
  color: ${props => props.color.color2.colorCode};
  background-color: ${props => props.color.color3.colorCode};
  font-size: 16px;
  padding: 5px 30px;
  cursor: pointer;
  :active {
    background-color: ${props => props.color.color2.colorCode};
    color: ${props => props.color.color3.colorCode};
  } 
`;

// ===== Monbile Navbar Layout ===== //
const NavMobile = styled.nav`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
  }
`;

const LogoMobile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 16px;
  font-weight: bolder;
`;

const Checkbox = styled.input`
  display: none;
  :checked~#menu {
  max-height: 100%;
  }
`;

const LabelBurger = styled.label`
  font-size: 30px;
`;

const MenuMobile = styled.div`
  max-height: 0;
  overflow: hidden;
  position: fixed;
  top: 60px;
  left: 0;
  background-color: white;
  width: 100%;
  transition: 0.8s linear;
  box-shadow: 5px 5px 5px gray;
`;

const LiMobile = styled.li`
  list-style: none;
  text-align: center;
  color: ${props => props.color.color2.colorCode};
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
`;

export {
    Menu,
    AccountImage,
    NavDesktop,
    LogoDesktop,
    LogoImage,
    Ul2,
    LiDesktop,
    Button,
    NavMobile,
    LogoMobile,
    Checkbox,
    LabelBurger,
    MenuMobile,
    LiMobile
};