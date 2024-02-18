import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteRecipe,
  getRecipeById,
  updateRecipe,
} from "../services/recipeService";
import {
  addIngredientsToDatabase,
  removeIngredientsFromDatabase,
} from "../services/recipeIngredientsService";
import Button from "react-bootstrap/Button";

export const EditRecipe = ({
  ingredients,
  mealTypes,
  recipeId,
  recipeIngredients,
  recipeIngredientIds,
}) => {
  const [recipe, setRecipe] = useState({});
  const [mealTypeName, setMealTypeName] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState("");
  const [addedIngredients, setAddedIngredients] = useState([
    ...recipeIngredients,
  ]);
  const navigate = useNavigate();

  const getRecipe = (recipeId) => {
    getRecipeById(recipeId).then((recipe) => {
      const recipeObj = recipe[0];
      setRecipe(recipeObj);
    });
  };

  const addIngredient = (ingredient) => {
    setAddedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const handleUpdateRecipe = () => {
    const updatedRecipe = {
      title: recipe.title,
      mealTypeId: recipe.mealTypeId,
      instructions: recipe.instructions,
      description: recipe.description,
      image: recipe.image,
      id: recipe.id,
    };

    updateRecipe(recipe.id, updatedRecipe);

    //determine which ingredients have been added/removed when the recipe is edited
    const ingredientsRemoved = recipeIngredients.filter(
      (recipeIngredient) =>
        !addedIngredients.some(
          (addedIngredient) => addedIngredient.id === recipeIngredient.id
        )
    );
    console.log("Removed Ingredients:", ingredientsRemoved);

    const ingredientsAdded = addedIngredients.filter(
      (addedIngredient) =>
        !recipeIngredients.some(
          (recipeIngredient) => recipeIngredient.id === addedIngredient.id
        )
    );
    console.log("Added Ingredients:", ingredientsAdded);

    //post/delete from database
    if (ingredientsRemoved.length > 0 && ingredientsAdded.length > 0) {
      removeIngredientsFromDatabase(
        ingredientsRemoved,
        recipeIngredientIds
      ).then(() => {
        addIngredientsToDatabase(ingredientsAdded, recipe);
      });
    } else if (ingredientsRemoved.length > 0) {
      removeIngredientsFromDatabase(ingredientsRemoved, recipeIngredientIds);
    } else if (ingredientsAdded.length > 0) {
      addIngredientsToDatabase(ingredientsAdded, recipe);
    }
    window.alert("Recipe Updated!");
    navigate("/recipes");
  };

  useEffect(() => {
    getRecipe(recipeId);
  }, [recipeId]);

  useEffect(() => {
    const mealTypeObj = mealTypes.find((type) => type.id === recipe.mealTypeId);
    const mealTypeObjName = mealTypeObj?.name;
    setMealTypeName(mealTypeObjName);
  }, [recipe]);

  useEffect(() => {
    setAddedIngredients(recipeIngredients);
  }, [recipeIngredients]);

  useEffect(() => {
    if (searchIngredients !== "") {
      const foundWords = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchIngredients.toLowerCase())
      );
      setFilteredIngredients(foundWords);
    }
  }, [searchIngredients, ingredients]);

  return (
    <div className="recipes-container">
      <div className="recipes-header">
        <h1 className="signika-font-bold recipes-h1">Edit Recipe</h1>
      </div>
      <div className="recipes-body">
        <section className="edit-recipe-inputs">
          <div className="edit-recipe-input-item">
            <h4 className="edit-recipe-title">Title:</h4>
            <fieldset>
              <textarea
                type="text"
                value={recipe.title}
                className="input-box-title"
                onChange={(event) => {
                  const copy = { ...recipe };
                  copy.title = event.target.value;
                  setRecipe(copy);
                }}
                required
              />
            </fieldset>
          </div>
          <div className="edit-recipe-input-item">
            <h4 className="edit-recipe-title">Meal Type:</h4>
            <select
              id="resource"
              required
              value={recipe.mealTypeId}
              className="input-box-meal-type"
              onChange={(event) => {
                const copy = { ...recipe };
                const mealTypeText = event.target.value;
                const mealTypeObj = mealTypes.find(
                  (type) => type.name === mealTypeText
                );
                copy.mealTypeId = mealTypeObj.id;
                setRecipe(copy);
              }}
            >
              <option value="0">{mealTypeName}</option>
              {mealTypes.map((type) => {
                if (type.name !== mealTypeName) {
                  return <option key={type.id}>{type.name}</option>;
                }
              })}
            </select>
          </div>
          <div>
            <h4 className="edit-recipe-title">
              Image URL (Copy Image Address):
            </h4>
            <fieldset>
              <textarea
                type="text"
                value={recipe.image}
                className="input-box-url"
                onChange={(event) => {
                  const copy = { ...recipe };
                  copy.image = event.target.value;
                  setRecipe(copy);
                }}
                required
              />
            </fieldset>
          </div>
          <div>
            <h4 className="edit-recipe-title">Description:</h4>
            <fieldset>
              <textarea
                type="text"
                value={recipe.description}
                className="input-box-description"
                onChange={(event) => {
                  const copy = { ...recipe };
                  copy.description = event.target.value;
                  setRecipe(copy);
                }}
                required
              />
            </fieldset>
          </div>
          <div>
            <h4 className="edit-recipe-title">Directions:</h4>
            <fieldset>
              <textarea
                type="text"
                value={recipe.instructions}
                className="input-box-directions"
                onChange={(event) => {
                  const copy = { ...recipe };
                  copy.instructions = event.target.value;
                  setRecipe(copy);
                }}
                required
              />
            </fieldset>
          </div>
        </section>
        <section className="edit-recipe-inputs">
          <h4 className="edit-recipe-title">Ingredients: </h4>
          <input
            type="text"
            required
            placeholder="Search Ingredients"
            className="edit-recipe-search-ingredients"
            onChange={(event) => {
              setSearchIngredients(event.target.value);
            }}
          />
          <div>
            <h4 className="edit-recipe-title">Available Ingredients: </h4>
            <ul>
              {filteredIngredients.map((ingredient) => {
                return (
                  <li key={ingredient.id}>
                    {ingredient.name}
                    <Button
                      variant="success"
                      size="sm"
                      className="btn-add"
                      onClick={() => {
                        addIngredient(ingredient);
                      }}
                    >
                      <i class="fa-solid fa-plus"></i>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="edit-recipe-title">Added Ingredients: </h4>
            <ul>
              {addedIngredients?.map((ingredient) => {
                return (
                  <li key={ingredient.id}>
                    {ingredient.name}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="btn-delete"
                      onClick={() => {
                        console.log(addedIngredients);
                        const filteredArr = addedIngredients.filter(
                          (item) => item.id !== ingredient.id
                        );
                        setAddedIngredients(filteredArr);
                      }}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="edit-recipe-btns">
          <div className="btn-update-recipe">
            <Button
              variant="dark"
              className="btn-update"
              onClick={handleUpdateRecipe}
            >
              Update Recipe
            </Button>
          </div>
          <div className="btn-delete-recipe">
            <Button
              variant="danger"
              className="btn-delete-recipe"
              onClick={() => {
                deleteRecipe(recipe.id);
                window.alert("Recipe Deleted!");
                navigate("/recipes");
              }}
            >
              Delete Recipe
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
