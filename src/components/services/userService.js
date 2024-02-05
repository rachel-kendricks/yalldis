export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (customer) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json());
};

export const getUserById = (id) => {
  return fetch(`http://localhost:8088/users/${id}`).then((res) => res.json());
};

export const updateUser = (editedCurrentUser) => {
  return fetch(`http://localhost:8088/users/${editedCurrentUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedCurrentUser),
  });
};
