const { role } = require("../models/index.js");

class Role_Controller {
  static showRole(req, res, next) {
    role
      .findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }
  static createRole(req, res, next) {
    let input = {
      role: req.body.role,
    };
    role
      .create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
}

module.exports = Role_Controller;
