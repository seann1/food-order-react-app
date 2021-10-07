//import classes from "./MealsSummary.module.css";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MealsSummary = (props) => {
  return (
    // className={classes.summary}
    <Container>
      <Paper elevation={3}>
        <Box p={3}>
          <Typography align="left" variant="h3">
            {props.restaurantName}
          </Typography>
          <Typography align="left" variant="h6">
            {props.description}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default MealsSummary;
