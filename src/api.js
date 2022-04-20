// import contactsMock from "./mocks/contacts.json";
// import contractsMock from "./mocks/contracts.json";
import { processContact } from "./utils";

const getContacts = async () => {
//   if (process.env.REACT_APP_USE_MOCKS) return contactsMock;

  const url = "https://api.knack.com/v1/objects/object_3/records";

  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "X-Knack-Application-Id": process.env.REACT_APP_APP_ID,
      "X-Knack-REST-API-KEY": process.env.REACT_APP_API_KEY,
    },
  };

  const result = await fetch(url, options);

  if (result.ok) {
    const data = await result.json();
    return data.records;
  } else throw new Error("Unable to retrieve data");
};

const getContact = async (id) => {
//   if (process.env.REACT_APP_USE_MOCKS)
//     return contactsMock.find((el) => el.id === id);

  const url = `https://api.knack.com/v1/objects/object_3/records/${id}`;
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "X-Knack-Application-Id": process.env.REACT_APP_APP_ID,
      "X-Knack-REST-API-KEY": process.env.REACT_APP_API_KEY,
    },
  };
  const result = await fetch(url, options);
  if (result.ok) {
    const data = await result.json();
    return data;
  } else throw new Error("Unable to retrieve data");
};

const updateAge = async ({ id, dateOfBirth }) => {
//   if (process.env.REACT_APP_USE_MOCKS) return;

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
      const data = await result.json();
    return data;
  } else throw new Error("Unable to retrieve data");
};

const getContactEmail = async (id) => {
//   if (process.env.REACT_APP_USE_MOCKS) {
//     const contact = contactsMock.find((el) => el.id === id);
//     return processContact(contact).email;
//   }

  const allContacts = await getContacts();
  const data = allContacts.find((el) => el.id === id);
  //contactsMock.find((el) => el.id === id);
  return processContact(data).email;
};

const getContracts = async () => {
    // console.log(process.env.REACT_APP_USE_MOCKS)
    // if (process.env.REACT_APP_USE_MOCKS) { return contractsMock}

  const url = "https://api.knack.com/v1/objects/object_2/records";

  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "X-Knack-Application-Id": process.env.REACT_APP_APP_ID,
      "X-Knack-REST-API-KEY": process.env.REACT_APP_API_KEY,
    },
  };

  console.log('options', options)
  
  const result = await fetch(url, options);
  console.log('result', result)

  if (result.ok) {
    console.log('result contracts', result)
    const data = await result.json();
    console.log('data contracts', data)
    return data.records;
  } else throw new Error("Unable to retrieve data");
};

const sendEmail = async (data) => {
  const url = "https://hook.eu1.make.com/7aw205wwf3gkrd80e1nym25jg5ntntba";
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

  await fetch(url, options);
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

  const result = await fetch(url, options);

  if (result.ok) {
    const resultProcessed = await result.text();
    return resultProcessed;
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
