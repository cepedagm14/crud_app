const BASE_URL = `http://localhost:3000/`;

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users/`);
  const json = await response.json();
  return json;
};

export const getUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

export const postUser = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${BASE_URL}/api/users/`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (userId, formData) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${BASE_URL}/api/users/${userId}`, options);
  const json = await response.json();

  return json;
};

export const deleteUser = async (userId) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
     
    };
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};
