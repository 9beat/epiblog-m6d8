import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import NavigationBar from '../components/Navbar';
import NewPostModal from '../components/NewPostModal';
import Footer from '../components/Footer';
import { Blocks } from  'react-loader-spinner'
import '../styles/Loader.css'

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`,{
      headers:{
      "auth": JSON.parse(localStorage.getItem("loggedIn")).token
      }
    });

    const data = await response.json();
    if(response.ok){
    setData(data);
    setTotalPosts(data.posts.length)
    }
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 3);
  };

  const handleNewPost = (newPost) => {
    setData(prevData => ({
      ...prevData,
      posts: [newPost, ...prevData.posts]
    }));
  };

  const getVisiblePosts = () => {
    if (data?.posts) {
      return data.posts.slice(0, visiblePosts);
    }
    return [];
  };

  if (isLoading) {
    return <div className="loader-container">
    {isLoading && (
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    )}
  </div>;
  }

  return (
    <>
      <NavigationBar currentPage="homepage" />
      <div className="container mt-5">
        <h1 className="text-center mb-4">HOMEPAGE</h1>
        <p className="text-center mb-4">All posts will be shown here</p>
        <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-secondary" onClick={handleShowModal}>NEW POST</button>
        </div>
        <NewPostModal show={showModal} handleClose={handleCloseModal} handleNewPost={handleNewPost} />
        <div className="row">
          {getVisiblePosts().map((post) => {
            return (
              <div className="col-lg-4 col-md-6 mb-4" key={post._id}>
                <PostCard post={post} />
              </div>
            );
          })}
        </div>
        {visiblePosts < totalPosts && (
          <div className="text-center">
            <button className="btn btn-secondary mb-5" onClick={handleLoadMore}>LOAD MORE</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
