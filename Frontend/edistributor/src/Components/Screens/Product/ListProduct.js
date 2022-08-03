import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "../Drawer/Drawer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";

import Axios from "axios";
import { MdDeleteOutline } from "react-icons/md";

import { colors } from "../../colors";
import ProductDetails from "./ProductDetails";
import Alert from "./Alert";

const { themeColorBlueDark, themeColorBlue } = colors;

const styles = {
  mainDiv: {
    flex: 1,
    height: "auto",
    backgroundColor: "#f2f4f7",
    padding: "25px",
    marginTop: "40px",
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: themeColorBlue,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fff",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#fff",
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    backgroundColor: "#fff",
    border: 0,
  },
}));


function ListProduct() {
  let navigate = useNavigate();
  

  const [productList, setProductList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [dopen, setdOpen] = React.useState(false);
  const [pid, setPid] = React.useState();
  const [did, setDid] = React.useState();
  const [onClickDelete, setOnClickDelete] = React.useState(false);
  const [onClickProductDetails, setOnClickProductDetails] = React.useState(false);
  const [deleted,setDeleted]=React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handledClose = () => {
    setdOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const getProducts = () => {
    Axios.get("http://localhost:5050/product/listproduct").then((res) => {
      setProductList(res.data);
      // console.log(res.data);
    });
  };

  const handleDetails = (id) => {
    // navigate("/details", {
    //   state: {
    //     id: id,
    //   },
    // });
    
   
    var productId = id;
    setPid(productId);
    console.log(productId);
    setOnClickProductDetails(true);
    setOpen(true);
    
   
  };

  const handleDelete = (id) => {
    console.log(id);
    setDid(id);
    console.log("main",did);
    setOnClickDelete(true);
    setdOpen(true);

   
  };

  useEffect(() => {
    getProducts();

  }, [deleted,open]);

  return (
    <>
      <div style={styles.drawer}>
        <Drawer />
      </div>
      <div style={styles.mainDiv}>
        <div style={styles.subDiv1}>
          <h2 style={{ textAlign: "center", color: themeColorBlueDark }}>
            All Products
          </h2>
        </div>
        <div>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ fontWeight: "bold" }}>
                    Product Name
                  </StyledTableCell>
                  <StyledTableCell align="right" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </StyledTableCell>
                  <StyledTableCell align="right" sx={{ fontWeight: "bold" }}>
                    Category
                  </StyledTableCell>
                  <StyledTableCell align="right" sx={{ fontWeight: "bold" }}>
                    Price
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
                    Image
                  </StyledTableCell>
                  <StyledTableCell />
                  <StyledTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {productList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <StyledTableRow key={product._id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        width={"10%"}
                        sx={{ color: themeColorBlue }}
                      >
                        {product.productname}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        width={"10%"}
                        sx={{ color: themeColorBlue }}
                      >
                        {product.quantity}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        width={"10%"}
                        sx={{ color: themeColorBlue }}
                      >
                        {product.category}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        width={"10%"}
                        sx={{ color: themeColorBlue }}
                      >
                        {product.price}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        width={"30%"}
                        height={"50%"}
                      >
                        <img
                          src={"http://localhost:5050/" + product.image}
                          alt={product.productname}
                          style={{ width: "70%" }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          onClick={() => {
                            handleDetails(product._id);
                          }}
                          sx={{color:themeColorBlue}}
                        >
                          Product Details
                        </Button>
                       
                       
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          onClick={() => {
                            handleDelete(product._id);
                          }}
                        >
                          <MdDeleteOutline  size={25} color={themeColorBlue}/>
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={productList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={"Products per page"}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-toolbar": {
                backgroundColor: "#eee",
              },
              ".MuiTablePagination-selectLabel,	.MuiTablePagination-selectRoot, .MuiTablePagination-select,":
                {
                  fontWeight: "bold",
                  color: themeColorBlue,
                },
              ".MuiTablePagination-selectIcon": {
                color: themeColorBlue,
              },
            }}
          />

{
                          onClickProductDetails === true ?
                          (
                            <ProductDetails
                            pid={pid}
                            open={open}
                            onClose={handleClose}
                          />
                          //   <ProductDetails
                          //   data={pid}
                          //   IsModalOpened={handleClickOpen}
                          //   onCloseModal={handleClose}
                          //   open={open}
                          // />
                          ): null
                        }

  {onClickDelete === true ? (<Alert name={"product"} did={did} open={dopen} onClose={handledClose} />) : null}
        </div>
      </div>
    </>
  );
}

export default ListProduct;
