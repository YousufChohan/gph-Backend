const Wishlist = require("../models/wishlist");

class GetWishlistController {
  static async Execute(req, res) {
    const { userid } = req.query;

    if (!userid) {
      res.status(400).json({
        message: `Invalid Request, Please Login First`,
      });
    } else if (userid) {
      Wishlist.findOne({ user: userid })
        .populate({
          path: "products",
        })
        .then((results) => {
          if (results.length == 0) {
            res.status(404).json({
              wishlist: "No Wishlist Was Found",
            });
          } else {
            res.status(200).json({
              wishlist: results,
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

module.exports = GetWishlistController;
