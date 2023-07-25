import React, { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blocks } from 'react-loader-spinner'
import '../styles/Loader.css'


const UsersList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleUsers, setVisibleUsers] = useState(3);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(`${process.env.REACT_API_URL}/users`, {
      headers: {
        "auth": JSON.parse(localStorage.getItem("loggedIn")).token
      }
    });
    const data = await response.json()
    if (response.ok) {
      setData(data)
      setTotalUsers(data.users.length)
    }
    setIsLoading(false)
  };

  const handleLoadMore = () => {
    setVisibleUsers(prevVisibleUsers => prevVisibleUsers + 3);
  };

  const getVisibleUsers = () => {
    if (data?.users) {
      return data.users.slice(0, visibleUsers);
    }
    return [];
  };

  if (isLoading) {
    return <div className="loader-container">
    { isLoading && (
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
      <NavigationBar currentPage="users" />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Users list</h1>
        <div className="row">
          {getVisibleUsers().map((user) => {
            return (
              <div className="col-lg-4 col-md-6 mb-4" key={user._id}>
                <UserCard user={user} />
              </div>
            );
          })}
        </div>
        { visibleUsers < totalUsers && (
          <div className="text-center">
            <button className="btn btn-secondary mb-5" onClick={handleLoadMore}>Load more</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UsersList;
