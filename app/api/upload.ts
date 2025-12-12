// pages/api/upload.ts
import { S3 } from 'aws-sdk';
import formidable from 'formidable';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

const s3 = new S3();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadFile = async (file: formidable.File) => {
  const fileContent = fs.readFileSync(file.filepath );
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || '',
    Key: file.originalFilename || '',
    Body: fileContent,
    ContentType: file.mimetype || undefined,
  };

  const { Location } = await s3.upload(params).promise();
  return Location; // Retorna a URL do arquivo armazenado
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();

interface FormidableFields {
    [key: string]: string | string[] | undefined;
}

interface FormidableFiles {
    [key: string]: formidable.File | formidable.File[] | undefined;
}

form.parse(req, async (err: Error, fields: FormidableFields, files: FormidableFiles) => {
    if (err) {
        return res.status(500).json({ error: 'Erro ao fazer upload do arquivo' });
    }

    const file = (files.file as formidable.File[])[0];
    const fileUrl = await uploadFile(file);
    return res.status(200).json({ url: fileUrl });
});
};

export default handler;