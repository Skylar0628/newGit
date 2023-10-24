import './App.css';
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login';

import Dashboard from './pages/Admin/Dashboard';
import AdminProduct from './pages/Admin/AdminProduct';
import AdminCoupon from './pages/Admin/AdminCoupon';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path='/' element={<Login/>}></Route>
        <Route  path='/admin' element={<Dashboard/>}>
          <Route  path='product' element={<AdminProduct/>}></Route>
          <Route  path='coupens' element={<AdminCoupon/>}></Route>
          
        </Route>
      </Routes>  
    </div>
  );
}

export default App;
