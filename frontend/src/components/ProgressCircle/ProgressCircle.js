import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../../actions/";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import ChangingProgressProvider from "./ChangingProgressProvider";
import { Col } from "react-bootstrap";
import ProgressInfoBox from "./ProgressInfoBox";
import { fadeInUp } from "react-animations";
import Radium, { StyleRoot } from "radium";

class ProgressCircle extends Component {
  render() {
    const styles = {
      fadeInUp: {
        animation: "x 1s",
        animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
      },
    };
    if (this.props.category_name.length === 0) {
      console.log(this.state);
      return <div></div>;
    } else {
      const totalBudget = parseInt(this.props.category_budget);
      const budgetSpent = totalBudget - this.props.budget_remaining;
      const budgetRemaining = this.props.budget_remaining;
      const percentageSpent = (budgetSpent / totalBudget) * 100;

      return (
        <Col
          lg="3"
          md="3"
          sm="4"
          xs="6"
          className=""
          style={{ minWidth: "100px" }}
        >
          <StyleRoot style={styles.fadeInUp}>
            <h2 className="text-center" style={{ whiteSpace: "nowrap" }}>
              {this.props.category_name}
            </h2>

            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={percentageSpent}
              duration={1.4}
              easingFunction={easeQuadInOut}
            >
              {(value) => {
                const roundedValue = Math.round(value);
                return (
                  <CircularProgressbar
                    value={value}
                    text={`${roundedValue}%`}
                    background
                    backgroundPadding={3}
                    /* This is important to include, because if you're fully managing the
        animation yourself, you'll want to disable the CSS animation. */
                    styles={
                      roundedValue > 100
                        ? buildStyles({
                            pathTransition: "none",
                            backgroundColor: "red",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "grey",
                          })
                        : buildStyles({
                            pathTransition: "none",
                            backgroundColor: "rgb(71, 117, 62)",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "grey",
                          })
                    }
                  />
                );
              }}
            </AnimatedProgressProvider>

            <ProgressInfoBox
              key={this.props.categoryId}
              categoryId={this.props.categoryId}
              budget_remaining={this.props.budget_remaining}
              category_budget={this.props.category_budget}
              category_name={this.props.category_name}
              budgetSpent={budgetSpent}
            />
          </StyleRoot>
        </Col>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.category,
    categoryId: parseInt(ownProps.categoryId),
    budget_remaining: ownProps.budget_remaining,
    category_budget: ownProps.category_budget,
    category_name: ownProps.category_name,
  };
};

export default connect(mapStateToProps)(ProgressCircle);
