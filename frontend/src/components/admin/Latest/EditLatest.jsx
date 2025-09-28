import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditLatest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef();

  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/itemsl/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch item: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log("Edit fetch JSON:", json);

        const item = json.item ?? json.data ?? json;
        if (!item.title) {
          console.warn("Fetched item does not have title property", item);
        }

        setTitle(item.title ?? "");
        setDescription(item.description ?? "");
        setPrice(item.price ?? "");
      })
      .catch((err) => {
        console.error("Fetch item error:", err);
        setError(err.message);
      });
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/itemsl/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.message || `Update failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Updated:", data);
      navigate("/admin/showL/");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Edit Latest Item</h2>

      {error && <div className="mb-4 text-red-500">Error: {error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
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

        <div>
          <label className="block mb-1">Image (upload new if you want to change)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>

        <Link to='/admin/showL/'><button className="px-4 py-2 ml-10 bg-red-500 text-white text-sm">Back</button></Link>
      </form>
    </div>
  );
};

export default EditLatest;
