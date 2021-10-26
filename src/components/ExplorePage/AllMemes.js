import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container0 = styled.div`
  padding-top: 100px;
`;

function AllMemes() {
    return (
        <Container0>
            <div>
                <label for="site-search">Search the site:</label>
                <input type="search" id="site-search" name="q" aria-label="Search through site content" />
                <button>Search</button>
            </div>
            <select>
                <option>選擇排序</option>
                <option>由新到舊</option>
                <option>由舊到新</option>
            </select>
        </Container0>
    )
}

export default AllMemes;