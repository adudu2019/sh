import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./admin/Admin";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import HomePage from "./Pages/HomePage";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import AuthRoute from "./Auth/AuthRoute";
import User from "./Pages/User";
import AuthAdmin from "./Auth/AuthAdmin";
import DetailPage from "./Pages/DetailPage";
import OrderPage from "./Pages/OrderPage";
import Pesanan from "./components/TableComponets/Pesanan";
import HistoryPesanan from "./components/TableComponets/HistoryPesanan";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/pesanan" element={<Pesanan />} />
        <Route path="/history" element={<HistoryPesanan />} />

        <Route element={<AuthRoute />}>
          <Route path="/checkout" element={<OrderPage />} />
          <Route path="/profile" element={<User />} />
        </Route>

        <Route element={<AuthAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
