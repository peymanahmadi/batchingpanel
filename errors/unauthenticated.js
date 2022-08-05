import CustomAPIError from "./custom-api.js";

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    // 401 - Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
    this.statusCode = 401;
  }
}

export default UnAuthenticatedError;
