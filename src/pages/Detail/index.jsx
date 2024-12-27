import React from "react";
import { Link, useLocation } from "react-router-dom";
import './index.scss';
import { formatToIDR } from "../../utils/formatToIDR";


function Detail() {
  const location = useLocation();
  const {item} = location.state;

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{item._id}</td> 
          </tr>
          <tr>
            <td>Name</td>
            <td>: {item.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {formatToIDR(item.price)}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {item.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;