import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import color from '../Styled/colorTheme';
import { 
  Container0,
  Container1, 
  Container2,
  Container3,
  Container6,
  Img0,
  Button0 
} from '../Styled/PersonalPage/Common';
import { deletFromFavorite } from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';

function AllFavorite(props) {
    const allFavorite = props.allFavorite;
    const userData = useSelector((state) => state.userData);

    const renderFavorite = (item) => {
        const { img_url, img_name, created_time } = item;

        return (
            <Container1 key={img_name}>
                <Link to={`/meme/${img_name}`}><Img0 src={img_url} alt={img_name}></Img0></Link>
                <Container2>
                    <Container3><strong>建立時間：</strong></Container3>
                    <Container3>{new Date(created_time.toDate()).toLocaleString()}</Container3>
                    <Button0 color={color} onClick={() => deletFromFavorite(userData.user_id, img_name).then(() => alertSuccess('已取消收藏'))}>移除收藏</Button0>
                </Container2>
            </Container1>
        );
    }

    const renderAllFavorite = () => {
        return (
            <Container0>
                {allFavorite.map((item) => renderFavorite(item))}
            </Container0>
        )
    }

    const renderNone = () => {
        return (
            <Container6>
                空空的喔～
            </Container6>
        );
    }

    return (
        <>
            {allFavorite.length > 0 ? renderAllFavorite() : renderNone()}
        </>
    )
}

export default AllFavorite;