import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Toast } from '../utils/notifications';
import { Toaster } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const successToast = new Toast('Successful login');
  const errorToast = new Toast('Login failed');

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedIn'));
    if (user?.email && user?.email.length > 0) {
      successToast.success('Successful login');
      setTimeout(() => {
        navigate('/homepage', { replace: true });
      }, 1500);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed: an error occurred');
      }

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        const user = jwtDecode(token);
        localStorage.setItem('loggedIn', JSON.stringify({ token, user }));
        successToast.success('Successful login');
        setTimeout(() => {
          navigate('/homepage', { replace: true });
        }, 1500);
      }
    } catch (error) {
      setError(`Invalid email or password`)
      errorToast.error('Login failed')
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGitHub = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/github`;
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Container fluid className="d-flex justify-content-center align-items-center vh-100">
        <Card>
          <Card.Body>
            <h4 className="card-title text-center mb-4">Login</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="text-center mb-3">
                <img
                  src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-29.png"
                  alt="Login Icon"
                  className="img-fluid w-50"
                  style={{ maxWidth: '200px' }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digit your email..."
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digit your password..."
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              {error && <div className="text-danger mb-3">{error}</div>}
              <div className="text-center">
                <Button variant="primary" type="submit" className="m-2" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Log In'}
                </Button>
                <Button variant="danger" type="submit">
                  Sign Up
                </Button>
                <div className="text-center">
                  <Button
                    onClick={handleLoginWithGitHub}
                    variant="dark"
                    className="m-2"
                    style={{
                      backgroundSize: '20px 20px',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  >
                    GitHub login
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;

