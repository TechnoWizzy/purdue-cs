import {Collection, MongoClient} from "mongodb";
import * as config from "./config.json";

const connectionString = `mongodb://${config.mongo.username}:${config.mongo.password}@technowizzy.dev:27017/?authMechanism=DEFAULT`;

export default class Database {
    private _students: Collection;

    async init() {
        const client: MongoClient = new MongoClient(connectionString);
        await client.connect();
        const db = client.db("PUGG");
        this._students = db.collection("students");
    }

    get students() {
        return this._students;
    }
}