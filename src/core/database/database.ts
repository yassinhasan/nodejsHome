import { Db } from "mongodb";

export class DatabaseService 
{
    public dbObject!: Db;
    

    public async setDatabase(database: Db)
    {
        this.dbObject =  database;
        return this;
    }
    

}

const dbInstance = new DatabaseService();
export default dbInstance;