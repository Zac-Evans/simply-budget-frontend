import { Paper } from "@material-ui/core";
import React, { Component } from "react";

class Attributions extends Component {
  render() {
    return (
      <Paper className="mx-auto">
        <ul>
          <li>
            <a href="https://icons8.com/icon/PX1jdWANLKwc/money">
              Money icon by Icons8
            </a>
          </li>

          <li>
            <a href="https://icons8.com/icon/MgUfAOs-YTpX/money-box">
              Money Box icon by Icons8
            </a>
          </li>

          <li>
            <a href="https://icons8.com/icon/9oClPDThHBDm/coins">
              Coins icon by Icons8
            </a>
          </li>
        </ul>
      </Paper>
    );
  }
}

export default Attributions;
