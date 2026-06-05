import React, { useState, useEffect } from "react";
import { Breadcrumb, Form, Button, Container, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, addProduct, updateProduct } from "../api/configApi";

function ProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        Name: "",
        Price: "",
        Image: "",
        Category_ID: "1",
        Pmotangan: "",
        Pmotadaydu: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            loadProduct();
        }
    }, [id]);

    const loadProduct = async () => {
        try {
            const res = await getProductById(id);
            if (res.data) {
                setFormData({
                    Name: res.data.Name || "",
                    Price: res.data.Price || "",
                    Image: res.data.Image || "",
                    Category_ID: res.data.Category_ID || "1",
                    Pmotangan: res.data.Pmotangan || "",
                    Pmotadaydu: res.data.Pmotadaydu || ""
                });
            }
        } catch (error) {
            console.error("Lỗi khi tải thông tin sản phẩm:", error);
            alert("Không thể tải thông tin sản phẩm!");
            navigate("/dashboard");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "Price" ? Number(value) : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditMode) {
                await updateProduct(id, formData);
                alert("Cập nhật sản phẩm thành công!");
            } else {
                await addProduct(formData);
                alert("Thêm sản phẩm thành công!");
            }
            navigate("/dashboard");
        } catch (error) {
            console.error("Lỗi khi lưu sản phẩm:", error);
            alert("Có lỗi xảy ra khi lưu sản phẩm.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <Breadcrumb>
                <Breadcrumb.Item linkProps={{ className: 'text-dark text-decoration-none' }} onClick={() => navigate("/dashboard")} className="text-decoration-none">
                    Admin Panel
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    {isEditMode ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
                </Breadcrumb.Item>
            </Breadcrumb>

            <Card className="shadow-sm border-0 mt-3">
                <Card.Header className="bg-white border-bottom py-3">
                    <h4 className="m-0 fw-bold text-primary">
                        {isEditMode ? "Chỉnh sửa Thông tin Sản phẩm" : "Thêm Sản phẩm Mới"}
                    </h4>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label className="fw-semibold">Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                placeholder="Nhập tên sản phẩm..."
                                value={formData.Name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formPrice">
                                    <Form.Label className="fw-semibold">Giá (VNĐ)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="Price"
                                        placeholder="Ví dụ: 50000"
                                        value={formData.Price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formCategory">
                                    <Form.Label className="fw-semibold">Danh mục</Form.Label>
                                    <Form.Select
                                        name="Category_ID"
                                        value={formData.Category_ID}
                                        onChange={handleChange}
                                    >
                                        <option value="1">Bánh Kem</option>
                                        <option value="2">Bánh Mì & Bánh Ngọt</option>
                                        <option value="3">Bánh Quy & Kẹo</option>
                                        <option value="4">Bánh Mousse & Cheesecake</option>
                                        <option value="5">Bánh Tart & Pie</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label className="fw-semibold">URL Hình ảnh</Form.Label>
                            <Form.Control
                                type="text"
                                name="Image"
                                placeholder="https://example.com/image.jpg"
                                value={formData.Image}
                                onChange={handleChange}
                                required
                            />
                            {formData.Image && (
                                <div className="mt-3">
                                    <p className="text-muted mb-1" style={{ fontSize: '14px' }}>Preview:</p>
                                    <img
                                        src={formData.Image}
                                        alt="Preview"
                                        style={{ height: '100px', objectFit: 'cover', borderRadius: '6px' }}
                                        onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Invalid+Image"; }}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formDescShort">
                            <Form.Label className="fw-semibold">Mô tả ngắn</Form.Label>
                            <Form.Control
                                type="text"
                                name="Pmotangan"
                                placeholder="Nhập mô tả ngắn gọn..."
                                value={formData.Pmotangan}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formDescFull">
                            <Form.Label className="fw-semibold">Mô tả đầy đủ</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="Pmotadaydu"
                                placeholder="Nhập mô tả chi tiết..."
                                value={formData.Pmotadaydu}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => navigate("/dashboard")} disabled={loading}>
                                Hủy bỏ
                            </Button>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? "Đang lưu..." : "Lưu Sản Phẩm"}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProductFormPage;
