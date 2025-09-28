import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");
        const data = await res.json();

        if (data.status) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, value) }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });

    alert(`${quantity} x ${product.title} added to cart!`);
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="mt-10">
      <h1 className="text-center text-2xl mb-4">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col hover:scale-105 transition cursor-pointer"
          >
            <img
              src={`http://127.0.0.1:8000/storage/${product.image}`}
              alt={product.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 text-center">
              <h2 className="font-semibold">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>

              <div
                className="flex flex-col items-center gap-2 mt-3"
                onClick={(e) => e.preventDefault()} // stops link navigation for inner buttons
              >
                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleQuantityChange(
                        product.id,
                        (quantities[product.id] || 1) - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span>{quantities[product.id] || 1}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleQuantityChange(
                        product.id,
                        (quantities[product.id] || 1) + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
