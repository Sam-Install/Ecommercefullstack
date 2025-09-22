import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 p-4">
        <h2 className="text-2xl font-bold text-center">Your Cart is Empty</h2>
        <Link
          to="/products"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white shadow rounded p-4 gap-4"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.img}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-500 text-sm sm:text-base">
                  Ksh {item.price}
                </p>
              </div>
            </div>

            {/* Quantity + Remove */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3 justify-center mb-2 sm:mb-0">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total */}
      <div className="mt-6 text-center sm:text-right">
        <h2 className="text-xl font-bold mb-4">Total: Ksh {total}</h2>
     <Link to='/check'>  <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full sm:w-auto">
          Proceed to Checkout
        </button></Link> 
      </div>
    </div>
  );
};

export default Cart;
