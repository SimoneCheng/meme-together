import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import styled from 'styled-components';

import { addToFavorite, checkFavoriteList, deletFromFavorite } from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';

function AddToFavorite(props) {
    const theMemeImage = props.theMemeImage;
    const { img_url, img_name, owner_user_id } = theMemeImage;
    const userData = useSelector((state) => state.userData);
    const [isInFavorite, setIsInFavorite] = useState([]);

    useEffect(() => {
        if (userData != null && Object.keys(userData).length > 0) {
            checkFavoriteList(userData.user_id, img_name, setIsInFavorite);
        }
    }, [userData])

    const addTheMemeToFavorite = () => {
        const data = { img_url, img_name, created_time: new Date(), owner_user_id }
        addToFavorite(userData.user_id, img_name, data).then(() => alertSuccess('收藏成功！'));
    }

    const renderFavoriteBtn = () => {
        if (userData !== null
            && Object.keys(userData).length > 0
            && owner_user_id !== userData.user_id
            && isInFavorite.length === 0) {
            return (<MdFavoriteBorder onClick={() => addTheMemeToFavorite()} style={{ 'fontSize': '2rem', 'cursor': 'pointer' }} />);
        }
        if (userData !== null
            && Object.keys(userData).length > 0
            && owner_user_id !== userData.user_id
            && isInFavorite.length !== 0) {
            return (
                <MdFavorite onClick={() => deletFromFavorite(userData.user_id, img_name).then(() => { alertSuccess('已取消收藏！') })} style={{ 'color': '#EA0000', 'fontSize': '2rem', 'cursor': 'pointer' }} />
            );
        }
    }
    return (
        <>
            {renderFavoriteBtn()}
        </>
    )
}

export default AddToFavorite;