import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import "../assets/styles/ProductCarousel.css";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="mb-4">
      {/* {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src="images/carousel-img-3.jpg" alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))} */}
      {Array.from({ length: 3 }, (_, i) => (
        <Carousel.Item>
          <Image
            src={`images/carousel-img-${i + 1}.jpeg`}
            alt="carousel-img"
            fluid
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
