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
    <div>
      <section>
        <h1>Edit Recipe</h1>
      </section>
      <section>
        <div>
          <h4>Title:</h4>
          <fieldset>
            <input
              type="text"
              value={recipe.title}
              onChange={(event) => {
                const copy = { ...recipe };
                copy.title = event.target.value;
                setRecipe(copy);
              }}
              required
            />
          </fieldset>
        </div>
        <div>
          <h4>Meal Type:</h4>
          <select
            id="resource"
            required
            value={recipe.mealTypeId}
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
          <h4>Image URL (Copy Image Address):</h4>
          <fieldset>
            <input
              type="text"
              value={recipe.image}
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
          <h4>Description:</h4>
          <fieldset>
            <input
              type="text"
              value={recipe.description}
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
          <h4>Directions:</h4>
          <fieldset>
            <input
              type="text"
              value={recipe.instructions}
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
      <section>
        <h4>Ingredients: </h4>
        <input
          type="text"
          required
          placeholder="Search Ingredients"
          onChange={(event) => {
            setSearchIngredients(event.target.value);
          }}
        />
        <div>
          <h4>Available Ingredients: </h4>
          <ul>
            {filteredIngredients.map((ingredient) => {
              return (
                <li key={ingredient.id}>
                  {ingredient.name}
                  <button
                    onClick={() => {
                      addIngredient(ingredient);
                    }}
                  >
                    Add
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h4>Added Ingredients: </h4>
          <ul>
            {addedIngredients?.map((ingredient) => {
              return (
                <li key={ingredient.id}>
                  {ingredient.name}
                  <button
                    onClick={() => {
                      console.log(addedIngredients);
                      const filteredArr = addedIngredients.filter(
                        (item) => item.id !== ingredient.id
                      );
                      setAddedIngredients(filteredArr);
                    }}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section>
        <button onClick={handleUpdateRecipe}>Update Recipe</button>
        <button
          onClick={() => {
            deleteRecipe(recipe.id);
            window.alert("Recipe Deleted!");
            navigate("/recipes");
          }}
        >
          Delete Recipe
        </button>
      </section>
    </div>
  );
};
