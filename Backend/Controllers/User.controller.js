const User = require("../Models/User.model");
const CartProducts = require("../Models/CartProducts.model");
const Shipment = require("../Models/Shipment.model");
const Order = require("../Models/Order.model");
const bcrypt = require("bcrypt");
const Product = require("../Models/Product.model");
const Rider = require("../Models/Rider.model");
const mongoose = require("mongoose");

exports.saveShipmentDetails = async (req, res) => {
  let shipmentdetails = new Shipment({
    userId: req.decoded.id,
    floor: req.body.floor,
    street: req.body.street,
    city: req.body.city,
    note: req.body.note,
  });

  shipmentdetails.save((err, data) => {
    if (err) return err;
    res.send(data);
  });
};

exports.orders = (req, res, next) => {
  Order.findByIdAndUpdate(
    {
      _id:req.params.id,
    },
    {
      $addToSet: {
        cartId: {
          id: req.body.id,
        },
      },
    },
    (err, productDetails) => {
      if (err) return next(err);

      res.send(productDetails);
    }
  );

  
    // exports.getUserDetails=(req,res,next)=>{
    //    Order.find({userId:req.decoded.id},(err,res)=>{
    //     if (err) return next(err);
    //     res.send(res);
    //    })

    // }
  // Order.updateOne(
  //   {
  //     userId: "61f3312ff235453c0e2c0b00",
  //   },
  //   {
  //     $addToSet: {
  //       cartId:"1234354545332"
  //     },
  //   },

  // )
  // (err, data) => {
  //   if (err) return err;
  //   res.send(data);
  // };
};

exports.order_details = async (req, res) => {
  let orderDetails = new Order({
    userId: req.decoded.id,
    cartId: req.body.cartid,
    riderId: req.body.riderId,
    floor: req.body.floor,
    street: req.body.street,
    city: req.body.city,
    note: req.body.note,
    totalprice: req.body.totalprice,
  });

  orderDetails.save((err, data) => {
    if (err) return err;
    res.status(200).send(data);
  });
};

exports.view_orders = async (req, res) => {
  Order.find(
    {
      userId: mongoose.Types.ObjectId(req.decoded.id),
    },
    (err, data) => {
      if (err) return err;

      res.send(data);
    }
  ).populate("cartId");
};

exports.get_all_users = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send(allUsers);
  } catch (err) {
    return res.status(400).send("NO USERS FOUND");
  }
};

exports.total_count_users = async (req, res) => {
  try {
    User.aggregate([
      {
        $group: {
          _id: null,
          sum: {
            $sum: 1,
          },
        },
      },
    ]).then((result) => res.status(200).send(result));
  } catch (err) {
    console.log(err);
    return res.status(400).send("Something Went Wrong");
  }
};
exports.total_count_orders = async (req, res) => {
  try {
    Order.aggregate([
      {
        $group: {
          _id: null,
          sum: {
            $sum: 1,
          },
        },
      },
    ]).then((result) => res.status(200).send(result));
  } catch (err) {
    console.log(err);
    return res.status(400).send("Something Went Wrong");
  }
};

exports.addUser = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(422).send("User with this email already exists");
  }
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  });

  user.save((err) => {
    if (err) return err;
    res.status(201).send("User created successfully");
  });
};

exports.innovativeProducts = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  Product.aggregate(
    [
      {
        $match: {
          category: "Innovative",
        },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: limit,
      },
    ],
    (err, response) => {
      if (err) return next(err);
      res.send(response);
    }
  );
};

exports.bakelineProducts = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  Product.aggregate(
    [
      {
        $match: {
          category: "Bakeline",
        },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: limit,
      },
    ],
    (err, response) => {
      if (err) return next(err);
      res.send(response);
    }
  );
};

exports.productDetails = (req, res, next) => {
  Product.findById(req.params.id, (err, productDetails) => {
    if (err) return next(err);

    res.send(productDetails);
  });
};

exports.allProducts= async (req, res, next) => {
    try {
      const allProducts = await Product.find().select('productname price quantity');
      res.status(200).send(allProducts);
    } catch (err) {
      return res.status(400).send("NO Products FOUND");
    }
  };


exports.updateProductQuantity = (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $inc: {
        quantity: -req.body.quantity,
      },
    },
    (err, productDetails) => {
      if (err) return next(err);

      res.send(productDetails);
    }
  );
};

exports.addToCart = (req, res, next) => {
  let cartProducts = new CartProducts({
    userId: req.decoded.id,
    productId: req.body.productId,
    productname: req.body.productname,
    image: req.body.image,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  cartProducts.save((err) => {
    if (err) return next(err);
  });

  res.send("Product Successfully added to cart");
};

exports.viewCartProduct = (req, res, next) => {
  CartProducts.find(
    {
      userId: mongoose.Types.ObjectId(req.decoded.id),
    },
    (err, data) => {
      if (err) return next(err);

      res.send(data);
    }
  );
};

exports.searchProduct = async (req, res, next) => {
  Product.aggregate(
    [
      {
        $match: {
          $or: [{ productname: { $regex: req.params.key } }],
        },
      },
    ],
    (error, response) => {
      if (error) return next(error);
      res.send(response);
    }
  );
};

exports.delete_user = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    return res.status(200).send("User has been successfully Deleted");
  } catch (err) {
    return res.status(400).send("Sorry this record Does Not Exist");
  }
};

exports.view_all_riders = async (req, res, next) => {
  try {
    const allRiders = await Rider.find();
    res.status(200).send(allRiders);
  } catch (err) {
    return res.status(400).send("NO Riders FOUND");
  }
};

exports.view_all_orders = async (req, res, next) => {
  try {
    const allOrders = await Order.find().populate("cartId");
    res.status(200).send(allOrders);
  } catch (err) {
    return res.status(400).send("NO orders FOUND");
  }
};

exports.assignOrderToRider = (req, res, next) => {
  Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        riderId: req.body.riderId,
        status: "Assigned",
      },
    },
    (err, assignedOrder) => {
      if (err) return next(err);
      res.send(assignedOrder);
    }
  ).populate("cartId");
};
