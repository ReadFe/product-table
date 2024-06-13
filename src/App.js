import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v4/product')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/tambah" element={<Tambah />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;