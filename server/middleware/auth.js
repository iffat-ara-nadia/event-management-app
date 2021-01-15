const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");
  // check if no token
  if (!token) return res.status(401).send("Access denied. No token provided..");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded; // or req.user = decoded.user
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token...");
  }
}

module.exports = auth;
