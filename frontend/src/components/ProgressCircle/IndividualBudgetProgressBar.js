import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";
import { Spring, config } from "react-spring/renderprops";
import { connect } from "react-redux";

const IndividualBudgetProgressBar = (props) => {
  console.log(props);
  const budgetSpent = props.totalBudget - props.budget_remaining;
  const budgetPercentage = (budgetSpent / props.totalBudget) * 100;

  return (
    <div>
      <div className="ml-4 mr-4 mt-1 mb-1">
        <Spring
          to={{ value: budgetPercentage.toFixed(0) }}
          from={{ value: 0 }}
          config={{ tension: 800, friction: 130, mass: 16, clamp: true }}
        >
          {(progress) =>
            budgetPercentage > 100 ? (
              <ProgressBar
                animated
                style={{ height: "30px", border: "2px solid black" }}
                variant="danger"
                now={progress.value}
                label={
                  <h6>
                    {props.category_name} - {progress.value}%
                  </h6>
                }
              />
            ) : (
              <ProgressBar
                animated
                style={{ height: "30px", border: "2px solid black" }}
                variant="success"
                now={progress.value}
                label={
                  <h6>
                    {props.category_name} - {progress.value}%
                  </h6>
                }
              />
            )
          }
        </Spring>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.category,
    categoryId: parseInt(ownProps.categoryId),
    budgetRemaining: ownProps.budget_remaining,
    totalBudget: ownProps.category_budget,
    category_name: ownProps.category_name,
  };
};

export default connect(mapStateToProps)(IndividualBudgetProgressBar);
