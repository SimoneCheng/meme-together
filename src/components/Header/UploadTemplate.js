import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setIsUploadTemplateDisplayed } from '../../redux/actions';
import color from '../Styled/colorTheme';
import {
  Container0,
  Container1,
  CloseButton,
} from '../Styled/Popup';

function UploadTemplate() {
    const dispatch = useDispatch();
    
    const clickCloseButton = () => {
        dispatch(setIsUploadTemplateDisplayed(false));
      }

    return (
        <Container0>
          <Container1>
            <CloseButton onClick={() => clickCloseButton()}></CloseButton>
            <input type="file" accept="image/*"></input>
          </Container1>
        </Container0>
      )

}

export default UploadTemplate;