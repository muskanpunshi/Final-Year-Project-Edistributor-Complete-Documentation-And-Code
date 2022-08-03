const Product = require("../Models/Product.model");
const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname).replace("\\","/");
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return cb(new Error("Only images are allowed"));
  } else {
    cb(null, true);
  }
};

(exports.uploadImg = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("image")),
  async (req, res) => {
    try {
      console.log(req.file);
    } catch (error) {
      res.send(error.message);
    }
  };

exports.product_create = async (req, res) => {
  console.log(req.file);
  const productExist = await Product.findOne({
    productname: req.body.productname,
  });

  if (productExist) {
    return res.status(422).send("Product with this name already exists");
  }

  let product = new Product({
    productname: req.body.productname,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    description: req.body.description,
    image: req.file.path,
  });

  product.save((err, data) => {
    if (err) return res.json({ Error: err });
    res.status(201).send("Product created successfully");
    // return res.send(req.file);
  });
};

exports.get_products = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).send(allProducts);
  } catch (err) {
    return res.status(400).send("NO PRODUCTS FOUND");
  }
};

exports.total_sum = async (req, res) => {
  try {
    Product.aggregate([
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

exports.delete_product = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    return res.status(200).send("Product has been successfully Deleted");
  } catch (err) {
    return res.status(400).send("Sorry this product Does Not Exist");
  }
};

exports.product_details = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    return res.status(400).send("Product with this id doesn't exist");
  }
};

exports.update_quantity = async (req, res) => {
  try {
    const updateQuantity = await Product.findByIdAndUpdate(req.params.id, {
       quantity:  req.body.quantity 
    },{new: true})
    res.status(200).send(updateQuantity);
  } catch (err) {
    return res.status(400).send("Could not update");
  }
};


// exports.update_quantity = async (req, res) => {
//   try {
//     const updateQuantity = await Product.findByIdAndUpdate(req.params.id, {
//       $inc: { quantity:  req.body.quantity }
//     },{new: true})
//     res.status(200).send(updateQuantity);
//   } catch (err) {
//     return res.status(400).send("Could not update");
//   }
// };
