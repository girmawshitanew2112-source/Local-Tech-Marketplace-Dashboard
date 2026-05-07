import fs from 'fs';
import path from 'path';
import multer from 'multer';

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});

const fileFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  cb(null, allowed.includes(file.mimetype));
};

export const uploadProductImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }
}).single('image');

export const publicUploadPath = (file) => file ? `/${path.join(uploadDir, file.filename).replace(/\\/g, '/')}` : undefined;
