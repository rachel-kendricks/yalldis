import { useEffect, useState } from "react";
import { postRecipe } from "../services/recipeService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const AddRecipe = ({ ingredients, mealTypes }) => {
  const [title, setTitle] = useState("");
  const [mealTypeId, setMealTypeId] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [description, setDescription] = useState("");
  const [directions, setDirections] = useState("");
  const [searchIngredients, setSearchIngredients] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const navigate = useNavigate();

  const addIngredient = (ingredient) => {
    setAddedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const handlePost = () => {
    const newRecipe = {
      title: title,
      mealTypeId: mealTypeId,
      instructions: directions,
      description: description,
      image: imgURL,
    };

    fetch(`http://localhost:8088/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => res.json())

      .then((res) => {
        console.log(res.id);
        const promises = addedIngredients.map((ingredient) => {
          return fetch("http://localhost:8088/recipeIngredients", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipeId: res.id,
              ingredientId: ingredient.id,
            }),
          });
        });
        return Promise.all(promises);
      })
      .then(() => {
        navigate("/recipes");
      });
  };

  useEffect(() => {
    if (searchIngredients) {
      const foundWords = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchIngredients.toLowerCase())
      );
      setFilteredIngredients(foundWords);
    }
  }, [searchIngredients, ingredients]);

  return (
    <div className="recipes-container">
      <div className="recipes-header">
        <h1 className="signika-font-bold recipes-h1">Add Recipe Info: </h1>
      </div>
      <div className="recipes-body">
        <section className="add-recipe-inputs">
          <div className="add-recipe-input-item add-recipe-input-item-title">
            <h4 className="add-recipe-title">Title:</h4>
            <textarea
              type="text"
              required
              placeholder="Enter Title"
              className="input-box-title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="add-recipe-input-item">
            <h4 className="add-recipe-title">Meal Type:</h4>
            <select
              id="resource"
              required
              className="input-box-meal-type"
              onChange={(event) => {
                const mealTypeText = event.target.value;

                const mealTypeObj = mealTypes.find(
                  (type) => type.name === mealTypeText
                );

                setMealTypeId(mealTypeObj.id);
              }}
            >
              <option value="0">Select Meal Type...</option>
              {mealTypes.map((type) => {
                return <option key={type.id}>{type.name}</option>;
              })}
            </select>
          </div>
          <div>
            <h4 className="add-recipe-title">
              Image URL (Copy Image Address):
            </h4>
            <textarea
              type="text"
              required
              placeholder="Enter Image URL"
              className="input-box-url"
              onChange={(event) => {
                setImgURL(event.target.value);
              }}
            />
          </div>
          <div>
            <h4 className="add-recipe-title">Description:</h4>
            <textarea
              type="text"
              required
              placeholder="Enter Description"
              className="input-box-description"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div>
            <h4 className="add-recipe-title">Directions:</h4>
            <textarea
              type="text"
              required
              placeholder="Enter Directions"
              className="input-box-directions"
              onChange={(event) => {
                setDirections(event.target.value);
              }}
            />
          </div>
          <div>
            <h4 className="add-recipe-title">Ingredients:</h4>
            <input
              type="text"
              required
              placeholder="Search Ingredients"
              onChange={(event) => {
                setSearchIngredients(event.target.value);
              }}
            />
            <div>
              <h4 className="add-recipe-title">Available Ingredients: </h4>
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
              <h4 className="add-recipe-title">Added Ingredients: </h4>
              <ul>
                {addedIngredients.map((ingredient) => {
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
          </div>
        </section>
        <section className="btn-post">
          <Button
            variant="dark"
            className="btn-post-recipe"
            onClick={handlePost}
          >
            Post Recipe
          </Button>
        </section>
      </div>
    </div>
  );
};
