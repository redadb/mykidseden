import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import cloudinary from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable();
    
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const uploadedFile = files.file;
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'team-roadmap/products', // Organize uploads in a folder
      resource_type: 'auto', // Automatically detect file type
    });

    return res.status(200).json({ 
      url: result.secure_url,
      public_id: result.public_id 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
} 