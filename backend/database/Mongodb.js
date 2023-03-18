import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const connectionString = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.036klqp.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const connectToDB = await client.connect();
export const db = await connectToDB.db();