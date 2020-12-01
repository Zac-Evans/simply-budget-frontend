import React, { Component } from "react";
import AccountInfo from "./AccountInfo";
import EditAccount from "./EditAccount";
import { Button, Paper } from "@material-ui/core";

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
    };
  }

  editBtn = () => {
    this.setState({ edit: true });
  };

  render() {
    return (
      <div>
        <Paper
          elevation={24}
          className="p-2 mx-auto mt-4"
          style={{ maxWidth: "700px" }}
        >
          <h1 className="text-center my-3">My Account</h1>
          {!this.state.edit && (
            <div className="d-flex flex-column align-items-center">
              <AccountInfo />
              <Button variant="contained" onClick={this.editBtn}>
                <b>Edit Account</b>
              </Button>
            </div>
          )}
          {this.state.edit && <EditAccount />}
        </Paper>
      </div>
    );
  }
}
