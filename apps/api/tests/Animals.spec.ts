import { test, expect, request, APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../config';

import AnimalsList from './data-sets/AnimalsList.json'
import NewPet from './data-sets/NewPet.json'
import NewPetIncorrectData from './data-sets/NewPetIncorrectData.json'
import NewPetEmptyForm from './data-sets/NewPetEmptyForm.json'
import NewPetWrongParameter from './data-sets/NewPetWrongParameter.json'
import NewPetUpdate from './data-sets/NewPetUpdate.json'

let apiContext: APIRequestContext;
const baseURL = API_BASE_URL;

test.describe('Animals Resource', () => {
  test.describe.configure({ mode: 'serial' });
  test.beforeAll('Preparation', async () => {
    apiContext = await request.newContext();
  });

  //GET Pet List Pass
  test("GET animals should return the pet list with the correct data", async () => {
    const petList = await apiContext.get(`${baseURL}/animals`);
    const petListData = await petList.json();
    expect(petList).toBeOK();
    expect(petListData).toEqual(AnimalsList);
  });

  //GET Pet List Fail
  test("GET animals using the incorrect resource should return 404", async () => {
    const petList = await apiContext.get(`${baseURL}/animalls`);
    expect(petList.status()).toBe(404);
  });

  //GET First Pet Pass
  test("GET animal with id:1 should return the first pet of the list with the correct data", async () => {
    const firstPetResponse = await apiContext.get(`${baseURL}/animals/1`);
    const firstPetData = await firstPetResponse.json();
    expect(firstPetResponse).toBeOK();
    const expectedData = AnimalsList[0];
    expect(firstPetData).toEqual(expectedData);
  });

  //GET First Pet Fails
  test("GET animal with id:1 using the incorrect resource should return 404", async () => {
    const firstPetResponse = await apiContext.get(`${baseURL}/animalls/1`);
    expect(firstPetResponse.status()).toBe(404);
  });

  test("GET animal with a non-existent id should return 404", async () => {
    const getPetResponse = await apiContext.get(`${baseURL}/animals/45`);
    expect(getPetResponse.status()).toBe(404);
  });

  test("GET animal with an invalid id should return 400", async () => {
    const getPetResponse = await apiContext.get(`${baseURL}/animals/ñ`);
    expect(getPetResponse.status()).toBe(400);
  });

  //POST Add New Pet Pass
  test("POST using the correct data should add a new pet", async () => {
    const postPetResponse = await apiContext.post(`${baseURL}/animals`, {
      data: NewPet
    });
    expect(postPetResponse).toBeOK();
    const postPetData = await postPetResponse.json();

    // GET Request to compare with
    const getPetResponse = await apiContext.get(`${baseURL}/animals/${postPetData.id}`);
    const getPetResponseData = await getPetResponse.json();
    const expectedData = {
      ...NewPet,
      id: postPetData.id,
      birthdate: postPetData.birthdate
    }
    expect(getPetResponseData).toEqual(expectedData);
  });

  //POST Add New Pet Fails
  test("POST using the incorrect data should return 400", async () => {
    const postPetResponse = await apiContext.post(`${baseURL}/animals`, {
      data: NewPetIncorrectData
    });
    expect(postPetResponse.status()).toBe(400);
  });

  test("POST using invalid parameters should return 400", async () => {
    const postPetResponse = await apiContext.post(`${baseURL}/animals`, {
      data: NewPetWrongParameter
    });
    expect(postPetResponse.status()).toBe(400);
  });

  test("POST using the incorrect resource should return 404", async () => {
    const postPetResponse = await apiContext.post(`${baseURL}/animalls`, {
      data: NewPet
    });
    expect(postPetResponse.status()).toBe(404);
  });

  test("POST using an empty data set should return 400", async () => {
    const postPetResponse = await apiContext.post(`${baseURL}/animals`, {
      data: NewPetEmptyForm
    });
    expect(postPetResponse.status()).toBe(400);
  });

  //PUT (Update) Pets Pass
  test("PUT using the correct data should update a pet", async () => {
    const updatedPetResponse = await apiContext.put(`${baseURL}/animals/2`, {
      data: NewPetUpdate
    });
    expect(updatedPetResponse.ok()).toBeTruthy();
    const updatedPetData = await updatedPetResponse.json();

    // GET Request to compare with
    const getPetResponse = await apiContext.get(`${baseURL}/animals/${updatedPetData.id}`);
    const getPetResponseData = await getPetResponse.json();
    const expectedData = {
      ...NewPetUpdate,
      id: updatedPetData.id,
      birthdate: updatedPetData.birthdate
    }
    expect(getPetResponseData).toEqual(expectedData);
  });

  //PUT (Update) Pets Fails
  test("PUT using the incorrect resource should return 404", async () => {
    const updatedPetResponse = await apiContext.put(`${baseURL}/animalls/2`, {
      data: NewPetUpdate
    });
    expect(updatedPetResponse.status()).toBe(404);
  });

  test("PUT using the incorrect data should return 400", async () => {
    const updatedPetResponse = await apiContext.put(`${baseURL}/animals/2`, {
      data: NewPetIncorrectData
    });
    expect(updatedPetResponse.status()).toBe(400);
  });

  test("PUT using invalid parameters should return 400", async () => {
    const updatedPetResponse = await apiContext.put(`${baseURL}/animals/2`, {
      data: NewPetWrongParameter
    });
    expect(updatedPetResponse.status()).toBe(400);
  });

  test("PUT using an empty data set should return 400", async () => {
    const updatedPetResponse = await apiContext.put(`${baseURL}/animals/2`, {
      data: NewPetEmptyForm
    });
    expect(updatedPetResponse.status()).toBe(400);
  });

  test("PUT using an invalid id should return 400", async () => {
    const updatedPetResponse = await apiContext.put(`${baseURL}/animals/ñ`, {
      data: NewPetEmptyForm
    });
    expect(updatedPetResponse.status()).toBe(400);
  });

  //DELETE Pets Pass
  test("DELETE using the correct data should delete a pet", async () => {
    const deletedPetResponse = await apiContext.delete(`${baseURL}/animals/2`);
    expect(deletedPetResponse).toBeOK();

    //GET Request should be 404
    const getPetResponse = await apiContext.get(`${baseURL}/animals/2`);
    expect(getPetResponse.status()).toBe(404);
  });

  //DELETE Pets Fails
  test("DELETE using the incorrect resource should return 404", async () => {
    const deletedPetResponse = await apiContext.delete(`${baseURL}/animalls/2`);
    expect(deletedPetResponse.status()).toBe(404);
  });

  test("DELETE using with a non-existent id should return 404", async () => {
    const deletedPetResponse = await apiContext.delete(`${baseURL}/animals/45`);
    expect(deletedPetResponse.status()).toBe(404);
  });

  test("DELETE using with an invalid id should return 400", async () => {
    const deletedPetResponse = await apiContext.delete(`${baseURL}/animals/ñ`);
    expect(deletedPetResponse.status()).toBe(400);
  });
});

