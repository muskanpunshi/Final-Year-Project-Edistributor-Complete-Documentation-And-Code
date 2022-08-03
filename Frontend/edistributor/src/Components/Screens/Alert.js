import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import { Menu } from "react-pro-sidebar";
import { Box } from "@mui/material";

const Alert = (props) => {
  const { onClose, did, open, name } = props;
  const [riderList, setRiderList] = useState([]);
  const [riderValue, setRiderValue] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleRiderChange = (event) => {
    setRiderValue(event.target.value);
  };

  const handleOrderAssign = (did) => {
    console.log(did);
    
    Axios.post("http://localhost:5050/user/assignOrder/"+did,
    {
        riderId:riderValue
    })
    .then((res)=>{
        console.log(res.data);
        alert("assigned successfully");
    })
    .catch((error)=>{
        console.log(error);
    })

  };
  const getRiders = () => {
    Axios.get("http://localhost:5050/rider/riderlist").then((res) => {
      setRiderList(res.data);
    });
  };

  useEffect(() => {
    getRiders();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ m:10 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Rider Name:</InputLabel>
          <Select
            defaultValue={""}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={riderValue}
            label="Rider Name"
            onChange={handleRiderChange}
            sx={{px:5}}
          >
            {riderList.map((rider) => (
              <MenuItem value={rider._id}>
                {rider.firstname} {rider.lastname}
              </MenuItem>
            ))}
          </Select>

          <Box>
            <Button
              onClick={() => {
                handleOrderAssign(did);
              }}
            >
              Assign Order
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Dialog>
  );
};

export default Alert;
