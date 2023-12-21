import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// api
import { getHotMemes, countClickTime } from "../../api";
// styles
import color from "@/components/Styled/colorTheme";
import {
  StyledHotMemesDiv,
  HotMemesTitle,
  AllHotMemesImg,
  LinkToMoreMemes,
  EachMemeLink,
  EachMemeImg
} from "./hot-memes.style";

function HotMemes() {
  const [hotMemes, setHotMemes] = useState([]);

  useEffect(() => {
    getHotMemes().then((response) => setHotMemes(response));
  }, []);

  return (
    <div style={{ 'width': '100%', 'backgroundColor': '#056' }}>
      <StyledHotMemesDiv color={color}>
        <HotMemesTitle>
          熱門創作
        </HotMemesTitle>
        <AllHotMemesImg>
          {hotMemes.length > 0 && (
            hotMemes.map((item) => {
              const { img_url, img_name } = item;
              return (
                <EachMemeLink
                  key={img_name}
                  to={`/meme/${img_name}`}
                  onClick={() => countClickTime(img_name)}
                >
                  <EachMemeImg src={img_url} alt={img_name} />
                </EachMemeLink>
              );
            })
          )}
        </AllHotMemesImg>
        <Link to="/explore-memes">
          <LinkToMoreMemes>
            查看更多
          </LinkToMoreMemes>
        </Link>
      </StyledHotMemesDiv>
    </div>
  );
}

export default HotMemes;
