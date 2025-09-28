import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const BestSeller = () => {
  const { addToCart } = useCart();

  const [popup, setPopup] = useState({ visible: false, message: "" });
  const [bestsellers, setBestsellers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch from backend
    fetch("http://127.0.0.1:8000/api/items")  
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        // adjust depending on your API response shape
        const list = json.data ?? json.items ?? json;
        setBestsellers(list);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setPopup({ visible: true, message: `${product.title} added to cart!` });
    setTimeout(() => {
      setPopup({ visible: false, message: "" });
    }, 4000);
  };

  return (
    <div className="mt-10 relative">
      {popup.visible && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
          {popup.message}
        </div>
      )}

      <h1 className="text-center text-2xl font-bold">Our Best Sellers</h1>
      <p className="text-center mt-2 text-gray-600">
        Most purchased products and ordered products from our thrift shop
      </p>

      {error && (
        <div className="mt-4 text-red-500 text-center">
          Error loading bestsellers: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
        {bestsellers.length > 0 ? (
          bestsellers.map((bestseller) => (
            <div
              key={bestseller.id}
              className="flex flex-col bg-white text-center shadow-lg rounded overflow-hidden hover:shadow-xl transition"
            >
              {/* adjust the image src to point to correct path */}
              <img
                src={bestseller.image
                  ? `http://127.0.0.1:8000/uploads/${bestseller.image}`
                  : ""
                }
                alt={bestseller.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h1 className="font-bold">{bestseller.title}</h1>
                <p className="text-gray-500 text-sm">{bestseller.description}</p>
              </div>

              <div className="flex items-center justify-between px-4 pb-4">
                <p className="font-semibold">Ksh {bestseller.price}</p>
                <button
                  onClick={() => handleAddToCart(bestseller)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-8">
            No bestsellers to show
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; }
            100% { opacity: 0; transform: translateY(-10px); }
          }
          .animate-fade-in-out {
            animation: fadeInOut 2s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default BestSeller;
