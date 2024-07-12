import { useHistory } from 'react-router-dom';
import { countClickTime } from '../../api';
import { StyledPublicMemeWrapper, StyledPublicMemeImg } from './all-public-memes.style';

const PublicMemeItem = (props) => {
  const { img_url, img_name } = props;
  const history = useHistory();

  const handleClick = () => {
    countClickTime(img_name);
    history.push(`/meme/${img_name}`);
  };

  return (
    <StyledPublicMemeWrapper onClick={handleClick}>
      <StyledPublicMemeImg src={img_url} alt={img_name} />
    </StyledPublicMemeWrapper>
  );
};

export default PublicMemeItem;
