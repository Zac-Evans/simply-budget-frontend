import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchUser,
  fetchPurchasesWithCategory,
} from "../../actions/";
import ProgressCircle from "./ProgressCircle";
import { Row } from "react-bootstrap";
import { DateTime } from "luxon";
import TotalProgressBar from "./TotalProgressBar";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { Paper } from "@material-ui/core";
import AddPurchaseCard from "../AddPurchaseCard";
import AddCategoryCard from "../AddCategoryCard";
import NewCategoryCircle from "../NewCategoryCircle";
// import { Circle } from "react-spinners-css";
import { Fade } from "react-awesome-reveal";

class ProgressCirclesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: DateTime.local().month - 1,
      selectedYear: DateTime.local().year,
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchCategories(userId);
    this.props.fetchUser(userId);
    this.props.fetchPurchasesWithCategory(userId);
  }
  createData = (purchaseMonth, purchaseYear, purchaseDate) => {
    return {
      purchaseMonth,
      purchaseYear,
      purchaseDate,
    };
  };

  render() {
    const rows = this.props.purchases.map((purchase) => {
      let purchaseMonth = new Date(purchase.createdAt).getMonth();
      let purchaseYear = new Date(purchase.createdAt).getFullYear();
      let purchaseDate = new Date(purchase.createdAt).toLocaleDateString(
        "en-US"
      );
      return this.createData(purchaseMonth, purchaseYear, purchaseDate);
    });

    let thisMonthTransactions = [];
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].purchaseMonth === this.state.selectedMonth &&
        rows[i].purchaseYear === this.state.selectedYear
      ) {
        thisMonthTransactions.push(rows[i]);
      }
    }

    const totalBudget = this.props.categories.map((category) => {
      return category.category_budget;
    });
    const addedBudget = totalBudget.reduce(function (pv, cv) {
      return pv + cv;
    }, null);

    const remainingBudget = this.props.categories.map((category) => {
      return category.budget_remaining;
    });
    const addedRemainingBudget = remainingBudget.reduce(function (pv, cv) {
      return pv + cv;
    }, null);
    const styles = {
      fadeInUp: {
        animation: "x 1s",
        animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
      },
    };

    const categoryList = this.props.categories.sort((a, b) =>
      a.category_name > b.category_name ? 1 : -1
    );

    console.log(this.props);
    return (
      <div className=" mb-4 p-0 w-100">
        {!this.props.categories[0] || !this.props.user[0] ? (
          <div>
            <Fade className="text-center m-2" direction="up" triggerOnce>
              <h1>Create a new budget to get started!</h1>
            </Fade>
            <Row className="d-flex justify-content-around">
              <AddPurchaseCard />
              {/* <MoneySpentRecentlyCard /> */}
              <AddCategoryCard />
            </Row>
            <Paper
              className="p-2"
              elevation={3}
              style={{ backgroundColor: "#" }}
            >
              <div className="mx-auto">
                <Row className="d-flex justify-content-center">
                  {this.props.categories[0] &&
                    categoryList.map((category) => (
                      <ProgressCircle
                        key={category.id}
                        categoryId={category.id}
                        budget_remaining={category.budget_remaining}
                        category_budget={category.category_budget}
                        category_name={category.category_name}
                      />
                    ))}
                  <StyleRoot style={styles.fadeInUp}>
                    <h2>&zwnj; </h2>
                    <NewCategoryCircle />
                  </StyleRoot>
                </Row>
              </div>
            </Paper>
          </div>
        ) : (
          // <div
          //   className="d-flex vh-100 align-items-center justify-content-center"
          //   style={{ marginTop: "-190px" }}
          // >
          //   <Fade>
          //     <Circle size={150} color="#47753e" />
          //   </Fade>
          // </div>
          <div>
            <TotalProgressBar
              totalBudget={addedBudget}
              budget_remaining={addedRemainingBudget}
              income={this.props.user[0].income}
            />
            <Row className="d-flex justify-content-around">
              <AddPurchaseCard />
              {/* <MoneySpentRecentlyCard /> */}
              <AddCategoryCard />
            </Row>
            <Paper
              className="p-2"
              elevation={3}
              style={{ backgroundColor: "#" }}
            >
              <div className="mx-auto">
                <Row className="d-flex justify-content-center">
                  {this.props.categories[0] &&
                    this.props.categories.map((category) => (
                      <ProgressCircle
                        key={category.id}
                        categoryId={category.id}
                        budget_remaining={category.budget_remaining}
                        category_budget={category.category_budget}
                        category_name={category.category_name}
                      />
                    ))}
                  <StyleRoot style={styles.fadeInUp}>
                    <h2>&zwnj; </h2>
                    <NewCategoryCircle />
                  </StyleRoot>
                </Row>
              </div>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    user: state.user,
    purchases: state.purchasesWithCategory,
  };
};

export default connect(mapStateToProps, {
  fetchCategories,
  fetchUser,
  fetchPurchasesWithCategory,
})(ProgressCirclesContainer);
