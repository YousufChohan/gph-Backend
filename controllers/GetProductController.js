const Product = require("../models/product");

class GetProductController {
  static async Execute(req, res) {
    const { userid } = req.query;

    if (!userid) {
      res.status(400).json({
        message: `Invalid Request, Please Login First`,
      });
    } else if (userid) {
      Product.find({})
        .then((results) => {
          if (results.length == 0) {
            res.status(404).json({
              products: "No Products Were Found",
            });
          } else {
            res.status(200).json({
              products: results,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });
    }
  }
}

module.exports = GetProductController;
