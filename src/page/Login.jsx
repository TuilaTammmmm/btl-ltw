import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

function Login() {
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); 
        setError("");       

        
        if (!username || !password) {
            setError("Vui lòng điền đầy đủ tài khoản và mật khẩu!");
            return;
        }

        try {
       
            const res = await axios.get("http://localhost:9999/account");
            const adminInfo = res.data?.adminacc;

            if (adminInfo && adminInfo.username === username && adminInfo.password === password) {
                alert("Đăng nhập thành công!");
                
              
                localStorage.setItem("isAdminLoggedIn", "true");
                
             
                window.location.href = "/dashboard"; 
            } else {
                setError("Tài khoản hoặc mật khẩu không chính xác!");
            }
        } catch (err) {
            console.error("Lỗi kết nối hệ thống:", err);
            setError("Không thể kết nối đến máy chủ API (Hãy kiểm tra json-server)!");
        }
    };

    return (
        <div 
            className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
            style={{ backgroundColor: "#f8f9fa", fontFamily: "sans-serif" }}
        >
      
            <Card 
                className="border-0 p-4" 
                style={{ 
                    width: "100%", 
                    maxWidth: "420px", 
                    borderRadius: "12px", 
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" 
                }}
            >
                <Card.Body>
                  
                    <h3 className="text-center fw-bold mb-4" style={{ color: "#0056b3" }}>
                        Admin Login
                    </h3>

                  
                    {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                    <Form onSubmit={handleLogin}>
                      
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label className="text-secondary small fw-medium">Tài khoản</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ padding: "10px", borderRadius: "6px" }}
                            />
                        </Form.Group>

                      
                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Label className="text-secondary small fw-medium">Mật khẩu</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ padding: "10px", borderRadius: "6px" }}
                            />
                        </Form.Group>

                      
                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 fw-semibold py-2"
                            style={{ 
                                backgroundColor: "#0d6efd", 
                                borderColor: "#0d6efd", 
                                borderRadius: "8px",
                                fontSize: "15px"
                            }}
                        >
                            Đăng Nhập
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;