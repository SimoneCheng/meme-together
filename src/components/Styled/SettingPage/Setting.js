import styled from "styled-components";

const Container0 = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #D0D0D0;
  overflow: hidden;
  width: 200px;
  @media screen and (max-width: 768px) {
    width: calc(100% - 100px);
  }
`;

const Container2 = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  width: 800px;
  @media screen and (max-width: 800px) {   
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Container3 = styled.div`
  padding: 10px;
`;

const Container4 = styled.div`
  border-top: 1px solid #D0D0D0;
  padding: 10px;
  border-left: ${props => props.status === 'userinfo' ? '4px solid #ffc349' : '4px solid transparent'};
  cursor: pointer;
  &:hover{
      background-color: #F0F0F0;
  }
`;

const Container5 = styled.div`
  border-top: 1px solid #D0D0D0;
  padding: 10px;
  border-left: ${props => props.status === 'password' ? '4px solid #ffc349' : '4px solid transparent'};
  cursor: pointer;
  &:hover{
      background-color: #F0F0F0;
  }
`;

const Container6 = styled.div`
  border-top: 1px solid #D0D0D0;
  padding: 10px;
  border-left: ${props => props.status === 'deleteaccount' ? '4px solid #ffc349' : '4px solid transparent'};
  cursor: pointer;
  &:hover{
      background-color: #F0F0F0;
  }
`;

export {
    Container0,
    Container1,
    Container2,
    Container3,
    Container4,
    Container5,
    Container6
}