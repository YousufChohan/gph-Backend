const WishlistRouter = require("express").Router();

const Wishlist = require("../controllers/UploadWishlistController");
const GetWishlist = require("../controllers/GetWishlistController");

WishlistRouter.post(
  "/wishlist",

  async (req, res) => {
    Wishlist.Execute(req, res);
  }
);

WishlistRouter.get(
  "/wishlist",

  async (req, res) => {
    GetWishlist.Execute(req, res);
  }
);

module.exports = WishlistRouter;
