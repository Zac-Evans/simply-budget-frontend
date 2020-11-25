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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
      if (rows[i].purchaseMonth == DateTime.local().month - 1) {
        thisMonthTransactions.push(rows[i]);
      }
    }

    console.log(thisMonthTransactions);
    return (
      <TableContainer component={Paper}>
        {!this.props.purchases[0] ? (
          <div className="d-flex vh-100 align-items-center justify-content-center">
            <Fade>
              <Circle
                size={250}
                color="#47753e"
                style={{ marginTop: "-190px" }}
              />
            </Fade>
          </div>
        ) : (
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Transaction</StyledTableCell>
                <StyledTableCell align="left">Notes</StyledTableCell>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="left">Category</StyledTableCell>

                <StyledTableCell align="right">
                  Remaining Budget
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {thisMonthTransactions.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row" align="left">
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell>{row.transactionName}</StyledTableCell>
                  <StyledTableCell>{row.notes}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.transactionAmount}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.budgetCategory}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.budgetRemaining}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
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
