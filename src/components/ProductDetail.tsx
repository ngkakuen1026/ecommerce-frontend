import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Product, ProductImage } from "../types/product";
import type { Categories } from "../types/category";
import type { UserType } from "../types/user";
import { categoryAPI, prodcutAPI, userAPI } from "../services/http-api";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProductReview from "./ProductReview";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Categories | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${prodcutAPI.url}/${id}`)
      .then((res) => {
        const product = res.data.product;
        setProduct(product);
        setSelectedImage(product.images[0]?.image_url);

        return Promise.all([
          axios.get(`${categoryAPI.url}/${product.category_id}`),
          axios.get(`${userAPI.url}/${product.user_id}`),
        ]);
      })
      .then(([categoryRes, userRes]) => {
        setCategory(categoryRes.data.category);
        setUser(userRes.data.users?.[0]); //Access first item of: username
      })
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  useEffect(()=> {

  })

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 max-w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.title}
            className="md:w-full md:h-[500px] object-contain mb-4 rounded border w-1/2"
          />
        ) : (
          <div className="w-1/2 h-[500px] flex items-center justify-center bg-gray-100 text-gray-500 rounded border">
            No image available
          </div>
        )}
        <div className="flex gap-4">
          {product.images.map((img: ProductImage) => (
            <img
              key={img.id}
              src={img.image_url}
              onClick={() => setSelectedImage(img.image_url)}
              alt="Thumbnail"
              className={`w-24 h-24 object-cover rounded border cursor-pointer transition delay-75 hover:-translate-y-1 hover:scale-110 md:w-36 md:h-36 ${
                selectedImage === img.image_url
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="space-y-6">
        <div className="flex justify-between gap-2">
          <p className="text-gray-500 items-center">
            <Link to={`/categories`} className="hover:opacity-50">
              Categories
            </Link>{" "}
            &gt;{" "}
            <Link
              to={`/categories/${category?.name}`}
              className="hover:opacity-50"
            >
              {category?.name}
            </Link>{" "}
            &gt; {product.title}
          </p>
          <button
            onClick={handleGoBack}
            className="text-gray-500 cursor-pointer hover:underline"
          >
            Back
          </button>
        </div>

        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="flex items-center">
          <h1 className="text-base font-light">
            Posted at:{" "}
            <span className="italic">
              {new Date(product.created_at).toLocaleDateString("en-GB")}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-light">
            Uploaded by{" "}
            <Link to="/" className="hover:opacity-50">
              {user?.username}
            </Link>
          </h1>
          <img
            src={user?.profile_image ?? "/default-avatar.png"}
            alt="user profile image"
            className="h-10 w-10 rounded-full md:h-12 md:w-12 object-cover"
          />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-blue-500">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-500 stroke-yellow-500"
              />
            ))}
          <span className="text-sm text-gray-600 ml-2">2,975,130 Reviews</span>
        </div>

        <div className="mt-6 text-gray-700 space-y-4 leading-relaxed text-2xl">
          {product.description}
        </div>

        <div className="text-2xl font-semibold text-gray-900">
          ${product.price}
        </div>

        <button className="w-1/4 bg-blue-400 hover:bg-blue-500 text-black font-semibold py-3 rounded">
          ADD TO CART
        </button>
      </div>

      <div className="lg:col-span-2 space-y-10 ">
        <ProductReview productId={product.id.toString()} />
      </div>
    </div>
  );
};

export default ProductDetail;
