// middleware for verifying token
function verifyToken(req, res, next) {
  if (req.headers.authorization !== undefined) {
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "cooperative-app", (err, data) => {
      if (!err) {
        next();
      } else {
        res.status(403).send({ message: "Something went wrong" });
      }
    });
  } else {
    res.send({ message: "Please provide a token" });
  }
}

module.exports = verifyToken;
