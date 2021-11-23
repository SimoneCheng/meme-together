import styled from "styled-components";

const Container0 = styled.div`
  color: #fff;
  font-size: 2rem;
  padding-top: 50px;
  text-align: center;
`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 50px 50px 0 50px;
  padding-bottom: 50px;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(3, 220px);
    grid-gap: 20px;
  }
  @media screen and (max-width: 760px) {
    grid-template-columns: repeat(3, 200px);
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 200px);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 150px);
  }
`;

const Container2 = styled.div`
  box-shadow: 0 0 3px white;
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  &:hover{
    box-shadow: 0 0 10px 3px white;
  }
  @media screen and (max-width: 850px) {
    height: 220px;
  }
  @media screen and (max-width: 760px) {
    height: 200px;
  }
  @media screen and (max-width: 700px) {
    height: 250px;
  }
  @media screen and (max-width: 600px) {
    height: 200px;
  }
  @media screen and (max-width: 500px) {
    height: 150px;
  }
`;

const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

const Container4 = styled.div`
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
const Container5 = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container6 = styled.div`
  flex: 1;
`;

const Container7 = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Img1 = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 0px 5px #ccc;
`;

const Button0 = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #ffc349;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  :hover{
    outline: 2px solid black;
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
    Img1,
    Button0
}