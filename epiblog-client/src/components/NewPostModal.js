import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Toast } from '../utils/notifications';
import { Toaster } from 'react-hot-toast';
import useDecodedSession from '../hooks/useDecodedSession';

const NewPostModal = ({ show, handleClose }) => {
  const successToast = new Toast("Post successfully created");
  const errorToast = new Toast("Error while creating the post");

  const actualUser = useDecodedSession();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    rate: 0,
    img: ''
  });

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files[0]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleRateChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      rate: Number(event.target.value)
    }));
  };

  const uploadFile = async (file) => {
    const fileData = new FormData();
    fileData.append('img', file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/cloudUpload`, {
        method: 'POST',
        body: fileData,
      });

      if (!response.ok) {
        throw new Error("Error while uploading the file");
      }

      return await response.json();
    } catch (error) {
      console.error('Uploading file failed:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        const postFormData = {
          ...formData,
          img: uploadedFile.img
        };

        const response = await fetch(`${process.env.REACT_API_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postFormData)
        });

        if (response.ok) {
          successToast.success();
        } else {
          errorToast.show();
        }

        return await response.json();
      } catch (err) {
        errorToast.error();
      }
    } else {
      console.error("Select at least one file");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Modal.Header closeButton>
        <Modal.Title>NEW POST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group controlId="title">
            <Form.Label>TITLE</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digit post title..."
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Digit post content..."
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Select
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            >
              <option>Choose an author...</option>
              <option value={actualUser?.id}>
                {actualUser?.firstName}
                {actualUser?.lastName}
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="rate">
            <Form.Label>Vote</Form.Label>
            <Form.Control
              type="number"
              placeholder="Digit a vote from 1 to 5..."
              name="rate"
              value={formData.rate}
              onChange={handleRateChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>Upload file</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" type="submit" className="mx-auto mt-3">
              POST
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewPostModal;


