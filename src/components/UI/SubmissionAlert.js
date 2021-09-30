import { useState, useEffect, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Modal } from "./Modal";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SubmissionAlert = (props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let rowsArray = [];
  props.info?.items?.map((item, index) => {
    return rowsArray.push({
      id: index,
      col1: item.name,
      col2: `$${item.price}`,
      col3: item.restaurantName,
      col4: item.amount,
    });
  });

  const rows = [...rowsArray];

  const columns = [
    { field: "col1", headerName: "Name", width: 150 },
    { field: "col1", headerName: "Name", width: 150 },
    { field: "col2", headerName: "Price", width: 150 },
    { field: "col3", headerName: "Restaurant", width: 150 },
    { field: "col4", headerName: "Quantity", width: 150 },
  ];
  return (
    <>
      <Modal>
        <Box sx={{ flexGrow: 1 }} m={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item>The following data was sent to the database:</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>First Name: {props.info?.firstName}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Last Name: {props.info?.lastName}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Address: {props.info?.address}</Item>
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <div style={{ height: "20em" }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </Box>
        {props.children}
      </Modal>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Success"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleClose} severity="success">
          Success
        </Alert>
      </Snackbar>
    </>
  );
};

export default SubmissionAlert;
