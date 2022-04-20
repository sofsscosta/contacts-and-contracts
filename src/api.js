import mocks from "./mocks.json";
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
  console.log("mocks", mocks);
  // const data = await mocks.json()
  // console.log('mocks stringified', data)
  return mocks;
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
    mocks.find((el) => el.id === id)
  );
  return mocks.find((el) => el.id === id);
};

const getContactEmail = async (id) => {
  const data = mocks.find((el) => el.id === id);
  return processContact(data).email;
};

const getContracts = () => {};

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
    body: JSON.stringify({field_4: dateOfBirth}),
  };
  console.log('options', options)
  const result = await fetch(url, options);
  if (result.ok) {
    const data = await result.json();
    console.log("data in api call", data);
    return data.records;
  } else throw new Error("Unable to retrieve data");
};

export {
  getContacts,
  getContact,
  getContactEmail,
  getContracts,
  sendEmail,
  updateAge,
};
