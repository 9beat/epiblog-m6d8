import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login', { replace: true });
  };

  return (
    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
  );
};

export default Logout;
