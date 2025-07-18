import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import { Contact } from "lucide-react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import { MessageCircle } from "lucide-react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UserPublicProfile from "./pages/UserPublicProfile";
import AddProduct from "./pages/AddProduct";
import AddProductImages from "./components/AddProduct/AddProductImages";
import DashboardRoutes from "./pages/Dashboard";

const FloatingChatButton = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return null;

  return (
    <button className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition">
      <MessageCircle className="w-8 h-8" />
    </button>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/register", "/dashboard/*"];
  const shouldHideFooter =
    hideFooterPaths.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard");

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
        <Route path="/user/myprofile" element={<Profile />} />
        <Route path="/user/:username" element={<UserPublicProfile />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-images/:id" element={<AddProductImages />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
      <FloatingChatButton />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
