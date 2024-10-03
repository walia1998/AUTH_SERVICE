const express = require("express");

const bodyParser = require('body-parser');
const app = express();
const { PORT } = require("./config/serverConfig.js");

const apiRoutes = require('./routes/index')
//const UserRepository = require('./repository/user-repository.js')
const prepareAndStartServer = () => {


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on Port: ${PORT}`);
    // const repo = new UserRepository();
    // const response = await repo.getById(1);
    // console.log(response);
  });
};

prepareAndStartServer();
