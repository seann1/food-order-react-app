import { useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
const Reviews = (props) => {
  const restaurantAddress = props.restaurant[0].location.address
    .split(",")
    .map((item) => item.trim());

  useEffect(() => {
    fetch(
      `/v3/businesses/matches?name=${encodeURIComponent(
        props.restaurant.name
      )}&address1=${encodeURIComponent(restaurantAddress[0])}&city=${
        restaurantAddress[1]
      }&state=${restaurantAddress[2].split(" ")[0]}&country=${
        restaurantAddress[3]
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
          //Origin: "localhost",
          withCredentials: true,
          "Content-Type": "application/json",
        },
      }
    ).then((result) => {
      console.log("completed");
      console.log(result);
    });
  }, []);

  console.log(
    props.restaurant[0].location.address.split(",").map((item) => item.trim())
  );
  return (
    <Paper>
      <Typography p={2} gutterBottom>
        Reviews
      </Typography>
    </Paper>
  );
};

export default Reviews;
