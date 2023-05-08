const credentials = require('../models/credentials.json')
const { google } = require('googleapis')

const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/drive']
);
const drive = google.drive({ version: 'v3', auth: client });

const fs = require('fs');


const fileMetadata = {
    name: 'nazwa_pliku',
    mimeType: 'typ/mime'
  };
  
  const media = {
    mimeType: 'typ/mime',
    body: fs.createReadStream('../models/credentials.json')
  };
  
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: 'id'
    },
    function (err, file) {
      if (err) {
        // obsługa błędu
        console.error(err);
      } else {
        console.log('File Id:', file.data.id);
      }
    }
  );

drive.files.list({
  pageSize: 10,
  fields: 'nextPageToken, files(id, name)',
}, (err, res) => {
  if (err) return console.error('The API returned an error:', err.message);
  const files = res.data.files;
  if (files.length) {
    console.log('Files:');
    files.forEach((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } else {
    console.log('No files found.');
  }
});


const fs = require('fs');
const { google } = require('googleapis');
const credentials = require('../models/credentials.json');

const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/drive']
);

const drive = google.drive({ version: 'v3', auth: client });

// 1. Otwórz plik ze zdjęciem
const file = fs.createReadStream('/path/to/image.jpg');

// 2. Dodaj zdjęcie do Dysku Google
const fileMetadata = {
  name: 'image.jpg',
  parents: ['folder-id'], // opcjonalnie: wskazanie folderu, do którego ma trafić plik
};

const media = {
  mimeType: 'image/jpeg',
  body: file,
};

drive.files.create(
  {
    resource: fileMetadata,
    media: media,
    fields: 'id',
  },
  function (err, file) {
    if (err) {
      console.error(err);
    } else {
      console.log('File Id:', file.data.id);

      // 3. Pobierz zdjęcie z Dysku Google
      drive.files.get(
        {
          fileId: file.data.id,
          alt: 'media',
        },
        { responseType: 'stream' },
        function (err, res) {
          if (err) {
            console.error(err);
          } else {
            // 4. Wyświetl zdjęcie na stronie
            res.data.pipe(fs.createWriteStream('/path/to/downloaded/image.jpg'));

            // Można również przekazać strumień do biblioteki do wyświetlenia zdjęcia
            // np. do biblioteki ExpressJS:
            // res.setHeader('Content-Type', 'image/jpeg');
            // res.setHeader('Content-Disposition', 'inline; filename="image.jpg"');
            // res.status(200).send(res.data);
          }
        }
      );
    }
  }
);
