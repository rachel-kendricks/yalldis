import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { getIngredientsByRecipeId } from "../services/recipeIngredientsService";

export const EditRecipe = ({ ingredients, mealTypes }) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [mealTypeName, setMealTypeName] = useState("");
  const [addedIngredients, setAddedIngredients] = useState([]);

  const getRecipe = (recipeId) => {
    getRecipeById(recipeId).then((recipe) => {
      const recipeObj = recipe[0];
      setRecipe(recipeObj);
    });
  };

  const getAndSetAddedIngredients = () => {
    getIngredientsByRecipeId(recipeId).then((ingredients) => {
      setAddedIngredients(ingredients);
      console.log(ingredients);
    });
  };

  useEffect(() => {
    getRecipe(recipeId);
  }, [recipeId]);

  useEffect(() => {
    getAndSetAddedIngredients();
  }, [recipeId]);

  useEffect(() => {
    const mealTypeObj = mealTypes.find((type) => type.id === recipe.mealTypeId);
    const mealTypeObjName = mealTypeObj?.name;
    setMealTypeName(mealTypeObjName);
  }, [recipe]);

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
        {/* <div>
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
        </div> */}
        <div>
          <h4>Added Ingredients: </h4>
          <ul>
            {addedIngredients.map((ingredient) => {
              return (
                <li key={ingredient.id}>
                  {ingredient.name}
                  {/* <button
                      onClick={() => {
                        console.log(addedIngredients);
                        const filteredArr = addedIngredients.filter(
                          (item) => item.id !== ingredient.id
                        );
                        setAddedIngredients(filteredArr);
                      }}
                    >
                      Delete
                    </button> */}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};
