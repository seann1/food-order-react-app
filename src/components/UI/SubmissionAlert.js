import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Modal } from "./Modal";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SubmissionAlert = (props) => {
  const [open, setOpen] = useState(true);

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
  const rows: GridRowsProp = [...rowsArray];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Name", width: 150 },
    { field: "col1", headerName: "Name", width: 150 },
    { field: "col2", headerName: "Price", width: 150 },
    { field: "col3", headerName: "Restaurant", width: 150 },
    { field: "col4", headerName: "Quantity", width: 150 },
  ];
  return (
    <>
      <Modal>
        <Box sx={{ flexGrow: 1 }}>
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
        <div style={{ height: "20em" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
        {props.children}
      </Modal>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Success"
      />
      )
    </>
  );
};

export default SubmissionAlert;
