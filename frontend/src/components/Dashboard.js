import { Container } from "@material-ui/core";
import React, { Component } from "react";
import ProgressCirclesContainer from "./ProgressCircle/ProgressCirclesContainer";

export default class Dashboard extends Component {
  render() {
    return (
      <Container>
        <ProgressCirclesContainer />
      </Container>
    );
  }
}
