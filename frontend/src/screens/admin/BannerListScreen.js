import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Image } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetBannerItemsQuery,
  useAddBannerItemMutation,
  useDeleteBannerItemMutation,
} from "../../slices/bannerApiSlice";

const BannerListScreen = () => {
  const { data, isLoading, error, refetch } = useGetBannerItemsQuery();

  const [addBannerItem, { isLoading: loadingCreate }] =
    useAddBannerItemMutation();

  const [deleteBannerItem, { isLoading: loadingDelete }] =
    useDeleteBannerItemMutation();

  const addBannerItemHandler = async () => {
    if (window.confirm("Are you sure you want to create a new banner item?")) {
      try {
        await addBannerItem();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteBannerItem(id);
        toast.success("Banner item deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Banner Items</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={addBannerItemHandler}>
            <FaEdit /> Add Banner Item
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>CAPTION</th>
                <th>IMAGE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.bannerItems.map((banner) => (
                <tr key={banner._id}>
                  <td>{banner._id}</td>
                  <td>{banner.caption}</td>
                  <td>
                    <Image
                      src={banner.image}
                      alt={banner.caption}
                      width={100}
                    />
                  </td>
                  <td>
                    <LinkContainer to={`/admin/banner/${banner._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(banner._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default BannerListScreen;
