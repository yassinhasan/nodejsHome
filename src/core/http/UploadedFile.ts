import path from "path";
import { ensureDirectory } from "@mongez/fs";
import { writeFileSync } from "fs";
import { Random } from "@mongez/reinforcements";
export class UploadedFile 
{
    constructor(private readonly file:any){}

    private fileBuffer: any;
    public get name()
    {
        return this.file.filename;
    }
        /**
     * Get File mime type
     */
    public get mimeType(): string {
        return this.file.mimetype;
    }

    public get extenstion(): string
    {
        return path.extname(this.name).replace(".","").toLowerCase();
    }

    public async saveTo(path: string)
    {
        const file =await this.buffer();
        ensureDirectory(path);
        writeFileSync(path+"/"+this.name , file);
    }
    public async saveAs(path: string,fileName:string)
    {
        const file = await this.buffer();
        ensureDirectory(path);
        writeFileSync(path+"/"+fileName , file);
    }
    public async save(path: string) 
    {
        const file = await this.buffer();
        ensureDirectory(path);
        const name = Random.string(64)+"."+this.extenstion;
        writeFileSync(path+"/"+name , file);
        return name;
    }
    public async buffer()
    {
        if(this.fileBuffer)
        {
            return this.fileBuffer
        }
        return  (this.fileBuffer = await this.file.toBuffer());
    }

    public async  size()
    {
        const fileBuffer = await this.buffer();
        return fileBuffer.toString().length;
    }
}

