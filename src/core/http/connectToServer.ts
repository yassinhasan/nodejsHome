import multipart from "@fastify/multipart";
import fastify from "fastify";
import router from "../routes/routes";
import "src/modules/modules-routes"
const server = fastify();
// Add the following code
server.register(multipart, {
  attachFieldsToBody: true,
});

export async function connectToServer()
{  
  router.scan(server);
  try {
      // 👇🏻 We can use the url of the server
      const address = await server.listen({ port: 3000 });
  
      console.log(`Start browsing using ${address}`);
    } catch (err) {
      server.log.error(err);
      process.exit(1); // stop the process, exit with error
    }
}