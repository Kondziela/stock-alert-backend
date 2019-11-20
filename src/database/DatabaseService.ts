import * as mongoose from 'mongoose';
import Country from './schema/Country'

export class DatabaseService {

    constructor() {
        /**
            for local put file src/database file db_config.ts
            export default {
              "mongodb_user": MONGO_DB_USER,
              "mongodb_password": MONGO_DB_PASSWORD
            }
             */
        try {
            const config = require('./db_config.js').default;
            console.log('Find config file for database')
            process.env.mongodb_user = config['mongodb_user'];
            process.env.mongodb_password = config['mongodb_password'];
        } catch (e) {
            console.log("Use system variables");
        }
    }

    private getDBUri(): string {
        return `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}` +
            `@cluster0-iyhzw.mongodb.net/cheeki-breeki?retryWrites=true&w=majority`
    }

    public init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            mongoose.connect(this.getDBUri(), { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true })
                .then( () => {
                    console.log("Database connected successfully");
                    mongoose.Promise = global.Promise;
                    resolve();
                })
                .catch(err => {
                    console.error(`Error during initialize database ${err}`);
                    reject(err);
                });
        });
    }

    public findCountry(filters: Object): Promise<Array<Object>> {
        return Country.find(filters).exec();
    }

}