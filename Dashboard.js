import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Dashboard = () => {
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const baseURL = 'http://localhost:5000/products';

  // Fetch non-deleted products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(baseURL);
        const nonDeleted = res.data.filter((p) => !p.deleted);
        setProducts(nonDeleted);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCategory((prev) => (checked ? [...prev, value] : prev.filter((c) => c !== value)));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) return alert('Only image files allowed');
    if (selectedFile.size > 2 * 1024 * 1024) return alert('Max file size is 2MB');

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleAddOrUpdateProduct = async () => {
    if (!newName || !newPrice || !product || category.length === 0 || !preview) {
      alert('Please fill in all fields');
      return;
    }

    const newProduct = {
      name: newName,
      category: product,
      price: parseInt(newPrice),
      specs: category,
      image: preview,
      deleted: false
    };

    try {
      if (isEditing) {
        const res = await axios.put(`${baseURL}/${editProductId}`, newProduct);
        setProducts(products.map((p) => (p.id === editProductId ? res.data : p)));
        setIsEditing(false);
        setEditProductId(null);
      } else {
        const res = await axios.post(baseURL, newProduct);
        setProducts([...products, res.data]);
      }

      // Reset form
      setNewName('');
      setNewPrice('');
      setProduct('');
      setCategory([]);
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditProduct = (p) => {
    setIsEditing(true);
    setEditProductId(p.id);
    setNewName(p.name);
    setNewPrice(p.price);
    setProduct(p.category);
    setCategory(p.specs);
    setPreview(p.image);
  };

  // ✅ Soft delete: mark as deleted, don't actually remove from backend
  const handleDeleteProduct = async (id) => {
    try {
      const productToDelete = products.find((p) => p.id === id);
      if (!productToDelete) return;

      const updatedProduct = { ...productToDelete, deleted: true };
      await axios.put(`${baseURL}/${id}`, updatedProduct);

      // Remove from UI
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error during soft delete:', error);
    }
  };

  return (
    <div className="dashboard-page">
      <label id="logout" onClick={() => (window.location.href = '/')}>Logout</label>
      <h2>Welcome to My Dashboard</h2>

      <div style={{ padding: '20px' }}>
        <form>
          <label><strong>Product Name:</strong></label><br />
          <input
            type="text"
            placeholder="Product Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <br />
          <label><strong>Product Category:</strong></label><br />
          <div className="radio-group">
            {['Mobile', 'Laptop', 'Tab'].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="product"
                  value={item}
                  checked={product === item}
                  onChange={(e) => setProduct(e.target.value)}
                />
                {item}
              </label>
            ))}
          </div>

          <br /><br />
          <label><strong>Price (₹):</strong></label><br />
          <input
            type="number"
            placeholder="Enter Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />

          <br />
          <label><strong>Category (Specs):</strong></label><br />
          <div className="checkbox-group">
            {['8GB RAM', '12GB RAM', '16GB RAM', '256GB ROM', '512GB ROM', '1TB ROM'].map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={handleCheckboxChange}
                />
                {cat}
              </label>
            ))}
          </div>

          <br /><br />
          <label><strong>Upload Product Image:</strong></label><br />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <div style={{ marginTop: '10px' }}>
              <strong>Preview:</strong><br />
              <img src={preview} alt="Preview" style={{ maxWidth: '200px', border: '1px solid #ccc' }} />
            </div>
          )}

          <br />
          <button type="button" onClick={handleAddOrUpdateProduct}>
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditProductId(null);
                setNewName('');
                setNewPrice('');
                setProduct('');
                setCategory([]);
                setFile(null);
                setPreview(null);
              }}
              style={{
                backgroundColor: 'gray',
                marginLeft: '10px',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Cancel Editing
            </button>
          )}
        </form>
      </div>

      <div>
        <h2>Products</h2>
        <div className="products-list">
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p.id} className="product-card">
                <img src={p.image} alt={p.name} />
                <h2>{p.name}</h2>
                <p>{p.category}</p>
                <p>Specs: {p.specs.join(', ')}</p>
                <p>₹{p.price}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button
                    onClick={() => handleEditProduct(p)}
                    style={{
                      background: 'green',
                      border: 'none',
                      padding: '8px 16px',
                      color: 'white',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    style={{
                      background: 'crimson',
                      border: 'none',
                      padding: '8px 16px',
                      color: 'white',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
