import styled from 'styled-components';

export const StyledWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledUploadTemplateWrapper = styled.div`
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

export const StyledUploadTemplateLabel = styled.label`
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

export const StyledInput = styled.input`
  visibility: hidden;
`;

export const StyledButtonGroup = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const StyledImg = styled.img`
  width: 600px;
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

export const StyledProgressbar = styled.div`
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

export const StyledUl = styled.ul`
  counter-reset: step;
`;

export const StyledLi = styled.li`
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
