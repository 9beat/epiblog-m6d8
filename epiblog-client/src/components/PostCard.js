import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const PostCard = ({ post }) => {
    const [showModal, setShowModal] = useState(false);
    const [votes, setVotes] = useState(0);

    const handleModalClose = () => setShowModal(false);
    const handleModalOpen = () => setShowModal(true);

    return (
        <div className="card h-100">
            <img src={post.img} className="card-img-top" alt="Post" />
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <div>
                    <small className="text-muted">By {post.author?.firstName ? post.author?.firstName : post.author} {post.author?.lastName ? post.author?.lastName : post.author}</small>
                    <p>Rate: {post.rate}</p>
                </div>
                <Button onClick={handleModalOpen} className="btn btn-secondary">Read More</Button>
            </div>


            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{post.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{post.content}</Modal.Body>
                <Modal.Footer>
                    <p>Votes: {votes}</p>
                    <Button variant="success" onClick={() => setVotes(votes + 1)}>Upvote</Button>
                    <Button variant="danger" onClick={() => setVotes(votes - 1)}>Downvote</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PostCard;

