import { test, expect, request } from '@playwright/test';
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    proxy: {
      server: 'http://local:8080',
    },
  }
});

test("Get pet list", async () => {
  const apiContext = await request.newContext();
  const PetList = await apiContext.get("http://localhost:8000/api/v1/animals");
  const responseBody = await PetList.json();
  expect(PetList.ok()).toBeTruthy();
  console.log(responseBody);
});

test("Add new pet", async () => {
  const apiContext = await request.newContext();
  const newPet = await apiContext.post("http://localhost:8000/api/v1/animals", {
    data:
    {
      "name": "Pepe",
      "type": "dog",
      "gender": "male",
      "breed": "Akita",
      "birthdate": "2025-03-05",
      "zone": "Buceo",
      "peltColor": "Gris",
      "eyesColor": "Negro",
      "description": "Divertido, mimoso y bueno.",
      "contact": {
        "name": "John Doe",
        "email": "john.doe@gmail.com",
        "phone": "+598 094135268"
      }
    }
  });
  expect(newPet.ok()).toBeTruthy();
  const requestStatus = await newPet.status();
  console.log(requestStatus);
});

test("Get the first pet", async () => {
  const apiContext = await request.newContext();
  const firstPet = await apiContext.get("http://localhost:8000/api/v1/animals/1");
  const responseBody = await firstPet.json();
  expect(firstPet.ok()).toBeTruthy();
  console.log(responseBody);
});

test("Update a pet", async () => {
  const apiContext = await request.newContext();
  const updatedPet = await apiContext.put("http://localhost:8000/api/v1/animals/2", {
    data:
    {
      "name": "Toto",
      "type": "dog",
      "gender": "male",
      "breed": "Akita",
      "birthdate": "2025-11-05",
      "zone": "Buceo",
      "peltColor": "Negro",
      "eyesColor": "Negro",
      "description": "Muy buena onda.",
      "contact": {
        "name": "John Doe",
        "email": "john.doe@gmail.com",
        "phone": "+598 094135268"
      }
    }
  });
  expect(updatedPet.ok()).toBeTruthy();
  const requestStatus = await updatedPet.status();
  console.log(requestStatus);
});

test("Delete a pet", async () => {
  const apiContext = await request.newContext();
  const deletedPet = await apiContext.delete("http://localhost:8000/api/v1/animals/3");
  expect(deletedPet.ok()).toBeTruthy();
  const requestStatus = await deletedPet.status();
  console.log(requestStatus);
});

test("Get spec", async () => {
  const apiContext = await request.newContext();
  const specResponse = await apiContext.get("http://localhost:8000/api/v1/spec");
  const requestStatus = await specResponse.status();
  expect(specResponse.ok()).toBeTruthy();
  console.log(requestStatus);
  console.log(specResponse.headers());
});