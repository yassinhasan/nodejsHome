import fs from "@mongez/fs";
import connection from "app/core/database/Connection"
//import "src/modules/home/views/index.html"

export async function home(req: any , res:any) {
    const bufferIndexHtml = fs.get('src/modules/home/views/index.html')
    res.type('text/html').send(bufferIndexHtml)

}