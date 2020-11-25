import React, { Component } from "react";
import AccountInfo from "./AccountInfo";
import EditAccount from "./EditAccount";
import { Button } from "@material-ui/core";

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
      <div style={{ width: "700px", margin: "auto" }}>
        <h1 className="text-center my-3">My Account</h1>
        {!this.state.edit && (
          <div>
            <AccountInfo />
            <Button variant="contained" onClick={this.editBtn}>
              Edit Account
            </Button>
          </div>
        )}
        {this.state.edit && <EditAccount />}
      </div>
    );
  }
}
