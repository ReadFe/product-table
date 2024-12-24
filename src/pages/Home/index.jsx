import { Link } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';
import { fetchData } from '../../store/dataReducer';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { apiClient } from '../../utils/api';

const Home = () => {

  const [search, setSearch] = useState([]);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.products)

  const Search = (event, data) => {
    setInput(event)
    const filteredData = data.filter(item => {
        return item.name.toLowerCase().includes(event)
    })
    setSearch(filteredData)
  }

  const Delete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/api/product/${id}`)
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          dispatch(fetchData())
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error"
          });
        }
      }
    });
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

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

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