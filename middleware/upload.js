// SET STORAGE

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = req.route.path;
    console.log(path);
    cb(null, `.${req.route.path}`);
    //cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "-" + Math.floor(Math.random() * 1000)
    );
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
