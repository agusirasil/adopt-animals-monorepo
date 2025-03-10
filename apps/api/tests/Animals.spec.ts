import { test, expect, request, APIRequestContext } from '@playwright/test';
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    proxy: {
      server: 'http://local:8080',
    },
  }
});
import AnimalsListDataSet from '../utils/AnimalsListTestsData.json'
import NewPetData from '../utils/NewPetDataSet.json'
import NewPetDataFail from '../utils/NewPetDataSetFail.json'
import NewPetDataFailEmpty from '../utils/NewPetDataFailEmpty.json'
import NewPetDataSetFailWrongParameter from '../utils/NewPetDataSetFailWrongParameter.json'
import NewPetDataUpdate from '../utils/NewPetDataSetUpdate.json'

let url: string;
let apiContext: APIRequestContext;

test.describe('Animals Resource', () => {
  test.describe.configure({ mode: 'serial' });

  //Preparation Test
  test.beforeAll('Preparation', async () => {
    apiContext = await request.newContext();
    url = "http://localhost:8000/api/v1";
  });

  //GET Pet List Pass
  test("GET animals should return the pet list with the correct data", async () => {
    const PetList = await apiContext.get(`${url}/animals`);
    const responseBody = await PetList.json();
    expect(PetList).toBeOK();
    expect(responseBody).toEqual(AnimalsListDataSet);
  });

  //GET Pet List Fail
  test("GET animals using the incorrect resource should return 404", async () => {
    const PetList = await apiContext.get(`${url}/animalls`);
    expect(PetList.status()).toBe(404);
  });

  //GET First Pet Pass
  test("GET animal with id:1 should return the first pet of the list with the correct data", async () => {
    const firstPet = await apiContext.get(`${url}/animals/1`);
    const responseBody = await firstPet.json();
    expect(firstPet).toBeOK();
    const expectedData = AnimalsListDataSet[0];
    expect(responseBody).toEqual(expectedData);
  });

  //GET First Pet Fails
  test("GET animal with id:1 using the incorrect resource should return 404", async () => {
    const firstPet = await apiContext.get(`${url}/animalls/1`);
    expect(firstPet.status()).toBe(404);
  });

  test("GET animal with a non-existent id should return 404", async () => {
    const firstPet = await apiContext.get(`${url}/animals/45`);
    expect(firstPet.status()).toBe(404);
  });

  test("GET animal with an invalid id should return 400", async () => {
    const firstPet = await apiContext.get(`${url}/animals/ñ`);
    expect(firstPet.status()).toBe(400);
  });

  //POST Add New Pet Pass
  test("POST usign the correct data should add a new pet", async () => {
    const postPetRequest = await apiContext.post(`${url}/animals`, {
      data: NewPetData
    });
    expect(postPetRequest).toBeOK();
    const postPetRequestData = await postPetRequest.json();

    // GET Request to compare with
    const getNewPetResponse = await apiContext.get(`${url}/animals/${postPetRequestData.id}`);
    const getNewPetResponseData = await getNewPetResponse.json();
    const expectedData = {
      ...NewPetData,
      id: postPetRequestData.id,
      birthdate: postPetRequestData.birthdate
    }
    expect(getNewPetResponseData).toEqual(expectedData);
  });

  //POST Add New Pet Fails
  test("POST usign the incorrect data should return 400", async () => {
    const postPetRequest = await apiContext.post(`${url}/animals`, {
      data: NewPetDataFail
    });
    expect(postPetRequest.status()).toBe(400);
  });

  test("POST usign invalid parameters should return 400", async () => {
    const postPetRequest = await apiContext.post(`${url}/animals`, {
      data: NewPetDataSetFailWrongParameter
    });
    expect(postPetRequest.status()).toBe(400);
  });

  test("POST usign the incorrect resource should return 404", async () => {
    const postPetRequest = await apiContext.post(`${url}/animalls`, {
      data: NewPetData
    });
    expect(postPetRequest.status()).toBe(404);
  });

  test("POST usign an empty data set should return 400", async () => {
    const postPetRequest = await apiContext.post(`${url}/animals`, {
      data: NewPetDataFailEmpty
    });
    expect(postPetRequest.status()).toBe(400);
  });

  //PUT (Update) Pets Pass
  test("PUT using the correct data should update a pet", async () => {
    const PutUpdatedPet = await apiContext.put(`${url}/animals/2`,
      {
        data: NewPetDataUpdate
      });
    expect(PutUpdatedPet.ok()).toBeTruthy();
    const putPetRequestData = await PutUpdatedPet.json();

    // GET Request to compare with
    const getNewPetResponse = await apiContext.get(`${url}/animals/${putPetRequestData.id}`);
    const getNewPetResponseData = await getNewPetResponse.json();
    const expectedData = {
      ...NewPetDataUpdate,
      id: putPetRequestData.id,
      birthdate: putPetRequestData.birthdate
    }
    expect(getNewPetResponseData).toEqual(expectedData);
  });

  //PUT (Update) Pets Fails
  test("PUT using the incorrect resource should return 404", async () => {
    const PutUpdatedPet = await apiContext.put(`${url}/animalls/2`,
      {
        data: NewPetDataUpdate
      });
      expect(PutUpdatedPet.status()).toBe(404);
  });
  
  test("PUT using the incorrect data should return 400", async () => {
    const PutUpdatedPet = await apiContext.put(`${url}/animals/2`,
      {
        data: NewPetDataFail
      });
      expect(PutUpdatedPet.status()).toBe(400);
  });

  test("PUT using invalid parameters should return 400", async () => {
    const PutUpdatedPet = await apiContext.put(`${url}/animals/2`,
      {
        data: NewPetDataSetFailWrongParameter
      });
      expect(PutUpdatedPet.status()).toBe(400);
  });

  test("PUT using an empty data set should return 400", async () => {
    const PutUpdatedPet = await apiContext.put(`${url}/animals/2`, {
      data: NewPetDataFailEmpty
    });
    expect(PutUpdatedPet.status()).toBe(400);
  });

  test("PUT using an invalid id should return 400", async () => {
    const PutUpdatedPet = await apiContext.put(`${url}/animals/ñ`, {
      data: NewPetDataFailEmpty
    });
    expect(PutUpdatedPet.status()).toBe(400);
  });

  //DELETE Pets Pass
  test("DELETE using the correct data should delete a pet", async () => {
    const deletedPet = await apiContext.delete(`${url}/animals/2`);
    expect(deletedPet).toBeOK();
    
    //GET Request should be 404
    const getNewPetResponse = await apiContext.get(`${url}/animals/2`);
    expect(getNewPetResponse.status()).toBe(404);
  });
  
  //DELETE Pets Fails
  test("DELETE using the incorrect resource should return 404", async () => {
    const deletedPet = await apiContext.delete(`${url}/animalls/2`);
    expect(deletedPet.status()).toBe(404);
  });

  test("DELETE using with a non-existent id should return 404", async () => {
    const deletedPet = await apiContext.delete(`${url}/animals/45`);
    expect(deletedPet.status()).toBe(404);
  });

  test("DELETE using with an invalid id should return 400", async () => {
    const deletedPet = await apiContext.delete(`${url}/animals/ñ`);
    expect(deletedPet.status()).toBe(400);
  });
});

