import { rootPath } from "@mongez/node";
import connection from "app/core/database/Connection"
import request from "app/core/http/request"
import { Console } from "console";
import { json } from "stream/consumers"

export default async function getUser(req: any , res:any) {
   
   //"Content-Type", "application/json
      const email = request.input("email","empty");
      const password = request.input("password","empty");
      const file = request.file("image");
      const fileName = file?.name;
      const mimeType  = file?.mimeType;
      const extenstion = file?.extenstion;
      const size  = await file?.size();
      const randomName = await file?.save(rootPath("storage"))
      // const all = request.all();

    return {
      method: "post" , 
      fileName , 
      mimeType , 
      extenstion , 
      size , 
      randomName
    }
}
export async function showUser(req: any , res:any) {
   //"Content-Type", "application/json
   
   //"Content-Type", "application/json
   const email = request.input("email","empty");
   const password = request.input("password","empty");
   const all = request.all();
   const isAdmin = request.number("isAdmin");
 return {
   method: "get" , 
   isAdmin
 }

}