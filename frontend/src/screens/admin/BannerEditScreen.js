import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import {
  useGetBannerDetailsQuery,
  useUpdateBannerItemMutation,
  useUploadBannerImageMutation,
} from "../../slices/bannerApiSlice";

const BannerEditScreen = () => {
  const { id: bannerId } = useParams();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const { data: banner, isLoading, error } = useGetBannerDetailsQuery(bannerId);

  const [updateBannerItem, { isLoading: loadingUpdate }] =
    useUpdateBannerItemMutation();

  const [uploadBannerImage, { isLoading: loadingUpload }] =
    useUploadBannerImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (banner) {
      setCaption(banner.caption);
      setImage(banner.image);
    }
  }, [banner]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedBanner = {
      bannerId,
      caption,
      image,
    };

    const result = await updateBannerItem(updatedBanner);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Banner updated");
      navigate("/admin/bannerlist");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadBannerImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/bannerlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Banner</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a caption for banner"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage}
              />
              <Form.Control
                type="file"
                label="Choose file"
                onChange={uploadFileHandler}
              />
            </Form.Group>
            {loadingUpload && <Loader />}

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BannerEditScreen;
