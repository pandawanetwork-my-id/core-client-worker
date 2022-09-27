'use strict'

const {name, version} = require('./package.json')
const multer = require('multer')
const formidable = require('formidable')
const MongodbLibrary = require('../../my-libraries/mongodb')
const mongodbDSN = process.env.MONGO_DSN
const models = require('./models')
const path = require('path')
const { randomUUID } = require('crypto')
const fs = require('fs')

const mdb = new MongodbLibrary({dsn: mongodbDSN, models})
const mongooseCtx = mdb.getContext()
const { Profiles } = mdb.start()
const ObjectId = mongooseCtx.Types.ObjectId

const uploadDestination = process.env.UPLOAD_FOLDER_DEST || 'uploads/'

let controllers = {}
let routes = []

/**
 * Main
 * @route / 
 * @method GET
 */
 routes.push({
    method: 'GET',
    path: '/upload/main',
    middlewares: [],
    controller: 'Main'
})
controllers.Main = async ({request, response, next}) => {
    try {
        response.send({
            name,
            version,
        })
    } catch (err) {
        next(err)
    }
}

/**
 * Info Profile
 * @route / 
 * @method POST
 */
 routes.push({
    method: 'POST',
    path: '/upload/image',
    middlewares: [],
    controller: 'UploadImageHandler'
})

const getDestination = (request, file, cb) => {
    const { folderDestination='' } = request.query || {}
    const folder = path.join(uploadDestination, folderDestination)
    if (!fs.existsSync(folder)) fs.mkdirSync(folder)
    cb(null, folder)
}

const setupFilename = (request, file, cb) => {
    const { saveAs } = request.query || {}
    cb(null, [randomUUID(), saveAs].join('.'))
}

const imageHandler = (ctx, opt) => {
    return new Promise((resolve, reject) => {
        const { saveAs } = ctx.request.query || {}
        if (!saveAs) throw new Error('"saveAs" Parameter Required')
        const storage = multer.diskStorage({destination: getDestination, filename: setupFilename})
        const upload = multer({ storage })
        upload
            .single('file')
            (ctx.request, ctx.response, (err) => {
                if (err instanceof multer.MulterError) reject(err)
                else resolve(true)
            })
    })
}

controllers.UploadImageHandler = async ({request, response, next}) => {
    try {
        await imageHandler({request, response})
        // const file = request.file
        let data = null, body=request.body
        const contentType = request.headers['content-type']
        // if (contentType === 'application/x-www-form-urlencoded') body = request.body
        // else if (contentType.indexOf('multipart/form-data') > -1) body = await getMultipartBody(request)
        // else body = request.body
        response.send({success: true, body, data})
    } catch (err) {
        next(err)
    }
}

module.exports = { routes, controllers }