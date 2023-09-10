import asyncHandler from "../middleware/asyncHandlerMiddleware.js";
import Product from "../models/productModel.js";

// @desc fetch all products
// route GET /api/v1/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json({ success: true, data: products });
});

// @desc fetch a product with id
// route GET /api/v1/products/:id
// @access Public
const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) return res.json({ success: "true", data: product });
    else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

export { getProducts, getSingleProduct };
