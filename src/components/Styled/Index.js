import styled from 'styled-components';

const Container0 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  min-height: calc(100vh - 125px);
  background-color: ${props => props.color.color1.colorCode};
  padding-top: calc(30px + 65px);
  padding-bottom: 30px;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Container2 = styled.div`
    width: 300px;
    text-align: center;
    margin-left: 100px;
    max-width: 1440px;
    @media screen and (max-width: 768px) {
      margin: 20px auto 0 auto;
    }
`;

const Container3 = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
   text-align: center;
  }
`;

const Container4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 50px;
  padding-left: 50px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 20px;
  }
`;

const Container5 = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Container6 = styled.div`
    margin: 30px auto 0 auto;
    width: 80%;
`;

const Container7 = styled.div`
  background-color: ${props => props.color.color2.colorCode};
  padding-top: 30px;
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
   text-align: center;
  }
`;

const Container8 = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 50px;
  margin-left: 50px;
  min-height: 250px;
  align-items: center;
`;

const Container9 = styled.div`
 cursor: pointer;
 margin-top: 20px;
 margin-bottom: 10px;
 margin-right: 30px;
`;

const Container10 = styled.div`
  color: white;
  padding-top: 30px;
  padding-bottom: 20px;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
`;

const Container11 = styled.span`
  border-bottom: 2px solid white;
  color: white;
  :hover {
      background-color: white;
      color: #056;
      cursor: pointer;
  }
`;

const Image1 = styled.img`
  height: 30rem;
  border-radius: 50px;
  animation: fadein 6s ease;
  @keyframes fadein {
    0% {opacity: 0;}
    50% {opacity: 1;}
  }
  @media screen and (max-width: 1024px) {
    height: 24rem;
  }
  @media screen and (max-width: 768px) {
    height: 20rem;
  }
`;

const Image2 = styled.img`
  width: 20rem;
  @media screen and (max-width: 1024px) {
    width: 15rem;
  }
  @media screen and (max-width: 425px) {
    width: 10rem;
  }
`;

const Image3 = styled.img`
  height: 250px;
  object-fit: fill;
  :hover {
   box-shadow: 0 0 10px 3px white;
 }
`;

const Title1 = styled.h1`
  width: 9em;
  border-right: 2px solid;
  overflow: hidden;
  animation: typing 6s;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 8s steps(9), caret 1s steps(1) infinite;
  animation-iteration-count: infinite;
  @keyframes typing {
    0% { width: 0 }
    50% { width: 9em }
  }
  @keyframes caret {
    50% { border-color: transparent; }
  }
`;

const Title2 = styled.h1`
  margin-left: 50px;
  margin-top: 50px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const Title3 = styled.h1`
  color: white;
  margin-left: 50px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const Button1 = styled.button`
 border: none;
 border-radius: 5px;
 background-color: ${props => props.color.color2.colorCode};
 color: ${props => props.color.color3.colorCode};
 font-size: 1rem;
 padding: 10px 30px;
 cursor: pointer;
 margin-top: 50px;
 margin-bottom: 10px;
 @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Text1 = styled.div`
    margin-top: 10px;
    font-size: 1rem;
`;

const Strong = styled.strong`
  font-size: 20px;
  border-bottom: 2px ${props => props.color.color2.colorCode} solid;
  margin-left: 5px;
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
  Container8,
  Container9,
  Container10,
  Container11,
  Image1,
  Image2,
  Image3,
  Title1,
  Title2,
  Title3,
  Button1,
  Text1,
  Strong
}