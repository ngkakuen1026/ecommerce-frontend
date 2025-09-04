import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types/product";
import Spinner from "../components/Reuseable/Spinner";
import AdminProductDataBreadcrumb from "../components/AdminPanel/AdminProductList/AdminProductData/AdminProductDataBreadcrumb";
import authAxios from "../services/authAxios";
import { categoryAPI, productAPI } from "../services/http-api";
import AdminProductImage from "../components/AdminPanel/AdminProductList/AdminProductData/AdminProductImage";
import AdminProductInfo from "../components/AdminPanel/AdminProductList/AdminProductData/AdminProductInfo";
import type { Categories } from "../types/category";

const AdminProductData = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //For two child components usage
  const [isEditing, setIsEditing] = useState(false);
  const [pendingImages, setPendingImages] = useState<File[]>([]);

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string>("");

  const fetchProductData = async () => {
    try {
      const response = await authAxios.get(`${productAPI.url}/admin/all-products/product/${id}`);
      const productData = response.data.product;

      if (productData.images && productData.images.length > 0) {
        setSelectedImage(productData.images[0].image_url);
      } else {
        setSelectedImage(
          "https://commercial.bunn.com/img/image-not-available.png"
        );
      }

      console.log("[Admin] Product data fetched successfully", response.data);
      setProduct(productData);
    } catch (error) {
      console.error("[Admin] Error fetching product data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await authAxios.get(`${categoryAPI.url}`);
      console.log(
        "[Admin] Categories data fetched successfully",
        response.data
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("[Admin] Error fetching categories data", error);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchCategories();
  }, [id]);

  const onBack = () => {
    navigate(-1);
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      {isLoading ? (
        <Spinner />
      ) : product ? (
        <div>
          <h1 className="text-4xl font-semibold mb-4">
            Product Details for {product.title}
          </h1>
          <AdminProductDataBreadcrumb product={product} onBack={onBack} />
          <div className="flex flex-row gap-6">
            <AdminProductImage
              product={product}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
              isEditing={isEditing}
              pendingImages={pendingImages}
              onImageUpdated={fetchProductData}
            />

            <AdminProductInfo
              product={product}
              categories={categories}
              isEditing={isEditing}
              toggleEditing={toggleEditing}
              pendingImages={pendingImages}
              setPendingImages={setPendingImages}
              refetchProduct={fetchProductData}
            />
          </div>
        </div>
      ) : (
        <p>Products Not found.</p>
      )}
    </div>
  );
};

export default AdminProductData;
