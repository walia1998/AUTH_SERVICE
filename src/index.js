const express = require("express");

const bodyParser = require('body-parser');
const app = express();
const { PORT } = require("./config/serverConfig.js");

const apiRoutes = require('./routes/index')
const UserService = require('./services/user-service.js')
const prepareAndStartServer = () => {


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on Port: ${PORT}`);
    const service = new UserService();

    // const newToken = service.createToken({email: 'sania@gmail.com', id: 1});
    // console.log('New Token ', newToken)

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmlhQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3Mjc5NTY2MTgsImV4cCI6MTcyNzk2MzgxOH0.U-39C_AtMqklDdMiam4DhcLcych2RXOL-q5yrrpPmUk';
    const response = service.verifyToken(token);
    console.log(response);
  });
};

prepareAndStartServer();
