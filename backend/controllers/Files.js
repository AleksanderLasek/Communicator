import  credentials  from '../models/credentials.json' assert { type: "json" };
import { google } from 'googleapis';
import fs from 'fs'


const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/drive']
);
const drive = google.drive({ version: 'v3', auth: client });

export const uploadFile = async (req, res) => {
  const { file } = req;
  try {
    const response = await drive.files.create({
      requestBody: {
        name: file.originalname,
        mimeType: file.mimetype,
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
    });
    return res.status(200).send(response.data.id);
   
  } catch (error) {
    return res.status(404).send({msg: 'Error'});
  }
};

export const GetFile = async (req, res) => {
  const { file_id } = req.body;
  drive.files.get(
    {
      fileId: file_id,
      alt: 'media',
    },
    { responseType: 'arraybuffer' },
    (err, response) => {
      if (err) return console.error('The API returned an error:', err.message);

      const fileData = Buffer.from(response.data, 'binary');
      const contentType = response.headers['content-type'];
      
      return res.status(200).contentType(contentType).send(fileData);
    }
  );
};
