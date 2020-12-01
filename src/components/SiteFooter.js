import { Backdrop, makeStyles, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Modal, Footer } from "react-bootstrap";
import DeleteForm from "./DeleteForm";

const SiteFooter = () => {
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
    },
  }));

  return (
    <footer
      class="bg-dark d-flex justify-content-center align-self-center pt-2 mt-4"
      style={{
        borderTop: "2px solid black",
        bottom: 0,
        width: "100%",
        position: "absolute",
        width: "100%",
      }}
    >
      <p className="text-light">©2020 Simply Budget. All rights reserved.</p>

      {/* <a className="text-success" href="/attributions">
        <b>Image attributions</b>
      </a> */}
    </footer>
  );
};

export default SiteFooter;

//attributions
<a href="https://icons8.com/icon/PX1jdWANLKwc/money">Money icon by Icons8</a>;
<a href="https://icons8.com/icon/MgUfAOs-YTpX/money-box">
  Money Box icon by Icons8
</a>;
<a href="https://icons8.com/icon/9oClPDThHBDm/coins">Coins icon by Icons8</a>;
