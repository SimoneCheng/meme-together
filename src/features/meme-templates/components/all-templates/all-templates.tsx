import { useEffect, useState } from 'react';
import { getAllTemplates, getAllTemplatesNextPage } from '../../api';
import TemplatesItem from './templates-item';
import { Button } from '@/components/button';
import { Loading } from '@/components/loading';
import {
  StyledAllTemplatesWrapper,
  StyledLoadingWrapper,
} from './all-templates.style';

const AllTemplates = () => {
  const [allTemplates, setAllTemplates] = useState([]);
  const [lastKey, setLastKey] = useState<unknown>();

  useEffect(() => {
    getAllTemplates()
      .then((res) => {
        setAllTemplates(res.allTemplatesData);
        setLastKey(res.lastKey);
      });
  }, []);

  if (allTemplates.length === 0) {
    return (
      <StyledLoadingWrapper>
        <Loading
          type="spinningBubbles"
          color="#056"
          width={50}
          height={50}
        />
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
        <Button
          colorScheme="navyBlue"
          variant="solid"
          onClick={getMoreTemplates}
        >
          載入更多
        </Button>
      ) : (
        <div>沒有囉！</div>
      )}
    </>
  );
};

export default AllTemplates;
