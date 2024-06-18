import { MongoClient } from 'mongodb';
import { config } from '../../../config';

const { DB_URI } = config;

export default class MongoConnection {
    static mongoClient: MongoClient | null = null;

    static async connect(): Promise<MongoClient> {
        if (this.mongoClient) return this.mongoClient;
        try {
            this.mongoClient = await new MongoClient(DB_URI).connect();
        } catch (error) {
            console.log('Connection to Atlas failed!');
            process.exit(1);
        }
        return this.mongoClient;
    }
}
