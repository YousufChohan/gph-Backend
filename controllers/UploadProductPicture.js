const Product = require("../models/product");
const File = require("../models/file");

class UploadProductPictureController {
  static async Execute(req, res) {
    const { id } = req.body;
    console.log(req.body);
    if (!id || !req.file) {
      res.status(200).json({
        message: "No Record found",
      });
    } else {
      var final_file = {
        file: req.file.filename,
        contentType: req.file.mimetype,
        docOF: req.route.path,
      };

      File.create(final_file)
        .then((result) => {
          Product.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                productPicture: result._id,
              },
            }
          )
            .then((response) => {
              res.status(200).json({
                message: response,
                id: result._id,
              });
            })
            .catch((err) => {
              res.status(400).send({
                message: err,
              });
            });
        })
        .catch((err) => {
          res.status(400).send({
            message: err,
          });
        });
    }
  }
}

module.exports = UploadProductPictureController;
