import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; 

const Checkout = () => {
  const { cart } = useCart();
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!phone || phone.length < 10) {
      setMessage("Enter a valid phone number");
      return;
    }
    setProcessing(true);
    setMessage("Preparing payment...");

    // sam call Laravel API here later on
    setTimeout(() => {
      setProcessing(false);
      setMessage("M-Pesa request would be sent here!");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × Ksh {item.price}
              </p>
            </div>
            <p className="font-semibold">Ksh {item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total:</span>
        <span>Ksh {total}</span>
      </div>

      {/* Phone Input */}
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter M-Pesa Phone Number"
        className="border p-2 w-full rounded mb-4"
      />

      {/* Pay Button */}
      <button
        onClick={handleCheckout}
        disabled={processing}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 disabled:opacity-50 mb-4"
      >
        {processing ? "Processing..." : "Proceed to Pay"}
      </button>

      {/* Continue Shopping Button */}
      <Link
        to="/products"
        className="block text-center bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
      >
        Continue Shopping
      </Link>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default Checkout;
