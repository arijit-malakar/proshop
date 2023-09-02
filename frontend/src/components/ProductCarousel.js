import { Carousel, Image } from "react-bootstrap";
import "../assets/styles/ProductCarousel.css";
import Loader from "./Loader";
import Message from "./Message";
import { useGetBannerItemsQuery } from "../slices/bannerApiSlice";

const ProductCarousel = () => {
  const { data, isLoading, error } = useGetBannerItemsQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="mb-4">
      {data.bannerItems.map((banner, i) => (
        <Carousel.Item key={banner._id}>
          <Image src={banner.image} alt={`banner-img-${i + 1}`} fluid />
          <Carousel.Caption>
            <h2>{banner.caption}</h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
