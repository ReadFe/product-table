import { useLocation } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import { useState } from "react";

const Edit = () => {
  const location = useLocation();
  const { item } = location.state;
  const [data, setData] = useState({
    name: item.name,
    price: item.price,
    stock: item.stock,
    status: item.status,
    image_url: null // Menggunakan null sebagai nilai default untuk input gambar
  });

  const handleSubmit = async (event) => {
    console.log(data)
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/v4/product/${item._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response from API:', response.data);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  const handleChange = (event) => {
    console.log(event)
    const { name, value, type, checked, files } = event.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    setData({
      ...data,
      [name]: newValue
    });
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={data.name} onChange={handleChange} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={data.price} onChange={handleChange}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={data.stock} onChange={handleChange}/>
          <Input name="image_url" type="file" label="Gambar" onChange={handleChange}/>
          <Input name="status" type="checkbox" label="Active" checked={data.status} onChange={handleChange}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;
