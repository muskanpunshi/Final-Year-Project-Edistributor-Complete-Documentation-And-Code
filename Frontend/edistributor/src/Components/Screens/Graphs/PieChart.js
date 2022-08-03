import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer,Tooltip, Legend  } from 'recharts';
import Axios from "axios";
import Card from "@mui/material/Card";

  
  const COLORS = ['#3577b0', '#96aec4'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
const  Example=()=> {
    const [userCount, setUserCount] = useState();
    const [riderCount, setRiderCount] = useState();

    const getUserCount = () => {
        Axios.get("http://localhost:5050/user/usercount").then((res) => {
          setUserCount(res.data[0].sum);
          console.log(res.data);
          console.log(res.data[0].sum);
        });
      };
    
      const getOrderCount = () => {
        Axios.get("http://localhost:5050/user/ordercount").then((res) => {
          setRiderCount(res.data[0].sum);
          console.log(res.data);
          console.log(res.data[0].sum);
        });
      };
    
      useEffect(() => {
        getUserCount();
        getOrderCount();
      }, []);

      const data = [
        { name: 'Users', value: userCount },
        { name: 'Orders', value: riderCount },
        
       
      ];

     const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
           return (
           <div
              className="custom-tooltip"
              style={{
                 backgroundColor: "transparent",
                 padding: "2px",
                 border: "1px solid #cccc"
              }}
           >
              <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
           </div>
        );
     }
     return null;
  };

  //static demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';
    return (
        <div >
         <Card sx={{   mr: 4 ,width:"100%"}}> 
            {/* <ResponsiveContainer width="100%" height="100%"> */}
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            isAnimationActive={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
         
          >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
      <Legend />

        </PieChart>
        </Card>
      {/* </ResponsiveContainer> */}

   

        {/* <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
         <Pie dataKey="value" data={data02} cx="50%"
            cy="50%"innerRadius={40} outerRadius={80} fill="#82ca9d" /> 
          <Tooltip />
        </PieChart> */}
  
      </div>
    );
  
}

export default Example;
