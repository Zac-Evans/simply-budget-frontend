import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/";
import ProgressCircle from "./ProgressCircle";
import { Row } from "react-bootstrap";
import IndividualBudgetProgressBar from "./IndividualBudgetProgressBar";
import TotalProgressBar from "./TotalProgressBar";
import Header from "../Header";

class ProgressCirclesContainer extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchCategories(userId);
  }

  render() {
    return (
      <div>
        <TotalProgressBar />
        <div>
          {this.props.categories.map((category) => (
            <IndividualBudgetProgressBar
              key={category.id}
              categoryId={category.id}
              budget_remaining={category.budget_remaining}
              category_budget={category.category_budget}
              category_name={category.category_name}
            />
          ))}
        </div>
        <Row>
          {this.props.categories.map((category) => (
            <ProgressCircle
              key={category.id}
              categoryId={category.id}
              budget_remaining={category.budget_remaining}
              category_budget={category.category_budget}
              category_name={category.category_name}
            />
          ))}
        </Row>
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
