import { useLocation } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import { useState } from "react";

const Edit = () => {
  const location = useLocation();
  const { item } = location.state;
  const [formData, setFormData] = useState({
      name: item.name,
      price: item.price,
      stock: item.stock,
      status: item.status,
      image_url: item.image_url
  });

  const handleImageChange = async (image) => {
    const newFormData = { ...formData };
    newFormData.image_url = image.target.files[0];
      setFormData(newFormData);
  };

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('image', formData.image);
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('price', formData.price);
      formDataToSubmit.append('stock', formData.stock);
      formDataToSubmit.append('status', formData.status);

      try {
          await axios.put(`http://localhost:3000/api/v4/product/${item._id}`, formDataToSubmit, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          alert('Data berhasil disimpan');
      } catch (error) {
          console.error('Kesalahan unggah gambar:', error);
          alert('Terjadi kesalahan saat menyimmpan data');
      }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" defaultValue={item.name} onChange={handleInputChange} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" defaultValue={item.price} onChange={handleInputChange}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" defaultValue={item.stock} onChange={handleInputChange}/>
          <Input name="image" type="file" label="Gambar" onChange={handleImageChange}/>
          <Input name="status" type="checkbox" label="Active" defaultChecked={item.status} onChange={handleInputChange}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;
