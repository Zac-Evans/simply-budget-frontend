// React and Redux
import React from "react";
import { fetchCategories } from "../actions/";
import { connect } from "react-redux";
// Material UI things
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
//Table elements
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// The icons
import EditIcon from "../images/edit-icon.png";
import TrashIcon from "../images/trash-icon.svg";
// the edit form
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

// This is for the modal styling
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Categories = (props) => {
  // Modal styling
  const classes = useStyles();

  // Table styling
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "rgb(48, 48, 48)",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  // Function to create table data
  function createData(id, categoryName, categoryBudget, budgetRemaining) {
    return {
      id,
      categoryName,
      categoryBudget,
      budgetRemaining,
    };
  }

  const rows = props.categories.map((category) => {
    return createData(
      category.id,
      category.category_name,
      category.category_budget,
      category.budget_remaining
    );
  });

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
  };

  window.onload = () => {
    const userId = localStorage.getItem("userId");
    props.fetchCategories(userId);
  };

  const edit = (e) => {
    e.preventDefault();
    setCategoryId(e.target.id);
    setOpen(true);
  };

  const deleteCat = (e) => {
    e.preventDefault();
    setCategoryId(e.target.id);
    setOpen1(true);
  };

  return (
    <div>
      <h1 className="text-center my-3">My Categories</h1>
      <TableContainer
        style={{ maxWidth: "700px", margin: "auto" }}
        component={Paper}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#264653" }}>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="center">Budget</StyledTableCell>
              <StyledTableCell align="center">Remaining Budget</StyledTableCell>
              <StyledTableCell align="center">
                Edit/Remove Budget
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">
                  {row.categoryName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.categoryBudget}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.budgetRemaining}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={edit}>
                    <img src={EditIcon} id={row.id} />
                  </Button>
                  <Button onClick={deleteCat}>
                    <img
                      id={row.id}
                      style={{ width: "32px", height: "32px", margin: "auto" }}
                      src={TrashIcon}
                    />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <EditForm categoryId={categoryId} />
        </div>
      </Modal>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open1}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <DeleteForm categoryId={categoryId} />
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { categories: state.categories };
};

export default connect(mapStateToProps, { fetchCategories })(Categories);
