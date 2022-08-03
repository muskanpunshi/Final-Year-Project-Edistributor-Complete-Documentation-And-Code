import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './Components/Screens/Login';
import HomeScreen from "./Components/Screens/HomeScreen";
import AddProduct from './Components/Screens/Product/AddProduct';
import ListProduct from './Components/Screens/Product/ListProduct';
import RiderForm from "./Components/Screens/Rider/RiderForm";
import ProductDetails from "./Components/Screens/Product/ProductDetails";
import UserList from "./Components/Screens/User/UserList";
import RiderList from "./Components/Screens/Rider/RiderList";
import Order from "./Components/Screens/Order";


function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/dashboard' element={<HomeScreen />} />
        <Route exact path='/addproduct' element={<AddProduct />} />
        <Route exact path='/listproduct' element={<ListProduct />} />
        <Route exact path='/createrider' element={<RiderForm />} />
        <Route exact path='/details' element={<ProductDetails/>} />
        <Route exact path='/userlist'element={<UserList />}/>
        <Route exact path ='/riderlist' element={<RiderList />} />
        <Route exact path ='/orderlist' element={<Order/>} />
      </Routes>

    </div>
  );
}

export default App;
