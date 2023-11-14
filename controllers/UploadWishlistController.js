const Wishlist = require("../models/wishlist");

class UploadWishlistController {
  static async Execute(req, res) {
    const { id, productid } = req.body;
    console.log(req.body);

    if (
      !id ||
      !id.match(/^[0-9a-fA-F]{24}$/) ||
      !productid ||
      !productid.match(/^[0-9a-fA-F]{24}$/)
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    } else {
      Wishlist.find({ user: id }).then(async (result) => {
        if (result.length == 0) {
          const newWishlist = new Wishlist({
            user: id,
            products: [productid],
          });

          try {
            const savedWishlist = await newWishlist.save();
            res.status(201).json({
              message: "Wishlist uploaded successfully",
              wishlist: savedWishlist,
            });
          } catch (error) {
            res.status(500).json({
              message: "Error uploading the product",
              error: error.message,
            });
          }
        } else if (result.length > 0) {
          var temp = result[0].products;
          console.log("second", temp);
          if (temp.indexOf(productid) > -1) {
            temp.splice(temp.indexOf(productid), 1);

            Wishlist.findOneAndUpdate(
              { user: id },
              {
                $set: {
                  products: temp,
                },
              }
            )
              .then((result) => {
                res.status(200).json({
                  message: "Wishlist uploaded successfully",
                  wishlist: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Error uploading the product",
                  error: err,
                });
              });
          } else {
            console.log("first", temp);
            temp.push(productid);
            console.log("hgello", temp);
            Wishlist.findOneAndUpdate(
              { user: id },
              {
                $set: {
                  products: temp,
                },
              }
            )
              .then((result) => {
                res.status(200).json({
                  message: "Wishlist uploaded successfully",
                  wishlist: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Error uploading the product",
                  error: err,
                });
              });
          }
        }
      });
    }
  }
}

module.exports = UploadWishlistController;
