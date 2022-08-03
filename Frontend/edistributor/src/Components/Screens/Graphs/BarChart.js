import React, { PureComponent } from "react";
import { MdConstruction } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Axios from "axios";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const BarChar = () => {
  const [productDetails, setProductDetails] = React.useState([]);

  const getAllProducts = () => {
    Axios.get("http://localhost:5050/user/productdetail").then((res) => {
      console.log(res.data);
      setProductDetails(res.data);
    });
  };

  
  React.useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <BarChart
      width={850}
      height={450}
      data={productDetails}
      margin={{
        top: 5,
        right: 10,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="productname" />
      <YAxis dataKey="price" />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantity" fill='#00C49F'  />
      <Bar dataKey="price" fill='#3577b0' background={{ fill: "#FEFEFE" }} />
    </BarChart>
  );
};

export default BarChar;
