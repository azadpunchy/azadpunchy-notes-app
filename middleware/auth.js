const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // what is token
    // console.log(token);
    if (!token) return res.status(400).json({ msg: "invalid Authentication" });

    jwt.verify(token, process.env.SECRETE_KEY, (err, user) => {
      if (err) return res.status(400).json({ msg: "Authorization not valid" });

      // console.log(user);
      req.user = user;
      // console.log(req.user.uname);
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
