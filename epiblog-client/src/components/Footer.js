import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
  const [isFooterFixed, setIsFooterFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      setIsFooterFixed(scrollHeight > clientHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      style={{
        backgroundColor: '#D9D9D9',
        position: isFooterFixed ? 'sticky' : 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
      expand="lg"
    >
      <Nav className="mx-auto">
        <Nav.Link href="#">Informative</Nav.Link>
        <Nav.Link href="#">Terms of Service</Nav.Link>
        <Nav.Link href="#">Privacy policy</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Footer;


