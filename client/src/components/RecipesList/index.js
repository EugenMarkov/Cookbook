import React, { useState } from "react";
import { connect } from "react-redux";
import v4 from "uuid";
import MaterialTable from "material-table";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PreloaderAdaptive from "../Preloader/Adaptive";
import useStyles from "./useStyles";

import RecipeAddModal from "./RecipeAddModal";
import RecipeEditModal from "./RecipeEditModal";
import RecipeDeleteModal from "./RecipeDeleteModal";

const RecipesList = ({ recipes, isLoading }) => {
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
      render: rowData => ( rowData.description.reverse().map( item => {
        return (
          <Typography key={v4()} className={classes.description}>
            {item}
          </Typography>
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
              icon: () => <AddCircleIcon />,
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

export default connect(mapStateToProps)(RecipesList);
