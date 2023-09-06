import express from "express";
import colors from "colors";

const port = 5000;
const app = express();

app.get("/", (req, res) => {
    res.send("API up and running");
});

app.listen(port, () => {
    console.log(`server running on ${port}`.cyan.bold);
});
