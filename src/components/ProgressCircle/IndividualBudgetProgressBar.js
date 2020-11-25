import React from "react";
import { ProgressBar, Row } from "react-bootstrap";
import { Spring, config } from "react-spring/renderprops";
import { connect } from "react-redux";
import { Fade } from "react-awesome-reveal";

const IndividualBudgetProgressBar = (props) => {
  const budgetSpent = props.totalBudget - props.budget_remaining;
  const budgetPercentage = (budgetSpent / props.totalBudget) * 100;
  const fontSizer = { fontSize: "calc(12px + 1vw)", color: "black" };
  console.log(props);
  return (
    <div>
      <div className="mx-auto mt-1 mb-1" style={{ maxWidth: "700px" }}>
        <Spring
          to={{ value: budgetPercentage.toFixed(0) }}
          from={{ value: 0 }}
          config={{ tension: 800, friction: 100, mass: 19, clamp: true }}
        >
          {(progress) =>
            budgetPercentage > 100 ? (
              <div>
                <h4 className="text-center p-2">{props.category_name}</h4>
                <ProgressBar
                  animated
                  style={{
                    height: "40px",
                    border: "2px solid black",
                    minWidth: "300px",
                  }}
                  variant="danger"
                  now={progress.value}
                  label={
                    <Row
                      className="d-flex justify-content-between position-absolute w-75 ml-3"
                      style={{ maxWidth: "650px" }}
                    >
                      <Fade direction="up" delay="100" triggerOnce>
                        <h4 style={fontSizer}>
                          <b>{Math.round(progress.value)}%</b>
                        </h4>
                      </Fade>
                      <Fade direction="up" delay="150" triggerOnce>
                        <h4 style={fontSizer}>
                          <b> ${props.budget_remaining} remaining</b>
                        </h4>
                      </Fade>
                    </Row>
                  }
                />
              </div>
            ) : (
              <div>
                <h4 className="text-center p-2">{props.category_name}</h4>
                <ProgressBar
                  animated
                  style={{
                    height: "40px",
                    border: "2px solid black",
                    minWidth: "300px",
                  }}
                  variant="success"
                  now={progress.value}
                  label={
                    <Row
                      className="d-flex justify-content-between position-absolute w-75 ml-3"
                      style={{ maxWidth: "650px" }}
                    >
                      <Fade direction="up" delay="100" triggerOnce>
                        <h4 style={fontSizer}>
                          <b>{Math.round(progress.value)}%</b>
                        </h4>
                      </Fade>
                      <Fade direction="up" delay="150" triggerOnce>
                        <h4 style={fontSizer}>
                          <b> ${props.budget_remaining} remaining</b>
                        </h4>
                      </Fade>
                    </Row>
                  }
                />
              </div>
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
