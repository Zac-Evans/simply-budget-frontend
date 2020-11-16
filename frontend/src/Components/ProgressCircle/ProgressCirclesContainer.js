import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/";
import ProgressCircle from "./ProgressCircle";
import { Row } from "react-bootstrap";

class ProgressCirclesContainer extends Component {
  componentDidMount() {
    //replace with sessionStorage.getItem('userId')
    const userId = 1;
    this.props.fetchCategories(userId);
  }

  render() {
    return (
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
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories };
};

export default connect(mapStateToProps, { fetchCategories })(
  ProgressCirclesContainer
);
