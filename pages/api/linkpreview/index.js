import { getLinkPreview } from 'link-preview-js';

const getPreviewData = async (url) => {
  try {
    const data = await getLinkPreview(url);
    let [img] = data.images;

    if (!img && data.favicons.length > 0) {
      [img] = await Promise.all(
        data.favicons.map(
          (favicon) =>
            new Promise((resolve) =>
              getLinkPreview(favicon).then((favIconData) => {
                if (
                  ['image/png', 'image/jpeg', 'image/jpg'].some(
                    (extension) => favIconData.contentType === extension
                  )
                ) {
                  resolve({ favicon, isImage: true });
                } else {
                  resolve({ favicon, isImage: false });
                }
              })
            )
        )
      ).then((responses) =>
        responses
          .filter((resp) => resp.isImage)
          .slice(0, 1)
          .map((obj) => obj.favicon)
      );
    }

    const resultObj = {
      title: data.title,
      description: data.description,
      img,
    };

    return resultObj;
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
      ...(data.title && { title: data.title.slice(0, 35) }),
      ...(data.description && { description: data.description.slice(0, 150) }),
    };

    res.status(200).json({ data: compactedData });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
