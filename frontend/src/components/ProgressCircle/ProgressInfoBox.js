import React from "react";
import { Paper } from "@material-ui/core";
import { useSpring, animated, config } from "react-spring";
import { connect } from "react-redux";
import "react-circular-progressbar/dist/styles.css";

const ProgressInfoBox = (props) => {
  const numStyle = useSpring({
    to: {
      totalBudget: props.totalBudget,
      budgetRemaining: props.budgetRemaining,
      budgetSpent: props.budgetSpent,
    },
    from: { totalBudget: 0, budgetRemaining: 0, budgetSpent: 0 },
  });
  return (
    <div style={{ minWidth: "250px" }}>
      {props && (
        <Paper elevation={3} className="text-center bg-dark text-light m-4 p-2">
          <div className="d-flex justify-content-between">
            <h6>Total budget:</h6>
            <h6>
              $
              <animated.span>
                {numStyle.totalBudget.interpolate((num) => num.toFixed(2))}
              </animated.span>
            </h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6>Spent: </h6>
            <h6>
              $
              <animated.span>
                {numStyle.budgetSpent.interpolate((num) => num.toFixed(2))}
              </animated.span>
            </h6>
          </div>
          <hr style={{ borderBottom: "3px solid white", marginTop: 7 }} />
          {props.budgetRemaining < 0 ? (
            <div className="d-flex justify-content-between">
              <h5 className="text-warning">Remaining: </h5>
              <h5 className="text-warning">
                $
                <animated.span>
                  {numStyle.budgetRemaining.interpolate((num) =>
                    num.toFixed(2)
                  )}
                </animated.span>
              </h5>
            </div>
          ) : (
            <div className="d-flex justify-content-between">
              <h5>Remaining:</h5>
              <h5>
                $
                <animated.span>
                  {numStyle.budgetRemaining.interpolate((num) =>
                    num.toFixed(2)
                  )}
                </animated.span>
              </h5>
            </div>
          )}
        </Paper>
      )}
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
    budgetSpent: ownProps.budgetSpent,
  };
};
export default connect(mapStateToProps)(ProgressInfoBox);
