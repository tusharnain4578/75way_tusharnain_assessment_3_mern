import { connect } from 'mongoose';

class Database {

    private mongodbUri: string = process.env.MONGODB_URI || '';

    constructor() {
        this.mongodbUri = this.mongodbUri.trim();
    }


    /**
     * Connect to Database
     */
    public connect = async () => {

        if (this.mongodbUri === "") {
            console.error("MongoDB URI not provided in .env file.");
        }

        await connect(this.mongodbUri);
    }

};


export default Database;