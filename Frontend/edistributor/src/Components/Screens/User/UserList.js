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
import Alert from "./Alert";

import { colors } from "../../colors";


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


function ListUsers() {
  
  const [userList, setUserList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [did, setDid] = React.useState();
  const [onClickDelete, setOnClickDelete] = React.useState(false);
  const [deleted,setDeleted]=React.useState(false);
  const [dopen, setdOpen] = React.useState(false);

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const getUsers = () => {
    Axios.get("http://localhost:5050/user/listusers").then((res) => {
        setUserList(res.data);
      // console.log(res.data);
    });
  };

  const handledClose = () => {
    setdOpen(false);
  };

  const handleDelete = (id) => {
    console.log(id);
    setDid(id);
    console.log("main",did);
    setOnClickDelete(true);
    setdOpen(true);

   
  };
  

  useEffect(() => {
    getUsers();

  },[dopen]);

  return (
    <>
      <div style={styles.drawer}>
        <Drawer />
      </div>
      <div style={styles.mainDiv}>
        <div style={styles.subDiv1}>
          <h2 style={{ textAlign: "center", color: themeColorBlueDark }}>
             Users
          </h2>
        </div>
        <div>
          <TableContainer >
            <Table stickyHeader aria-label="sticky table" >
              <TableHead >
                <TableRow >
                  <StyledTableCell sx={{ fontWeight: "bold" }}>
                   Name
                  </StyledTableCell>
                  <StyledTableCell align="right" sx={{ fontWeight: "bold" }}>
                    Email
                  </StyledTableCell>
                <StyledTableCell />
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {userList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <StyledTableRow key={user._id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                      
                        sx={{ color: themeColorBlue }}
                      >
                        {user.username}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                       
                        sx={{ color: themeColorBlue }}
                      >
                        {user.email}
                      </StyledTableCell>
                     

                     
                      <StyledTableCell align="right">
                        <Button
                          onClick={() => {
                            handleDelete(user._id);
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
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={"Users per page"}
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

{onClickDelete === true ? (<Alert name={"user"} did={did} open={dopen} onClose={handledClose} />) : null}
        </div>
      </div>
    </>
  );
}

export default ListUsers;
