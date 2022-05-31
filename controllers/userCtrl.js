const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  registerUser: async (req, res) => {
    try {
      const { uname, email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "Email already Exist" });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new Users({
        uname: uname,
        email: email,
        password: passwordHash,
      });

      await newUser.save();
      res.status(201).json({ msg: "sign Up successfull " });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "Plz fill all fields properly" });
      }
      const user = await Users.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "inbalid credientials" });

      // genrate cookie
      const payload = { id: user._id, name: user.uname };
      const token = jwt.sign(payload, process.env.SECRETE_KEY, {
        expiresIn: "30d",
      });
      console.log(token);
      res.json({ msg: "Login a User", token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.SECRETE_KEY, async (err, verified) => {
        if (err) return res.send(false);

        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);

        // console.log(verified);
        return res.send(true);
      });
    } catch (err) {
      return res.status(500), res.json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
