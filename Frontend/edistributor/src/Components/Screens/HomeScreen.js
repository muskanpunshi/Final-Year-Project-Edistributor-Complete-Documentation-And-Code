import React, { useState, useEffect } from "react";
import Drawer from "./Drawer/Drawer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Axios from "axios";
import { colors } from "../colors";
import Example from "../Screens/Graphs/PieChart";

//Icons
import { BsFillBasket3Fill } from "react-icons/bs";
import { MdShoppingCart } from "react-icons/md";
import BarChart from "./Graphs/BarChart";
import BarChar from "./Graphs/BarChart";

const { themeColorBlueDark, themeColorBlue } = colors;

const styles = {
  mainDiv: {
    flex: 1,
    height: "auto",
    backgroundColor: "#f2f4f7",
    padding: "25px",
    marginTop: "40px",
    zIndex: 1,
  },
  subDiv1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textFields: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    ml: 10,
    mr: 10,
    minWidth: 200,
  },
};

const HomeScreen = () => {

  
  const [sumOfProducts, setSumOfProducts] = useState();
  const [userCount, setUserCount] = useState();
  const [orderCount, setOrderCount] = useState();
  const [riderCount, setRiderCount] = useState();


  const getProducts = () => {
    Axios.get("http://localhost:5050/product/sum").then((res) => {
      setSumOfProducts(res.data[0].sum);
      console.log(res.data);
      console.log(res.data[0].sum);
    });
  };

  const getUserCount = () => {
    Axios.get("http://localhost:5050/user/usercount").then((res) => {
      setUserCount(res.data[0].sum);
      console.log(res.data);
      console.log(res.data[0].sum);
    });
  };

  const getOrderCount = () => {
    Axios.get("http://localhost:5050/user/ordercount").then((res) => {
      setOrderCount(res.data[0].sum);
      console.log(res.data);
      console.log(res.data[0].sum);
    });
  };

  const getRiderCount = () => {
    Axios.get("http://localhost:5050/rider/ridercount").then((res) => {
      setRiderCount(res.data[0].sum);
      console.log(res.data);
      console.log(res.data[0].sum);
    });
  };

  useEffect(() => {
    getProducts();
    getUserCount();
    getRiderCount();
    getOrderCount();
  }, []);

  return (
    <>
      <div style={styles.drawer}>
        <Drawer />
      </div>
      <div style={styles.mainDiv}>
        <div>
          <h2 style={{ fontSize: "20px", color: themeColorBlueDark }}>
            Dashboard
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "row", margin: "2px" }}>

          <Card sx={{ display: "flex", flexDirection: "row", mr: 4 ,width:"17%"}}>
          <CardContent sx={{ backgroundColor:'#3577b0' }}>
              <BsFillBasket3Fill size={40} color={"#fff"} />
            </CardContent>
            <CardContent sx={{ width: "auto" }}>
              <Typography variant="h6" color="#A9ABAD">
                Total Products
              </Typography>
              <Typography variant="h5">{sumOfProducts}</Typography>
            </CardContent>
          </Card>


          <Card sx={{ display: "flex", flexDirection: "row", mr: 4 ,width:"17%"}}>
            <CardContent sx={{ backgroundColor: '#00C49F' }}>
              <MdShoppingCart size={40} color={"#fff"} />
            </CardContent>
            <CardContent sx={{ width: "auto" }}>
              <Typography variant="h6" color="#A9ABAD">
                Total Orders
              </Typography>
              <Typography variant="h5">{orderCount}</Typography>
            </CardContent>
            </Card>


            <Card sx={{ display: "flex", flexDirection: "row", mr: 4 ,width:"17%"}}>
            <CardContent sx={{ backgroundColor:'#FFBB28' }}>
              <MdShoppingCart size={40} color={"#fff"} />
            </CardContent>
            <CardContent sx={{ width: "auto" }}>
              <Typography variant="h6" color="#A9ABAD">
               Users
              </Typography>
              <Typography variant="h5">{userCount}</Typography>
            </CardContent>
            </Card>


            {/* <Card sx={{ display: "flex", flexDirection: "row", mr: 4,width:"17%" }}>
            <CardContent sx={{ backgroundColor:'#FF8042' }}>
              <MdShoppingCart size={40} color={"#fff"} />
            </CardContent>
            <CardContent sx={{ width: "auto" }}>
              <Typography variant="h6" color="#A9ABAD">
              Riders
              </Typography>
              <Typography variant="h5">{riderCount}</Typography>
            </CardContent>
            </Card> */}
          
          <Divider />


        </div>
       
        <div style={{marginTop:"5%"}}>

      
        <div >
          <h2 style={{ fontSize: "20px", color: themeColorBlueDark }}>
            Statistics
          </h2>
        </div>
        <div style={{display:"flex",flexDirection:"row"}}>
        <Example />
        <BarChar />
        </div>
      </div>
      </div>
    </>
  );
};
export default HomeScreen;
