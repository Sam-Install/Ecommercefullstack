import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Show = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.products && Array.isArray(data.products)) {
        setItems(data.products);
      } else if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE PRODUCT FUNCTION
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete: ${errorText}`);
      }

      const result = await response.json();
      alert(result.message || 'Product deleted successfully');

      // Refresh list after deleting
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete product');
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Link to="/admin/create/">
          <button className="bg-blue-500 px-8 py-2 rounded">Create</button>
        </Link>
        <Link to="/dashboard">
          <button className="bg-red-600 px-8 py-2 rounded">Back</button>
        </Link>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">{item.title}</td>
                <td className="px-4 py-2 border">{item.description}</td>
                <td className="px-4 py-2 border">
                  {item.image ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/${item.image}`}
                      alt={item.title}
                      className="h-16 w-16 object-cover"
                    />
                  ) : (
                    <span>—</span>
                  )}
                </td>
                <td className="px-4 py-2 border">{item.price}</td>
                <td className="px-4 py-2 border space-x-2">
                  <Link to={`/admin/edit/${item.id}`}>
                    <button className="bg-green-500 text-white text-sm px-4 py-2 rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white text-sm px-4 py-2 rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">
                No items available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Show;
