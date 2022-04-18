const getContacts = async () => {
    const url = 'https://api.knack.com/v1/objects/object_1/records'
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            Accept: "application/json",
            "X-Knack-Application-Id": process.env.REACT_APP_APP_ID,
            "X-Knack-REST-API-KEY": process.env.REACT_APP_API_KEY,
        },
    }
    const result = await fetch(url, options)
    const data = await result.json()
    return data
}
const getContact = () => {}
const getContracts = () => {}

export { getContacts, getContact, getContracts }