import { connectToServer } from './http/connectToServer';
import { connectToDatabase } from './database/connectToDatabase';
import "src/config/mongezConfig";
export default async function startApplication()
{    
  connectToDatabase();
  connectToServer();
}
