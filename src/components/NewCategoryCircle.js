import React from "react";
import { Fab } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import AddIcon from "@material-ui/icons/Add";
import { Fade } from "react-awesome-reveal";
import NewCategoryForm from "./NewCategoryForm";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NewCategoryCircle = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Fab
        style={{ minWidth: "250px", minHeight: "250px" }}
        className="m-4 d-flex align-items-center"
        onClick={handleOpen}
      >
        <h5>
          <AddIcon />
          New Budget
        </h5>
      </Fab>
      {/* <Fade> */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <NewCategoryForm />
        </div>
      </Modal>
      {/* </Fade> */}
    </div>
  );
};

export default NewCategoryCircle;
