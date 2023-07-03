const { user } = require("../models/index.js");

class User_Controller {
  static showUser(req, res, next) {
    user
      .findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }
  static createUser(req, res, next) {
    let input = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      id_role: req.body.id_role,
    };
    console.log(input, "input");
    user
      .create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
}

module.exports = User_Controller;
