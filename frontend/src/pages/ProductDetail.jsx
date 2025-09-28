import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();

        if (data.status && data.product) {
          setProduct(data.product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  if (!product) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
        <Link to="/products" className="text-blue-500 underline mt-4 block">
          ← Back to Products
        </Link>
      </div>
    );
  }

  // ✅ Use the same logic as Show.jsx and Products.jsx for images
  const imageUrl = product.image
    ? `http://127.0.0.1:8000/storage/${product.image}`
    : "/placeholder.png";

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <Link to="/products" className="text-blue-500 underline mb-6 inline-block">
        ← Back to Products
      </Link>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <img
          src={imageUrl}
          alt={product.title}
          className="rounded-lg w-full max-h-96 object-cover mb-6"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />
        <h2 className="text-3xl font-bold mb-3">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600">
          Ksh {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
