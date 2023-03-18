import express from 'express';
import cors from 'cors';
import { router } from './routes/Router.js';

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(router);

app.listen(process.env.PORT,() => {
    console.log(`Server running on port: ${process.env.PORT} `);
})

