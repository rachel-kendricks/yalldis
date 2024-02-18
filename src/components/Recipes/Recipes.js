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
      <div className="recipes-header ">
        <h1 className="signika-font-bold recipes-h1">Recipes</h1>
      </div>
      <div className="recipes-body montserrat-font-light">
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
              className="btn-show-all"
              onClick={() => {
                setFilteredRecipes(allRecipes);
              }}
            >
              Show All
            </Button>
          </div>
          <div className="recipe-filter-item">
            {currentUser.isAdministrator ? (
              <Link to={`/addrecipe`}>
                <Button variant="success" className="btn-add-new-recipe">
                  Add New Recipe
                </Button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </section>
        <section>
          <div className="recipes-list">
            {filteredRecipes.map((recipe) => {
              return (
                <div className="recipe-condensed">
                  <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                    <h3
                      key={recipe.id}
                      className="recipe-hover signika-font-bold recipes-h1"
                    >
                      {recipe.title}
                    </h3>
                  </Link>
                  <p className="montserrat-font-light">{recipe.description}</p>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-img"
                  />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
