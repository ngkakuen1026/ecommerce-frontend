import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Product, ProductImage } from "../types/product";
import type { Categories } from "../types/category";
import { categoryAPI, prodcutAPI } from "../services/http-api";
import { Star } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Categories | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${prodcutAPI.url}/${id}`)
      .then((res) => {
        const product = res.data.product;
        setProduct(product);
        setSelectedImage(product.images[0]?.image_url);
        return axios.get(`${categoryAPI.url}/${product.category_id}`);
      })
      .then((res) => {
        setCategory(res.data.category);
      })
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <img
          src={selectedImage}
          alt={product.title}
          className="w-full h-[500px] object-contain mb-4 rounded border"
        />
        <div className="flex gap-4">
          {product.images.map((img: ProductImage) => (
            <img
              key={img.id}
              src={img.image_url}
              onClick={() => setSelectedImage(img.image_url)}
              alt="Thumbnail"
              className={`w-36 h-36 object-cover rounded border cursor-pointer ${
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
        <p className="text-gray-500">
          Categories &gt; {category?.name} &gt; {product.title}
        </p>
        <h1 className="text-3xl font-bold">{product.title}</h1>

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

        <div className="mt-6 text-gray-700 space-y-4 leading-relaxed">
          {product.description}
        </div>

        <div className="text-2xl font-semibold text-gray-900">
          ${product.price}
        </div>

        <button className="w-1/4 bg-blue-400 hover:bg-blue-500 text-black font-semibold py-3 rounded">
          ADD TO CART
        </button>
      </div>

      <div className="lg:col-span-2 mt-12">
        <div className="border-b border-gray-300 flex gap-10 text-lg font-medium">
          <button className="py-2 border-b-2 border-blue-400 text-gray-800">
            User Comments
          </button>
        </div>
        <div className="mt-6 text-gray-700 space-y-4 leading-relaxed">
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
