import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types/product";
import type { Categories } from "../types/category";
import type { UserType } from "../types/user";
import type { ProductReviewType } from "../types/productReview";
import { categoryAPI, productAPI, userAPI } from "../services/http-api";
import ProductImages from "../components/ProductDetail/ProductImages";
import ProductBreadcrumb from "../components/ProductDetail/ProductBreadcrumb";
import ProductMeta from "../components/ProductDetail/ProductMeta";
import ProductActions from "../components/ProductDetail/ProductAction";
import ProductReview from "../components/ProductDetail/ProductReview";
import authAxios from "../services/authAxios";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Categories | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    authAxios
      .get(`${productAPI.url}/${id}`)
      .then((res) => {
        const product = res.data.product;
        setProduct(product);
        setSelectedImage(product.images[0]?.image_url);
        return Promise.all([
          axios.get(`${categoryAPI.url}/${product.category_id}`),
          axios.get(`${userAPI.url}/${product.user_id}`),
          axios.get(`${productAPI.url}/${product.id}/reviews`), // Fetch reviews
        ]);
      })
      .then(([categoryRes, userRes, reviewsRes]) => {
        setCategory(categoryRes.data.category);
        setUser(userRes.data.users?.[0]);

        const enrichedReviews: ProductReviewType[] = reviewsRes.data.reviews; // Use the defined type
        if (enrichedReviews.length > 0) {
          const totalRating = enrichedReviews.reduce(
            (sum: number, r: ProductReviewType) => sum + r.rating,
            0
          );
          setAverageRating(totalRating / enrichedReviews.length);
        }
      })
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-white px-6 py-10">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductImages
          product={product}
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
        />
        <div className="space-y-6">
          <ProductBreadcrumb
            category={category}
            productTitle={product.title}
            onBack={() => navigate(-1)}
          />
          <ProductMeta
            product={product}
            user={user}
            averageRating={averageRating}
          />{" "}
          {/* Pass average rating */}
          <ProductActions />
        </div>
        <div className="lg:col-span-2 space-y-10">
          <ProductReview productId={product.id.toString()} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
