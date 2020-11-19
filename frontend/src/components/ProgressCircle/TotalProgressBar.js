import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { Spring, config } from "react-spring/renderprops";
import { connect } from "react-redux";
import { Fade } from "react-awesome-reveal";

const TotalBudgetProgressBar = (props) => {
  const budgetSpent = props.totalBudget - props.budget_remaining;
  const budgetPercentage = (budgetSpent / props.totalBudget) * 100;
  const fontSizer = { fontSize: "calc(12px + 1.5vw)" };

  return (
    <div>
      {budgetPercentage && (
        <div className="ml-4 mr-4 mt-1 mb-1">
          <h2 className="text-center">
            Total monthly budget: ${props.totalBudget}
          </h2>
          <Spring
            to={{ value: budgetPercentage.toFixed(0) }}
            from={{ value: 0 }}
            config={{ tension: 800, friction: 130, mass: 19, clamp: true }}
          >
            {(progress) =>
              budgetPercentage > 100 ? (
                <ProgressBar
                  animated
                  style={{ height: "70px", border: "2px solid black" }}
                  variant="danger"
                  now={progress.value}
                  label={<h6>{progress.value}%</h6>}
                />
              ) : (
                <ProgressBar
                  animated
                  style={{ height: "70px", border: "2px solid black" }}
                  variant="success"
                  now={progress.value}
                  label={
                    <Row className="d-flex justify-content-around">
                      {/* <Fade direction="left" delay="150"> */}
                      <h4 style={fontSizer}>
                        ${props.budget_remaining} remaining in your budget
                      </h4>
                      {/* </Fade>
                      <Fade direction="right" delay="100"> */}
                      <h4 style={fontSizer}>{progress.value}%</h4>
                      {/* </Fade> */}
                    </Row>
                  }
                />
              )
            }
          </Spring>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.category,
    categoryId: parseInt(ownProps.categoryId),
    budget_remaining: ownProps.budget_remaining,
    totalBudget: parseInt(ownProps.totalBudget),
    category_name: ownProps.category_name,
  };
};

export default connect(mapStateToProps)(TotalBudgetProgressBar);
