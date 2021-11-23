import styled from "styled-components";

const Container0 = styled.div`
  padding-top: 100px;
  background-color: #056;
  min-height: calc(100vh - 100px);
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 10px;
  margin: 0 auto;
  width: 800px;
  @media screen and (max-width: 850px) {
    width: auto;
    margin: 0 30px;
  }
  @media screen and (max-width: 650px) {
    font-size: 0.8rem;
  }
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
  @media screen and (max-width: 650px) {
    padding-right: 0px;
  }
`;

const Container3 = styled.div`
  padding-top: 10px;
  white-space: pre-line;
`;

const Container4 = styled.div`
  margin: 30px auto 0 auto;
  width: 800px;
  color: #fff;
  border-bottom: 2px solid #fff;
  font-size: 2rem;
  @media screen and (max-width: 850px) {
    width: calc(100% - 40px);
  }
`;

const Container5 = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  width: 100px;
  padding-top: 20px;
  &:hover{
    box-shadow: 0 0 5px #ccc;
  }
  @media screen and (max-width: 500px) {
    margin-right: 0px;
  }
`;

const Img0 = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 10px #ccc;
  @media screen and (max-width: 650px) {
    width: 100px;
    height: 100px;
  }
`;

const Button0 = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #ffc349;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
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
    Img0,
    Button0
}