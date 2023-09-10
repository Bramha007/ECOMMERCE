import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.create(users);
        const adminUser = await createdUsers[0]._id;

        const sampleProducts = products.map((product) => ({
            ...product,
            user: adminUser,
        }));
        await Product.create(sampleProducts);
        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        console.log("Data Destroyed!".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    destroyData();
}
