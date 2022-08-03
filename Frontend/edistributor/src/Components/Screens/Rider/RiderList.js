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
import Alert from "./Alert";
import { Box } from "@mui/material";
import Axios from "axios";
import { MdDeleteOutline } from "react-icons/md";


import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { colors } from "../../colors";
import { FormControl, InputLabel } from "@mui/material";
import { Menu } from "react-pro-sidebar";

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

function ListRiders() {
  const [riderList, setRiderList] = useState([]);
  const [riderValue, setRiderValue] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [did, setDid] = React.useState();
  const [onClickDelete, setOnClickDelete] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const [dopen, setdOpen] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const getRiders = () => {
    Axios.get("http://localhost:5050/rider/riderlist").then((res) => {
      setRiderList(res.data);
      // console.log(res.data);
    });
  };

  const handledClose = () => {
    setdOpen(false);
  };

  const handleDelete = (id) => {
    console.log(id);
    setDid(id);
    console.log("main", did);
    setOnClickDelete(true);
    setdOpen(true);
  };

const handleOrderAssign =()=>{
  console.log()
}


  const handleRiderChange = (event) => {
    console.log(event.target.value);
  };
  // const handleDelete = (id) => {
  //   Axios.post(`http://localhost:5050/product/delete/${id}`)
  //     .then(() => {
  //       alert('Product has been deleted successfully')
  //       console.log("deleted successfully");
  //       setDeleted(!deleted);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    getRiders();
  }, [dopen]);

  return (
    <>
      <div style={styles.drawer}>
        <Drawer />
      </div>
      <div style={styles.mainDiv}>
     

          <div style={styles.subDiv1}>
            <h2 style={{ textAlign: "center", color: themeColorBlueDark }}>
              Riders
            </h2>
          </div>
          <div>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      First Name
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      Last Name
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      Email
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      Address
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      City
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      CNIC
                    </StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: "bold" }}>
                      MobileNo.
                    </StyledTableCell>
                    <StyledTableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {riderList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((rider) => (
                      <StyledTableRow key={rider._id}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          width={"10%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {rider.firstname}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          width={"10%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {rider.lastname}
                        </StyledTableCell>

                        <StyledTableCell
                          width={"10%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {rider.email}
                        </StyledTableCell>
                        <StyledTableCell
                          width={"10%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {rider.address}
                        </StyledTableCell>
                        <StyledTableCell
                          width={"10%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {rider.city}
                        </StyledTableCell>
                        <StyledTableCell
                          width={"10%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {rider.cnic}
                        </StyledTableCell>
                        <StyledTableCell
                          width={"10%"}
                          sx={{ color: themeColorBlue }}
                        >
                          {rider.mobilenumber}
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          <Button
                            onClick={() => {
                              handleDelete(rider._id);
                            }}
                          >
                            <MdDeleteOutline size={25} color={themeColorBlue} />
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
              count={riderList.length}
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

            {onClickDelete === true ? (
              <Alert
                name={"rider"}
                did={did}
                open={dopen}
                onClose={handledClose}
              />
            ) : null}
          </div>
        </div>
      
    </>
  );
}

export default ListRiders;
