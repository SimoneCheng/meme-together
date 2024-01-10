import { storageRef, db } from "@/libs/firebase";

export const uploadTemplate = ({ userId, file }) => {
  return storageRef
    .child(`templates/${userId}-${new Date().getTime()}`)
    .put(file)
    .then((snapShot) => {
      return snapShot.ref.name;
    })
};

export const getTemplateURL = (fileName) => {
  return storageRef
    .child(`templates/${fileName}`)
    .getDownloadURL();
};

export const saveNewTemplate = ({ id, data }) => {
  return db
    .collection('templates')
    .doc(id)
    .set(data);
};
