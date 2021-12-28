import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import defaultImage from "../../assets/default-image.jpg";

import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Restaurant = (props) => {
  const classes = useStyles();

  return (
    <>
      {/* <Card
        sx={{ maxWidth: 345 }}
        onClick={() => props.restaurantPick(props.restaurant)}
      >
        <CardMedia
          component="img"
          height="140"
          image={props.profileImage ? props.profileImage : defaultImage}
          alt={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2">{props.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card> 
      className={classes.avatar}
      className={classes.avatar}
      className={classes.media}
      */}
      <Card
        onClick={() => props.restaurantPick(props.restaurant)}
        // className={classes.root}
        elevation={6}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="restaurant" className={classes.avatar}>
              {props.name.split("")[0]}
            </Avatar>
          }
          title={props.name}
          titleTypographyProps={{ variant: "subtitle1" }}
        />
        <CardMedia
          image={props.profileImage ? props.profileImage : defaultImage}
          className={classes.media}
          title={props.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Restaurant;
