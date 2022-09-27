const schema = {
    createdAt: Number,
    createdBy: String,
    lastUpdatedAt: Number,
    lastUpdatedBy: String,
    fileType: String, // png, jpg, csv, docs, others
    tempId: String, // digunakan untuk mengidentifikasi apakah data file itu bisa dihapus atau enggak
    status: String, // in-progress, done, failed, others
    originalFileName: String, // filename from client
    size: Number, // size of the file in byte
    expired: Number, // if not NULL, then this file will be removed from tmp storage
    storage: {
        ipAddress: String, // ip address from server
        domainAddress: String, // optional if set
        pathToStorage: String,
    }
}

const options = {} // see https://mongoosejs.com/docs/connections.html#options

module.exports = {
    schema,
    options
}