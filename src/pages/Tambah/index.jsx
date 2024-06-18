import axios from 'axios';
import { useState } from 'react';
import Input from '../../components/Input';
import './index.scss';
import * as Validator from 'validatorjs';
import ShowError from '../../components/Error/show';

const Tambah = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    status: false
  }); 
  const [errName, setErrName] = useState()
  const [errPrice, setErrPrice] = useState()
  const [errStock, setErrStock] = useState()
  const [errImage, setErrImage] = useState()

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value})
  }

  const handleImageChange = (image) => {
    const newFormData = {...formData};
    newFormData.image = image.target.files[0]
    setFormData(newFormData)
  }

  const handleCheckChange = (status) => {
    const newFormData = {...formData};
    newFormData.status = status.target.checked
    setFormData(newFormData)
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const {name, price, stock, image} = formData
    let data = {name, price, stock, image};
    
    let rules = {
      name: 'required|min:4',
      price: 'required|min:3',
      stock: 'required',
      image: 'required'
    };
    
    let validation = new Validator(data, rules);
    validation.passes();
    setErrName(validation.errors.get("name"))
    setErrPrice(validation.errors.get("price"))
    setErrStock(validation.errors.get("stock"))
    setErrImage(validation.errors.get("image"))
    
    if (validation.passes()) {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('image', formData.image);
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('price', formData.price);
      formDataToSubmit.append('stock', formData.stock);
      formDataToSubmit.append('status', formData.status);
  
      try {
          await axios.post(`http://localhost:3000/api/v4/product`, formDataToSubmit);
          alert('Data berhasil disimpan');
          
      } catch (error) {
          console.error('Kesalahan unggah gambar:', error);
          alert('Terjadi kesalahan saat menyimmpan data');
      }
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" onChange={handleInputChange}/>
          {
             errName && <ShowError errors={errName}/>
          }
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" onChange={handleInputChange}/>
          {
             errPrice && <ShowError errors={errPrice}/>
          }
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" onChange={handleInputChange}/>
          {
             errStock && <ShowError errors={errStock}/>
          }
          <Input name="image" type="file" placeholder="Gambar Produk..." label="Gambar" onChange={handleImageChange}/>
          {
             errImage && <ShowError errors={errImage}/>
          }
          <Input name="status" type="checkbox" label="Active" onChange={handleCheckChange}/>
          
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;