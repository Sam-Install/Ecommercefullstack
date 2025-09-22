import React from "react";
import { Link } from "react-router-dom"; 
import f1 from "../assets/floral1.jpg";
import f2 from "../assets/floral2.jpg";
import f3 from "../assets/floral3.jpg";
import f4 from "../assets/floral4.jpg";
import f5 from "../assets/floral5.jpg";
import pal from "../assets/palaso.jpg";
import it from "../assets/ital.jpg";

const Latest = () => {
  const features = [
    {
      id: 1,
      images: [f1],
      title: "Floral one",
      description: "Enjoy the beaches with floral",
      price: 1100,
    },
    {
      id: 2,
      images: [f2],
      title: "Floral two",
      description: "Enjoy the beaches and street vibe with florals",
      price: 1000,
    },
    {
      id: 3,
      images: [f3],
      title: "Floral three",
      description: "Enjoy the fashion with florals",
      price: 1300,
    },
    {
      id: 4,
      images: [f4],
      title: "Floral four",
      description: "Italian florals",
      price: 1000,
    },
    {
      id: 5,
      images: [f5],
      title: "Floral five",
      description: "Streets description floral",
      price: 1200,
    },
    {
      id: 6,
      images: [pal],
      title: "Palaso",
      description: "Enjoy Palaso",
      price: 1100,
    },
    {
      id: 7,
      images: [it],
      title: "Italian",
      description: "Enjoy italian jackets for men",
      price: 1000,
    },
  ];

  return (
    <div className="mt-10">
      <h1 className="mt-6 text-center text-2xl">Our Latest Collection</h1>
      <p className="mt-2 font-bold text-center mb-4">
        Explore Some of our wide range of thrift clothes
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link key={feature.id} to={`/product/${feature.id}`}>
            
            <div className="flex flex-col items-center bg-white shadow-lg rounded overflow-hidden hover:shadow-xl transition">
              {/* Main Image */}
              <img
                src={feature.images[0]}
                alt={feature.title}
                className="h-48 w-full object-cover"
              />

              {/* Info */}
              <div className="p-4 text-center">
                <h2 className="font-semibold">{feature.title}</h2>
                <p className="text-gray-600 text-sm">{feature.description}</p>

                <div className="flex items-center justify-between mt-4 gap-2">
                  <p className="font-bold text-blue-600">Ksh {feature.price}</p>
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
