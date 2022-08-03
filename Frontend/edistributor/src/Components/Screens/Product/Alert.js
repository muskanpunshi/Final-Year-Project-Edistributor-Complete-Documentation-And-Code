import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";


const Alert = (props) =>{
    const { onClose, did, open,name} = props;

    


   
    const handleClose = () => {
        onClose();
      };
    const handleDelete = () => {
        let id = did;
    
        Axios.post(`http://localhost:5050/product/delete/${id}`)
          .then(() => {
  
            console.log("deleted successfully");
            handleClose();
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return(
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete this {name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
           Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
        )
}

export default Alert;
