import React, { useState } from "react";
import { connect } from "react-redux";
import v4 from "uuid";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import theme from "../../theme";
import PreloaderAdaptive from "../Preloader/Adaptive";
import useStyles from "./useStyles";

import RecipeAddModal from "./RecipeAddModal";
import RecipeEditModal from "./RecipeEditModal";
import RecipeDeleteModal from "./RecipeDeleteModal";

import { recipesCleanErrorAndMessage } from "../../store/actions/recipes";


const RecipesList = ({ recipes, isLoading, recipesCleanErrorAndMessage }) => {
  const [addModalIsOpened, setAddModalIsOpened] = useState(false);
  const [editModalIsOpened, setEditModalIsOpened] = useState(false);
  const [modalData, setModalData] = useState({
    date: "",
  });
  const [deleteModalIsOpened, setDeleteModalIsOpened] = useState(false);


  const classes = useStyles();

  const columns = [
    { title: "Recipe", field: "name", type: "string" },
    { title: "Date", field: "date", type: "date" },
    {
      title: "Description",
      field: "description",
      type: "string",
      render: rowData => ( rowData.description.map( (item, index) => {
        return (
          <div key={v4()}>
            <Typography className={classes.description}>
              {`recipe #${index + 1}`}
            </Typography>
            <Typography key={v4()} className={classes.description}>
              {item}
            </Typography>
          </div>
        )}
      ))
    },
  ];

  const openModaAddhandler = () => {
    setAddModalIsOpened(true);
  };

  const openModalEditHandler = data => {
    setModalData(data);
    setEditModalIsOpened(true);
  };

  const openModalDeleteHandler = data => {
    setModalData(data);
    setDeleteModalIsOpened(true);
  };

  const closeModalHandler = () => {
    setAddModalIsOpened(false);
    setEditModalIsOpened(false);
    setDeleteModalIsOpened(false);
    recipesCleanErrorAndMessage();
  };

  return (
    <Box>
      <Typography variant="h3" align="center" className={classes.message}>
        Your recipes
      </Typography>
      {isLoading ? (
        <PreloaderAdaptive />
      ) : (
        <MaterialTable
          columns={columns}
          data={recipes}
          actions={[
            {
              icon: "add",
              tooltip: "Add recipe",
              isFreeAction: true,
              onClick: () => {
                openModaAddhandler();
              },
            },
            {
              icon: "edit",
              tooltip: "Edit recipe",
              onClick: (event, rowData) => {
                openModalEditHandler(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete recipe",
              onClick: (event, rowData) => {
                openModalDeleteHandler(rowData);
              },
            },
          ]}
          title="Recipes"
          options={{
            headerStyle: {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.secondary.main,
            }
          }}
        />
      )}

      { addModalIsOpened && (
        <RecipeAddModal isOpen={addModalIsOpened} closeModalHandler={closeModalHandler} />
      )}
      { editModalIsOpened && (
        <RecipeEditModal isOpen={editModalIsOpened} closeModalHandler={closeModalHandler} recipeItem={modalData} />
      )}
      { deleteModalIsOpened && (
        <RecipeDeleteModal isOpen={deleteModalIsOpened} closeModalHandler={closeModalHandler} recipeItem={modalData} />
      )}
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    recipes: state.recipesReducer.recipes,
    isLoading: state.recipesReducer.isLoading,
  };
};

export default connect(mapStateToProps, { recipesCleanErrorAndMessage })(RecipesList);
