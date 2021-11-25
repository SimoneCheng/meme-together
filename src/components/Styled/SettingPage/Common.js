import styled from "styled-components";

const Container0 = styled.div`
  flex: 1;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    padding-left: 0px;
    padding-top: 50px;
    width: calc(100% - 50px);
  }
`;

const Container1 = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 5px solid #056;
  margin-bottom: 20px;
`;

const Container2 = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Container3 = styled.div`
  padding-top: 16px;
  padding-bottom: 50px;
`;

const Container4 = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Container5 = styled.div`
  @media screen and (max-width: 425px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Img0 = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 10px #ccc;
`;

const Input0 = styled.input`
  display: none;
`;

const Input1 = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  width: calc(100% - 20px);
  font-size: 1rem;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media screen and (max-width: 768px) {
    width: calc(100% - 30px);
  }
`;

const Input2 = styled.textarea`
  width: 95%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  resize: none;
  font-size: 1rem;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

const Button0 = styled.div`
  background-color: ${props => props.color.color1.colorCode};
  border: 2px solid transparent;
  border-radius: 10px;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 18px;
  align-self: flex-start;
  :hover{
    border: 2px solid black;
  }
`;

const Label0 = styled.label`
  background-color: ${props => props.color.color1.colorCode};
  border-radius: 10px;
  padding: 8px 18px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80px;
  :hover{
    outline: 2px solid black;
  }
  @media screen and (max-width: 425px) {
    margin-bottom: 0px;
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
    Input0,
    Input1,
    Input2,
    Button0,
    Label0
}