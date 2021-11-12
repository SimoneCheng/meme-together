import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import color from '../Styled/colorTheme';
import { deletFromFavorite } from '../../utlis/firebase';

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 0 30px 30px 30px;
`;

const Container2 = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  width: 250px;
  overflow: hidden;
  width: 250px;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s linear;
  &:hover{
    box-shadow: 2px 2px 15px grey;
    bottom: 10px;
  }
`;

const Container3 = styled.div`
 padding: 0 20px 20px 20px;
`;

const Container4 = styled.div`
 margin-top: 5px;
`;

const Container5 = styled.div`
  width: 810px;
  text-align: center;
  padding: 30px;
  font-size: 2rem;
`;

const Img0 = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Button = styled.button`
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

function AllFavorite(props) {
    const allFavorite = props.allFavorite;
    const userData = useSelector((state) => state.userData);

    const renderFavorite = (item) => {
        const { img_url, img_name, created_time } = item;

        return (
            <Container2 key={img_name}>
                <Link to={`/meme/${img_name}`}><Img0 src={img_url} alt={img_name}></Img0></Link>
                <Container3>
                    <Container4><strong>建立時間：</strong></Container4>
                    <Container4>{new Date(created_time.toDate()).toLocaleString()}</Container4>
                    <Button color={color} onClick={() => deletFromFavorite(userData.user_id, img_name)}>移除收藏</Button>
                </Container3>
            </Container2>
        );
    }

    const renderAllFavorite = () => {
        return (
            <Container1>
                {allFavorite.map((item) => renderFavorite(item))}
            </Container1>
        )
    }

    const renderNone = () => {
        return (
            <Container5>
                空空的喔～
            </Container5>
        );
    }

    return (
        <div>
            {allFavorite.length > 0 ? renderAllFavorite() : renderNone()}
        </div>
    )
}

export default AllFavorite;