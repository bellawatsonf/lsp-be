const { Admin, Asesor, Asesi } = require("../models/index.js");
var jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { decrypt } = require("../middleware/bcrypt.js");
const { default: axios } = require("axios");

class User_Login_Controller {
  static loginGoogle(req, res, next) {
    let email = "";
    let nama_lengkap = "";
    console.log(req.body, "masuk google login");
    axios({
      url: `https://www.googleapis.com/oauth2/v1/userinfo`,
      headers: {
        Authorization: `Bearer ${req.body.id_token_google}`,
        Accept: "application/json",
      },
    })
      .then((data) => {
        console.log(data.data.email, "dataaa");
        email = data.data.email;
        nama_lengkap = data.data.name;
        // const payload = ticket.getPayload();
        // console.log(payload, "payload");
        // const emailGoogle = payload.email;
        // const nama_lengkapGoogle = payload.name;
        // email = emailGoogle;
        // nama_lengkap = nama_lengkapGoogle;
        return Asesi.findOne({ where: { email: email } });
      })
      .then((asesi) => {
        console.log(asesi, "dataasesi");
        if (!asesi) {
          return Asesi.create({
            email: email,
            role: "asesi",
            nama_lengkap: nama_lengkap,
            // password: String(Math.random()) + String(Math.random()),
          });
        } else {
          console.log(asesi.dataValues, "dataasesielse");
          // console.log("gagal");
          return asesi.dataValues;
        }
      })
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => next(err));
    //cek data id_sosmed_google kalo belum ada insert ke db
    //kalo udah ada return data aja

    // const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
    // const { id_token_google } = req.body;
    // console.log(id_token_google, "idtokengugel");
    // client
    //   .verifyIdToken({
    //     idToken: id_token_google,
    //     audience: process.env.CLIENT_ID_GOOGLE, // Specify the CLIENT_ID of the app that accesses the backend
    //     // Or, if multiple clients access the backend:
    //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    //   })
    //   .then((ticket) => {
    //     const payload = ticket.getPayload();
    //     console.log(payload, "payload");
    //     const emailGoogle = payload.email;
    //     const nama_lengkapGoogle = payload.name;
    //     email = emailGoogle;
    //     nama_lengkap = nama_lengkapGoogle;
    //     return Asesi.findOne({ where: { email: email } });
    //   })
    //   .then((asesi) => {
    //     console.log(asesi, "dataasesi");
    //     if (!asesi) {
    //       return Asesi.create({
    //         email: email,
    //         role: "asesi",
    //         nama_lengkap: nama_lengkap,
    //         // password: String(Math.random()) + String(Math.random()),
    //       });
    //     } else {
    //       console.log("gagal");
    //       return asesi;
    //     }
    //   })
    //   .then((user) => {
    //     if (user) {
    //       const token = jwt.sign(
    //         {
    //           // id: user.id,
    //           role: user.role,
    //           email: user.email,
    //           nama_lengkap: user.name_lengkap,
    //         },
    //         process.env.SECRET_KEY
    //       );
    //       console.log(token, "tokeenserver");
    //       res.status(201).json({
    //         // id: user.id,
    //         role: user.role,
    //         nama_lengkap: user.nama_lengkap,
    //         succes: true,
    //         message: "berhasil signup or signin",
    //         token,
    //       });
    //     }
    //   })
    //   .catch((err) => next(err));
  }

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
            nama: data.nama,
            token,
          });
        } else {
          throw { email: "DataTidakValid" };
        }
      })
      .catch((err) => console.log(err));
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
