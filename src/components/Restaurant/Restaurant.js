import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
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
      </Card> */}

      <Card
        onClick={() => props.restaurantPick(props.restaurant)}
        className={classes.root}
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
          className={classes.media}
          image={props.profileImage ? props.profileImage : defaultImage}
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
