import styled from "styled-components";

const Container0 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 0 30px 30px 30px;
  @media screen and (max-width: 970px) {
    grid-template-columns: repeat(2, 350px);
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 300px);
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 680px) {
    grid-template-columns: repeat(1, 400px);
  }
  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(1, 350px);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 300px);
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 250px);
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 200px);
  }
`;

const Container1 = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s linear;
  &:hover{
    box-shadow: 0 0 10px 2px grey;
    bottom: 10px;
  }
`;

const Container2 = styled.div`
 padding: 0 20px 20px 20px;
`;

const Container3 = styled.div`
 margin-top: 5px;
`;

const Container4 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Container5 = styled.span`
  font-size: 70px;
  color: #056;
`;

const Container6 = styled.div`
  width: 810px;
  text-align: center;
  padding: 30px;
  font-size: 2rem;
  @media screen and (max-width: 810px) {
    width: 100%;
  }
`;

const Img0 = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Button0 = styled.button`
  margin-top: 20px;
  border: 1px ${props => props.color.color2.colorCode} solid;
  border-radius: 5px;
  color: ${props => props.color.color2.colorCode};
  font-size: 1rem;
  background-color: ${props => props.color.color3.colorCode};
  padding: 5px 10px;
  cursor: pointer;
  :hover {
    background-color: ${props => props.color.color2.colorCode};
    color: ${props => props.color.color3.colorCode};
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
    Img0,
    Button0
}