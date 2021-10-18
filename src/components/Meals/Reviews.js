import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
const Reviews = (props) => {
  const restaurantAddress = props.restaurant[0].location.address
    .split(",")
    .map((item) => item.trim());

  console.log(
    props.restaurant[0].location.address.split(",").map((item) => item.trim())
  );
  return (
    <Paper>
      <Typography>Reviews</Typography>
    </Paper>
  );
};

export default Reviews;
