const API_URL = "http://localhost:8000/api/v1";

export async function getAnimalList() {
  const response = await fetch(`${API_URL}/animals`, {
    method: "GET",
  });
  return await response.json();
}

export async function getAnimal(id) {
  return await fetch(`${API_URL}/animals/${id}`, {
    method: "GET",
  }).json();
}

export async function createAnimal(data) {
  return await fetch(`${API_URL}/animals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateAnimal(id, data) {
  return await fetch(`${API_URL}/animals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteAnimal(id) {
  return await fetch(`${API_URL}/animals/${id}`, {
    method: "DELETE",
  });
}

const Api = {
  getAnimalList,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};

export default Api;
