import React from "react";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import { Link } from "react-router-dom";

function TopProductCarousel() {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default TopProductCarousel;
