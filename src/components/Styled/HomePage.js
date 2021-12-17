import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSloganDiv = styled.div`
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

const SloganText = styled.div`
    width: 300px;
    text-align: center;
    margin-left: 100px;
    max-width: 1440px;
    @media screen and (max-width: 768px) {
      margin: 20px auto 0 auto;
    }
`;

const StyledInfoDiv = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
   text-align: center;
  }
`;

const InfoText = styled.div`
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

const InfoContent = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;

const InfoSubContent = styled.div`
    margin: 30px auto 0 auto;
    width: 80%;
`;

const StyledHotMemesDiv = styled.div`
  background-color: ${props => props.color.color2.colorCode};
  padding-top: 30px;
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
   text-align: center;
  }
`;

const AllHotMemesImg = styled.div`
  display: flex;
  overflow-x: auto;
  margin-right: 50px;
  margin-left: 50px;
  min-height: 250px;
  align-items: center;
`;

const EachMemeDiv = styled.div`
 cursor: pointer;
 margin-top: 20px;
 margin-bottom: 10px;
 margin-right: 30px;
`;

const LinkToMoreMemes = styled.div`
  width: fit-content;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: 2px solid white;
  color: white;
  position: relative;
  left: 50%;
  :hover {
      background-color: white;
      color: #056;
      cursor: pointer;
  }
`;

const SloganImg = styled.img`
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

const InfoImg = styled.img`
  width: 20rem;
  @media screen and (max-width: 1024px) {
    width: 15rem;
  }
  @media screen and (max-width: 425px) {
    width: 10rem;
  }
`;

const EachMemeImg = styled.img`
  height: 250px;
  object-fit: fill;
  :hover {
   box-shadow: 0 0 10px 3px white;
 }
`;

const SloganTitle = styled.h1`
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

const InfoTitle = styled.h1`
  margin-left: 50px;
  margin-top: 50px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const HotMemesTitle = styled.h1`
  color: white;
  margin-left: 50px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const SloganButton = styled.button`
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

const SloganContent = styled.div`
    margin-top: 10px;
    font-size: 1rem;
`;

const Strong = styled.strong`
  font-size: 20px;
  border-bottom: 2px ${props => props.color.color2.colorCode} solid;
  margin-left: 5px;
`;

export {
  Wrapper,
  StyledSloganDiv,
  SloganText,
  StyledInfoDiv,
  InfoText,
  InfoContent,
  InfoSubContent,
  StyledHotMemesDiv,
  AllHotMemesImg,
  EachMemeDiv,
  LinkToMoreMemes,
  SloganImg,
  InfoImg,
  EachMemeImg,
  SloganTitle,
  InfoTitle,
  HotMemesTitle,
  SloganButton,
  SloganContent,
  Strong
}