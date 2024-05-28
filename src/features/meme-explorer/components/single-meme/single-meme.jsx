import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// apis
import { getSingleMeme } from "../../api";
import { getUserInfo } from "@/features/user/api";
// components
import Comments from "./comments";
import AddToFavoriteIconButton from "./add-to-favorite-icon-button";
import { LoadingWithWholePage } from "@/components/loading";
// styles
import {
  StyledWrapper,
  StyledImg,
  StyledSection,
  StyledSectionsWrapper,
  StyledContext,
  StyledTag,
  StyledContextBottomWrapper
} from "./single-meme.style";

const SingleMeme = () => {
  const { id } = useParams();
  const [singleMeme, setSingleMeme] = useState({
    click_time: 0,
    context: '',
    created_time: '',
    img_name: '',
    img_url: '',
    isPublic: true,
    last_save_time: '',
    owner_user_id: '',
    search_array_term: [],
    tags: [],
    title: ''
  });
  const [authInfo, setAuthorInfo] = useState({
    created_time: '',
    self_intro: '',
    user_email: '',
    user_id: '',
    user_img: '',
    user_name: '',
  });

  useEffect(() => {
    getSingleMeme({
      id,
      callback: setSingleMeme
    });
  }, [id]);

  useEffect(() => {
    if (!singleMeme.owner_user_id) {
      return;
    }
    const unsubscribe = getUserInfo({
      id: singleMeme.owner_user_id,
      callback: setAuthorInfo
    });
    return unsubscribe;
  }, [singleMeme.owner_user_id]);

  if (!singleMeme.img_url || !authInfo.user_name) {
    return (
      <LoadingWithWholePage
        type="spinningBubbles"
        color="#fff"
        width={50}
        height={50}
      />
    );
  }

  return (
    <StyledWrapper>
      <div>
        <StyledImg alt={singleMeme.img_name} src={singleMeme.img_url} />
      </div>
      <StyledSectionsWrapper>
        <StyledSection>
          <p>
            <strong>標題：</strong>
            {singleMeme.title}
          </p>
          <Link to={`/public/${singleMeme.owner_user_id}`}>
            <strong>作者：</strong>
            {authInfo.user_name}
          </Link>
          <p>
            <strong>發布日期：</strong>
            {new Date(singleMeme.last_save_time.toDate()).toLocaleString()}
          </p>
          <hr />
          <StyledContext>
            {singleMeme.context}
          </StyledContext>
          {singleMeme.tags.map((item, index) => (
            <StyledTag key={index}>
              #{item}
            </StyledTag>
          ))}
          <StyledContextBottomWrapper>
            <p>
              <strong>瀏覽次數：</strong>
              {singleMeme.click_time}
            </p>
            <AddToFavoriteIconButton
              img_name={singleMeme.img_name}
              img_url={singleMeme.img_url}
              owner_user_id={singleMeme.owner_user_id}
            />
          </StyledContextBottomWrapper>
        </StyledSection>
        <Comments />
      </StyledSectionsWrapper>
    </StyledWrapper>
  );
};

export default SingleMeme;
