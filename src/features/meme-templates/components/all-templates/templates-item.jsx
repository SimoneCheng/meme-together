import {
  StyledTemplatesItemLink,
  StyledTemplateItemImg
} from './all-templates.style';

const TemplatesItem = (props) => {
  const { image_url, image_id } = props;

  return (
    <StyledTemplatesItemLink to={`templates/${image_id}`}>
      <StyledTemplateItemImg
        src={image_url}
        alt={image_id}
      />
    </StyledTemplatesItemLink>
  );
};

export default TemplatesItem;
