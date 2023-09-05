import React from "react";
import { Card } from "react-bootstrap";

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/products/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </a>
            <Card.Body>
                <a href={`/products/${product._id}`}>
                    <Card.Title as="h3">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as="div">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
