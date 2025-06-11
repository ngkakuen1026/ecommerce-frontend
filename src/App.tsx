import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Profile from "./pages/Profile";

const AppContent = () => {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/register"];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/user/profile" element={<Profile />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
