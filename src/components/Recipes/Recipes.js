import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Recipes.css";

export const Recipes = ({ mealTypes, currentUser }) => {
  const [allRecipes, setAllRecipes] = useState([]);
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
    <div className="recipes-container">
      <section className="recipes-header">
        <h1>Recipes</h1>
      </section>
      <section className="recipe-filters">
        <div className="recipe-filter-item">
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="recipe-filter-item">
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
        <div className="recipe-filter-item">
          <Button
            variant="dark"
            onClick={() => {
              setFilteredRecipes(allRecipes);
            }}
          >
            Show All
          </Button>
        </div>
      </section>
      <section>
        <div className="recipes-list">
          <ul>
            {filteredRecipes.map((recipe) => {
              return (
                <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                  <li key={recipe.id} className="recipe-hover">
                    {recipe.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="btn-add-new-recipe">
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
