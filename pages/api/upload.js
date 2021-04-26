import nextConnect from 'next-connect';
import multer from 'multer';
import { saveFile } from '../../libs/fileManagement';

// TODO: Permisos. Solo para usuarios logueados

const storage =
  process.env.NODE_ENV === 'development'
    ? multer.diskStorage({
        destination: './public/uploads',
        filename: async (req, file, cb) => {
          cb(null, file.originalname);
        },
      })
    : multer.memoryStorage();

const upload = multer({
  storage,
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('imageFile'));

apiRoute.post(async (req, res) => {
  const { file } = req;
  const url = await saveFile(file);
  res.status(200).json({ url });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
