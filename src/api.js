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
const getContact = async id => {
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
    return mocks.find(el => el.id === id)
}
const getContracts = () => {}

const sendEmail = async ({ emailTo, subject, content }) => {
    const data = { emailTo, subject }

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify(data)
    }
    await fetch("https://ens3wu5h3tk6f.x.pipedream.net/", options)
}

export { getContacts, getContact, getContracts, sendEmail }