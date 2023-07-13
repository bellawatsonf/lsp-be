let jwt = require("jsonwebtoken");
const { Skema } = require("../models/index.js");

const authentication = (req, res, next) => {
  console.log(req.headers.token, "reqauth");
  if (!req.headers.token) {
    res.status(400).json({
      msg: "Silahkan Login Terlebih Dahulu",
    });
  }
  try {
    var decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    req.id = decoded.id;
    req.role = decoded.role;
    console.log(decoded, "======");

    Asesi.findOne({ where: { id: req.id } }).then((data) => {
      if (data) {
        next(); // proses melanjutkan yg dirouter yaitu category dan news
      } else {
        throw { name: "DataTidakDitemukan" };
      }
    });
  } catch (err) {
    console.log(err, "eror");
    next(err);
  }
};

const authorizeSkema = (req, res, next) => {
  const id = req.params.id;
  console.log(req, "request");
  // console.log(req.userId)
  Skema.findAll()
    .then((data) => {
      // console.log(data)
      if (data) {
        // res.status(200).json({Sektor:data})
        if (req.role === "admin" || req.role === "super admin") {
          next();
        } else {
          // console.log(err);
          // res.status(403).json({
          //   msg: "not authorize",
          // });
          throw { name: "NotAuthorized" };
        }
      } else {
        throw { name: "DataTidakDitemukan" };
      }
    })
    .catch((err) => next(err));
};

module.exports = { authentication, authorizeSkema };
