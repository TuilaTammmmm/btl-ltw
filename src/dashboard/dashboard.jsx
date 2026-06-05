import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct, getPayments, updatePayment } from "../api/configApi";
import { Button, Table, Row, Col, Badge, Form } from "react-bootstrap";

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("products");
    const navigate = useNavigate();

    const loadData = async () => {
        const res = await getProducts();
        setProducts(res.data);
    };

    const loadOrders = async () => {
        try {
            const res = await getPayments();
            setOrders(res.data);
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const orderToUpdate = orders.find(o => o.id === id);
        if (!orderToUpdate) return;

        const updatedOrder = { ...orderToUpdate, status: newStatus };
        try {
            await updatePayment(id, updatedOrder);
            setOrders(orders.map(o => o.id === id ? updatedOrder : o));
        } catch (err) {
            console.error(err);
            alert("Lỗi cập nhật trạng thái");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('adminUsername');
        navigate('/login');
    };

    const formatDateTime = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return `${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} ${date.toLocaleDateString('vi-VN')}`;
    };

    useEffect(() => {
        loadData();
        loadOrders();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            await deleteProduct(id);
            loadData();
        }
    };

    // Bản đồ chuyển đổi từ Category_ID sang tên danh mục hiển thị dạng văn bản
    const categoryMap = {
        "1": "Bánh Kem",
        "2": "Bánh Mì & Bánh Ngọt",
        "3": "Bánh Quy & Kẹo",
        "4": "Bánh Mousse & Cheesecake",
        "5": "Bánh Tart & Pie"
    };

    return (
        <div className="container-fluid p-0 min-vh-100 bg-light" style={{ fontFamily: "sans-serif" }}>
            <Row className="g-0 min-vh-100">


                <Col md={2} className="bg-dark text-white p-3 shadow d-flex flex-column" style={{ backgroundColor: "#1e2229" }}>
                    <div className="text-center py-3 mb-4 border-bottom border-secondary">
                        <h4 className="fw-bold m-0" style={{ letterSpacing: "1px" }}>Admin Panel</h4>
                    </div>
                    <div className="d-flex flex-column gap-2">

                        <Button
                            variant={activeTab === "products" ? "primary" : "link"}
                            className={`text-start w-100 py-2 px-3 fw-semibold ${activeTab === "products" ? "border-0 shadow-sm" : "text-white-50 text-decoration-none btn-sidebar-hover"}`}
                            style={{ borderRadius: "8px" }}
                            onClick={() => setActiveTab("products")}
                        >
                            Quản lý Sản phẩm
                        </Button>

                        <Button
                            variant={activeTab === "orders" ? "primary" : "link"}
                            className={`text-start w-100 py-2 px-3 fw-semibold ${activeTab === "orders" ? "border-0 shadow-sm" : "text-white-50 text-decoration-none btn-sidebar-hover"}`}
                            style={{ borderRadius: "8px" }}
                            onClick={() => setActiveTab("orders")}
                        >
                            Quản lý Đơn hàng
                        </Button>
                    </div>

                    <div className="mt-auto pt-3 border-top border-secondary">
                        <Button
                            variant="outline-light"
                            className="w-100 fw-semibold"
                            onClick={handleLogout}
                            style={{ borderRadius: "8px" }}
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </Col>


                <Col md={10} className="p-4">
                    {activeTab === "products" ? (
                        <>
                            {/* Phần Thanh Tiêu Đề */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold text-dark m-0">Quản lý Sản phẩm</h3>
                                <Button
                                    variant="success"
                                    className="fw-semibold px-3 py-2 shadow-sm d-flex align-items-center gap-1"
                                    style={{ backgroundColor: "#0f8a5f", borderColor: "#0f8a5f", borderRadius: "6px" }}
                                    onClick={() => navigate("/dashboard/product/add")}
                                >
                                    + Thêm Sản phẩm
                                </Button>
                            </div>


                            <div className="bg-white rounded shadow-sm overflow-hidden p-3">
                                <Table hover responsive className="align-middle mb-0 text-nowrap">
                                    <thead>
                                        <tr className="text-secondary border-bottom" style={{ fontSize: "14px" }}>
                                            <th className="fw-bold" style={{ width: "60px" }}>ID</th>
                                            <th className="fw-bold" style={{ width: "100px" }}>Hình ảnh</th>
                                            <th className="fw-bold">Tên sản phẩm</th>
                                            <th className="fw-bold">Danh mục</th>
                                            <th className="fw-bold" style={{ width: "150px" }}>Giá</th>
                                            <th className="fw-bold text-center" style={{ width: "150px" }}>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4 text-muted">
                                                    Không có dữ liệu sản phẩm.
                                                </td>
                                            </tr>
                                        ) : (
                                            products?.map((p) => (
                                                <tr key={p.id} className="border-bottom-0">

                                                    <td className="text-secondary">{p.id}</td>


                                                    <td>
                                                        <img
                                                            src={p.Image}
                                                            alt={p.Name}
                                                            className="rounded shadow-sm"
                                                            width={50}
                                                            height={50}
                                                            style={{ objectFit: "cover" }}
                                                            onError={(e) => { e.target.src = "https://placehold.co/50"; }}
                                                        />
                                                    </td>


                                                    <td className="fw-semibold text-dark">{p.Name}</td>


                                                    <td>
                                                        <Badge
                                                            bg="secondary"
                                                            className="text-white px-2 py-1 fw-normal"
                                                            style={{ backgroundColor: "#8a94a6", fontSize: "12px", borderRadius: "4px" }}
                                                        >
                                                            {categoryMap[p.Category_ID] || `Mã: ${p.Category_ID}`}
                                                        </Badge>
                                                    </td>

                                                    {/* Cột Giá tiền (Màu đỏ sẫm đặc trưng) */}
                                                    <td className="fw-bold" style={{ color: "#c83232" }}>
                                                        {p.Price?.toLocaleString("vi-VN")}đ
                                                    </td>


                                                    <td>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline-primary"
                                                                className="px-2 py-1 fw-medium"
                                                                style={{ fontSize: "13px", borderRadius: "4px" }}
                                                                onClick={() => navigate(`/dashboard/product/edit/${p.id}`)}
                                                            >
                                                                Sửa
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline-danger"
                                                                className="px-2 py-1 fw-medium"
                                                                style={{ fontSize: "13px", borderRadius: "4px" }}
                                                                onClick={() => handleDelete(p.id)}
                                                            >
                                                                Xóa
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold text-dark m-0">Quản lý Đơn hàng</h3>
                            </div>
                            <div className="bg-white rounded shadow-sm overflow-hidden p-3">
                                <Table hover responsive className="align-middle mb-0 text-nowrap">
                                    <thead>
                                        <tr className="text-secondary border-bottom bg-light" style={{ fontSize: "14px" }}>
                                            <th className="fw-bold px-3">Mã ĐH</th>
                                            <th className="fw-bold">Thời gian</th>
                                            <th className="fw-bold">Khách hàng</th>
                                            <th className="fw-bold">Món ăn</th>
                                            <th className="fw-bold">Tổng tiền</th>
                                            <th className="fw-bold">Trạng thái</th>
                                            <th className="fw-bold px-3">Cập nhật</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4 text-muted">
                                                    Chưa có đơn hàng nào.
                                                </td>
                                            </tr>
                                        ) : (
                                            orders?.map((o) => (
                                                <tr key={o.id} className="border-bottom">
                                                    <td className="text-primary fw-medium px-3">#{o.id}</td>
                                                    <td className="text-muted" style={{ fontSize: "13px" }}>
                                                        {formatDateTime(o.createdAt)}
                                                    </td>
                                                    <td>
                                                        <div className="fw-semibold text-dark">{o.customerName}</div>
                                                        <div className="text-muted" style={{ fontSize: "13px" }}>{o.phone}</div>
                                                        <div className="text-muted" style={{ fontSize: "13px" }}>{o.address}</div>
                                                    </td>
                                                    <td>
                                                        {o.items?.map((item, idx) => (
                                                            <div key={idx} style={{ fontSize: "13px" }}>
                                                                {item.quantity}x {item.name}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td>
                                                        <div className="fw-bold" style={{ color: "#c83232" }}>
                                                            {o.totalAmount?.toLocaleString("vi-VN")}đ
                                                        </div>
                                                        <div className="text-muted mt-1" style={{ fontSize: "12px", fontStyle: "italic" }}>
                                                            {o.paymentMethod || "Tiền mặt"}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Badge bg={
                                                            o.status === "Đang xử lý" ? "warning" :
                                                                o.status === "Đang giao" ? "info" :
                                                                    o.status === "Đã giao" ? "success" : "secondary"
                                                        } className={o.status === "Đang xử lý" ? "text-dark" : "text-white"}>
                                                            {o.status || "Đang xử lý"}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-3" style={{ minWidth: "140px" }}>
                                                        <Form.Select
                                                            size="sm"
                                                            value={o.status || "Đang xử lý"}
                                                            onChange={(e) => handleStatusChange(o.id, e.target.value)}
                                                            className="shadow-sm cursor-pointer"
                                                        >
                                                            <option value="Đang xử lý">Đang xử lý</option>
                                                            <option value="Đang giao">Đang giao</option>
                                                            <option value="Đã giao">Đã giao</option>
                                                            <option value="Đã hủy">Đã hủy</option>
                                                        </Form.Select>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    )}
                </Col>
            </Row>


            <style>{`
                .btn-sidebar-hover:hover {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    color: #fff !important;
                }
                .table th, .table td {
                    padding: 12px 16px !important;
                }
            `}</style>
        </div>
    );
}

export default Dashboard;