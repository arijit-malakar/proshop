import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((el) => (
          <LinkContainer
            key={el + 1}
            to={!isAdmin ? `/page/${el + 1}` : `/admin/productlist/${el + 1}`}
          >
            <Pagination.Item active={el + 1 === page}>{el + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
