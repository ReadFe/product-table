import { useLocation } from "react-router-dom";
import Input from "../../components/Input";
import { useState } from "react";
import { apiClient } from "../../utils/api";
import Swal from "sweetalert2";

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
          await apiClient.put(`/api/product/${item._id}`, formDataToSubmit, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          Swal.fire({
            title: "Updated!",
            text: "Your file has been updated.",
            icon: "success"
          });
      } catch (error) {
          Swal.fire({
            title: "Failed to update!",
            text: error.message,
            icon: "error"
          });
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
