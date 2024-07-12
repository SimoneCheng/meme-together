import styled from 'styled-components';

export const StyledWrapper = styled.section`
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

export const StyledH1 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 5px solid #056;
  margin-bottom: 20px;
`;

export const StyledH2 = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const StyledProfileImgWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 10px #ccc;
`;

export const StyledLabel = styled.label`
  display: inline-block;
  background-color: #ffc349;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;

  input {
    display: none;
  }
`;

export const StyledTextarea = styled.textarea`
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
