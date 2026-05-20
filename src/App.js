import Profilecard from "./components/profilecard";
import Footer from "./components/footer";
import Trangchu from "./page/trangchu";
import Giaodich from "./page/giaodich";
import Gioithieu from "./page/gioithieu";
import Thanhtoan from "./page/thanhtoan";
import Vanchuyen from "./page/vanchuyen";
import Dashboard from "./dashboard/dashboard";
import Securitycheck from "./dashboard/securitycheck";
import Payment from "./components/payment";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from "react-bootstrap";
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
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/securitycheck' element={<Securitycheck />} />
            <Route path='/payment' element={<Payment />} />
          </Routes>
        </main>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
