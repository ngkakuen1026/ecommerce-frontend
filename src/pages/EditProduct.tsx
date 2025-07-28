import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authAxios from "../services/authAxios";
import { categoryAPI } from "../services/http-api";
import type { Product } from "../types/product";
import ProductBreadcrumb from "../components/Dashboard/Products/EditProduct/ProductBreadcrumb";
import TinyMCEEditor from "../components/Reuseable/TinyMCEEditor";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    authAxios
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch(() => setError("Failed to fetch product"))
      .finally(() => setLoading(false));

    authAxios
      .get(`${categoryAPI.url}`)
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => {});
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!product) return;
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "category_id" ? Number(value) : value,
    });
  };

  const handleEditorChange = (content: string) => {
    if (!product) return;
    setProduct({ ...product, description: content });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSaving(true);
    setError("");
    try {
      await authAxios.patch(`/products/${product.id}/update`, {
        title: product.title,
        description: product.description,
        category_id: Number(product.category_id),
        quantity: Number(product.quantity),
        status: product.status,
        price: Number(product.price),
      });
      navigate(-1);
    } catch {
      setError("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product) return <div className="p-6">Product not found.</div>;

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Product</h1>
      <ProductBreadcrumb
        onBack={() => navigate(-1)}
        productTitle={product.title}
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side */}
          <div className="space-y-6">
            <div className="border rounded-md p-4 space-y-3">
              <h2 className="font-semibold text-gray-800">Name and Description</h2>
              <div>
                <label className="text-gray-500">Product Name</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Product Name"
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-gray-500">Product Description</label>
                <TinyMCEEditor
                  value={product.description}
                  onEditorChange={handleEditorChange}
                />
              </div>
            </div>

            <div className="border rounded-md p-4 space-y-3">
              <h2 className="font-semibold text-gray-800">Category</h2>
              <select
                className="w-full border rounded px-3 py-2"
                name="category_id"
                value={product.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            <div className="border rounded-md p-4 space-y-3">
              <h2 className="font-semibold text-gray-800">Product Pricing</h2>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Price"
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="border rounded-md p-4 space-y-3">
              <h2 className="font-semibold text-gray-800">Available Stock</h2>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Product Stock"
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="border rounded-md p-4 space-y-3">
              <h2 className="font-semibold text-gray-800">Status</h2>
              <select
                className="w-full border rounded px-3 py-2"
                name="status"
                value={product.status}
                onChange={handleChange}
                required
              >
                <option value="available">Available</option>
                <option value="out of stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        <div className="flex gap-4 justify-end mt-6">
          <button
            type="button"
            className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => navigate(-1)}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;