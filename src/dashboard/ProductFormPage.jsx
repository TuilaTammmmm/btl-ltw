import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.get('http://localhost:9999/account');
      const account = res.data.adminacc;

      if (username === account.username && password === account.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminUsername', username);
        navigate('/dashboard');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không chính xác!');
      }
    } catch (err) {
      console.error('Lỗi:', err);
      setError('Không thể kết nối đến máy chủ. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Container className="d-flex justify-content-center align-items-center">
        <Card style={{ width: '100%', maxWidth: '450px' }} className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <div 
                className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                style={{ width: '70px', height: '70px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
              </div>
              <h2 className="fw-bold text-primary">Admin Login</h2>
              <p className="text-muted">Đăng nhập để quản lý cửa hàng</p>
            </div>

            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="py-2"
                  required
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-2"
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  type="submit" 
                  size="lg"
                  disabled={loading}
                  className="py-2 fw-semibold"
                >
                  {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="lg"
                  className="py-2 fw-semibold mt-2"
                  onClick={() => navigate('/')}
                >
                  Quay lại Trang chủ
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;