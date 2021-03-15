import { deleteFile } from '../../libs/fileManagement';

// TODO: Permisos. Solo para usuarios logueados

const handler = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const deleted = await deleteFile(imageUrl);
    if (deleted) res.status(200).json({ status: 'OK' });
    else throw new Error('Error');
  } catch (err) {
    console.log(err);
  }
};

export default handler;
