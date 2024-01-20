import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Compressor from 'compressorjs';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import {
  uploadTemplate,
  getTemplateURL,
  saveNewTemplate
} from '../../api';
import { Button } from '@/components/button';
import { alertError, alertSuccess } from '@/utlis/alert';
import {
  StyledWrapper,
  StyledUploadTemplateWrapper,
  StyledUploadTemplateLabel,
  StyledInput,
  StyledButtonGroup,
  StyledImg,
  StyledProgressbar,
  StyledUl,
  StyledLi
} from './template-uploading.style';

const UploadTemplateInput = ({ onChange }) => {
  return (
    <StyledUploadTemplateWrapper>
      <StyledUploadTemplateLabel htmlFor="uploadimage">
        <MdOutlineAddPhotoAlternate
          style={{
            'fontSize': '6rem',
            'marginBottom': '20px'
          }}
        />
        上傳一張圖片
      </StyledUploadTemplateLabel>
      <StyledInput
        id="uploadimage"
        type="file"
        accept=".jpg, .png"
        onChange={onChange}
      />
    </StyledUploadTemplateWrapper>
  );
};

const TemplateUploading = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const compressedFile = useRef(null);
  const userData = useSelector((state) => state.userData);

  const clickUploadTemplate = (e) => {
    const file = e.target.files[0];
    const isCorrectFormat = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isCorrectFormat) {
      alertError(undefined, '請上傳圖片（支援jpg、png檔）！');
    }
    const src = window.URL.createObjectURL(file);
    new Compressor(file, {
      quality: 1,
      width: 600,
      success: (compressedResult) => {
        compressedFile.current = compressedResult;
        setImagePreview(src);
      },
    });
  };

  const clickDonateTemplate = async () => {
    try {
      const templateId = await uploadTemplate({
        userId: userData.user_id,
        file: compressedFile.current
      });
      const url = await getTemplateURL(templateId);
      const data = {
        image_id: templateId,
        image_url: url,
        created_time: new Date(),
        creator: userData.user_id
      };
      saveNewTemplate({
        id: templateId,
        data
      });
      alertSuccess('成功發布新模板！點擊左上角「創作」選擇新模板！');
      compressedFile.current = null;
      setImagePreview(null);
    } catch (_) {
      alertError(undefined, '圖片上傳失敗，請再試一次');
    }
  };

  const handleCleanImagePreview = () => {
    setImagePreview(null);
    compressedFile.current = null;
  }

  return (
    <StyledWrapper>
      <StyledProgressbar>
        <StyledUl>
          <StyledLi imagePreview={imagePreview}>
            選擇圖片（jpg或png）
          </StyledLi>
          <StyledLi imagePreview={imagePreview}>
            預覽圖片然後上傳新模板
          </StyledLi>
        </StyledUl>
      </StyledProgressbar>
      <div>
        {imagePreview ? (
          <div>
            <div>
              <StyledImg
                alt="image-preview"
                src={imagePreview}
              />
            </div>
            <StyledButtonGroup>
              <Button
                colorScheme="navyBlue"
                variant="outline"
                onClick={handleCleanImagePreview}
              >
                上一步
              </Button>
              <Button
                colorScheme="navyBlue"
                variant="solid"
                onClick={clickDonateTemplate}
              >
                上傳模板
              </Button>
            </StyledButtonGroup>
          </div>
        ) : (
          <UploadTemplateInput onChange={clickUploadTemplate} />
        )}
      </div>
    </StyledWrapper>
  )
};

export default TemplateUploading;
