import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";
import { Link } from "react-router-dom";
import { getMealTypes } from "../services/mealTypeService";
import Button from "react-bootstrap/Button";

export const Recipes = ({ mealTypes, currentUser }) => {
  const [allRecipes, setAllRecipes] = useState([]);
  // const [mealTypes, setMealTypes] = useState([]);
  const [filteredMealType, setFilteredMealType] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAndSetAllRecipes = () => {
    getRecipes().then((allRecipes) => {
      setAllRecipes(allRecipes);
    });
  };

  useEffect(() => {
    getAndSetAllRecipes();
  }, []);

  useEffect(() => {
    const recipesWithSelectedMealType = allRecipes.filter((recipe) =>
      recipe.mealType.name.includes(filteredMealType)
    );
    setFilteredRecipes(recipesWithSelectedMealType);
  }, [filteredMealType, allRecipes]);

  useEffect(() => {
    const foundWords = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(foundWords);
  }, [searchTerm, allRecipes]);

  return (
    <div>
      <section>
        <h1>Recipes</h1>
      </section>
      <section>
        <div>
          <select
            id="resource"
            onChange={(event) => {
              setFilteredMealType(event.target.value);
            }}
          >
            <option value="0">Select Meal Type...</option>
            {mealTypes.map((type) => {
              return <option key={type.id}>{type.name}</option>;
            })}
          </select>
        </div>
        <div>
          <Button
            variant="dark"
            onClick={() => {
              setFilteredRecipes(allRecipes);
            }}
          >
            Show All
          </Button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </section>
      <section>
        <div>
          <ul>
            {filteredRecipes.map((recipe) => {
              return (
                <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                  <li key={recipe.id}>{recipe.title}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </section>
      <section>
        {currentUser.isAdministrator ? (
          <Link to={`/addrecipe`}>
            <Button variant="success">Add New Recipe</Button>
          </Link>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};
