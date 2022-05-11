const Hapi = require("hapi");

const server = new Hapi.Server({
  host: "localhost",
  port: "3000",
});

server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "<h1> Welcome to the HAPI .....</h1>";
  },
});

server.route({
    method:'GET',
    path : '/superhero/{heroName}',
    handler: (request,h)=>
    {
        return `<h1>Incrediable ${request.params.heroName}</h1>`
    }

})

server.start(async(err) => {
  console.log("started..");
  if (err) {
    throw err;
  }
  await console.log(` Server Started on port`, server.info.uri);
});

process.on('uncaughtException',(err)=>
{
    console.log(err)
    process.exit()
})