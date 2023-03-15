import request from "../http/request";
import { routeObject } from "./routeObject";
// i need class that take method get take 3 args method , path , handler 
// then 

class Route 
{

    private static instacne : Route ;
    private constructor(){};
    routes: routeObject [] = [];
    /**
     * 
     * @param path 
     * @param handler 
     * @returns Route
     */
    public  get(path: string , handler: any) {
        this.routes.push({
            method : "GET",
            path :path, 
            handler : handler
        });
        return this;
       
    }
    /**
     * 
     * @param path 
     * @param handler 
     * @returns Route
     */
    public  post(path: string , handler: any) {

        this.routes.push({
            method : "POST",
            path :path, 
            handler : handler
        });
        return this;
       
    }
    /**
     * 
     * @returns Route
     */
    public static getInstance(): Route
    {
        if(!Route.instacne)
        {
            Route.instacne = new Route();
        }
        return Route.instacne;
    }

    /**
     * 
     * @param server 
     */
    public scan(server:any)
    {
        this.routes.forEach((route)=>
        {
           // console.log(route)
           const requestMethod = route.method.toLowerCase();
           const serverMethod  = server[requestMethod].bind(server);
           serverMethod(route.path , this.routeHandler(route))
        })
        
    }

    private routeHandler(route: routeObject)
    {
           return async (req: any  , res: any)=>{

            return  await request.setMethod(route.method).setRequest(req).setResponse(res).setHandler(route.handler)
            .executeHandler();
            
           } 
    }

    /**
     * 
     * @returns routes
     */
    public routeList()
    {
        return this.routes;
    }


}

const router = Route.getInstance();

export default router;