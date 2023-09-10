import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandlerMiddleware.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const port = process.env.PORT;
const app = express();
app.use(morgan("dev"));

app.use("/api/v1/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port || 5000, () => {
    console.log(`server running on ${port}`.cyan.bold);
});
