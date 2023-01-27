const User = require("../models/User");
const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;

    try {
      const user = await User.create({
        username: body.username,
        email: body.email,
        password: body.password,
        role: body.role,
      });
      const access_token = authService().issue({ id: user.id });

      return res.status(200).json({ access_token, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ messages: "Internal server error" });
    }

    // return res.status(400).json({ messages: "Bad Request: Passwords don't match" });
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const user = await User.findOne({
          where: {
            email,
          },
        });

        if (!user) {
          return res
            .status(400)
            .json({ messages: "Bad Request: User not found" });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const access_token = authService().issue({ id: user.id });

          return res.status(200).json({ access_token, user });
        }

        return res.status(401).json({ messages: "Unauthorized" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ messages: "Internal server error" });
      }
    }

    return res
      .status(400)
      .json({ messages: "Bad Request: Email or password is wrong" });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: "Invalid Token!" });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const data = await User.findAll();

      return res.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ messages: "Internal server error" });
    }
  };

  return {
    register,
    login,
    validate,
    getAll,
  };
};

module.exports = UserController;
