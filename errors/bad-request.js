import CustomAPIError from "./custom-api.js";

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    // 400 - This response means that server could not understand the request due to invalid syntax.
    this.statusCode = 400;
  }
}

export default BadRequestError;
