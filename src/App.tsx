import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import { Contact } from "lucide-react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetail from "./components/ProductDetail";
import Category from "./pages/Category";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category" element={<Category />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
