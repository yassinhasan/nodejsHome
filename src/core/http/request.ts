import { UploadedFile } from "./UploadedFile";

class Request
{
  /**
   * 
   */
   public _method?: string;
    public _request: any;

    public  setRequest(value: any) {
        this._request = value;
        return this;
    }
    public  setMethod(value: any) {
      this._method = value;
      return this;
  }
    public _response: any;

    public  setResponse(value: any) {
        this._response = value;
        return this;
    }

    public _handler: any;


    public  setHandler(value: any) {
        this._handler = value;
        return this;
    }

    public async executeHandler()
    {
        return await this._handler(this._request, this._response)
    }

  /**
   * Get the value of the given key from the request body, query or params
   */
  public  input(key: string, defaultValue?: any) {

    let result ;
    if(this._method?.toLowerCase() == "get")
    {
     result =  this._request.query[key] ;
    }else if(this._method?.toLowerCase() == "post")
    {
      //  console.log(this._request.body[key])
      //   result =  this.parseFileData(this._request.body[key])
        result = this._request.body[key].value 
    }
    
    return result == undefined ? defaultValue : result;
  }

  public all()
  {
    let result:any = {} ;
    if(this._method?.toLowerCase() == "get")
    {
     result =  this.query();
    }else if(this._method?.toLowerCase() == "post")
    {
      result = this.body();
    }
    return {...result}
  }

  public query()
  {

    const result =  this._request.query ;
    return result;
  }
  public body()
  {
    let result:any = {} ;
      for(const key in this._request.body)
        {
          const data = this._request.body[key] ;
          
          if(Array.isArray(key))
          {
            result[key]  = data.map((d:any)=>{
               return d.value
            })

          }else
          {
            result[key]   =  this.checkDataFromFormBody(data)
          }
        }
    
    return result;
  }

  private checkDataFromFormBody(data:any)
  {
    
    if(data.file)
    {
     return {
        file: data.file,
        filename: data.filename,
        mimetype: data.mimetype,
      }
    }
    return data.value ;
  }
  public bool(key:any ,defaultValue:boolean = false )
  {
    let result = this.input(key,defaultValue);
    if(result == 'false') return false;
    if(result == 'true') return true;
    return Boolean(result)
  }
    /**
   * Get the integer value of the given key from the request body, query or params
   */
    public int(key: string, defaultValue = 0) {
      const value = this.input(key, defaultValue);
  
      return parseInt(value);
    }
      /**
   * Get the float value of the given key from the request body, query or params
   */
  public float(key: string, defaultValue = 0) {
    const value = this.input(key, defaultValue);

    return parseFloat(value);
  }
    /**
   * Get the number value of the given key from the request body, query or params
   */
    public number(key: string, defaultValue = 0) {
      const value = this.input(key, defaultValue);
  
      return Number(value);
    }
    
    public file(key:string) : UploadedFile | null
    {
      const file = this._request.body[key] ;
      return file ? new UploadedFile(file) : null;

    }
}

const request = new Request();
export default request;