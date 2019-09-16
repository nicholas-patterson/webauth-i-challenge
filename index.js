const server = require("./api/server.js");

const port = 7000;

server.listen(port, () => {
  console.log(`Server Listening On Port: ${port}`);
});
