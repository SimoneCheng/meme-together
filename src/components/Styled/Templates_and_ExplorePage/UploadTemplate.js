import styled from "styled-components";

const Container0 = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container1 = styled.div`
  width: 600px;
  z-index: 1;
  margin-bottom: 50px;
  @media screen and (max-width: 768px) {
    width: 500px;
  }
  @media screen and (max-width: 660px) {
    width: 400px;
  }
  @media screen and (max-width: 550px) {
    width: 300px;
  }
`;

const Container2 = styled.div`
  width: 600px;
  height: 300px;
  border: 5px solid #ccc;
  border-style: dashed;
  border-radius: 10px;
  background-color: rgb(0, 0, 0, 0.03);
  color: #ccc;
  &:hover{
    border: 5px solid #056;
    border-style: dashed;
  }
  @media screen and (max-width: 768px) {
    width: 500px;
  }
  @media screen and (max-width: 660px) {
    width: 400px;
  }
  @media screen and (max-width: 550px) {
    width: 300px;
  }
`;

const Container3 = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const Input0 = styled.input`
  display: none;
`;

const Label0 = styled.label`
  font-size: 1.5rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Li0 = styled.li`
  list-style: none;
  float: left;
  width: 50%;
  position: relative;
  text-align: center;
  :before {
    content:counter(step);
    counter-increment: step;
    width: 30px;
    height: 30px;
    border: 2px solid #bebebe;
    display: block;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    line-height: 27px;
    background: white;
    color: #bebebe;
    text-align: center;
    font-weight: bold;
  }
  :after {
    content: '';
    position: absolute;
    width:100%;
    height: 2px;
    background: #bebebe;
    top: 15px;
    left: -50%;
    z-index: -1;
  }
  :first-child:after {
    content: none;
  }
  :first-child:before {
    border-color: #056;
    background: #056;
    color: white;
  }
  :nth-child(2):before {
    border-color: ${props => props.imagePreview ? '#056' : '#bebebe'};
    background: ${props => props.imagePreview ? '#056' : 'white'};
    color: ${props => props.imagePreview ? '#fff' : '#bebebe'};
    transition: 0.5s ease;
  }
  :nth-child(2):after {
    background: ${props => props.imagePreview ? '#056' : '#bebebe'};
    transition: 0.5s ease;
  }
  @media screen and (max-width: 660px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 550px) {
    font-size: 0.6rem;
  }
`;

const Img0 = styled.img`
  width: 600px;
`;

const Button0 = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #056;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
`;

const Button1 = styled.button`
  border: 1px #056 solid;
  border-radius: 5px;
  color: #056;
  background-color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  cursor: pointer;
  :hover {
    background-color:#056;
    color: #fff;
  } 
`;

export {
    Container0,
    Container1,
    Container2,
    Container3,
    Input0,
    Label0,
    Li0,
    Img0,
    Button0,
    Button1
}