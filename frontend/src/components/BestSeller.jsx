import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import b4 from "../assets/b4.jpg";
import b5 from "../assets/b5.jpg";

const BestSeller = () => {
  const { addToCart } = useCart();

  
  const [popup, setPopup] = useState({ visible: false, message: "" });

  const bestsellers = [
    { id: 1, img: b1, title: "Men official", description: "Mens official shirts", price: 800 },
    { id: 2, img: b2, title: "Unisex official", description: "Unisex official shirts", price: 1400 },
    { id: 3, img: b3, title: "White shirts", description: "Unisex white shirts", price: 1500 },
    { id: 4, img: b4, title: "Patched shirts", description: "Patched shirts", price: 1300 },
    { id: 5, img: b5, title: "Light blue official", description: "Unisex blue shirts", price: 1200 },
  ];

  
  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    setPopup({ visible: true, message: `${product.title} added to cart!` });

    
    setTimeout(() => {
      setPopup({ visible: false, message: "" });
    },4000);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
        {bestsellers.map((bestseller) => (
          <div
            key={bestseller.id}
            className="flex flex-col bg-white text-center shadow-lg rounded overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={bestseller.img}
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
        ))}
      </div>

      {/* Tailwind animation */}
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
