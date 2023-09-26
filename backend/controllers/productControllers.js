import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
import Product from "../models/productModel.js";

// @desc fetch all products
// route GET /api/v1/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc fetch a product with id
// route GET /api/v1/products/:id
// @access Public
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Create a product
// route POST /api/v1/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    countInStock: 0,
    category: "Electronics",
    numReviews: 0,
    description: "Sample description",
  });
  const newProduct = await product.save();
  res.status(201).json(newProduct);
});

// @desc Edit a product for the given id
// route PUT /api/v1/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, countInStock, category } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Delete a product for the given id
// route DELETE /api/v1/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
