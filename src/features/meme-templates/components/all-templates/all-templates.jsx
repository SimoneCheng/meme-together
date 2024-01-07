import { useEffect, useState } from 'react';
import { getAllTemplates, getAllTemplatesNextPage } from '../../api';
import TemplatesItem from './templates-item';
import { loading } from '@/utlis/loading';
import {
  StyledAllTemplatesWrapper,
  StyledLoadingWrapper,
  StyledButton
} from './all-templates.style';

const AllTemplates = () => {
  const [allTemplates, setAllTemplates] = useState([]);
  const [lastKey, setLastKey] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    getAllTemplates()
      .then((res) => {
        setAllTemplates(res.allTemplatesData);
        setLastKey(res.lastKey);
      });
  }, [])

  if (allTemplates.length === 0) {
    return (
      <StyledLoadingWrapper>
        {loading('spinningBubbles', '#056', 50, 50)}
      </StyledLoadingWrapper>
    );
  }

  const getMoreTemplates = () => {
    if (!lastKey) return;
    getAllTemplatesNextPage(lastKey)
      .then((res) => {
        const {
          allTemplatesData,
          lastKey
        } = res;
        setAllTemplates(allTemplates.concat(allTemplatesData));
        setLastKey(lastKey);
      });
  };

  return (
    <>
      <StyledAllTemplatesWrapper>
        {allTemplates.map((item, index) => <TemplatesItem key={index} {...item} />)}
      </StyledAllTemplatesWrapper>
      {lastKey ? (
        <StyledButton type="button" onClick={getMoreTemplates}>
          載入更多
        </StyledButton>
      ) : (
        <div>沒有囉！</div>
      )}
    </>
  );
};

export default AllTemplates;
