import mocks from './mocks.json';

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
    console.log('mocks', mocks)
    // const data = await mocks.json()
    // console.log('mocks stringified', data)
    return mocks
}
const getContact = () => {}
const getContracts = () => {}

export { getContacts, getContact, getContracts }