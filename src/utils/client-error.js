const AppError = require("./error-handler.js");
const { StatusCodes } = require("http-status-codes");
class ClientError extends AppError {
  constructor(error) {
    let errorName = error.name;
    let explanation = [];

    // error.errors.forEach((err) => {
    //   explanation.push(err.message);
    // });
    super(
      "Not able to validate the data sent in the request",
      explanation,
      StatusCodes.BAD_REQUEST
    );
  }
}


module.exports =ClientError;