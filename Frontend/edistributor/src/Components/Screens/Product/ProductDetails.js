import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import Typography from "@mui/material/Typography";
import { MdAdd, MdRemove } from "react-icons/md";
import Box from "@mui/material/Box";
import Axios from "axios";
import { colors } from "../../colors";
import ListProduct from "./ListProduct";
const { themeColorBlueDark, themeColorBlue } = colors;

ProductDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function ProductDetails(props) {
  const { onClose, pid, open } = props;
  const [productId, setProductId] = React.useState("");
  const [quantity, setQuantity] = React.useState();
  const [productDetails, setProductDetails] = React.useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // console.log('i am useEffect')
    // console.log(pid);
    fetchProductByID();
  }, [open]);

  const fetchProductByID = () => {
    let id = pid;

    Axios.get(`http://localhost:5050/product/productdetail/${id}`)
      .then((res) => {
        // console.log(res.data);
        setProductDetails(res.data);
        setQuantity(res.data.quantity);
        setLoading(false);
        // console.log(quantity);
        // console.log("productDetails", productDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const increaseQty = (event) => {
    console.log("Before Update", quantity);
    setQuantity(quantity + 1);
  };
  const decreaseQty = () => {
    if(quantity <= 0) {
      return (
        alert("Cannot update quantity")
      )
    }
    else{
      setQuantity(quantity - 1);
      console.log(quantity);
    }

  
  };

  const handleClose = () => {
    onClose();
  };

  const handleEdit = () => {
    let id = pid;
    console.log("After Update", quantity);

    Axios.post("http://localhost:5050/product/update/" + id, {
      quantity: quantity
    })
      .then((res) => {
        console.log("getting response", res.data.quantity);
        console.log("updated successfully");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(quantity)

  return (
    <>
      {loading ? (
        <div>......data......</div>
      ) : (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle sx={{ mx: 20 }}>Product Details</DialogTitle>
          <Box sx={{ mx: 8 }}>
            <Box sx={{ display: "flex", justifyContent: "center",borderBottom:"1px solid black",elevation:2,}}>
              <img
                src={"http://localhost:5050/" + productDetails.image}
                alt={"product "}
                style={{ width: "100%", height: "10rem" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 3,
                borderBottom:'1px solid #ccc'
              }}
            >
              <Typography
                sx={{
                  fontSize: "20",
                  fontWeight: "bold",
                  color: themeColorBlueDark,
                 
                }}
              >
                Product Name:{" "}
              </Typography>
              <Typography sx={{ color: themeColorBlue }} gutterBottom>
                {productDetails.productname}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottom:'1px solid #ccc'
              }}
            >
              <Typography
                sx={{
                  fontSize: "20",
                  fontWeight: "bold",
                  color: themeColorBlueDark,
                }}
              >
                Product Quantity:{" "}
              </Typography>
              <Typography gutterBottom sx={{ color: themeColorBlue }}>
                {quantity}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "20",
                  fontWeight: "bold",
                  color: themeColorBlueDark,
                   borderBottom:'1px solid #ccc'
                }}
              >
                Product Description:{" "}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom sx={{ color: themeColorBlue }}>
                {productDetails.description}
              </Typography>
            </Box>
            <Box
              sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            >
              <Button onClick={increaseQty}>
                <MdAdd size={30} color={themeColorBlueDark} />
              </Button>
              <Button onClick={decreaseQty}>
                <MdRemove size={30} color={themeColorBlueDark} />
              </Button>
            </Box>
          </Box>
          <Box sx={{display:'flex',justifyContent:'center'}}>
          <Button
            onClick={handleEdit}
            sx={{ color: themeColorBlueDark }}
            autoFocus
          >
            Save changes
          </Button>

          <Button
            onClick={handleClose}
            sx={{ color: themeColorBlueDark }}
            autoFocus
          >
           Close
          </Button>
          </Box>
         
        </Dialog>
      )}
      
    </>
  );
}

export default ProductDetails;
