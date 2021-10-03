import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

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
    <Card
      onClick={() =>
        props.restaurantPick(props.id, props.name, props.description)
      }
      className={classes.root}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="restaurant" className={classes.avatar}>
            {props.name.split("")[0]}
          </Avatar>
        }
        title={props.name}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Restaurant;
