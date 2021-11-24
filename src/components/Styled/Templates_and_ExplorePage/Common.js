import styled from "styled-components";

const H1 = styled.h1`
  padding-top: 100px;
  font-weight: bolder;
`;

const Strong = styled.strong`
  background-color: ${props => props.color.color1.colorCode};
  color: black;
`;

const Container0 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
`;

const Container1 = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  background-color: #ffc349;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 45px;
  margin-top: 45px;
  padding-bottom: 45px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 200px);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 660px) {
    grid-template-columns: repeat(2, 200px);
  }
  @media screen and (max-width: 524px) {
    grid-template-columns: repeat(1, 250px);
  }
`;

const Container3 = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s linear;
  &:hover{
    box-shadow: 0 0 10px 2px grey;
    bottom: 10px;
  }
  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
  @media screen and (max-width: 660px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 524px) {
    width: 250px;
    height: 250px;
  }
`;

const Container4 = styled.div`
  display: flex;
  width: 850px;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    width: 690px;
  }
  @media screen and (max-width: 768px) {
    width: 545px;
    flex-direction: column;
  }
  @media screen and (max-width: 660px) {
    width: 445px;
  }
  @media screen and (max-width: 524px) {
    width: 345px;
  }
`;

const Container5 = styled.div`
  display: flex;
  width: 400px;
  @media screen and (max-width: 768px) {
   margin-bottom: 20px;
  }
  @media screen and (max-width: 524px) {
    width: 100%;
  }
`;

const Container6 = styled.div`
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Input0 = styled.input`
  flex: 1;
  border: 3px solid #056;
  border-right: none;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  outline: none;
  &:focus{
    color: #056;
  }
`;

const Button0 = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid #056;
  background: #056;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

const Button1 = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #056;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
`;

const Select0 = styled.select`
  border: 0;
  outline: 0;
  font: inherit;
  height: 2rem;
  padding: 0 1rem 0 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;


export {
    H1,
    Strong,
    Container0,
    Container1,
    Container2,
    Container3,
    Container4,
    Container5,
    Container6,
    Input0,
    Img0,
    Button0,
    Button1,
    Select0
}