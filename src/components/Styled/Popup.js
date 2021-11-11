import styled from 'styled-components';

const Container0 = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container1 = styled.div`
  background-color: white;
  padding: 60px 30px 10px 30px;
  border-radius: 10px;
  position: relative;
`;

const Input1 = styled.input`
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

const Input2 = styled.textarea`
  width: 95%;
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  resize: none;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

const LoginButton = styled.button`
  background-color: ${props => props.color.color1.colorCode};
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 5px;
  cursor: pointer;
  padding: 6px 10px;
  width: 100%;
  margin-bottom: 20px;
  :hover{
    outline: 2px solid black;
  }
`;

const SignupButton = styled.button`
 background-color: ${props => props.color.color1.colorCode};
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 5px;
  cursor: pointer;
  padding: 6px 10px;
  width: 100%;
  margin-bottom: 20px;
  :hover{
    outline: 2px solid black;
  }
`;

const CloseButton = styled.span`
  :hover {
    cursor: pointer;
    :before, :after {
    opacity: 1;
    }
  }
  :before, :after {
    content: '';
    position: absolute;
    height: 3px;
    width: 25px;
    top: 20px;
    right: 10px;
    background: rgb(255, 0, 0);
    opacity: 0.3;
  }
  :before {
    --webkit-transform: rotate(45deg);
    --moz-transform: rotate(45deg);
    --ms-transform: rotate(45deg);
    --o-transform: rotate(45deg);
    transform: rotate(45deg);;
  }
  :after {
    --webkit-transform: rotate(-45deg);
    --moz-transform: rotate(-45deg);
    --ms-transform: rotate(-45deg);
    --o-transform: rotate(-45deg);
    transform: rotate(-45deg);;
  }
`;

export {
    Container0,
    Container1,
    Input1,
    Input2,
    LoginButton,
    SignupButton,
    CloseButton,
}