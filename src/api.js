import contactsMock from "./mocks/contacts.json";
import contractsMock from "./mocks/contracts.json";
import { processContact } from "./utils";

const getContacts = async () => {
  // const url = 'https://api.knack.com/v1/objects/object_3/records'
  // const options = {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //         Accept: "application/json",
  //         "X-Knack-Application-Id": process.env.REACT_APP_APP_ID,
  //         "X-Knack-REST-API-KEY": process.env.REACT_APP_API_KEY,
  //     },
  // }
  // const result = await fetch(url, options)
  // if (result.ok) {
  //     const data = await result.json()
  //     console.log('data in api call',data)
  //     return data.records
  // }
  // else throw new Error('Unable to retrieve data')
  console.log("mocks", contactsMock);
  // const data = await mocks.json()
  // console.log('mocks stringified', data)
  return contactsMock;
};
const getContact = async (id) => {
  // const url = `https://api.knack.com/v1/objects/object_3/records/${id}`
  // const options = {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //         Accept: "application/json",
  //         "X-Knack-Application-Id": process.env.REACT_APP_APP_ID,
  //         "X-Knack-REST-API-KEY": process.env.REACT_APP_API_KEY,
  //     },
  // }
  // const result = await fetch(url, options)
  // if (result.ok) {
  //     const data = await result.json()
  //     console.log('data in api call',data)
  //     return data.records
  // }
  // else throw new Error('Unable to retrieve data')
  console.log(
    "mock in getContact",
    contactsMock.find((el) => el.id === id)
  );
  return contactsMock.find((el) => el.id === id);
};

const getContactEmail = async (id) => {
  const data = contactsMock.find((el) => el.id === id);
  return processContact(data).email;
};

const getContracts = async () => {
      // const url = 'https://api.knack.com/v1/objects/object_3/records'
  // const options = {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //         Accept: "application/json",
  //         "X-Knack-Application-Id": process.env.REACT_APP_APP_ID,
  //         "X-Knack-REST-API-KEY": process.env.REACT_APP_API_KEY,
  //     },
  // }
  // const result = await fetch(url, options)
  // if (result.ok) {
  //     const data = await result.json()
  //     console.log('data in api call',data)
  //     return data.records
  // }
  // else throw new Error('Unable to retrieve data')
  console.log("mocks", contractsMock);
  // const data = await mocks.json()
  // console.log('mocks stringified', data)
  return contractsMock;
};

const sendEmail = async (data) => {
  const headers = new Headers();

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetch(
    "https://hook.eu1.make.com/7aw205wwf3gkrd80e1nym25jg5ntntba",
    options
  );
};

const generateContract = async (data) => {
  const url = "https://hook.eu1.make.com/du3me47f8tizhb9985fv236skr5fvbqx";
  const headers = new Headers();

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log('options', options)
  const result = await fetch(url, options);
  if (result.ok) {
    console.log("pdf in api call", result);
    const resultProcessed = await result.text()
    console.log('resultProcessed', resultProcessed)
    return resultProcessed
  } else throw new Error("Unable to retrieve data");
};

const updateAge = async ({ id, dateOfBirth }) => {
  const url = `https://api.knack.com/v1/objects/object_3/records/${id}`;
  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "X-Knack-Application-Id": process.env.REACT_APP_APP_ID,
      "X-Knack-REST-API-KEY": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ field_4: dateOfBirth }),
  };
  const result = await fetch(url, options);
  if (result.ok) {
    console.log('response unprocessed', result)
    const data = await result.json();
    console.log("data in api call", data);
    return data;
  } else throw new Error("Unable to retrieve data");
};

export {
  getContacts,
  getContact,
  getContactEmail,
  getContracts,
  sendEmail,
  generateContract,
  updateAge,
};
