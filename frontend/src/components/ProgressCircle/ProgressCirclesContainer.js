import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/";
import ProgressCircle from "./ProgressCircle";
import { Row } from "react-bootstrap";
import IndividualBudgetProgressBar from "./IndividualBudgetProgressBar";
import TotalProgressBar from "./TotalProgressBar";
import Header from "../Header";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { Fab, Paper } from "@material-ui/core";
import AddPurchaseCard from "../AddPurchaseCard";
import AddCategoryCard from "../AddCategoryCard";
import MoneySpentRecentlyCard from "../MoneySpentRecentlyCard";
import AddIcon from "@material-ui/icons/Add";
import NewCategoryCircle from "../NewCategoryCircle";

class ProgressCirclesContainer extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchCategories(userId);
  }

  render() {
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

    return (
      <div className="mb-4">
        {addedRemainingBudget && (
          <div>
            <TotalProgressBar
              totalBudget={addedBudget}
              budget_remaining={addedRemainingBudget}
            />
            <Row className="d-flex justify-content-around">
              <AddPurchaseCard />
              <MoneySpentRecentlyCard />
              <AddCategoryCard />
            </Row>
            {/* <div>
              {this.props.categories.map((category) => (
                <IndividualBudgetProgressBar
                  key={category.id}
                  categoryId={category.id}
                  budget_remaining={category.budget_remaining}
                  category_budget={category.category_budget}
                  category_name={category.category_name}
                />
              ))}
            </div> */}
            <Paper
              className="p-2"
              elevation={3}
              style={{ backgroundColor: "#" }}
            >
              <div className="mx-auto">
                <Row className="d-flex justify-content-center">
                  {this.props.categories.map((category) => (
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
  return { categories: state.categories };
};

export default connect(mapStateToProps, { fetchCategories })(
  ProgressCirclesContainer
);
