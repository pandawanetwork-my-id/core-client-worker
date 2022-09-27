const schema = {
    createdAt: Number,
    createdBy: String,
    lastUpdatedAt: Number,
    lastUpdatedBy: String,
    status: String, // [need_update, complete]
    accountId: 'ObjectId', // ObjectId
    baseInformation: {
        firstName: String,
        lastName: String,
        title: String, // mr, ms
        gender: String,
    },
    details: {
        identityNumber: String,
        nationality: String, // ID or other
    }, // bebas, sesuai kebutuhan
    addresses: [
        {
            name: String, // home, work, or other
            address: String, // jalan kapitra
            homeNumber: String,
            rt: String,
            rw: String,
            postalCode: String,
            phoneNumber: String,
            gMapsLocation: String,
            latitude: Number, // InDecimal
            longitude: Number, // InDecimal
        }
    ]
}

const options = {} // see https://mongoosejs.com/docs/connections.html#options

const indexes = [
    {
        index: {accountId: 1},
        options: {uniq: true}
    },
    {
        index: {lastUpdateAt: -1},
        options: {}
    },
    {
        index: {createdAt: -1},
        options: {}
    }
]
module.exports = {
    schema,
    options,
    indexes
}