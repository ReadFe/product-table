import { Link } from 'react-router-dom';
import './index.scss';

const Home = ({data}) => {
  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..."/>
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
          {data.map(item => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td className="text-right">{item.price}</td>
              <td className="text-center">
                <Link to= "/detail" state={{item}} className="btn btn-sm btn-info">Detail</Link>
                <Link to="/edit" state={{item}} className="btn btn-sm btn-warning">Edit</Link>
                <Link to="#" className="btn btn-sm btn-danger">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;