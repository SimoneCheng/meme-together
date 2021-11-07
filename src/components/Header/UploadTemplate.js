import React, { useRef } from 'react';

import color from '../Styled/colorTheme';
import {
  Container0,
  Container1,
  CloseButton,
} from '../Styled/Popup';

function UploadTemplate() {
    return (
        <Container0>
          <Container1>
            <CloseButton></CloseButton>
            <input type="file" accept="image/*"></input>
          </Container1>
        </Container0>
      )

}

export default UploadTemplate;