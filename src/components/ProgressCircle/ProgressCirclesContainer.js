import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/";
import { fetchUser } from "../../actions";
import ProgressCircle from "./ProgressCircle";
import { Row } from "react-bootstrap";
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
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchCategories(userId);
    this.props.fetchUser(userId);
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

    const categoryList = this.props.categories.sort((a, b) =>
      a.category_name > b.category_name ? 1 : -1
    );

    console.log(this.props.user);
    return (
      <div className=" m-0 p-0 w-100">
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
  return { categories: state.categories, user: state.user };
};

export default connect(mapStateToProps, { fetchCategories, fetchUser })(
  ProgressCirclesContainer
);
