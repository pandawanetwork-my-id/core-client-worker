const schema = {
    createdAt: Number,
    createdBy: String,
    updatedAt: Number,
    updatedBy: String,
    exiresDate: Number,
    status: String, // [pending, failed, succeed]
    type: String,
    priority: Number,
    data: {}, // bebas, sesuai kebutuhan
    error: {}
}

const options = {} // see https://mongoosejs.com/docs/connections.html#options

module.exports = {
    schema,
    options
}