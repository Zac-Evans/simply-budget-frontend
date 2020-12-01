import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { fetchPurchasesWithCategory } from "../actions";
import { DateTime } from "luxon";
import Button from "@material-ui/core/Button";
// The icons
import EditIcon from "../images/edit-icon.png";
import NotesIcon from "../images/notes-icon.png";
import TrashIcon from "../images/trash-icon.svg";
// the edit form
import DeleteFormPurchases from "./DeleteFormPurchases";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import EditFormPurchases from "./EditFormPurchases";
import { Row, Col } from "react-bootstrap";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IndividualBudgetProgressBarTransactions from "./ProgressCircle/IndividualBudgetProgressBarTransactions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddPurchaseCard from "./AddPurchaseCard";
import AddCategoryCard from "./AddCategoryCard";

function createData(
  id,
  date,
  transactionName,
  transactionAmount,
  budgetCategory,
  notes,
  budgetRemaining,
  purchaseMonth,
  categoryBudget,
  purchaseYear,
  categoryId,
  dateInt
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
    categoryBudget,
    purchaseYear,
    categoryId,
    dateInt,
  };
}

class TransactionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      open1: false,
      purchaseId: "",
      categoryId: "",
      price: 0,
      remaining: 0,
      selectedMonth: DateTime.local().month - 1,
      selectedYear: DateTime.local().year,
      selectedCategory: "All",
      noPurchases: false,
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchPurchasesWithCategory(userId);
  }

  render() {
    const rows = this.props.purchases.map((purchase) => {
      let purchaseMonth = new Date(purchase.createdAt).getMonth();
      let purchaseYear = new Date(purchase.createdAt).getFullYear();
      let purchaseDateString = new Date(purchase.createdAt).toLocaleDateString(
        "en-US"
      );
      let purchaseDate = new Date(purchase.createdAt).getDate();
      let categoryName = purchase.budget_category
        ? purchase.budget_category.category_name
        : "Unassigned";

      let budgetRemaining = purchase.budget_category
        ? purchase.budget_category.budget_remaining
        : 0;

      let categoryBudget = purchase.budget_category
        ? purchase.budget_category.category_budget
        : 0;

      let categoryId = purchase.budget_category
        ? purchase.budget_category.id
        : 0;

      return createData(
        purchase.id,
        purchaseDateString,
        purchase.purchase_name,
        purchase.price,
        categoryName,
        purchase.purchase_notes,
        budgetRemaining,
        purchaseMonth,
        categoryBudget,
        purchaseYear,
        categoryId,
        purchaseDate
      );
    });

    let thisMonthTransactions = [];

    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].purchaseMonth === this.state.selectedMonth &&
        rows[i].purchaseYear === this.state.selectedYear &&
        rows[i].budgetCategory === this.state.selectedCategory
      ) {
        thisMonthTransactions.push(rows[i]);
      } else if (
        rows[i].purchaseMonth === this.state.selectedMonth &&
        rows[i].purchaseYear === this.state.selectedYear &&
        this.state.selectedCategory === "All"
      ) {
        thisMonthTransactions.push(rows[i]);
      }
    }

    console.log(thisMonthTransactions);

    const sortedThisMonthTransactions = thisMonthTransactions.sort((a, b) =>
      a.dateInt < b.dateInt ? 1 : -1
    );

    const handleMonthChange = (e) => {
      this.setState({ selectedMonth: e.target.value });
    };

    const handleYearChange = (e) => {
      this.setState({ selectedYear: e.target.value });
    };

    const handleCategoryChange = (e) => {
      this.setState({ selectedCategory: e.target.value });
    };

    const edit = (e) => {
      e.preventDefault();
      this.setState({
        open: true,
        purchaseId: e.target.id,
        categoryId: e.target.getAttribute("category"),
        price: e.target.getAttribute("price"),
        remaining: e.target.getAttribute("remaining"),
      });
    };

    const deleteCat = (e) => {
      e.preventDefault();
      this.setState({
        open1: true,
        purchaseId: e.target.id,
        categoryId: e.target.getAttribute("category"),
        price: e.target.getAttribute("price"),
        remaining: e.target.getAttribute("remaining"),
      });
    };

    const handleClose = () => {
      this.setState({ open: false, open1: false });
    };

    const headerStyle = {
      backgroundColor: "rgb(48,48,48)",
      height: "10px",
      color: "white",
    };

    const categoryNameList = this.props.purchases.map((purchase) =>
      purchase.budget_category
        ? purchase.budget_category.category_name
        : "Unassigned"
    );

    const categoryNameListUnique = [...new Set(categoryNameList)];

    console.log(this.state);
    return (
      <div>
        {!this.state.noPurchases ? (
          <TableContainer className="m-0 p-0">
            <h1 className="text-center my-4" style={{ fontSize: "60px" }}>
              Purchases
            </h1>
            <Paper
              style={{
                margin: "auto",
                maxWidth: "700px",
              }}
            >
              <Row
                className="d-flex justify-content-around"
                style={{
                  backgroundColor: "rgb(49,49,49)",
                  margin: "auto",
                  maxWidth: "700px",
                }}
              >
                <FormControl className="mx-1 my-2" style={{ width: "100px" }}>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    className="text-light"
                  >
                    Month
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.selectedMonth}
                    onChange={handleMonthChange}
                    className="text-light"
                  >
                    <MenuItem value={0}>January</MenuItem>
                    <MenuItem value={1}>February</MenuItem>
                    <MenuItem value={2}>March</MenuItem>
                    <MenuItem value={3}>April</MenuItem>
                    <MenuItem value={4}>May</MenuItem>
                    <MenuItem value={5}>June</MenuItem>
                    <MenuItem value={6}>July</MenuItem>
                    <MenuItem value={7}>August</MenuItem>
                    <MenuItem value={8}>September</MenuItem>
                    <MenuItem value={9}>October</MenuItem>
                    <MenuItem value={10}>November</MenuItem>
                    <MenuItem value={11}>December</MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl className="my-2 mx-1" style={{ width: "100px" }}>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    className="text-light"
                  >
                    Year
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.selectedYear}
                    onChange={handleYearChange}
                    className="text-light"
                  >
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                    <MenuItem value={2018}>2018</MenuItem>
                    <MenuItem value={2017}>2017</MenuItem>
                    <MenuItem value={2016}>2016</MenuItem>
                    <MenuItem value={2015}>2015</MenuItem>
                    <MenuItem value={2014}>2014</MenuItem>
                    <MenuItem value={2013}>2013</MenuItem>
                    <MenuItem value={2012}>2012</MenuItem>
                    <MenuItem value={2011}>2011</MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl className="my-2 mx-1" style={{ width: "100px" }}>
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    className="text-light"
                  >
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.selectedCategory}
                    onChange={handleCategoryChange}
                    className="text-light"
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    {categoryNameListUnique.map((category) => (
                      <MenuItem value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Row>

              <div>
                <div>
                  {sortedThisMonthTransactions.map((row) => (
                    <div key={row.id} style={{ border: "1px solid black" }}>
                      <Accordion style={{ display: "block" }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className="mb-0 pb-0"
                        >
                          <div className="d-inline w-100">
                            <Row>
                              <Col>
                                <Row className="pl-3">
                                  Budget -&nbsp;<b> {row.budgetCategory}</b>
                                </Row>
                              </Col>
                              <Col className="text-right">
                                <h5>{row.transactionName}</h5>
                              </Col>
                            </Row>

                            <Row>
                              <Col>
                                <p className="text-secondary">{row.date}</p>
                              </Col>
                              <Col className="text-right">
                                <b>${row.transactionAmount.toFixed(2)}</b>
                              </Col>
                            </Row>
                          </div>
                        </AccordionSummary>
                        <hr className="p-0 m-0" />
                        <AccordionDetails className="d-flex justify-content-center p-0 m-0 bg-light">
                          <div className="d-flex justify-content-center p-0 m-0">
                            <Row>
                              <Col className="d-flex justify-content-center mt-2">
                                <Button onClick={edit} className="p-2">
                                  Edit &nbsp;
                                  <img
                                    id={row.id}
                                    src={EditIcon}
                                    value={row.categoryId}
                                    price={row.transactionAmount}
                                    remaining={row.budgetRemaining}
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      padding: "4px",
                                    }}
                                  />
                                </Button>
                              </Col>
                              <Col className="d-flex justify-content-center mt-2">
                                <Button onClick={deleteCat} className="p-2">
                                  Delete &nbsp;
                                  <img
                                    id={row.id}
                                    category={row.categoryId}
                                    price={row.transactionAmount}
                                    remaining={row.budgetRemaining}
                                    style={{
                                      width: "40px",
                                      height: "35px",
                                    }}
                                    src={TrashIcon}
                                  />
                                </Button>
                              </Col>

                              <Col className="col-12 col-md-6">
                                <IndividualBudgetProgressBarTransactions
                                  className="p-0 m-0"
                                  budget_remaining={row.budgetRemaining}
                                  category_name={row.budgetCategory}
                                  category_budget={row.categoryBudget}
                                />
                              </Col>

                              <Col className="col-12 m-4">
                                <b>Notes: &nbsp;</b>

                                {row.notes}
                              </Col>
                            </Row>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    // </TableRow>
                  ))}
                </div>
              </div>
            </Paper>
            <Modal
              className="d-flex justify-content-center align-items-center"
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              open={this.state.open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <div>
                <EditFormPurchases
                  purchaseId={this.state.purchaseId}
                  categoryList={this.props.purchases}
                />
              </div>
            </Modal>
            <Modal
              className="d-flex justify-content-center align-items-center"
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              open={this.state.open1}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <div>
                <DeleteFormPurchases
                  purchaseId={this.state.purchaseId}
                  categoryId={this.state.categoryId}
                  price={this.state.price}
                  remaining={this.state.remaining}
                />
              </div>
            </Modal>
          </TableContainer>
        ) : (
          <TableContainer>
            <h2 className="text-center my-4">My Purchases</h2>
            <Paper
              style={{
                border: "2px solid #000",
                // margin: "auto",
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
          </TableContainer>
        )}
        <Row className="d-flex justify-content-center m-0 p-0">
          <AddPurchaseCard />
          <AddCategoryCard />
        </Row>
      </div>
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
