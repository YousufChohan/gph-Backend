const Product = require("../models/product");
const File = require("../models/file");

class UploadProductController {
  static async Execute(req, res) {
    const {
      productName,
      productType,
      productDetail,
      productPrice,
      productRating,
    } = req.body;

    if (!productName || !productType || !productDetail || !productPrice) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    } else {
      var productPicture = [];

      for (const file of req.files.productPicture) {
        var final_file = {
          file: file.filename,
          contentType: file.mimetype,
          docOF: req.route.path,
        };
        const fileNew = await File.create(final_file);

        productPicture.push(fileNew._id);
      }

      const newProduct = new Product({
        productName,
        productType,
        productDetail,
        productPrice,
        productRating,
        productPicture,
      });

      try {
        const savedProduct = await newProduct.save();

        res.status(201).json({
          message: "Product uploaded successfully",
          product: savedProduct,
        });
      } catch (error) {
        res.status(500).json({
          message: "Error uploading the product",
          error: error.message,
        });
      }
    }
  }
}

module.exports = UploadProductController;
