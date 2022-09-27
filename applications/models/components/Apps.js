const schema = {
    appName: String,
    appKey: String,
    appID: String,
    appOwnerId: 'ObjectId', // many on UserAccountsModel
    appStatus: String,
    reviewedBy: String,
    reviewedAt: Number,
    createdAt: Number
}

const options = {} // see https://mongoosejs.com/docs/connections.html#options

const indexes = [
    {
        index: {appID: 1},
        options: {}
    },
    {
        index: {appOwnerId: 1},
        options: {}
    }
]

module.exports = {
    schema,
    options,
    indexes
}