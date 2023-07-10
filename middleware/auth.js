const authentication = (req, res, next) => {
  console.log(req.headers.token, "reqauth");
  if (!req.headers.token) {
    res.status(400).json({
      msg: "Silahkan Login Terlebih Dahulu",
    });
  }
};

module.exports = { authentication };
