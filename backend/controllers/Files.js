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
  console.log(req.file)
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
    console.log(`File uploaded: ${response.data.name} (${response.data.id})`);
    return res.status(200).send(response.data.id);
   
  } catch (error) {
    return res.status(404).send({msg: 'Error'});
  }
};

export const GetFile = async (req, res) => {
  const { file_id } = req.body;

  drive.files.get(
    {
      fileId: '1txQs4KDpTWtBHuCKhrTK9SyVKGFFKcwu',
      alt: 'media',
    },
    { responseType: 'arraybuffer' },
    (err, response) => {
      if (err) return console.error('The API returned an error:', err.message);

      const fileData = Buffer.from(response.data, 'binary');
      const mimeType = response.headers['content-type'];
      const fileName = response.headers['content-disposition'].match(/filename="(.+)"/);

      res.set({
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': response.headers['content-length'],
      });
      return res.status(200).send(fileData);
    }
  );
};
