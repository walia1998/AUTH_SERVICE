const UserRepository = require("../repository/user-repository.js");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

const bcrypt = require("bcrypt");
const AppErrors = require("../utils/error-handler.js");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

  async signIn(email, plainPassword) {
    try {
      //Stepi -> Fetch the user using email,
      const user = await this.userRepository.getByEmail(email);
      //Step 2 -> compare incoming plain password with stores encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.lgo("Password doesn't match");
        throw { error: "Incorrect Password" };
      }
      //step 3 -> if passwords match then create a token and send it to the user
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("Something went wrong", error);
      throw error;
    }
  }

async isAuthenticated(token) {
  
  try {
    const response = this.verifyToken(token);
    if(!response) {
      throw{ error : 'Invalid Token'}
    }
    const user = this.userRepository.getById(response.id);

    if(!user) {
      throw { error: 'no usre with the corresponding token exists'}
    }

    return user.id;
  } catch (error) {
    console.log("Something went wrong", error);
    throw error;
  }
}

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "2h" });
      return result;
    } catch (error) {
      console.log("Something went wrong", error);
      throw error;
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong", error);
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong", error);
      throw error;
    }
  }



  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    
    } catch (error) {
      console.log("Something went wrong", error);
      throw error;
    }
  }
}

module.exports = UserService;
