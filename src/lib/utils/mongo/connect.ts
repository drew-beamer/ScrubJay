import { MongoClient } from 'mongodb';
import { config } from '../../../config';

const { DB_URI } = config;

export default async function connectToCluster(): Promise<MongoClient> {
  let mongoClient;
  try {
    mongoClient = new MongoClient(DB_URI);
    console.log('Connecting to MongoDB Atlas cluster...');
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas!');
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
    process.exit();
  }
  return mongoClient;
}
