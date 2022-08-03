import React, { useState, useEffect } from "react";
import Drawer from "./Drawer/Drawer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Alert from "./Alert";


import { Box } from "@mui/material";

import { MdDeleteOutline } from "react-icons/md";
import Axios from "axios";
import { colors } from "../colors";

const { themeColorBlueDark, themeColorBlue } = colors;
const styles = {
  mainDiv: {
    flex: 1,
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
    border: 0,
  },
}));

const Order = () => {
  const [orderList, setOrderList] = useState([""]);
  const [productDetails, setProductDetails] = useState([]);
 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [onClick, setOnClick] = React.useState(false);
  const [did, setDid] = React.useState();
const [dopen, setdOpen] = React.useState(false);

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

  const handleOrderAssign=(id)=>{
    console.log(id);
    setDid(id);
    setOnClick(true);
    setdOpen(true);
  }

 
  const getOrders = () => {
    Axios.get("http://localhost:5050/user/allorders").then((res) => {
        setOrderList(res.data)
        
      console.log(res.data);
    });
  };


  

  useEffect(() => {
    getOrders();
   
  }, [dopen]);

  return (
    <>
      <div style={styles.drawer}>
        <Drawer />
      </div>
      <div style={styles.mainDiv}>
        <div style={styles.subDiv1}>
          <h2 style={{ textAlign: "center", color: themeColorBlueDark }}>
            Orders
          </h2>
        </div>
        <div>
          <div>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      Total Price
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      floor
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      street
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      city
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      Note
                    </StyledTableCell>
                    <StyledTableCell />
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <StyledTableRow key={order._id}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          width={"20%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {order.totalprice}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          width={"20%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {order.floor}
                        </StyledTableCell>

                        <StyledTableCell
                          width={"20%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {order.street}
                        </StyledTableCell>
                        <StyledTableCell
                          width={"20%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {order.city}
                        </StyledTableCell>
                        <StyledTableCell
                          width={"20%"}
                          sx={{ color: themeColorBlue }}
                          
                        >
                          {order.note}
                        </StyledTableCell>
                        {/* <StyledTableCell
                          width={"10%"}
                          sx={{ color: themeColorBlue }}
                        >
                        <Box>
                          <Button onClick={()=>{handleOrderAssign(order._id)}}>
                            Assign Order 
                          </Button>
                        </Box>
                        </StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={orderList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              labelRowsPerPage={"Riders per page"}
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

{/* {onClick === true ?  <Alert
              
                did={did}
                open={dopen}
                onClose={handledClose}
              />
             : null} */}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
