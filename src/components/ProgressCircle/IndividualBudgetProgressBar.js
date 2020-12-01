import React from "react";
import { ProgressBar, Row, Col } from "react-bootstrap";
import { Spring, config } from "react-spring/renderprops";
import { connect } from "react-redux";
import { Fade } from "react-awesome-reveal";
import { Paper } from "@material-ui/core";

const IndividualBudgetProgressBar = (props) => {
  const budgetSpent = props.totalBudget - props.budget_remaining;
  const budgetPercentage = (budgetSpent / props.totalBudget) * 100;
  const fontSizer = { fontSize: "clamp(16px, 1vw, 24px)", color: "black" };

  return (
    <Paper
      style={{
        backgroundColor: "rgb(71, 117, 62)",
        maxWidth: "700px",
        border: "3px solid rgb(71, 117, 62)",
        margin: "-5px",
      }}
      className="mx-auto"
      elevation={24}
    >
      <div className="mx-auto mt-1 mb-1" style={{ maxWidth: "700px" }}>
        <Spring
          to={{ value: budgetPercentage.toFixed(0) }}
          from={{ value: 0 }}
          config={{ tension: 800, friction: 200, mass: 30, clamp: true }}
        >
          {(progress) =>
            budgetPercentage > 100 ? (
              <Row className="m-0 p-0">
                <Col className="col-3">
                  <h5 className="text-center text-light">
                    {props.category_name}
                  </h5>
                </Col>
                <Col>
                  <ProgressBar
                    animated
                    style={{
                      height: "40px",
                      border: "2px solid black",
                      minWidth: "200px",
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
                            <b>
                              {" "}
                              ${props.budget_remaining.toFixed(2)} remaining
                            </b>
                          </h4>
                        </Fade>
                      </Row>
                    }
                  />
                </Col>
              </Row>
            ) : (
              <Row className="p-0 m-0">
                <Col className="col-3">
                  <h5 className="text-center text-light">
                    {props.category_name}
                  </h5>
                </Col>
                <Col>
                  <ProgressBar
                    animated
                    style={{
                      height: "40px",
                      border: "2px solid black",
                      minWidth: "200px",
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
                            <b>
                              {" "}
                              ${props.budget_remaining.toFixed(2)} remaining
                            </b>
                          </h4>
                        </Fade>
                      </Row>
                    }
                  />
                </Col>
              </Row>
            )
          }
        </Spring>
      </div>
    </Paper>
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
