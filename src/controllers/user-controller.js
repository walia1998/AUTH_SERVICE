const { response } = require("express");

const UserService = require("../services/user-service.js");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully create a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong", error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};


const signIn = async (req,res) => {
  try {
    const response = await userService.signIn(req.body.email, req.body.password);
    return res.status(201).json({
      success: true,
      message: "Successfully signedIn ",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong", error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
}


const isAuthenticated = async (req,res) => {
  try {
   const token = req.headers['x-access-token'];
   const response = await userService.isAuthenticated(token);
   return res.status(200).json({
    success: true,
    err : {},
    data :response,
    message : 'user is authenticated and token is valid'
   });
  } catch (error) {
    console.log("Something went wrong", error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
}

module.exports = {
  create,
  signIn,
  isAuthenticated,
};
