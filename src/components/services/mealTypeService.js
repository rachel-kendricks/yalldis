export const getMealTypes = () => {
  return fetch(`http://localhost:8088/mealTypes`).then((res) => res.json());
};
