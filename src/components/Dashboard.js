import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddPurchaseButton from "./AddPurchaseCard";
import ProgressCirclesContainer from "./ProgressCircle/ProgressCirclesContainer";

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <ProgressCirclesContainer /> :
      </Container>
    );
  }
}

export default Dashboard;
