const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const { PORT } = require("./config/serverConfig.js");
const db = require("./models/index.js");

const {User, Role} = require('./models/index.js')


const apiRoutes = require("./routes/index");
const UserService = require("./services/user-service.js");
const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on Port: ${PORT}`);
    const service = new UserService();

    // const newToken = service.createToken({email: 'sania@gmail.com', id: 1});
    // console.log('New Token ', newToken)

    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }


    const u1 = await User.findByPk(5);
    const r1 = await Role.findByPk(2);
    // u1.addRole(r1);

    const response = await u1.hasRole(r1);
    console.log(response)
  });
};

prepareAndStartServer();
