import type { Product, ProductImage } from "../../types/product";

interface Props {
  product: Product;
  selectedImage: string;
  onSelect: (url: string) => void;
}

const ProductImages = ({ product, selectedImage, onSelect }: Props) => {
  return (
    <div>
      {selectedImage ? (
        <img
          src={selectedImage}
          alt={product.title}
          className="md:w-full md:h-[500px] object-contain mb-4 rounded border w-1/2"
        />
      ) : (
        <img
          src="https://commercial.bunn.com/img/image-not-available.png"
          className="md:w-full md:h-[500px] object-contain mb-4 rounded border w-1/2"
        />
      )}
      <div className="flex flex-wrap gap-4">
        {product.images.map((img: ProductImage) => (
          <img
            key={img.id}
            src={img.image_url}
            onClick={() => onSelect(img.image_url)}
            alt="Thumbnail"
            className={`w-24 h-24 object-cover rounded border cursor-pointer transition hover:scale-110 ${
              selectedImage === img.image_url
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
