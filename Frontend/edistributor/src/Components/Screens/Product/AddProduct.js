import * as React from "react";
import Drawer from "../Drawer/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { colors } from "../../colors";
import Axios from "axios";

const { themeColorBlueDark, themeColorBlue, lightBackground } = colors;
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

const AddProduct = () => {
  const [productName, setProductName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState([]);

  //errors

  const [nameError, setNameError] = React.useState("");
  const [priceError, setPriceError] = React.useState("");
  const [quantityError, setQuantityError] = React.useState("");
  const [categoryError, setCategoryError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");

  const NameValidator = () => {
    if (productName === "") {
      setNameError("Name cannot be empty");
      console.log(nameError);
    } else {
      setNameError("");
    }
  };

  const PriceValidator = () => {
    if (price === "") {
      setPriceError("Price cannot be empty");
    } else {
      setPriceError("");
    }
  };

  const QuantityValidator = () => {
    if (quantity === "") {
      setQuantityError("Quantity cannot be empty");
    } else {
      setQuantityError("");
    }
  };

  const CategoryValidator = () => {
    if (category === "") {
      setCategoryError("Category cannot be empty");
    } else {
      setCategoryError("");
    }
  };

  const DescriptionValidator = () => {
    if (description === "") {
      setDescriptionError("Description cannot be empty");
    } else {
      setDescriptionError("");
    }
  };

  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleQauntityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    // console.log("this is detail",e.target.files[0]);
    setImage(e.target.files[0]);
    // console.log(image)
  };

  const SubmitProduct = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("productname", productName);
    fd.append("price", price);
    fd.append("quantity", quantity);
    fd.append("category", category);
    fd.append("description", description);
    fd.append("image", image);

    // const data = {
    //     productname: productName,
    //     price: price,
    //     quantity: quantity,
    //     category: category,
    //     description: description,
    //     image:image

    // }

    if (category === "Innovative" || category === "Bakeline") {
      await Axios.post("http://localhost:5050/product/addproduct", fd, {
        // headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res);
          console.log("Product added successfully");
          alert("Product created successfully");
          setProductName("");
          setPrice("");
          setQuantity("");
          setCategory("");
          setDescription("");
          setImage([""]);
        })
        .catch((error) => {
           console.log(JSON.stringify(error));
          alert("Please Try again");
        });
    } else {
      alert("Invalid Data");
    }
  };

  return (
    <>
      <div style={styles.drawer}>
        <Drawer />
      </div>
      <div style={styles.mainDiv}>
        <div style={styles.subDiv1}>
          <h2 style={{ color: themeColorBlueDark }}>Create Product</h2>
        </div>
        <div style={styles.subDiv2}>
          <Box sx={styles.textFields}>
            <TextField
              onBlur={NameValidator}
              name="productname"
              value={productName}
              onChange={handleNameChange}
              label="Product Name"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Typography sx={{ color: "red", ml: 0.5 }}>{nameError}</Typography>
            <TextField
              onBlur={PriceValidator}
              name="price"
              value={price}
              onChange={handlePriceChange}
              label="Price"
              variant="outlined"
              type="number"
              sx={{ mb: 2 }}
            />
            <Typography sx={{ color: "red", ml: 0.5 }}>{priceError}</Typography>
            <TextField
              onBlur={QuantityValidator}
              name="quantity"
              value={quantity}
              onChange={handleQauntityChange}
              label="Quantity"
              variant="outlined"
              type="number"
              sx={{ mb: 2 }}
            />
            <Typography sx={{ color: "red", ml: 0.5 }}>
              {quantityError}
            </Typography>
            <TextField
              onBlur={CategoryValidator}
              name="category"
              value={category}
              onChange={handleCategoryChange}
              label="Category"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Typography sx={{ color: "red", ml: 0.5 }}>
              {categoryError}
            </Typography>
            <TextField
              onBlur={DescriptionValidator}
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              label="Description"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Typography sx={{ color: "red", ml: 0.5 }}>
              {descriptionError}
            </Typography>
            {/* <input type="file" name="image" onClick={handleFileChange} /> */}
            <input
              id="icon-button-photo"
              onChange={handleFileChange}
              type="file"
              name="image"
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: themeColorBlue, px: 4 }}
              onClick={SubmitProduct}
            >
              Submit
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
