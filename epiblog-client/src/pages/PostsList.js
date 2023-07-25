import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blocks } from  'react-loader-spinner'
import '../styles/Loader.css'


const PostsList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`,{
      headers:{
        "auth": JSON.parse(localStorage.getItem("loggedIn")).token
        }
    });
    const data = await response.json()
    if(response.ok){
    setData(data)
    setTotalPosts(data.posts.length)
    }
    setIsLoading(false)
  };

  const handleLoadMore = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 3);
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
      <NavigationBar currentPage="posts" />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Posts list</h1>
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
            <button className="btn btn-secondary mb-5" onClick={handleLoadMore}>Load more</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PostsList;



