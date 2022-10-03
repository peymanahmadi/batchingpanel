import CustomAPIError from "./custom-api.js";

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    // 404 - Not found
    this.statusCode = 404;
  }
}

export default NotFoundError;
