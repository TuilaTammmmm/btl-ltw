import Profilecard from "./components/profilecard";
import Footer from "./components/footer";
import Trangchu from "./page/trangchu";
import Giaodich from "./page/giaodich";
import Gioithieu from "./page/gioithieu";
import Thanhtoan from "./page/thanhtoan";
import Vanchuyen from "./page/vanchuyen";
import Dashboard from "./dashboard/dashboard";
import ProductFormPage from "./dashboard/ProductFormPage";
import Payment from "./components/payment";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Login from "./dashboard/ProductFormPage";
function App() {
  return (
    <BrowserRouter>
      <Container className='d-flex flex-column min-vh-100 p-0'>
        <Profilecard />
        <main className='flex-grow-1 my-4'>
          <Routes>
            <Route path='/' element={<Trangchu />} />
            <Route path='/vanchuyen' element={<Vanchuyen />} />
            <Route path='/gioithieu' element={<Gioithieu />} />
            <Route path='/giaodich' element={<Giaodich />} />
            <Route path='/thanhtoan' element={<Thanhtoan />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/product/add' element={<ProductFormPage />} />
            <Route path='/dashboard/product/edit/:id' element={<ProductFormPage />} />
            <Route path='/payment' element={<Payment />} />
          </Routes>
        </main>
        <Footer />
      </Container>
    </BrowserRouter>
    
  );
}

export default App;
