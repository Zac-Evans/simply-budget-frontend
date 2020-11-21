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
  budgetRemaining
) {
  return {
    id,
    date,
    transactionName,
    transactionAmount,
    budgetCategory,
    budgetRemaining,
  };
}

class TransactionList extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchPurchasesWithCategory(userId);
  }

  render() {
    const rows = this.props.purchases.map((purchase) => {
      let purchaseDate = new Date(purchase.createdAt).toLocaleDateString(
        "en-US"
      );

      createData(
        purchase.id,
        purchaseDate,
        purchase.purchase_name,
        purchase.price,
        purchase.budget_category.category_name,
        purchase.budget_category.budget_remaining
      );
    });

    return (
      <TableContainer component={Paper}>
        {this.props.purchases[0] && (
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Transaction</StyledTableCell>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="left">Category</StyledTableCell>
                <StyledTableCell align="right">
                  Remaining Budget
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row" align="left">
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell>{row.transactionName}</StyledTableCell>

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
