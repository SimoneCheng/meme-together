import styled from "styled-components";

const Img0 = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 10px #ccc;
  @media screen and (max-width: 680px) {
    margin-bottom: 20px;
  }
`;

const Container0 = styled.div`
  padding-top: 100px;
  min-height: calc(100vh - 100px);
  background-color: #ffc349;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  width: 830px;
  margin-bottom: 20px;
  @media screen and (max-width: 970px) {
    width: calc(100% - 140px);
  }
  @media screen and (max-width: 680px) {
    flex-direction: column;
  }
`;

const Container2 = styled.div`
display: flex;
flex-direction: column;
`;

const Container3 = styled.div`
  cursor: pointer;
  border-bottom: ${props => props.status === 'editing' ? "4px solid #056" : "4px solid transparent"};
  font-weight: ${props => props.status === 'editing' ? "bold" : "normal"};
  transition: border-width 0.3s linear;
  @media screen and (max-width: 680px) {
    margin-bottom: 10px;
  }
`;

const Container4 = styled.div`
  cursor: pointer;
  border-bottom: ${props => props.status === 'nopublic' ? "4px solid #056" : "4px solid transparent"};
  font-weight: ${props => props.status === 'nopublic' ? "bold" : "normal"};
  transition: border-width 0.3s linear;
  @media screen and (max-width: 680px) {
    margin-bottom: 10px;
  }
`;

const Container5 = styled.div`
  cursor: pointer;
  border-bottom: ${props => props.status === 'ispublic' ? "4px solid #056" : "4px solid transparent"};
  font-weight: ${props => props.status === 'ispublic' ? "bold" : "normal"};
  transition: border-width 0.3s linear;
  @media screen and (max-width: 680px) {
    margin-bottom: 10px;
  }
`;

const Container6 = styled.div`
  cursor: pointer;
  border-bottom: ${props => props.status === 'favorites' ? "4px solid #056" : "4px solid transparent"};
  font-weight: ${props => props.status === 'favorites' ? "bold" : "normal"};
  transition: border-width 0.3s linear;
`;

const Container7 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
  width: 750px;
  margin-bottom: 20px;
  height: 30px;
  @media screen and (max-width: 970px) {
    width: calc(100% - 140px);
  }
  @media screen and (max-width: 680px) {
    flex-direction: column;
    height: 100%;
    align-items: flex-start;
    padding: 20px 0 0 0;
  }
  @media screen and (max-width: 425px) {
    font-size: 14px;
  }
`;

const Container8 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  margin-bottom: 30px;
  @media screen and (max-width: 970px) {
    width: calc(100% - 100px);
  }
`;

const Container9 = styled.div`
  padding-bottom: 0px;
  @media screen and (max-width: 680px) {
    padding-bottom: 20px;
  }
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

export {
    Img0,
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
    Button0
}