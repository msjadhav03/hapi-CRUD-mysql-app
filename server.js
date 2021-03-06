const Hapi = require("@hapi/hapi");
const inert = require("@hapi/inert");

const path = require('path')

const server = new Hapi.Server({
  host: "localhost",
  port: "3000",
  routes:
  {
      files:
      {
          relativeTo : path.join(__dirname, 'static'),
      }
  }
});

const init = async () => {
  await server.register([
    {
      plugin: require("hapi-geo-locate"),
      options: {
        enabledByDefault: true,
      },
    },
    {
      plugin: inert,
    },
  ]);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.file('html/index.html')
    }
   
  });

  server.route({
    method: "GET",
    path: "/superhero/{heroName}",
    handler: (request, h) => {
      return `<h1>Incrediable ${request.params.heroName}</h1>`;
    },
  });

  server.route({
    method: "GET",
    path: "/{any*}",
    handler: (request, reply) => {
      return "<h1>Page not found !</h1>";
    },
  });

  server.route({
    method: "GET",
    path: "/getLocation",
    handler: (request, h) => {
      return request.location;
    },
  });

  await server.start(async (err) => {
    console.log("started..");
    if (err) {
      throw err;
    }
    await console.log(` Server Started on port`, server.info.uri);
  });
};

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit();
});

init();
