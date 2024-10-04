
const { User,Role } = require("../models/index.js");
const ValidationError = require("../utils/validation-error.js");


class UserRepository {

  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if(error.name = "SequelizeValidationError") {
       throw new ValidationError(error)
      }
      console.log("Something went wrong");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }


  async getById(userId) {
    try {
      const user = await User.findByPk(userId,{
        attibutes : ['email', 'id']
      }) ;
      return user;
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
        const user = await User.findOne({where: {
            email: userEmail
        }});
        return user;
    } catch (error) {
        console.log("Something went wrong on repository layer");
        throw error;
    }
}

async isAdmin(userId) {
  try {
    const user = await User.findByPk(userId);
    const adminRole = await Role.findOne({
      where : {
        name : 'ADMIN'
      }
    });
    return user.hasRole(adminRole);
} catch (error) {
    console.log("Something went wrong on repository layer");
    throw error;
}
}
}

module.exports = UserRepository;
