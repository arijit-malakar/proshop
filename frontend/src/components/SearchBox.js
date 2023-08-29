import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/styles/SearchBox.css";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex my-2 me-4 form-search">
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button
        type="submit"
        variant="success"
        className="px-2 py-1 mx-0 btn-search"
      >
        <FaSearch />
      </Button>
    </Form>
  );
};

export default SearchBox;
