import { useNavigate } from "react-router-dom";
import { createUserRecipe } from "../services/userRecipesService";
import Button from "react-bootstrap/Button";

export const RecipeDetails = ({
  currentUser,
  recipeId,
  recipe,
  recipeIngredients,
}) => {
  const navigate = useNavigate();

  const handleAddToMyList = (event) => {
    event.preventDefault();
    console.log(currentUser);

    const newUserRecipe = {
      recipeId: recipe.id,
      userId: currentUser.id,
    };

    console.log(newUserRecipe);

    createUserRecipe(newUserRecipe);
    navigate("/grocerylist");
  };

  return (
    <div className="recipes-container">
      <div className="recipes-header">
        <h1 className="signika-font-bold recipes-h1">{recipe.title}</h1>
      </div>
      <div className="recipe-details-body">
        <section>
          <div className="recipe-filters">
            <div className="recipe-filter-item">
              <Button
                variant="success"
                className="btn-add-list"
                onClick={handleAddToMyList}
              >
                Add to My List
              </Button>
            </div>
            <div className="recipe-filter-item">
              {currentUser.isAdministrator ? (
                <Button
                  variant="secondary"
                  className="btn-edit-recipe"
                  onClick={() => {
                    navigate(`/recipes/${recipeId}/editrecipe`);
                  }}
                >
                  Edit Recipe
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
        <section>
          <img src={recipe.image} alt={recipe.title} className="recipe-img" />

          <div>
            <h3>Description:</h3>
            <p>{recipe.description}</p>
          </div>
          <div>
            <h3>Directions: </h3>
            <p>{recipe.instructions}</p>
          </div>
          <div>
            <h3>Ingredients: </h3>
            <ul>
              {recipeIngredients.map((recipeIngredient) => {
                return (
                  <li key={recipeIngredient.id}>{recipeIngredient.name}</li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
