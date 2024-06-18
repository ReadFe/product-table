import { Link } from 'react-router-dom';
import './index.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {

  const [search, setSearch] = useState([]);
  const [data, setData] = useState([]);
  const [input, setInput] = useState('')


  useEffect(() => {
    axios.get('http://localhost:3000/api/v4/product')
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }, []);

  const getData = () => {
    axios.get('http://localhost:3000/api/v4/product')
    .then(response => {
      setData(response.data);
      console.log(search)
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }

  const Search = (event, data) => {
    setInput(event)
    const filteredData = data.filter(item => {
        return item.name.toLowerCase().includes(event)
    })
    setSearch(filteredData)
  }

  const Delete = async (item) => {

    const confirmation = window.confirm('Apakah Anda yakin ingin menghapus item ini?');

    if (confirmation) {
        try {
            await axios.delete(`http://localhost:3000/api/v4/product/${item}`);
            alert('Item berhasil dihapus');
            getData();
        } catch (err) {
            alert('Gagal menghapus item');
        }
    }
    return null;
  }

  const mapData = item => (
    <tr key={item._id}>
      <td>{item._id}</td>
      <td>{item.name}</td>
      <td className="text-right">{item.price}</td>
      <td className="text-center">
        <Link to= "/detail" state={{item}} className="btn btn-sm btn-info">Detail</Link>
        <Link to="/edit" state={{item}} className="btn btn-sm btn-warning">Edit</Link>
        <Link to="#" onClick={() => Delete(item._id)} className="btn btn-sm btn-danger">Delete</Link>
      </td>
    </tr>
  )

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={e => Search(e.target.value, data)} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          { input.length > 0 
            ? (search.length === 0 
              ? <tr>
                <td className='text-center'> data tidak ditemukan</td>
              </tr>
              : search.map(mapData)
            ) 
            : (data.map(mapData))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;