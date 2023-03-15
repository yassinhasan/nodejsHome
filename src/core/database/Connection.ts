import chalk from "chalk";
import {  Collection, Db, MongoClient } from "mongodb" ; 
import config from "@mongez/config/cjs/config";
import dbInstance ,{ DatabaseService } from "./database";


class Connection 
{
 
    public client ?: MongoClient ;
    public db ?: DatabaseService;
    public  database!: Db;
    public  async connect()
    {
        try {
            if(this.client)return;
            const{host,port,username,password,databaseName} = this.getDatabaseConfigurations;
            this.client = await MongoClient.connect(`mongodb://${host}:${port}`, {
                auth:
                {
                    username: username , 
                    password : password
                }
            });
             const mongoDatabase =   this.client.db(databaseName);
             this.db = await dbInstance.setDatabase(mongoDatabase);
              this.database = await this.db.dbObject;
            //  console.log(this.db.dbObject.namespace)
            console.log(chalk.green("is connected!") , !username || ! password ? chalk.red("you shoud use secure auth for connections") : "");
            } catch (error) {
            console.log(chalk.red(error));
            }
    }
    public get  getDatabaseConfigurations()
    {
        return  {
             host : config.get("database.host", "localhost"),
                     port : config.get("database.port", 27017),
                     username : config.get("database.username", ""),
                     password : config.get("database.password", ""),
                     databaseName : config.get("database.databaseName",""),
                }
    }

    public collection(collectionName: string)
    {
      return  this.db?.dbObject.collection(collectionName);

    }
         
        
    
}


const connection = new Connection();
export default connection;