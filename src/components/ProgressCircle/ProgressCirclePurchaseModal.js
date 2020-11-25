import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { fetchPurchasesWithCategory } from "../actions";
import { DateTime } from "luxon";
import { Fade } from "react-awesome-reveal";
import { Circle } from "react-spinners-css";
import Button from "@material-ui/core/Button";
// The icons
import EditIcon from "../images/edit-icon.png";
import TrashIcon from "../images/trash-icon.svg";
// the edit form
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

function createData(
  id,
  date,
  transactionName,
  transactionAmount,
  budgetCategory,
  notes,
  budgetRemaining,
  purchaseMonth
) {
  return {
    id,
    date,
    transactionName,
    transactionAmount,
    budgetCategory,
    notes,
    budgetRemaining,
    purchaseMonth,
  };
}

class TransactionList extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false, open1: false };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchPurchasesWithCategory(userId);
  }

  render() {
    // console.log()
    console.log(DateTime.local().month);
    const rows = this.props.purchases.map((purchase) => {
      let purchaseMonth = new Date(purchase.createdAt).getMonth();
      let purchaseDate = new Date(purchase.createdAt).toLocaleDateString(
        "en-US"
      );
      return createData(
        purchase.id,
        purchaseDate,
        purchase.purchase_name,
        purchase.price,
        purchase.budget_category.category_name,
        purchase.purchase_notes,
        purchase.budget_category.budget_remaining,
        purchaseMonth
      );
    });
    const thisMonthTransactions = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].purchaseMonth === DateTime.local().month - 1) {
        thisMonthTransactions.push(rows[i]);
      }
    }
    const edit = (e) => {
      e.preventDefault();

      this.setState({ open: true });
    };
    const deleteCat = (e) => {
      e.preventDefault();

      this.setState({ open1: true });
    };
    const handleClose = () => {
      this.setState({ open: false, open1: false });
    };

    const headerStyle = {
      backgroundColor: "rgb(48,48,48)",
      height: "10px",
      color: "white",
    };

    console.log(thisMonthTransactions);
    return (
      <TableContainer>
        {this.props.purchases[0] ? (
          this.props.purchases[0] ? (
            <div>
              <h1 className="text-center my-4" style={{ fontSize: "70px" }}>
                My Purchases
              </h1>
              <Paper
                style={{
                  border: "2px solid #000",
                  margin: "auto",
                  maxWidth: "900px",
                }}
              >
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#264653" }}>
                      <TableCell style={headerStyle}>Date</TableCell>
                      <TableCell style={headerStyle}>Transaction</TableCell>
                      <TableCell style={headerStyle}>Notes</TableCell>
                      <TableCell style={headerStyle}>Amount</TableCell>
                      <TableCell style={headerStyle}>Category</TableCell>

                      <TableCell style={headerStyle}>Remaining</TableCell>
                      <TableCell style={headerStyle} align="center">
                        Edit/Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {thisMonthTransactions.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.transactionName}</TableCell>
                        <TableCell>{row.notes}</TableCell>
                        <TableCell>{row.transactionAmount}</TableCell>
                        <TableCell>{row.budgetCategory}</TableCell>
                        <TableCell>{row.budgetRemaining}</TableCell>

                        <TableCell align="center">
                          <Button onClick={edit}>
                            <img src={EditIcon} id={row.id} />
                          </Button>
                          <Button onClick={deleteCat}>
                            <img
                              id={row.id}
                              style={{
                                width: "32px",
                                height: "32px",
                                margin: "auto",
                              }}
                              src={TrashIcon}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
              <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                // className={classes.modal}
                open={this.state.open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <div>
                  <EditForm />
                </div>
              </Modal>
              <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                // className={classes.modal}
                open={this.state.open1}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <div>
                  <DeleteForm />
                </div>
              </Modal>
            </div>
          ) : (
            <div
              className="d-flex vh-100 align-items-center justify-content-center"
              style={{ marginTop: "-190px" }}
            >
              <Fade>
                <Circle size={250} color="#47753e" />
              </Fade>
            </div>
          )
        ) : (
          <div>
            <h1 className="text-center my-4" style={{ fontSize: "70px" }}>
              My Purchases
            </h1>
            <Paper
              style={{
                border: "2px solid #000",
                margin: "auto",
                maxWidth: "900px",
              }}
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#264653" }}>
                    <TableCell style={headerStyle}>Date</TableCell>
                    <TableCell style={headerStyle}>Transaction</TableCell>
                    <TableCell style={headerStyle}>Notes</TableCell>
                    <TableCell style={headerStyle}>Amount</TableCell>
                    <TableCell style={headerStyle}>Category</TableCell>

                    <TableCell style={headerStyle}>Remaining</TableCell>
                    <TableCell style={headerStyle} align="center">
                      Edit/Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <h1 className="text-center p-4">Nothing here!</h1>
            </Paper>
          </div>
        )}
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchases: state.purchasesWithCategory,
  };
};

export default connect(mapStateToProps, { fetchPurchasesWithCategory })(
  TransactionList
);
