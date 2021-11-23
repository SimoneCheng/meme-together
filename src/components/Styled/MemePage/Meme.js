import styled from "styled-components";
import { Link } from 'react-router-dom';

const Container0 = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  background-color: #056;
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
`;

const Container1 = styled.div`
  display: flex;
  font-size: 1rem;
  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

const Container2 = styled.div`
  background-color: #fff;
  padding: 30px;
  border-bottom: 5px solid #056;
`;

const Container3 = styled.div`
  border-bottom: 5px solid #ffc349;
  padding-bottom: 10px;
`;

const Container4 = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  min-height: 100px;
  white-space: pre-line;
  word-break: break-word;
`;

const Container5 = styled.span`
  background-color: #E0E0E0;
  border-radius: 10px;
  padding: 2px 5px;
`;

const Container6 = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Container7 = styled.div`
 width: 400px;
 @media screen and (max-width: 950px) {
    width: 350px;
  }
  @media screen and (max-width: 850px) {
    width: 300px;
  }
  @media screen and (max-width: 750px) {
    width: 500px;
    margin-right: 0px;
  }
  @media screen and (max-width: 570px) {
    width: 400px;
  }
  @media screen and (max-width: 425px) {
    width: 300px;
  }
`;

const Img0 = styled.img`
  width: 400px;
  margin-right: 50px;
  position: sticky;
  top: 100px;
  @media screen and (max-width: 950px) {
    width: 350px;
  }
  @media screen and (max-width: 850px) {
    width: 300px;
  }
  @media screen and (max-width: 750px) {
    width: 500px;
    margin-right: 0px;
    position: initial;
  }
  @media screen and (max-width: 570px) {
    width: 400px;
  }
  @media screen and (max-width: 425px) {
    width: 300px;
  }
`;

const Link0 = styled(Link)`
  :hover{
      text-decoration: underline dotted;
  }
`;

export {
    Container0,
    Container1,
    Container2,
    Container3,
    Container4,
    Container5,
    Container6,
    Container7,
    Img0,
    Link0    
}