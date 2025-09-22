import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import bik1 from "../assets/bikini1.jpg";
import bik2 from "../assets/bikini2.jpg";
import bik3 from "../assets/bikini3.jpg";
import bik4 from "../assets/bikini4.jpg";
import blk from "../assets/black.jpg";
import f1 from "../assets/F1.jpg";
import f2 from "../assets/F2.jpg";
import f3 from "../assets/F3.jpg";
import jeans1 from "../assets/jeans1.jpg";
import jeans2 from "../assets/jeans2.jpg";
import jeans3 from "../assets/jeans3.jpg";
import khak from "../assets/khaki.jpg";
import n1 from "../assets/n1.jpg";
import n2 from "../assets/n2.jpg";
import n3 from "../assets/n3.jpg";
import sh from "../assets/shorts.jpg";

const products = [
  { id: 1, img: bik1, title: "Bikini 1", description: "Summer ready bikini", price: 1200 },
  { id: 2, img: bik2, title: "Bikini 2", description: "Trendy beach style", price: 1100 },
  { id: 3, img: bik3, title: "Bikini 3", description: "Perfect for vacations", price: 1300 },
  { id: 4, img: bik4, title: "Bikini 4", description: "Classic black bikini", price: 1150 },
  { id: 5, img: blk, title: "Black Dress", description: "Elegant night out look", price: 2000 },
  { id: 6, img: f1, title: "Floral Dress 1", description: "Beautiful floral pattern", price: 1500 },
  { id: 7, img: f2, title: "Floral Dress 2", description: "Street style florals", price: 1450 },
  { id: 8, img: f3, title: "Floral Dress 3", description: "Casual and stylish", price: 1400 },
  { id: 9, img: jeans1, title: "Jeans 1", description: "High quality blue jeans", price: 2500 },
  { id: 10, img: jeans2, title: "Jeans 2", description: "Casual ripped jeans", price: 2600 },
  { id: 11, img: jeans3, title: "Jeans 3", description: "Classic fit denim", price: 2400 },
  { id: 12, img: khak, title: "Khaki Pants", description: "Comfy and stylish", price: 1900 },
  { id: 13, img: n1, title: "Nike 1", description: "Casual Nike shirt", price: 1800 },
  { id: 14, img: n2, title: "Nike 2", description: "Sporty and cool", price: 1700 },
  { id: 15, img: n3, title: "Nike 3", description: "Street fashion tee", price: 1600 },
  { id: 16, img: sh, title: "Shorts", description: "Perfect for summer", price: 900 },
];

const Products = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, value) }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });

    alert(`${quantity} x ${product.title} added to cart!`);
  };

  return (
    <div className="mt-10">
      <h1 className="text-center text-2xl mb-4">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center hover:scale-105 transition cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.img}
              alt={product.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 w-full text-center">
              <h2 className="font-semibold">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>

              <div className="flex flex-col items-center gap-2 mt-3">
                <span className="font-bold text-blue-600">
                  Ksh {product.price}
                </span>

                {/* Quantity Selector */}
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { products };
export default Products;
