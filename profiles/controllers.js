'use strict'

const MongodbLibrary = require('../../my-libraries/mongodb')
const mongodbDSN = process.env.MONGO_DSN
const models = require('./models')

const mdb = new MongodbLibrary({dsn: mongodbDSN, models})
const mongooseCtx = mdb.getContext()
const { Profiles } = mdb.start()

const { routes: pRoutes, controllers: pControllers } = require('./controllers/ProfileController')({ models: { Profiles }, mongooseCtx })
const { routes: addrRoutes, controllers: addrControllers } = require('./controllers/ProfileAddressController')({ models: { Profiles }, mongooseCtx })

// delete profile hanya untuk admin aja, jika profile tsb menghapus akunnya
const d = {
    routes: [
        ...pRoutes,
        ...addrRoutes
    ],
    controllers: {
        ...pControllers,
        ...addrControllers
    }
}
module.exports = d