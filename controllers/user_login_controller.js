const { Admin, Asesor } = require("../models/index.js");
var jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { decrypt } = require("../middleware/bcrypt.js");

class User_Login_Controller {
  static loginAdmin(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password, "ini inputan");

    Admin.findOne({ where: { email } })
      .then((data) => {
        const checkHashedPassword = decrypt(password, data.password);

        if (data && checkHashedPassword) {
          var token = jwt.sign(
            { id: data.id, role: data.role, email: data.email },
            process.env.SECRET_KEY
          );
          console.log(token, "ini tokennya");
          res.status(200).json({
            message: "Login berhasil",
            role: data.role,
            id: data.id,
            token,
          });
        } else {
          throw { email: "DataTidakValid" };
        }
      })
      .catch((err) => next(err));
  }
  //   static loginAsesor(req, res, next) {
  //     const { email, password } = req.body;
  //     console.log(email, password, "ini inputan");

  //     User.findOne({ where: { email } })
  //       .then((data) => {
  //         const checkHashedPassword = decrypt(password, data.password);
  //         console.log(data.dataValues.email, "==========");
  //         // console.log(checkHashedPassword)

  //         if (data && checkHashedPassword) {
  //           var token = jwt.sign(
  //             { id: data.id, role: data.role, useremail: data.useremail },
  //             process.env.SECRET_KEY
  //           );
  //           console.log(token, "ini tokennya");
  //           res.status(200).json({
  //             message: "Login berhasil",
  //             role: data.role,
  //             id: data.id,
  //             // dataUserLogin: data.dataValues.useremail,
  //             token,
  //           });
  //         } else {
  //           throw { email: "DataTidakValid" };
  //         }
  //       })
  //       .catch((err) => next(err));
  //   }
  static Logout() {}
}

module.exports = User_Login_Controller;
