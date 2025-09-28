import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Latest = () => {
  const [latestItems, setLatestItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/itemsl")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setLatestItems(data.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch latest error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="mt-10">
      <h1 className="mt-6 text-center text-2xl">Our Latest Collection</h1>
      <p className="mt-2 font-bold text-center mb-4">
        Explore some of our wide range of thrift clothes
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestItems.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`}>
            <div className="flex flex-col items-center bg-white shadow-lg rounded overflow-hidden hover:shadow-xl transition">
              {/* Main Image */}
              <img
                src={item.image ? `http://127.0.0.1:8000/uploads/${item.image}` : "/placeholder.jpg"}
                alt={item.title}
                className="h-48 w-full object-cover"
              />

              {/* Info */}
              <div className="p-4 text-center">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>

                <div className="flex items-center justify-between mt-4 gap-2">
                  <p className="font-bold text-blue-600">Ksh {item.price}</p>
                  <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600">
                    View
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Latest;
