const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function authTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1] ?? null;
  if (token === null) {
    res.status(401).json({ ok: false, status: "no header" });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ ok: false, status: "auth failed" });
      return;
    }
    req.user = user;
    next();
  });
}

module.exports = authTokenMiddleware;
