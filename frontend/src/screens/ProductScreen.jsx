import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
    const { id: productId } = useParams();
    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Row>
                    <Col md={5}>
                        <Image
                            src={product.data.image}
                            alt={product.data.name}
                            fluid
                        />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.data.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.data.rating}
                                    text={`${product.data.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price : ${product.data.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {product.data.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>
                                                {product.data.price}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <strong>
                                                {product.data.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        className="btn-block"
                                        type="button"
                                        disabled={
                                            product.data.countInStock === 0
                                        }
                                    >
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default ProductScreen;
