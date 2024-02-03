import { useEffect, useState } from "react";
import { postRecipe } from "../services/recipeService";

export const AddRecipe = ({ ingredients, mealTypes }) => {
  const [title, setTitle] = useState("");
  const [mealTypeId, setMealTypeId] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [description, setDescription] = useState("");
  const [directions, setDirections] = useState("");
  const [searchIngredients, setSearchIngredients] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);

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
      });
  };

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
        <h1>Add Recipe Info: </h1>
      </section>
      <section>
        <input
          type="text"
          placeholder="Enter Title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <select
          id="resource"
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
        <input
          type="text"
          placeholder="Enter Image URL"
          onChange={(event) => {
            setImgURL(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Directions"
          onChange={(event) => {
            setDirections(event.target.value);
          }}
        />
        <div>
          <input
            type="text"
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
              {addedIngredients.map((ingredient) => {
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
        </div>
      </section>
      <section>
        <button onClick={handlePost}>Post Recipe</button>
      </section>
    </div>
  );
};
