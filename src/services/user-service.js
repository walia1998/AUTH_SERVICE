const UserRepository = require("../repository/user-repository.js");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong", error);
      throw error;
    }
  }
}

module.exports = UserService;
