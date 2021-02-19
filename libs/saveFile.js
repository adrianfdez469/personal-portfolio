const saveLocalFile = async (file) => {
  // TODO: NOT IMPLEMENTED
};

const uploadFileToCloud = async (file) => {
  // TODO: NOT IMPLEMENTED
  //
};

const saveFile = async (file) => {
  if (process.env.NODE_ENV === 'develoment') {
    const imageUrl = await saveLocalFile(file);
    return imageUrl;
  }
  const imageUrl = await uploadFileToCloud(file);
  return imageUrl;
};

export default saveFile;
