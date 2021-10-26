import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container0 = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img0 = styled.img`
  width: 200px;
`;

function Setting() {
    return (
        <Container0>
            <Container1>
                <a href="#self-info">修改個人資料</a>
                <a href="#password">修改密碼</a>
                <a href="#privacy">隱私設定</a>
                <a href="#account">刪除帳戶</a>
            </Container1>
            <div>
                <div id="self-info">
                    <h1>修改個人資料</h1>
                    <hr></hr>
                    <div>
                        <h2>修改頭像</h2>
                        <Img0 alt="profile-img" src="https://teameowdev.files.wordpress.com/2016/04/teameow-e9a090e8a8ade9a0ade8b2bc.jpg"></Img0>
                        <button>上傳新頭像</button>
                    </div>
                    <div>
                        <h2>修改個人簡介</h2>
                        <span>個人簡介</span>
                        <textarea rows="5" cols="33" />
                        <button>儲存</button>
                    </div>
                </div>
                <div id="password">
                    <h1>修改密碼</h1>
                    <hr></hr>
                    <p>舊密碼</p>
                    <input type="password" />
                    <p>新密碼</p>
                    <input type="password" />
                    <p>請再輸入一次新密碼</p>
                    <input type="password" />
                    <br></br>
                    <button>送出</button>
                </div>
                <div id="privacy">
                    <h1>隱私設定</h1>
                    <hr></hr>
                    <p>個人公開頁面瀏覽權限設定</p>
                    <div>
                        <input type="radio" id="personal" name="privacy" value="personal-only" />
                        <label for="personal">僅限本人</label>
                        <input type="radio" id="friends" name="privacy" value="friends-only" />
                        <label for="friends">追蹤你的粉絲</label>
                        <input type="radio" id="public" name="privacy" value="public" />
                        <label for="public">所有人</label>
                    </div>
                </div>
                <div id="account">
                    <h1>刪除帳戶</h1>
                    <hr></hr>
                    <button>刪除帳戶</button>
                </div>
            </div>
        </Container0>
    )
}

export default Setting;