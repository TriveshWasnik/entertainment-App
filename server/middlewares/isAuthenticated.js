import jwt from "jsonwebtoken";

export default async function isAuthenticated(req, res, next) {
  try {
    console.log(req?.cookies);
    // get the token through browser cookie
    const token = req?.cookies?.token;
    console.log(token);
    // token not means user not login
    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }
    // verify the user token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }
    // add the userId in req object
    req.id = decode.userId;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
