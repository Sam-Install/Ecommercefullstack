import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "./Products"; 

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

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

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      {/* Back Button */}
      <Link to="/products" className="text-blue-500 underline mb-6 inline-block">
        ← Back to Products
      </Link>

      {/* Product Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <img
          src={product.img}
          alt={product.title}
          className="rounded-lg w-full max-h-96 object-cover mb-6"
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
