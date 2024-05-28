import { useState } from "react";
import { useAuthId } from "@/features/auth";
import {
  uploadCompletedMeme,
  getCompletedMemeImageUrl,
  saveCompletedMeme
} from "../../api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogFooterCloseButton
} from "@/components/dialog";
import {
  FormControl,
  FormLabel
} from "@/components/form-control";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { StyledTextarea } from "./meme-publish-info-form-dialog.style";
import {
  alertWarning,
  alertSuccess
} from "@/utlis/alert";

const buildSearchTerms = ({ title, tagsArr, canvas }) => {
  const searchArrayTerms = [];
  for (let i = 1; i <= title.length; i++) {
    const term = title.substring(0, i);
    searchArrayTerms.push(term);
  }
  canvas.getObjects().forEach((item) => {
    if (item.type === "i-text") {
      searchArrayTerms.push(item.text);
    };
  });
  if (tagsArr[0] !== "") {
    searchArrayTerms.concat(tagsArr);
  };
  return searchArrayTerms;
};

const MemePublishInfoFormDialog = ({
  isOpen,
  onClose,
  canvas
}) => {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const [authId] = useAuthId();

  const handleSubmit = async () => {
    if (!title) {
      return alertWarning(undefined, '請填寫標題！');
    }
    const canvasDataUrl = canvas.toDataURL();
    const imgId = await uploadCompletedMeme({ id: authId, file: canvasDataUrl });
    const imgUrl = await getCompletedMemeImageUrl(imgId);
    const tagsArr = tags.split(' ');
    const searchArrayTerms = buildSearchTerms({ title, tagsArr, canvas });
    await saveCompletedMeme({
      id: imgId,
      data: {
        title,
        context,
        img_name: imgId,
        img_url: imgUrl,
        owner_user_id: authId,
        tags: tagsArr,
        isPublic: isPublic,
        created_time: new Date(),
        last_save_time: new Date(),
        click_time: 0,
        search_array_term: searchArrayTerms
      }
    });
    alertSuccess('成功發布！');
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          完成並發布圖片
        </DialogHeader>
        <DialogBody style={{ width: '450px' }}>
          <FormControl>
            <FormLabel>
              為你的迷因加個標題（必填）
            </FormLabel>
            <Input
              variant="outline"
              type="text"
              placeholder="輸入標題..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              發發廢文（非必填）
            </FormLabel>
            <StyledTextarea
              cols="20"
              rows="6"
              placeholder="輸入文字..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              加 tags？（非必填）
            </FormLabel>
            <StyledTextarea
              placeholder="例如：貓咪 厭世，請以半形空格分隔"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              是否公開發佈？（之後可至個人管理頁面修改）
            </FormLabel>
            <div style={{ 'marginTop': '10px' }}>
              <input
                type="radio"
                id="true"
                name="privacy"
                value="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.value === 'isPublic')}
              />
              <label htmlFor="true">
                是
              </label>
              <input
                type="radio"
                id="false"
                name="privacy"
                value="notPublic"
                checked={!isPublic}
                onChange={(e) => setIsPublic(e.target.value !== 'notPublic')}
              />
              <label htmlFor="false">
                否
              </label>
            </div>
          </FormControl>
        </DialogBody>
        <DialogFooter>
          <DialogFooterCloseButton>
            取消
          </DialogFooterCloseButton>
          <Button
            colorScheme="yellow"
            type="button"
            onClick={handleSubmit}
          >
            送出
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MemePublishInfoFormDialog;
