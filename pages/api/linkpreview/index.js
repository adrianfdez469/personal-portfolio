import linkPreviewGenerator from 'link-preview-generator';

const getPreviewData = async (url) => {
  try {
    const data = await linkPreviewGenerator(url);
    return data;
  } catch (error) {
    error.message = 'Error while getting the preview data';
    throw error;
  }
};

export default async (req, res) => {
  const { url } = JSON.parse(req.body);

  try {
    const data = await getPreviewData(url);
    const compactedData = {
      ...data,
      title: data.title.slice(0, 35),
      description: data.description.slice(0, 150),
    };

    res.status(200).json({ data: compactedData });
  } catch (error) {
    res.status(200).json({ error: true });
  }
};
