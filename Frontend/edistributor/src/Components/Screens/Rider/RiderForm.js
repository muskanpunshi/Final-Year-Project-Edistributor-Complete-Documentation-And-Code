import React, { useState, useEffect } from "react";
import Axios from "axios";
import Drawer from "../Drawer/Drawer";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { colors } from "../../colors";
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
  textColor: {
    mb: 2,
    input: { color: themeColorBlue },
  },
  errorField:{
    color:'#e22262',
    fontSize:10,marginTop:-10
  }
};

const RiderForm = () => {
  const [rider, setRiderInformation] = React.useState({
    firstname: "",
    lastname: "",
    email:"",
    address: "",
    city: "",
    cnic: "",
    mobilenumber: "",
    password: "",
    usertype:"",
    
  });
  const [formError, setFormError] = React.useState({});

  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError).length === 0 ) {
      console.log(rider);
    }
  }, [formError]);

  const validateInfo = (values) => {
    const reg = /^(?=.*\d).{4,8}$/;
    const emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    console.log(values);

    let errors = {};
    if (!values.firstname) {
      errors.firstname = "Firstname is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    else if (emailreg.test(values.email) !== true){
      errors.email ="Invalid format!";
    }
    if (!values.address) {
      errors.address = "address is required!";
    }
    if (!values.city) {
      errors.city = "city is required!";
    }
    // if (!values.cnic) {
    //   errors.cnic = "CNIC is required!";
    // }
    if (values.cnic.length!== 13){
      errors.cnic = "Enter 13 digit cnic number!!"
    }
    if (!values.mobilenumber) {
      errors.mobilenumber = "mobilenumber is required!";
    }

    // if (!values.password) {
    //   errors.password = "Password is required!";
    // }
    // Password must be between 4 and 8 digits long and include at least one numeric digit.
     if (reg.test(values.password) !== true) {
      errors.password =
        "Password must be between 4 and 8 digits long ";
    }

    return errors;
  };
  const updateFields = (e) => {
    setRiderInformation({
      ...rider,
      [e.target.name]: e.target.value,
    });
    


  };
  function registerRider(e) {
    e.preventDefault();
    setFormError(validateInfo(rider));
    console.log(formError);
    if (Object.keys(formError).length === 0){
      Axios.post("http://localhost:5050/rider/createrider", rider)
      .then((res) => {
        console.log(res);
        console.log("registered successfully");
        alert("Registered successfully");
    
      })
      .catch((error) => {
        console.log(error);
        alert("Rider with this CNIC already exists!")
      });
    }
     
  }
 
  return (
    <>
      <div style={styles.drawer}>
        <Drawer />
      </div>
      <div style={styles.mainDiv}>
        <div style={styles.subDiv1}>
          <h1 style={{ color: themeColorBlueDark }}>Register Rider</h1>
        </div>
        <div style={styles.subDiv2}>
          <Box>
            <Box sx={styles.textFields}>
             
              <TextField
                name="firstname"
                value={rider.firstname}
                onChange={updateFields}
                label="First Name"
                variant="outlined"
                type="text"
                sx={styles.textColor}
                required={true}
              />
               <p style={styles.errorField}>{formError.firstname}</p>   


              <TextField
                name="lastname"
                value={rider.lastname}
                onChange={updateFields}
                label="Last Name"
                variant="outlined"
                type="text"
                sx={styles.textColor}
                required={true}
              />
               <p style={styles.errorField}>{formError.lastname}</p>  
              <TextField
                name="email"
                value={rider.email}
                onChange={updateFields}
                label="Email"
                variant="outlined"
                type="text"
                sx={styles.textColor}
               required={true}
              />
               <p style={styles.errorField}>{formError.lastname}</p> 
              <TextField
                name="address"
                value={rider.address}
                onChange={updateFields}
                label="Address"
                variant="outlined"
                type="text"
                sx={styles.textColor}
               required={true}
              />
                  <p style={styles.errorField}>{formError.address}</p> 
              <TextField
                name="city"
                value={rider.city}
                onChange={updateFields}
                label="City"
                variant="outlined"
                type="text"
                sx={styles.textColor}
              />
               <p style={styles.errorField}>{formError.city}</p> 
              <TextField
                name="cnic"
                value={rider.cnic}
                onChange={updateFields}
                label="CNIC"
                variant="outlined"
                type="number"
                sx={styles.textColor}
               required={true}
              />
               <p style={styles.errorField}>{formError.cnic}</p> 
              <TextField
                name="mobilenumber"
                value={rider.mobilenumber}
                onChange={updateFields}
                label="Mobile Number"
                variant="outlined"
                type="number"
                sx={styles.textColor}
               required={true}
              />
             <p style={styles.errorField}>{formError.mobilenumber}</p> 
              <TextField
                name="password"
                value={rider.password}
                onChange={updateFields}
               required={true}
                label="Password"
                variant="outlined"
                type="password"
                sx={styles.textColor}
              />
              <p style={styles.errorField}>{formError.password}</p>
                    
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: themeColorBlue, px: 4 }}
                onClick={registerRider}
              >
                Register
              </Button>
            </Box>
            
          </Box>
        </div>

        
      </div>
   
    </>
  );
};

export default RiderForm;
