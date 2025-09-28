import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBestSeller = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState('');

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('price', price);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/items', {
        method: 'POST',
        body: formData,
     
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message || 'Failed to create bestseller');
      }

      const data = await response.json();
      console.log('Created:', data);

      
      navigate('/admin/showB/');

    } catch (error) {
      console.error('Error:', error.message);
      
    }

    // Reset form fields
    setTitle('');
    setDescription('');
    setImageFile(null);
    setPrice('');
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Create Bestseller</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-2 py-1"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-2 py-1"
            step="0.01"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBestSeller;
