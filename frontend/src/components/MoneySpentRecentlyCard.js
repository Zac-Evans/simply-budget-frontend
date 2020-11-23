import React from "react";
import {
  Fab,
  Card,
  Typography,
  Button,
  CardContent,
  CardActions,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const AddPurchaseCard = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className="d-flex justify-content-center m-4">
      <a>
        <Card
          className="d-flex flex-column align-items-center"
          style={{ height: "240px" }}
        >
          <CardContent className="d-flex flex-column align-items-center">
            <Typography
              variant="h6"
              component="h6"
              style={{ textAlign: "center" }}
            >
              You've spent MONEY <br /> the last few days.
            </Typography>

            <img
              src="https://img.icons8.com/cute-clipart/200/000000/coins.png"
              width="100px"
              className="mx-auto"
            />
            <Typography className="text-center" color="textSecondary">
              You are on track to make your monthly budget!
            </Typography>
          </CardContent>
        </Card>
      </a>
    </div>
  );
};

export default AddPurchaseCard;
