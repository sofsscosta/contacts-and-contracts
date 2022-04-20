const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const processContact = (rawData) => {
    return {
        id: rawData.id,
        lastName: rawData.field_3_raw.last,
        firstName: rawData.field_3_raw.first,
        email: rawData.field_5_raw.email,
        nif: rawData.field_6,
        role: rawData.field_7,
        dateOfBirth: new Date(rawData.field_4_raw.unix_timestamp),
        age: rawData.field_12,
        contracts: rawData.field_1_raw || [],
        contacts: rawData.field_8_raw || []
    }
}

export { capitalizeFirstLetter, processContact }